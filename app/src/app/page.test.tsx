import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./page";

// jsdom doesn't implement matchMedia — Home's reveal-on-scroll effect reads
// prefers-reduced-motion on mount and would otherwise throw.
beforeAll(() => {
  window.matchMedia =
    window.matchMedia ||
    ((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }));
});

afterEach(() => {
  document.body.innerHTML = "";
});

// UX-004 (Round 5): the FAQ accordion accumulated open answers instead of
// keeping exactly one open, contradicting the locked mockup's stated intent
// ("expand one answer at a time on click").
describe("landing FAQ accordion", () => {
  it("keeps exactly one answer open at a time", () => {
    render(<Home />);

    const questions = screen.getAllByRole("button", { name: /.+/ }).filter((b) => b.className === "faq-q");
    expect(questions.length).toBeGreaterThan(1);
    const [first, second] = questions;
    if (!first || !second) throw new Error("expected at least 2 FAQ questions");

    expect(first).toHaveAttribute("aria-expanded", "true");
    expect(second).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(second);

    expect(first).toHaveAttribute("aria-expanded", "false");
    expect(second).toHaveAttribute("aria-expanded", "true");

    const openItems = questions.filter((q) => q.getAttribute("aria-expanded") === "true");
    expect(openItems).toHaveLength(1);
  });

  it("closes the open answer when it's clicked again", () => {
    render(<Home />);

    const questions = screen.getAllByRole("button", { name: /.+/ }).filter((b) => b.className === "faq-q");
    const [first] = questions;
    if (!first) throw new Error("expected at least 1 FAQ question");
    expect(first).toHaveAttribute("aria-expanded", "true");

    fireEvent.click(first);

    expect(first).toHaveAttribute("aria-expanded", "false");
    expect(questions.every((q) => q.getAttribute("aria-expanded") === "false")).toBe(true);
  });
});
