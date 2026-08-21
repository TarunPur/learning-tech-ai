import { describe, expect, it } from "vitest";
import { evaluateB4 } from "./b4";

const shortGood =
  "Hi [name] — you asked to see pricing once we shipped the new plan; it's live. Would a 15-minute call Thursday work? Happy to send the deck first if that's easier. Let me know what works.";

describe("evaluateB4", () => {
  it("passes a ~40-word one-ask message", () => {
    const text =
      "Hi [name], the pricing page you asked about is live now. Would a quick 15-minute call this week work to walk through it together? Let me know what suits you.";
    const result = evaluateB4(text);
    expect(result.word_count).toBeLessThan(50);
    expect(result.pass).toBe(true);
  });

  it("fails a 200-word four-paragraph message on length", () => {
    const paragraph =
      "I hope this message finds you well and that things have been going smoothly on your end since we last spoke about the project. ";
    const text = (paragraph + "\n\n").repeat(8) + "Would you be free for a call?";
    const result = evaluateB4(text);
    expect(result.word_count).toBeGreaterThan(150);
    expect(result.pass).toBe(false);
    expect(result.why).toMatch(/long/i);
  });

  it("returns metrics for a well-formed short message", () => {
    const result = evaluateB4(shortGood);
    expect(result.sentence_count).toBeGreaterThan(0);
    expect(result.reading_level).toBeGreaterThanOrEqual(0);
  });
});
