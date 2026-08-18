# Project instructions — Learning Tech & AI (v1)

## Session handoff — DO THIS AT THE END OF EVERY WORKING SESSION
Before wrapping up — when the user signals they're done, asks to save state, or the session
is clearly ending — **UPDATE `NEXT-SESSION.md`** so the successor session resumes from exactly
where this one left off. Refresh: the "Where we are" state, what changed this session, the
exact next thing to pick up, and any open decisions. Keep it in sync with `README.md` and
`DESIGN.md`. If work was committed, note it. Still: **do not commit or push without the
user's explicit OK.**

## Read order at session start
`README.md` → `PRODUCT.md` → `v1ProductDetailing.md` → `v1PRD.md` → `DESIGN.md`.
Don't relitigate the 10 locked decisions in `v1ProductDetailing.md`.
Note: `design.md` == `DESIGN.md` (same file on macOS's case-insensitive filesystem).

## Guardrails
- **Never commit the raw survey `.xlsx` files** — they contain PII and are gitignored.
- **Incremental commits** (small, per logical chunk); never commit/push without approval.
- Design work uses the `impeccable` skill. **Own the aesthetic calls but ground them in the
  users / pain points / PRD**, not in a metaphor; when comparing options, **build the
  variations** so they can be seen, don't just describe them.
- Keep the PRD's confidence tags (🟢 verified / 🟡 secondary / 🔵 hypothesis).
- English-only for v1. Desktop-primary for the design, for now.
