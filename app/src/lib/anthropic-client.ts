// OPS-001: one shared Anthropic client with an explicit timeout and bounded
// retry, instead of each of generate.ts/rewrite.ts/llm.ts constructing its
// own `new Anthropic()` with the SDK defaults. A rate limiter/circuit
// breaker in front of this is a real next step but needs either a paid
// limiter service or a Supabase-backed token-bucket table — an
// infrastructure/cost call left to the owner, not made silently here.
import Anthropic from "@anthropic-ai/sdk";

let client: Anthropic | null = null;

export function getAnthropicClient(): Anthropic {
  if (!client) {
    client = new Anthropic({
      timeout: 30_000,
      maxRetries: 2,
    });
  }
  return client;
}
