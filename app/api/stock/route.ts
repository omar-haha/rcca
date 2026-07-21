import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// force-dynamic (not revalidate/ISR): this route reads live Supabase data via
// env vars only present at container runtime, not at `next build` — ISR would
// make Next execute it during the Docker build, before secrets are mounted.
export const dynamic = "force-dynamic";

export async function GET() {
  const { data, error } = await supabase
    .from("stock")
    .select("variant_id, quantity");

  if (error) {
    return NextResponse.json({}, { status: 500 });
  }

  const map: Record<string, number> = {};
  for (const row of data ?? []) {
    map[row.variant_id] = row.quantity;
  }

  return NextResponse.json(map);
}
