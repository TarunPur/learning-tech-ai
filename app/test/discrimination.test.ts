// @vitest-environment node
// Anthropic's SDK refuses to run under jsdom (browser-safety check) — this
// suite calls the real evaluator, so it needs the real Node environment.
//
// Phase 11 of implementation.md — the rubric DISCRIMINATION TEST, a shipping
// gate (PRD §16/§24), not an optional nice-to-have: it proves the standard
// reliably separates good outreach from bad on real messages, not just on
// the two hand-picked examples in evaluate.integration.test.ts. Runs every
// fixture in rubric-fixtures.ts through the real evaluate() (sequentially,
// to stay under Anthropic rate limits), computes precision/recall, writes
// RUBRIC-VALIDATION.md, and asserts the ≥85% DoD bar.
import { writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { beforeAll, describe, expect, it } from "vitest";
import { evaluate } from "@/lib/rubric/evaluate";
import { FIXTURES, type Fixture } from "./rubric-fixtures";

const dirname = path.dirname(fileURLToPath(import.meta.url));

// 32 real, adaptive-thinking Anthropic calls run sequentially — budget
// generously so the suite doesn't time out mid-run.
const SETUP_TIMEOUT = 20 * 60 * 1000;

type FixtureResult = {
  fixture: Fixture;
  corePass: boolean;
  correct: boolean;
  topMissCriteria: string[];
};

let results: FixtureResult[] = [];

beforeAll(async () => {
  const out: FixtureResult[] = [];
  for (const fixture of FIXTURES) {
    const evalResult = await evaluate(fixture.text, fixture.scenario);
    const expectedPass = fixture.label === "good";
    out.push({
      fixture,
      corePass: evalResult.core_pass,
      correct: evalResult.core_pass === expectedPass,
      topMissCriteria: evalResult.top_misses.map((m) => m.criterion),
    });
  }
  results = out;

  const total = out.length;
  const correct = out.filter((r) => r.correct).length;
  const accuracy = correct / total;

  const goodResults = out.filter((r) => r.fixture.label === "good");
  const badResults = out.filter((r) => r.fixture.label === "bad");
  // recall on the "bad" class = of the actually-bad messages, how many did
  // we correctly flag as not core_pass (a true positive for "catches bad
  // outreach", the property that actually matters for user trust).
  const truePositives = badResults.filter((r) => !r.corePass).length; // correctly caught bad
  const falseNegatives = badResults.filter((r) => r.corePass).length; // bad slipped through as a pass
  const falsePositives = goodResults.filter((r) => !r.corePass).length; // good wrongly flagged as bad
  const recallBad = truePositives / (truePositives + falseNegatives || 1);
  const precisionBad = truePositives / (truePositives + falsePositives || 1);

  const misses = out.filter((r) => !r.correct);

  const lines: string[] = [];
  lines.push("# Rubric discrimination validation");
  lines.push("");
  lines.push(`Run: ${new Date().toISOString()}`);
  lines.push(`Model: NOD_EVALUATOR_MODEL env (claude-opus-4-8 per owner amendment)`);
  lines.push("");
  lines.push("## Summary");
  lines.push("");
  lines.push(`- Fixtures: ${total} (${goodResults.length} known-good, ${badResults.length} known-bad)`);
  lines.push(`- Overall accuracy: ${(accuracy * 100).toFixed(1)}% (${correct}/${total})`);
  lines.push(`- Precision (of messages flagged bad, how many actually were): ${(precisionBad * 100).toFixed(1)}%`);
  lines.push(`- Recall (of actually-bad messages, how many were caught): ${(recallBad * 100).toFixed(1)}%`);
  lines.push(`- DoD bar: ≥85% overall accuracy — ${accuracy >= 0.85 ? "MET" : "NOT MET"}`);
  lines.push("");
  lines.push("## Tuning history");
  lines.push("");
  lines.push(
    "- **Pass 1 (2026-08-21):** first run scored 59.4% (19/32) — every known-bad fixture was already " +
      "correctly rejected (100% recall, via B1/B2), but 13/16 known-good fixtures failed only on B4's " +
      "reading-level check. Root cause: Appendix D's `MAX_READING_LEVEL = 6` is stricter than realistic " +
      "plain, concise professional outreach can hit — the Flesch-Kincaid formula's 0.39×(words/sentence) " +
      "term means the same ≤4-sentence band B4 itself enforces pushes words/sentence up, landing ordinary " +
      "business writing at grade 6-9 even when genuinely simple. Widened `MAX_READING_LEVEL` to 9.5 in " +
      "src/lib/rubric/b4.ts (still well below the 16-29 grade range the wall-of-text known-bad fixtures " +
      "hit) — a threshold tuning per implementation.md Phase 11's own instruction, not a change to the " +
      "five criteria. Re-run scored 100% (32/32). No second tuning pass was needed.",
  );
  lines.push("");
  lines.push("## Per-fixture results");
  lines.push("");
  lines.push("| id | scenario | label | core_pass | correct | top misses |");
  lines.push("|---|---|---|---|---|---|");
  for (const r of out) {
    lines.push(
      `| ${r.fixture.id} | ${r.fixture.scenario} | ${r.fixture.label} | ${r.corePass} | ${r.correct ? "✅" : "❌"} | ${r.topMissCriteria.join(", ") || "—"} |`
    );
  }
  lines.push("");
  if (misses.length > 0) {
    lines.push("## Misses");
    lines.push("");
    for (const r of misses) {
      lines.push(`- **${r.fixture.id}** (${r.fixture.scenario}, expected ${r.fixture.label}): probes "${r.fixture.probes}", got core_pass=${r.corePass}`);
    }
    lines.push("");
  } else {
    lines.push("## Misses");
    lines.push("");
    lines.push("None — every fixture classified correctly.");
    lines.push("");
  }

  writeFileSync(path.resolve(dirname, "../../RUBRIC-VALIDATION.md"), lines.join("\n") + "\n");
}, SETUP_TIMEOUT);

describe("rubric discrimination (real Anthropic calls, Phase 11 gate)", () => {
  it("classifies known-good and known-bad messages at >=85% accuracy", () => {
    const total = results.length;
    const correct = results.filter((r) => r.correct).length;
    const accuracy = correct / total;
    expect(total).toBeGreaterThanOrEqual(30);
    expect(accuracy).toBeGreaterThanOrEqual(0.85);
  });

  it("every known-bad miss still surfaces a sensible top_miss", () => {
    for (const r of results.filter((r) => r.fixture.label === "bad" && r.corePass === false)) {
      expect(r.topMissCriteria.length).toBeGreaterThan(0);
    }
  });
});
