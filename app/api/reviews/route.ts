import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { checkLimit, limiters } from "@/lib/ratelimit";

// force-dynamic (not revalidate/ISR): see app/api/stock/route.ts for why.
export const dynamic = "force-dynamic";

export async function GET() {
  const { data, error } = await supabase
    .from("reviews")
    .select("id, name, location, product, rating, body, date_label")
    .eq("approved", true)
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json([], { status: 500 });
  return NextResponse.json(data ?? []);
}

export async function POST(req: NextRequest) {
  const limited = await checkLimit(limiters.review, req);
  if (limited) return limited;

  const body = await req.json().catch(() => ({}));
  const { name, location, product, rating, body: reviewBody } = body;

  if (!name?.trim() || !product || typeof rating !== "number" || rating < 1 || rating > 5 || !reviewBody?.trim()) {
    return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 });
  }
  if (name.length > 80 || (location && location.length > 80) || reviewBody.length > 2000) {
    return NextResponse.json({ error: "Input too long" }, { status: 400 });
  }

  const date_label = new Date().toLocaleDateString("en-CA", { month: "long", year: "numeric" });

  const { error } = await supabase.from("reviews").insert({
    name: name.trim(),
    location: location?.trim() ?? "",
    product,
    rating,
    body: reviewBody.trim(),
    date_label,
    approved: false,
  });

  if (error) return NextResponse.json({ error: "Submit failed" }, { status: 500 });
  return NextResponse.json({ ok: true }, { status: 201 });
}
