import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const revalidate = 60; // cache for 60s

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
