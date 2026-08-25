import { PostHog } from "posthog-node";

// flushAt:1 / flushInterval:0 — Vercel serverless functions can freeze right
// after the response is sent, so batching (the default) risks losing events.
// Send immediately instead of trading correctness for throughput; volume is
// low enough in v1 that this is the right tradeoff.
export const posthogServer = process.env.NEXT_PUBLIC_POSTHOG_KEY
  ? new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com",
      flushAt: 1,
      flushInterval: 0,
    })
  : null;
