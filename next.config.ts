import type { NextConfig } from 'next'

// `output: 'standalone'` is only for the Dockerfile-based self-hosted build
// (see Dockerfile, which copies .next/standalone into the runner image) —
// set only when DOCKER_BUILD is passed as a build arg there. Left on
// unconditionally, Vercel deploys with zero routable output (every request
// 404s, including static routes) since it does its own serverless
// packaging and doesn't expect a standalone build.
//
// Belt-and-suspenders: gate on both DOCKER_BUILD being set AND Vercel's own
// VERCEL env var being unset, since relying on DOCKER_BUILD's absence alone
// wasn't enough to stop a standalone build from shipping on Vercel.
const useStandalone = Boolean(process.env.DOCKER_BUILD) && !process.env.VERCEL

const config: NextConfig = {
  ...(useStandalone ? { output: 'standalone' as const } : {}),
}

export default config
