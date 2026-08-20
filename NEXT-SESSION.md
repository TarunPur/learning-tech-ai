# NEXT SESSION — resume here

> Read this whole file first. **Maintenance rule (CLAUDE.md): update this at the END of every session.**
> **Last updated:** 2026-08-20 — end of a long design session (NOD rebrand → mobile → landing reworks → audit → interactive prototype).

I'm continuing my **"Learning Tech & AI" v1** product (brand **NOD**) at `~/Desktop/Learning Tech AI`
(private GitHub `TarunPur/learning-tech-ai`, branch `main`). **Nothing is pushed** — all work is local commits.

## Start-of-session basics
- **Read order:** `README.md` → `PRODUCT.md` → `v1ProductDetailing.md` → `v1PRD.md` → `DESIGN.md`. Don't relitigate the 10 locked decisions in `v1ProductDetailing.md`.
- **Design work uses the `impeccable` skill.** Preview server: `cd design/mockups && python3 -m http.server 8734` (does NOT persist across sessions — restart it).
- **⚠️ CACHE CAVEAT:** the six app screens link `design/mockups/shared/system.css`; browsers cache it. After editing `system.css`, **hard-refresh (Cmd+Shift+R)** or restart the server, or you'll see stale layout. (The landing files are self-contained — no cache issue.)
- **Chrome viewport limit:** the extension can't reliably render below ~1456px, so **mobile is CSSOM-verified only** — flag mobile risks, don't fake a mobile screenshot.

## Brand & design system (LOCKED)
- **Name NOD**, tagline **"Know it's good before you send — and get sharper each time."** ("bench" is banned — reads as *idle* in India; "learn/course/lesson/grade/score/quiz/streak" banned in UI.)
- **"The Calm Correspondent":** warm paper `#F6F5F1`, ink `#1A1A1A`, ONE Signal Blue `#2F6FE0` (**no green/red**, blue = the verified/meets-standard signal), Spectral serif for statements, Hanken Grotesk for UI, square-cornered cards on soft ambient shadow, editorial whitespace. Canonical: `DESIGN.md` + `design/mockups/shared/system.css` (tokens + primitives new screens link).

## ✅ THE INTERACTIVE PROTOTYPE — all screens wired from ONE URL
Enter at the landing and click through the whole v1 loop. **Verified end-to-end this session.**
```
landing-editorial-blue-v3.html   (ENTRY — one URL)
  └─ Sign in / Start with your message ─▶ recognition-editorial-blue-v3.html   (Screen 1: situations)
       └─ tap a situation card ─▶ personalize.html   (Screen 2: who / ask / context + silent auto-mask)
            └─ "Shape the draft" ─▶ draft.html   (Screen 3: guided draft, tone/ask decisions)
                 └─ "This works — tighten it" ─▶ feedback.html   (Screen 4: one fix, not a score)
                      └─ "Use this edit" → "Save this message" ─▶ artifact.html   (Screen 5: saved message + history)
                           ├─ "Start another message" ─▶ Screen 1
                           └─ "Preview a later nudge →" ─▶ return.html   (Screen 6: unaided re-attempt)
                                └─ situation card ─▶ personalize.html   (loops)   |   helpline ─▶ draft.html
```
Wiring lives in each file's small script / hrefs (search `window.location.href` and `href="…html"`). The landing's `data-signin` links now point to Screen 1 (the inert preventDefault was removed).

## Files in `design/mockups/` (current state)
- **`landing-editorial-blue-v3.html`** — LATEST landing (UI/UX-corrected). Concrete hero ("Finish the outreach message you've been putting off") with a real example card, an **auto-playing single-message demo** ("The task → NOD improves the ask → You use it next time" — one continuous email, only the ask animates, never two texts overlapping), scannable "uniquely powerful" flow, **static** source row + **static** research insight grid (no marquees), no "quiet confidence" beat, multi-column footer, one CTA label throughout. **This is the entry point.**
- `landing-editorial-blue-v2.html` — previous landing (kept as backup). **OPEN DECISION: which landing is canonical?** v3 supersedes v2 on content/UX; the interactive links point into the app from v3.
- `recognition-editorial-blue-v3.html` (Screen 1, was the "locked baseline"), `personalize.html`, `draft.html`, `feedback.html`, `artifact.html`, `return.html`, plus `shared/system.css`.
- Older explorations (`recognition-*`, `landing-editorial-blue.html`, etc.) are superseded, some tracked.

## Git state (branch `main`, NOT pushed)
Recent commits (newest first): `fd9025e` remove dead marquee CSS/JS · `df9377d` add landing v3 · `56a8f69` top-align app-screen stages · `45fa794` landing rework + even spacing · `ceb1256` refresh DESIGN.md · `80ea2fb` responsive+a11y pass · `7e24b44` screens 3–6 · `2f26dd1` Screen 2 + system.css · `6aabfa5` NOD rebrand · `484b5c2` lock baseline.
**⚠️ UNCOMMITTED right now:** the **interactive-wiring** edits (v3 landing links + click handlers in Screen 1 / personalize / draft / feedback / artifact / return) **and this NEXT-SESSION.md**. Owner had not yet said "commit" for these — offer to commit. Also untracked: `Landing page.docx`, `Learning Tech AI (1).docx` (source briefs, left untracked intentionally).

## Detector (impeccable) state
- `.impeccable/config.json`: a **project-wide `flat-type-hierarchy` ignore** (real hierarchy lives in linked `system.css` the detector can't follow), plus file-scoped `marquee`/`marketing-buzzword` ignores for the OLDER landing files. v3 has NO marquees now, so its earlier marquee flag was fixed by deleting dead code (not suppressed).
- Standing advisory (not fixed): **em-dash saturation** (landing/artifact/feedback) — an AI-cadence tell; vary some to commas/periods when polishing.

## Open items / what to pick up
1. **Commit** the interactive wiring + this file (awaiting owner OK), then optionally **push**.
2. **Decide canonical landing** (v3 vs v2) and retire/rename the other.
3. **Refresh `DESIGN.md`** — it predates the v3 landing patterns and the interactive flow.
4. **Real-device mobile pass** (tooling can't render narrow).
5. Optional polish: trim em-dashes; strip remaining dead CSS (e.g. `.td-stage`/`.td-scene` in v3, `.beat*` rules, `.hm-bar`).

## How the owner works
- Owns the aesthetic/copy calls (don't offer menus), but ground them in users/PRD; build variations to see, not describe; prefers the **live localhost link** over screenshots. **Incremental commits; NEVER commit/push without explicit OK; never commit the raw survey `.xlsx` (PII).** Give a plain-language recap alongside technical ones. Guardrails in ALL copy: sell utility not "learning"; banned UI words; claim quality never outcome ("never get a reply"); no fabricated testimonials/metrics/logos/people; one blue no green; English-only v1; desktop-primary.
