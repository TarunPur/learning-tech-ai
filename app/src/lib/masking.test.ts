import { describe, expect, it } from "vitest";
import {
  mask,
  unmask,
  maskName,
  unmaskName,
  extractIdentifiers,
  buildMaskTokens,
  maskAllPII,
  scrubGenericPII,
  looksUnmasked,
  firstName,
} from "./masking";

describe("masking", () => {
  it("masks a name inside a sentence", () => {
    expect(maskName("Hi Priya, following up on our chat.", "Priya")).toBe(
      "Hi [name], following up on our chat."
    );
  });

  it("masks multiple occurrences", () => {
    expect(maskName("Priya asked, so I'm telling Priya now.", "Priya")).toBe(
      "[name] asked, so I'm telling [name] now."
    );
  });

  it("is case-insensitive but word-boundary safe", () => {
    expect(maskName("priya and Priyanka are different", "Priya")).toBe(
      "[name] and Priyanka are different"
    );
  });

  it("is a no-op when the token is empty", () => {
    expect(maskName("Hello there", "")).toBe("Hello there");
    expect(mask("Hello there", [{ value: "  ", placeholder: "[x]" }])).toBe("Hello there");
  });

  it("unmask reverses mask", () => {
    const masked = maskName("Hi Priya, thanks!", "Priya");
    expect(unmaskName(masked, "Priya")).toBe("Hi Priya, thanks!");
  });

  it("masks multiple tokens at once", () => {
    const tokens = [
      { value: "Priya", placeholder: "[name]" },
      { value: "Acme", placeholder: "[company]" },
    ];
    expect(mask("Priya works at Acme.", tokens)).toBe("[name] works at [company].");
    expect(unmask("[name] works at [company].", tokens)).toBe("Priya works at Acme.");
  });
});

// PRIV-001 regression coverage: the old firstName()/maskName() combo only
// caught /\b[A-Z][a-z]+\b/ — lowercase, ALL-CAPS, accented, and surnamed
// recipients all sailed through unmasked. These pin the fix.
describe("extractIdentifiers (PRIV-001)", () => {
  it("extracts a lowercase name", () => {
    expect(extractIdentifiers("priya, a marketing lead").name).toBe("priya");
  });

  it("extracts an ALL-CAPS name", () => {
    expect(extractIdentifiers("PRIYA SHARMA who leads growth").name).toBe("PRIYA SHARMA");
  });

  it("extracts an accented name", () => {
    expect(extractIdentifiers("Renée, our contact at the expo").name).toBe("Renée");
  });

  it("extracts a company after 'at'", () => {
    const { company } = extractIdentifiers("Priya Sharma, a marketing lead at Acme Corp");
    expect(company).toBe("Acme Corp");
  });

  it("extracts a company after 'from'", () => {
    const { company } = extractIdentifiers("Arjun from Initech who emailed last week");
    expect(company).toBe("Initech");
  });

  it("returns empty identifiers for blank input", () => {
    expect(extractIdentifiers("   ")).toEqual({ name: "", company: null });
  });
});

describe("buildMaskTokens + maskAllPII (PRIV-001)", () => {
  it("masks a lowercase name that the old regex missed", () => {
    const tokens = buildMaskTokens("priya, a marketing lead at acme");
    const masked = maskAllPII("Hi priya, following up on our chat with acme.", tokens);
    expect(masked).not.toMatch(/priya/i);
    expect(masked).not.toMatch(/acme/i);
    expect(masked).toContain("[name]");
  });

  it("scrubs an email address anywhere in the text, not just the who field", () => {
    const tokens = buildMaskTokens("Priya, a lead");
    const masked = maskAllPII("Reply to me at tarun171093@gmail.com by Friday.", tokens);
    expect(masked).not.toContain("tarun171093@gmail.com");
    expect(masked).toContain("[email]");
  });

  it("scrubs a phone number anywhere in the text", () => {
    const tokens = buildMaskTokens("Priya, a lead");
    const masked = maskAllPII("Call me on 9876543210 if easier.", tokens);
    expect(masked).not.toContain("9876543210");
    expect(masked).toContain("[phone]");
  });

  it("does not scrub ordinary numbers that aren't phone-length", () => {
    const masked = scrubGenericPII("Would 15-minute call at 3pm work? That's 125 words.");
    expect(masked).toBe("Would 15-minute call at 3pm work? That's 125 words.");
  });
});

describe("looksUnmasked (server-side PII guard)", () => {
  it("flags an email address", () => {
    expect(looksUnmasked("contact me at a@b.com")).toBe(true);
  });

  it("flags a 10-digit phone number", () => {
    expect(looksUnmasked("call 9876543210")).toBe(true);
  });

  it("does not flag ordinary masked outreach text", () => {
    expect(looksUnmasked("Hi [name], following up on our call at [company].")).toBe(false);
  });

  // PRIV-001 (round 5): a company mentioned via "at/from/with X" that
  // survived unmasked is the exact structural gap buildMaskTokens() is
  // supposed to close — catching it here is a real, narrow defense-in-depth
  // check rather than a blanket capitalized-word scan.
  it("flags an unmasked company after 'at'", () => {
    expect(looksUnmasked("following up on our call at Acme Corp")).toBe(true);
  });

  it("flags an unmasked company after 'from'", () => {
    expect(looksUnmasked("reaching out from Initech")).toBe(true);
  });

  it("flags an unmasked company after 'with'", () => {
    expect(looksUnmasked("a quick call with Google's team")).toBe(true);
  });

  it("does not flag 'at/from/with' followed by a lowercase word", () => {
    expect(looksUnmasked("we spoke at the expo and she asked me to follow up")).toBe(false);
  });

  it("does not flag 'at/from/with' followed by an existing placeholder", () => {
    expect(looksUnmasked("a follow-up from [company] about the demo")).toBe(false);
  });
});

describe("firstName", () => {
  it("preserves the case the user typed instead of forcing a capital", () => {
    expect(firstName("priya, a marketing lead")).toBe("priya");
  });

  it("falls back to 'there' for empty input", () => {
    expect(firstName("")).toBe("there");
  });
});
