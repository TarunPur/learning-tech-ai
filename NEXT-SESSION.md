# NEXT SESSION — resume here

> **Purpose:** paste this whole file (or read it) at the start of a new session to resume
> exactly where the last one left off. **Maintenance rule: update this file at the END of
> every working session** (see `CLAUDE.md`) — refresh "Where we are", "Pick up next", and
> "Open decisions" so the next session starts forward, not from scratch.
>
> **Last updated:** 2026-08-19 — end of the Screen-1 design session.

---

I'm continuing work on my "Learning Tech & AI" v1 product at `~/Desktop/Learning Tech AI`
(private GitHub repo `TarunPur/learning-tech-ai`, branch `main` — everything is committed & pushed).

## Read first, in this order (don't skip; don't re-decide what's locked)
1. `README.md` — the seam: current state + next action + the 10 locked decisions
2. `PRODUCT.md` — durable product context (users, purpose, positioning, the 6-stage loop, the B1–B5 rubric, banned UI words, voice)
3. `v1ProductDetailing.md` — the 10 **LOCKED** product decisions (settled; don't relitigate)
4. `v1PRD.md` — the living PRD (substantially done; §16 rubric grounded/hardened)
5. `DESIGN.md` — the design system + Screen 1 spec + a "Status & Roadmap" section
   - ⚠️ On macOS (case-insensitive FS) `DESIGN.md` and `design.md` are the **same file** (tracked in git as `design.md`). Screen mockups live in `design/mockups/`.

## Where we are
Research → product detailing (locked) → PRD (done) are complete. **Now in the DESIGN PHASE**, built with the `impeccable` skill.

**Screen 1 (recognition home)** has a committed **direction** but is **WIP / NOT signed off**:
- Visual system: **"The Calm Correspondent"** — editorial, calm, premium.
- Warm off-white canvas + near-black ink + **ONE blue accent (#2F6FE0). NO GREEN** (green reads as "correct/pass" = grading, which the product must never do — Decision 8). Blue also doubles as the "verified / expert-standard" signal.
- Type: **Spectral** (serif) for statements + card titles; **Hanken Grotesk** (sans) for UI/body.
- Layout: two-column editorial — left statement (serif headline + personal sub + scoped "something else" intake); right = **staggered numbered recognition cards (01–04)**.
- **Desktop-primary for now** (owner's call).
- Authoritative mockup: `design/mockups/recognition-editorial-blue.html`
- Open Qs (see `DESIGN.md` → Status & Roadmap): does the serif feel too formal for a low-confidence non-tech user; should the scoped input demote to a quieter link (blank-box risk); reintroduce a small "expert-standard" credibility cue on entry; mobile treatment; product name is a placeholder ("Outreach Bench").

## Pick up next (in order)
- **A. Finalize / lock Screen 1.** Owner decides final tweaks — show, don't assume.
- **B. Design screens 2–6:** Personalize (+ silent auto-mask) → guided fading-scaffold draft → feedback-not-a-score → artifact/portfolio → return nudge / unaided attempt.
- **C. Resolve the three §24 design-owned decisions** (as part of 2–6): auto-mask mechanism (detect-and-mask vs guide-abstract); Aha-staging (rough→shaped contrast); how the rubric surfaces as feedback in the UI (1–2 fixes, point at the actual draft, never a score).
- **DO NOT** start ERD / technical architecture / build milestones until design is finalised.
- **DO NOT** set the numeric success targets (§9) yet.

## How the owner likes to work
- Use the `impeccable` skill for design. To preview a mockup: serve `design/mockups/` over http (`python3 -m http.server`) and open the file / screenshot via Chrome. **The Chrome screenshot tool pins output at 1456px** regardless of window size — you CANNOT capture a true mobile viewport; flag it, don't fake it.
- **Own the aesthetic calls** (theme/palette/type) outright, but **ground them in the users, their pain points, and the PRD — not in a metaphor.** When asked to compare, **build the variations** so they can be seen; don't just describe.
- Keep the PRD's confidence tags (🟢 verified / 🟡 secondary / 🔵 hypothesis); don't invent numbers the data doesn't support.
- **Incremental commits** (many small). **Never commit or push without explicit OK.** **Never commit the raw survey `.xlsx` files** (PII — gitignored).
- English-only for v1.

## Open decisions (carry forward)
- Screen 1: serif warmth vs. low-confidence user · scoped-input demote to link · credibility cue on entry · mobile · placeholder name.
- Rejected worlds (do not revisit): heritage brass/instrument; friendly green-anchored.

---
*Start by reading the 5 docs, then tell the owner in your own words what Screen 1 is and what's still open — then finalize it before moving to Screen 2.*
