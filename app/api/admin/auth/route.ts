import { NextRequest, NextResponse } from "next/server";
import { checkLimit, limiters } from "@/lib/ratelimit";

export async function POST(req: NextRequest) {
  const limited = await checkLimit(limiters.adminAuth, req);
  if (limited) return limited;

  const { password } = await req.json();
  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }
  return NextResponse.json({ token: process.env.ADMIN_TOKEN });
}
