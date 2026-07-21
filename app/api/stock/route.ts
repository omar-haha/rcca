import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// force-dynamic (not revalidate/ISR): this route reads live Supabase data via
// env vars only present at container runtime, not at `next build` — ISR would
// make Next execute it during the Docker build, before secrets are mounted.
export const dynamic = "force-dynamic";

// In-process cache standing in for the ISR revalidate=60 we can't use here —
// keeps repeat requests fast without hitting Supabase every time.
let cache: { data: Record<string, number>; expires: number } | null = null;
const TTL_MS = 60_000;

export async function GET() {
  if (cache && cache.expires > Date.now()) {
    return NextResponse.json(cache.data);
  }

  const { data, error } = await supabase
    .from("stock")
    .select("variant_id, quantity");

  if (error) {
    return NextResponse.json(cache?.data ?? {}, { status: cache ? 200 : 500 });
  }

  const map: Record<string, number> = {};
  for (const row of data ?? []) {
    map[row.variant_id] = row.quantity;
  }

  cache = { data: map, expires: Date.now() + TTL_MS };
  return NextResponse.json(cache.data);
}
