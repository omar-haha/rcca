import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { checkLimit, limiters } from "@/lib/ratelimit";

// force-dynamic (not revalidate/ISR): see app/api/stock/route.ts for why.
export const dynamic = "force-dynamic";

// In-process cache standing in for the ISR revalidate=60 we can't use here —
// keeps repeat requests fast without hitting Supabase every time.
let cache: { data: unknown[]; expires: number } | null = null;
const TTL_MS = 60_000;

type ReviewRow = {
  id: string;
  name: string;
  location: string;
  product: string;
  rating: number;
  body: string;
  date_label: string;
  order_id?: string | null;
};

// See lib/legalContent.ts / LEGAL_COMPLIANCE_REVIEW.md: a "Verified Buyer" badge
// may only appear on a review we can tie to a real order. `verified` is derived
// from order_id, and order_id itself never leaves the server — it identifies
// someone else's order and has no business in a public payload.
function toPublicReview({ order_id, ...r }: ReviewRow) {
  return { ...r, verified: Boolean(order_id) };
}

function isMissingColumnError(err: { code?: string; message?: string }): boolean {
  return err.code === "PGRST204" || err.code === "42703" || /column .* does not exist/i.test(err.message ?? "");
}

export async function GET() {
  if (cache && cache.expires > Date.now()) {
    return NextResponse.json(cache.data);
  }

  const select = (columns: string) =>
    supabase
      .from("reviews")
      .select(columns)
      .eq("approved", true)
      .order("created_at", { ascending: false });

  let { data, error } = await select("id, name, location, product, rating, body, date_label, order_id");

  // order_id ships in deploy/migrations/002_review_order_link.sql. Until that is
  // applied, serve reviews without it — every review is simply unverified.
  if (error && isMissingColumnError(error)) {
    console.warn(
      "[api/reviews] reviews.order_id missing — apply deploy/migrations/002_review_order_link.sql",
      error.message
    );
    ({ data, error } = await select("id, name, location, product, rating, body, date_label"));
  }

  if (error) return NextResponse.json(cache?.data ?? [], { status: cache ? 200 : 500 });

  const publicData = ((data ?? []) as unknown as ReviewRow[]).map(toPublicReview);
  cache = { data: publicData, expires: Date.now() + TTL_MS };
  return NextResponse.json(cache.data);
}

export async function POST(req: NextRequest) {
  const limited = await checkLimit(limiters.review, req);
  if (limited) return limited;

  const body = await req.json().catch(() => ({}));
  const { name, location, product, rating, body: reviewBody, orderId, orderEmail } = body;

  if (!name?.trim() || !product || typeof rating !== "number" || rating < 1 || rating > 5 || !reviewBody?.trim()) {
    return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 });
  }
  if (name.length > 80 || (location && location.length > 80) || reviewBody.length > 2000) {
    return NextResponse.json({ error: "Input too long" }, { status: 400 });
  }

  // Optional order verification. Both the order number and the email on that
  // order must match, so a reviewer can't claim someone else's order by guessing
  // an id. A mismatch is not an error — the review is simply published without a
  // badge, and we don't confirm whether the order number exists (that would leak
  // valid order ids to anyone probing this endpoint).
  let verifiedOrderId: string | null = null;
  if (typeof orderId === "string" && orderId.trim() && typeof orderEmail === "string" && orderEmail.trim()) {
    const { data: order, error: lookupErr } = await supabase
      .from("orders")
      .select("id, email")
      .eq("id", orderId.trim().toUpperCase())
      .maybeSingle();
    if (lookupErr) {
      console.error("[api/reviews] order lookup failed", lookupErr);
    } else if (order && order.email?.trim().toLowerCase() === orderEmail.trim().toLowerCase()) {
      verifiedOrderId = order.id;
    }
  }

  const date_label = new Date().toLocaleDateString("en-CA", { month: "long", year: "numeric" });

  const reviewRow = {
    name: name.trim(),
    location: location?.trim() ?? "",
    product,
    rating,
    body: reviewBody.trim(),
    date_label,
    approved: false,
  };

  let { error } = await supabase.from("reviews").insert({ ...reviewRow, order_id: verifiedOrderId });

  if (error && isMissingColumnError(error)) {
    console.warn(
      "[api/reviews] reviews.order_id missing — apply deploy/migrations/002_review_order_link.sql",
      error.message
    );
    ({ error } = await supabase.from("reviews").insert(reviewRow));
  }

  if (error) return NextResponse.json({ error: "Submit failed" }, { status: 500 });
  return NextResponse.json({ ok: true, verified: verifiedOrderId !== null }, { status: 201 });
}
