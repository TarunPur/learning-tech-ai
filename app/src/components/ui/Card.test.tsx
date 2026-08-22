import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Card } from "./Card";

// Round 4/5 QA (VIS-001): Card silently dropped its own "nod-card" class
// whenever a caller also passed a className, because the prop spread ran
// after the computed className and still carried the original className
// through. This is the component smoke test both rounds asked for, to
// prevent that regressing again.
describe("Card", () => {
  it("keeps the base nod-card class alongside a custom className (div)", () => {
    render(<Card className="nod-primary-path">content</Card>);
    const el = screen.getByText("content");
    expect(el.className).toContain("nod-card");
    expect(el.className).toContain("nod-primary-path");
  });

  it("keeps the base nod-card class alongside a custom className (button)", () => {
    render(
      <Card as="button" className="nod-primary-path">
        content
      </Card>
    );
    const el = screen.getByRole("button");
    expect(el.className).toContain("nod-card");
    expect(el.className).toContain("nod-primary-path");
  });

  it("still renders nod-card with no className at all", () => {
    render(<Card as="button">content</Card>);
    expect(screen.getByRole("button").className).toBe("nod-card");
  });

  it("does not leak a literal 'className' prop onto the DOM node", () => {
    // Regression guard for the exact failure mode: className staying in the
    // spread would previously overwrite the element's className attribute,
    // not add a bogus DOM attribute — this asserts the final className is
    // exactly the expected token set, not the caller's raw value.
    render(
      <Card as="button" className="nod-primary-path">
        content
      </Card>
    );
    expect(screen.getByRole("button").className).toBe("nod-card nod-primary-path");
  });
});
