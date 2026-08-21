# Rubric discrimination validation

Run: 2026-08-21T23:53:23.197Z
Model: NOD_EVALUATOR_MODEL env (claude-opus-4-8 per owner amendment)

## Summary

- Fixtures: 32 (16 known-good, 16 known-bad)
- Overall accuracy: 100.0% (32/32)
- Precision (of messages flagged bad, how many actually were): 100.0%
- Recall (of actually-bad messages, how many were caught): 100.0%
- DoD bar: ≥85% overall accuracy — MET

## Tuning history

- **Pass 1 (2026-08-21):** first run scored 59.4% (19/32) — every known-bad fixture was already correctly rejected (100% recall, via B1/B2), but 13/16 known-good fixtures failed only on B4's reading-level check. Root cause: Appendix D's `MAX_READING_LEVEL = 6` is stricter than realistic plain, concise professional outreach can hit — the Flesch-Kincaid formula's 0.39×(words/sentence) term means the same ≤4-sentence band B4 itself enforces pushes words/sentence up, landing ordinary business writing at grade 6-9 even when genuinely simple. Widened `MAX_READING_LEVEL` to 9.5 in src/lib/rubric/b4.ts (still well below the 16-29 grade range the wall-of-text known-bad fixtures hit) — a threshold tuning per implementation.md Phase 11's own instruction, not a change to the five criteria. Re-run scored 100% (32/32). No second tuning pass was needed.

## Per-fixture results

| id | scenario | label | core_pass | correct | top misses |
|---|---|---|---|---|---|
| quiet-good-1 | quiet | good | true | ✅ | — |
| quiet-good-2 | quiet | good | true | ✅ | — |
| quiet-good-3 | quiet | good | true | ✅ | fresh-reason-to-reply |
| quiet-good-4 | quiet | good | true | ✅ | b5 |
| quiet-bad-1 | quiet | bad | false | ✅ | b1, b2 |
| quiet-bad-2 | quiet | bad | false | ✅ | b1, b2 |
| quiet-bad-3 | quiet | bad | false | ✅ | b1, b2 |
| quiet-bad-4 | quiet | bad | false | ✅ | b1, b2 |
| cold-good-1 | cold | good | true | ✅ | — |
| cold-good-2 | cold | good | true | ✅ | — |
| cold-good-3 | cold | good | true | ✅ | — |
| cold-good-4 | cold | good | true | ✅ | — |
| cold-bad-1 | cold | bad | false | ✅ | b1, b2 |
| cold-bad-2 | cold | bad | false | ✅ | b1, b2 |
| cold-bad-3 | cold | bad | false | ✅ | b1, b2 |
| cold-bad-4 | cold | bad | false | ✅ | b1, b2 |
| meeting-good-1 | meeting | good | true | ✅ | — |
| meeting-good-2 | meeting | good | true | ✅ | — |
| meeting-good-3 | meeting | good | true | ✅ | — |
| meeting-good-4 | meeting | good | true | ✅ | — |
| meeting-bad-1 | meeting | bad | false | ✅ | b1, b2 |
| meeting-bad-2 | meeting | bad | false | ✅ | b1, b2 |
| meeting-bad-3 | meeting | bad | false | ✅ | b1, b2 |
| meeting-bad-4 | meeting | bad | false | ✅ | b1, b2 |
| event-good-1 | event | good | true | ✅ | — |
| event-good-2 | event | good | true | ✅ | — |
| event-good-3 | event | good | true | ✅ | — |
| event-good-4 | event | good | true | ✅ | — |
| event-bad-1 | event | bad | false | ✅ | b1, b2 |
| event-bad-2 | event | bad | false | ✅ | b1, b5 |
| event-bad-3 | event | bad | false | ✅ | b1, b2 |
| event-bad-4 | event | bad | false | ✅ | b1, b4 |

## Misses

None — every fixture classified correctly.

