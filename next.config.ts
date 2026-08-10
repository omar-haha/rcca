import type { NextConfig } from 'next'

// `output: 'standalone'` is only for the Dockerfile-based self-hosted build
// (see Dockerfile, which copies .next/standalone into the runner image) —
// set only when DOCKER_BUILD is passed as a build arg there. Left on
// unconditionally, Vercel deploys with zero routable output (every request
// 404s, including static routes) since it does its own serverless
// packaging and doesn't expect a standalone build.
const config: NextConfig = {
  ...(process.env.DOCKER_BUILD ? { output: 'standalone' as const } : {}),
}

export default config
