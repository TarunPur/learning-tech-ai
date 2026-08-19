# NEXT SESSION — resume here

> **Purpose:** read this whole file at the start of a new session to resume exactly where the last one
> left off. **Maintenance rule (CLAUDE.md): update this file at the END of every session.**
>
> **Last updated:** 2026-08-20 — end of the "lock baseline → NOD rebrand → Screen 2 build" session.

---

I'm continuing my "Learning Tech & AI" v1 product at `~/Desktop/Learning Tech AI`
(private GitHub `TarunPur/learning-tech-ai`, branch `main`).

## Read order at session start
`README.md` → `PRODUCT.md` → `v1ProductDetailing.md` → `v1PRD.md` → `DESIGN.md`.
Don't relitigate the 10 locked decisions in `v1ProductDetailing.md`.
Design work uses the **`impeccable`** skill. Preview mockups: `cd design/mockups && python3 -m http.server 8734`,
then open the files (the server does NOT persist across sessions — restart it).
**Chrome viewport note:** in the last session the extension rendered at a fixed ~614px until the window was
resized + the page reloaded, after which it captured the true 1456px desktop. If you're stuck at a narrow width,
resize the window and reload. Desktop grids (≥820/940/1040px) otherwise verify statically from CSS.

## Where we are now — DESIGN PHASE, baseline LOCKED + committed
Research → product detailing (locked) → PRD (done) are complete. The v1 visual world is **"The Calm Correspondent"**
(warm paper #F6F5F1 · ink #1A1A1A · one Signal Blue #2F6FE0, **NO green** · Spectral serif for statements ·
Hanken Grotesk for UI · square floating cards on soft ambient shadow).

**Brand is DECIDED:** name **NOD** (the honest "yes — send it"; the message+check logo *is* the nod).
Tagline **"Know it's good before you send — and get sharper each time."** (owner's first draft ended "…and then
learn" — swapped because **"learn" is a banned UI word** and the positioning is *sell utility, not learning*).

**Locked baseline (committed `484b5c2`, then rebranded to NOD):**
- `design/mockups/landing-editorial-blue-v2.html` — marketing landing. Action-oriented use-cases band +
  honest **experts/credibility** section citing the REAL §16 sources (Gong 304K · Boomerang 40M/36% ·
  Backlinko 12M + Woodpecker 20M/+32.7% · Lavender · Josh Braun 4-T). No banned words; "get a reply" appears only
  in the honest disclaimer. The `.impeccable/config.json` marquee + buzzword-fixture ignores are scoped to the
  OLDER `landing-editorial-blue.html`; re-scope to `-v2` if the detector re-flags it.
- `design/mockups/recognition-editorial-blue-v3.html` — Screen 1 (post-login entry). Four situation cards
  reworked to **scenario → benefit → persistent CTA** (index numbers removed). Native `<button>`s (keyboard-safe).

**Shared design system:** `design/mockups/shared/system.css` — tokens + reusable primitives (stage, mark, field,
buttons, motion), seeded to match the baseline. **NEW screens link this file** so a shared-token change is a
one-line edit; the two locked files stay self-contained frozen snapshots (relink only when the landing is next
reworked). This is the answer to "keep future landing reworks feasible."

**Screen 2 built:** `design/mockups/personalize.html` — conversational 3-field intake (who / the ask / optional
context) with the **silent auto-mask** demonstrated (design call: detect-and-mask + a calm inline note
"Kept private — <name> masked before anything's saved," never a blocking gate); the primary "Shape the draft"
pill gates on the two required fields. Detector flagged a `flat-type-hierarchy` false positive here (real
hierarchy lives in the linked system.css it can't follow) — suppressed file-scoped in config with an honest
reason. Expect the SAME false positive on screens 3–6 (they also link system.css); owner has NOT yet decided
file-ignore-each vs a rule-level ignore for the mockups folder.

## 🔨 PICK UP NEXT — build screens 3–6 (design calls already stated, owner to react)
- **Screen 3 · Guided draft (fading scaffold):** draft builds in visible "moves" with short *why* notes; hand the
  user 1–2 decisions (ask wording, tone). **Aha-staging call:** show reasoning inline for ownership; do NOT
  force-capture a rough attempt first (adds friction; people stall).
- **Screen 4 · Feedback (not a score):** 1–2 concrete fixes at a time, each pointing at the *actual quoted words*
  in the draft, framed as an edit the user makes. Never a score/checklist/X-of-5. Blue = "meets the standard".
- **Screen 5 · Artifact + portfolio:** finished message saved + a quiet running history.
- **Screen 6 · Return nudge:** one outcome-tied nudge → unaided re-attempt.
Resolve the remaining §24 decisions (rubric-as-feedback UI on Screen 4) as you build.

## Open decisions (carry forward)
- **DESIGN.md is STALE** — it still documents the OLD Screen 1 (numbered/staggered cards, "e.g." lead-ins) and
  name "Outreach Bench". Refresh it to the locked v3 + NOD when convenient.
- **Detector false positive** on new screens: file-ignore each vs one rule-level ignore for `design/mockups/`
  (rule-level needs owner's explicit OK).
- **Mobile** treatment for all surfaces — CSS is responsive but not verified on a real device.
- **DO NOT** start ERD / architecture / build milestones until design is finalized. **DO NOT** set §9 numeric
  targets yet.

## How the owner likes to work
- Own the aesthetic/copy calls, but **ground them in the users / pain points / PRD**, not a metaphor. When
  comparing, **build the variations** so they can be seen. Prefers the **live localhost link** over screenshots.
- **Incremental commits** (many small); **never commit/push without explicit OK**; never commit raw `.xlsx` (PII).
- Guardrails in ALL copy: **sell utility, never "learning"**; **banned UI words**
  (course/lesson/learn/grade/score/quiz/streak); **claim quality, never outcome** (never "get a reply"); **no
  fabricated testimonials/metrics/logos**; **one blue, no green**. English-only for v1. Desktop-primary for now.

---
*Start by reading the 5 docs + this file, then `git status`. Then build screens 3–6 on the calls above (or adjust
with the owner first), and — when convenient — refresh DESIGN.md to the locked v3 + NOD.*
