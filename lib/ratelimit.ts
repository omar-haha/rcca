import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const redis = Redis.fromEnv();

// Sliding-window limiters per endpoint
export const limiters = {
  order:   new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(5,  "1 h"), prefix: "rl:order"   }),
  review:  new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(3,  "1 h"), prefix: "rl:review"  }),
  contact: new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(5,  "1 h"), prefix: "rl:contact" }),
};

export function getIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "anonymous"
  );
}

export async function checkLimit(
  limiter: Ratelimit,
  req: NextRequest
): Promise<NextResponse | null> {
  const { success, limit, remaining, reset } = await limiter.limit(getIp(req));
  if (!success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: {
          "X-RateLimit-Limit":     String(limit),
          "X-RateLimit-Remaining": String(remaining),
          "X-RateLimit-Reset":     String(reset),
          "Retry-After":           String(Math.ceil((reset - Date.now()) / 1000)),
        },
      }
    );
  }
  return null;
}
