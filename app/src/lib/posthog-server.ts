import { PostHog } from "posthog-node";

// Server-side code (unlike instrumentation-client.ts) can read either name —
// prefer the actual Vercel-configured POSTHOG_PROJECT_TOKEN/POSTHOG_HOST,
// fall back to the NEXT_PUBLIC_ names for local dev convenience.
const token = process.env.POSTHOG_PROJECT_TOKEN ?? process.env.NEXT_PUBLIC_POSTHOG_KEY;
const host =
  process.env.POSTHOG_HOST ?? process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

// flushAt:1 / flushInterval:0 — Vercel serverless functions can freeze right
// after the response is sent, so batching (the default) risks losing events.
// Send immediately instead of trading correctness for throughput; volume is
// low enough in v1 that this is the right tradeoff.
export const posthogServer = token
  ? new PostHog(token, { host, flushAt: 1, flushInterval: 0 })
  : null;
