import { describe, expect, it } from "vitest";
import { assertMasked, UnmaskedPayloadError } from "./pii-guard";

// PRIV-001 regression coverage — the server-side half of the masking
// boundary had zero direct tests despite being what every route relies on
// to reject a direct API call that skips client-side masking.
describe("assertMasked", () => {
  it("passes clean, already-masked fields", () => {
    expect(() =>
      assertMasked({
        recipient_masked: "[name]",
        context_masked: "Hi [name], following up on our chat with [company].",
      })
    ).not.toThrow();
  });

  it("throws with the offending field name when an email slips through", () => {
    try {
      assertMasked({ ask: "reply to me at tarun@example.com" });
      expect.unreachable("should have thrown");
    } catch (e) {
      expect(e).toBeInstanceOf(UnmaskedPayloadError);
      expect((e as UnmaskedPayloadError).field).toBe("ask");
    }
  });

  it("throws when a phone number slips through", () => {
    expect(() => assertMasked({ context_masked: "call me on 9876543210" })).toThrow(UnmaskedPayloadError);
  });

  it("ignores null/undefined fields instead of throwing", () => {
    expect(() => assertMasked({ recipient_masked: undefined, ask: null as unknown as undefined })).not.toThrow();
  });

  it("checks every field, not just the first", () => {
    expect(() =>
      assertMasked({
        recipient_masked: "[name]",
        context_masked: "[company]",
        draft_text_masked: "Hi [name], call 9998887776 to confirm.",
      })
    ).toThrow(UnmaskedPayloadError);
  });
});
