import { describe, expect, it } from "vitest";
import { mask, unmask, maskName, unmaskName } from "./masking";

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
