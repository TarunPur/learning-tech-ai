# NEXT SESSION — resume here

> **Purpose:** read this whole file at the start of a new session to resume exactly where the last one
> left off. **Maintenance rule (CLAUDE.md): update this file at the END of every session.**
>
> **Last updated:** 2026-08-20 — end of the "landing-page rework from Landing page.docx" session (next agent resumes ~4h later).

---

I'm continuing my "Learning Tech & AI" v1 product at `~/Desktop/Learning Tech AI`
(private GitHub `TarunPur/learning-tech-ai`, branch `main`).

## ⚠️ FIRST — landing went through THREE rounds; NOW COMMITTED (this block below is partly stale — trust git log)
All six v1 screens + `DESIGN.md` were committed at `ceb1256`. Since then the landing (`design/mockups/landing-editorial-blue-v2.html`)
had THREE more rounds, **now committed** (branch `main`, NOT pushed): (1) first `Landing page.docx` brief — blue Sign-in pill,
the interactive ChatGPT panel, the "uniquely powerful" flow + sources marquee; (2) second `Learning Tech AI (1).docx` brief —
new hero copy + animated NOD motif (grid rails + shaping bars), **removed** the use-cases band + both objection sections + the
hero demo card, bolded the ChatGPT sub + highlighted the standard chip, **converted the demo to AUTO-PLAY** (3-step progress bar,
loops, reduced-motion-safe — the draggable version described below is SUPERSEDED), new task-based demo copy, removed the
uniquely-powerful numbering + brighter cards + bold source line, new "25% of primary respondents" voices copy, reversed both
marquees to right-to-left, rebuilt the footer (multi-column, no Products, big NOD wordmark); (3) an `/impeccable` audit +
consistency pass — **normalized all landing section paddings to one 100px rhythm** (were 120/148/132, uneven), **top-aligned all
app-screen stages** (`system.css` + `recognition-v3` now `align-content:start`, mark at a consistent 56px across every screen —
was drifting 135–196px), and ungapped the demo takeaway line. **CACHE NOTE:** `system.css` is browser-cached — hard-refresh
(Cmd+Shift+R) or restart the `:8734` server to see the top-alignment. **NOT pushed.** The detailed bullets below are from round 1
and are partly superseded — check `git log` for the true state. **Run `git status` first.**
1. **Nav Sign-in** → now a solid **blue pill** (`.nav .btn.nav-cta`), sized subordinate to the hero CTA.
2. **"Then why not just use ChatGPT?"** section (`.section.tint`) — copy simplified; the old email/checks `.ba-demo` visual
   **removed** (its dead CSS/JS cleaned); replaced by an interactive **Before / In-between / After** panel (`.transform-demo`):
   ONE draggable handle over 3 zones, opacity **crossfade** (no clip-path → no clipping/distortion), 3 stacked scenes in a
   `display:grid` cell (no layout shift), `role="slider"` + arrow-key + label-click, reduced-motion instant-switch. VERIFIED:
   BEFORE + AFTER via label-click work (aria/counter/fill/opacity all correct).
3. **Authority section** (`.section.auth`) — heading → **"What makes NOD uniquely powerful"**; the 4 `.ev-card`s replaced by a
   3-step **`.power-flow`** (01/02/03 with arrow joins); below it a right-to-left **sources marquee** (`.logos.marquee`,
   `mqLeft` keyframe) of **monochrome wordmarks** (Gong/Boomerang/Backlinko/Woodpecker/Lavender + Josh Braun as an italic
   name-chip) under an honest "The research the standard is built on" label. Point-3 copy reworded to drop banned word "learn".

**Constraints honored:** NOD colors + typography only (the docx's gold/dark/grain suggestions were explicitly NOT applied);
no fabricated people/photos. **Owner chose "real logos, I source"** — realized as monochrome wordmarks because official brand
SVGs can't be reliably/legally embedded; flag logo/endorsement RIGHTS before any public launch. Nothing pushed.

**REMAINING before commit (finish these, then ask owner for explicit commit OK — never commit without it):**
- Finish visual QA: the **IN-BETWEEN** scene, the settled **power-flow** panels, the **logo marquee scrolling**, and a real
  **pointer-drag** of the handle (only BEFORE/AFTER label-clicks were eyeballed).
- Triage the **impeccable Stop-hook** findings on the landing (marquee/buzzword ignores already cover `-v2`; add narrow ignores
  only for confirmed false positives). CSSOM mobile check (tool can't render <~1456px — flag, don't fake).
- Then get **explicit OK** and commit (the diff is large — it replaces the old demo).

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
