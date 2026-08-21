// @vitest-environment node
// Anthropic's SDK refuses to run under jsdom (browser-safety check) — this
// module is server-only, so it needs the real Node environment.
import { describe, expect, it } from "vitest";
import { evaluate } from "./evaluate";
import { rewriteDraft } from "./rewrite";

// Real calls to the Anthropic API — this is the integration test
// implementation.md Phase 5 asks for (known-bad / known-good / rewrite).
// Longer timeout: each case involves adaptive-thinking model calls.
const TIMEOUT = 60000;

const KNOWN_BAD =
  "Hi [name], I hope this finds you well, just wanted to reach out and circle back, let me know your thoughts, also can we set up a call and can you review the doc";

const KNOWN_GOOD =
  "Hi [name] — you asked to see pricing once we shipped the new plan; it's live. Would a 15-minute call Thursday work?";

describe("evaluate (hybrid rubric, real Anthropic calls)", () => {
  it(
    "fails a known-bad message with real quotes pointing at the draft",
    async () => {
      const result = await evaluate(KNOWN_BAD, "meeting");
      expect(result.core_pass).toBe(false);
      expect(result.top_misses.length).toBeGreaterThan(0);
      for (const miss of result.top_misses) {
        if (miss.quote) {
          expect(KNOWN_BAD.toLowerCase()).toContain(miss.quote.toLowerCase().slice(0, 15));
        }
      }
      // the multi-ask, soft-opener draft should fail at least one core criterion
      expect(result.criteria.b1.pass && result.criteria.b2.pass).toBe(false);
    },
    TIMEOUT
  );

  it(
    "passes a known-good message",
    async () => {
      const result = await evaluate(KNOWN_GOOD, "meeting");
      expect(result.core_pass).toBe(true);
    },
    TIMEOUT
  );
});

describe("rewriteDraft (real Anthropic calls)", () => {
  it(
    "produces a rewrite that passes evaluate",
    async () => {
      const { corePass } = await rewriteDraft(KNOWN_BAD, "meeting");
      expect(corePass).toBe(true);
    },
    TIMEOUT * 2
  );
});
