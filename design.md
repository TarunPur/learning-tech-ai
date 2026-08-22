<!-- STATUS: LOCKED 2026-08-21. Brand = NOD. This file is the VISUAL SYSTEM + component library (how NOD looks). The FLOW (what happens — the two-frame workspace + coaching loop) lives in journey.md. The BUILD lives in implementation.md + ERD.md. Canonical prototype: design/mockups/workspace.html (single two-frame workspace) + design/mockups/landing-editorial-blue-v3.html (marketing) + shared/flow.js + shared/system.css. The build ports these tokens/components into the React/Tailwind app; do not restyle. -->
---
name: NOD
description: Help a non-technical professional finish one real outreach message, with help that fades — and know it's good before they send.
tagline: Your coach against the AI slop — so the skill sticks.
colors:
  warm-paper: "#F6F5F1"
  card-white: "#FFFFFF"
  ink: "#1A1A1A"
  ink-strong: "#3A3A3A"
  ink-soft: "#5F5F58"
  ink-faint: "#6B6B61"
  hairline: "#E4E3DC"
  hairline-strong: "#D8D7CF"
  signal-blue: "#2F6FE0"
  signal-blue-deep: "#1E52B0"
  blue-tint: "rgba(47,111,224,0.08)"
  blue-tint-strong: "rgba(47,111,224,0.16)"
typography:
  display:
    fontFamily: "Spectral, Georgia, serif"
    fontSize: "clamp(27px, 3.6vw, 46px)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.018em"
  title:
    fontFamily: "Spectral, Georgia, serif"
    fontSize: "23px–26px"
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.5
  body-small:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "13px–14px"
    fontWeight: 400
    lineHeight: 1.5
  meta-label:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 600
    letterSpacing: "0.04em"
    textTransform: "uppercase"
rounded:
  sharp: "0"
  logo: "15px"
  pill: "9999px"
  focus: "6px"
spacing:
  sm: "12px"
  md: "26px"
  lg: "44px"
  xl: "64px"
components:
  situation-card:
    backgroundColor: "{colors.card-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sharp}"
    padding: "30px 28px 26px"
    anatomy: "scenario title (Spectral) → benefit line → persistent CTA-with-arrow"
  brand-logo:
    backgroundColor: "{colors.card-white}"
    border: "1px solid {colors.hairline}"
    markColor: "{colors.signal-blue}"
    rounded: "{rounded.logo}"
    size: "52px"
  pill-button:
    backgroundColor: "{colors.signal-blue}"
    textColor: "{colors.card-white}"
    rounded: "{rounded.pill}"
    padding: "15px 26px"
  field:
    style: "bottom-border only (1.5px), no box"
    focus: "border → signal-blue"
---

# Design System: NOD

> **Flow lives in `journey.md`.** This file is the visual system — colours, type, cards, motion, components, and the "Calm Correspondent" North Star. The user flow (the two-path loop: choose how to start → write your own / NOD-drafts-and-you-spot-the-flaw → feedback on your own words) is specified in `journey.md`, grounded in `v1ProductDetailing.md` Decisions 6–11. Every token and component below is reusable as-is across those screens.

## Overview

**Creative North Star: "The Calm Correspondent"**

The interface behaves like a calm, genuinely expert colleague who sits down to help you write — never a teacher, never a slick tool. It meets an overwhelmed, low-confidence user with a confident editorial voice on a warm paper surface, and hands them their own real situation to pick from. Authority comes from restraint: a large serif statement, generous whitespace, one quiet blue, and clean square-cornered cards that read as considered rather than decorated.

The system is **light, warm-neutral, and editorial**. Warmth (the paper ground, the human first-person copy) does the reassurance; a single blue does the trust and action. Nothing is loud, gamified, or corporate-cold. The target feeling is **calm confidence** — the visitor should feel capable and in good hands, not taught or graded.

Deliberately rejected worlds: a heritage "brass/instrument" look (too formal/old-world) and a green-anchored friendly look (green reads as "correct/pass," i.e. grading, which this product must never do).

**Key Characteristics:**
- Warm off-white canvas, near-black ink, one restrained blue accent — no green.
- Editorial serif (Spectral) for statements; humanist sans (Hanken Grotesk) for everything you read to act.
- Square-cornered cards floating on a soft ambient shadow.
- Recognition over recall: the entry is concrete situations, never a blank box.

## Brand

- **Name: NOD** — the honest "yes, that's good — send it." Warm, human, banned-word-safe. (Retired the earlier placeholder "Outreach Bench": in Indian professional culture "on the bench / benched" reads as *idle / unstaffed* — wrong signal for this audience. Do not reintroduce "bench" anywhere.)
- **Tagline: "Your coach against the AI slop — so the skill sticks."** (Owner's call, 2026-08-21 — now the on-screen brand line across all app screens' mark. It leans into the resolved Decision 11 "get-better coach" spine and the anti-generic-AI positioning; "skill sticks" echoes the landing's demo copy for a consistent brand voice. *Superseded:* "Know it's good before you send — and get sharper each time" (still fine as a product/one-liner descriptor; the earlier "…and then learn" was dropped because **"learn" is a banned UI word**.))
- **Logo — the circuit-node N mark** (owner's call, 2026-08-22, superseding the earlier "N-turn" mark of the same day): a geometric N built from rounded traces and node dots (two small branch stubs off the main strokes, plus dots at each joint), filled with a signal-blue gradient (light blue → signal-blue → signal-blue-deep) on a card-white rounded-square tile (52px, 15px radius, hairline border).

## Colors

A warm-neutral canvas carried almost entirely by paper and ink, with a single blue that appears sparingly for brand, action, and verification.

### Primary
- **Signal Blue** (#2F6FE0): the one accent — brand mark, the italic emphasis word in the headline, focus rings, card-hover borders, the field arrow, and — by intent — the "verified / meets the expert standard" signal. Used sparingly, never as a fill across regions.
- **Signal Blue Deep** (#1E52B0): the tagline, the headline's italic word, and pressed/emphasis states.

### Neutral
- **Warm Paper** (#F6F5F1): the app ground; warm enough to feel human, quiet enough to recede.
- **Card White** (#FFFFFF): card surfaces, lifted off the paper.
- **Ink** (#1A1A1A): headlines, titles, primary text.
- **Ink Strong** (#3A3A3A) / **Ink Soft** (#5F5F58): secondary and body text.
- **Ink Faint** (#6B6B61): captions, hints, meta labels, placeholder text. **Darkened from the original #7C7C73 to clear WCAG AA (~4.8:1 on paper)** — never lighter than this.
- **Hairline** (#E4E3DC) / **Hairline Strong** (#D8D7CF): card borders and dividers.

### Named Rules
**The One Blue Rule.** There is exactly one accent, and it is blue. Blue also *is* the positive/verified signal — so the system never needs a green "pass" color. **Green is banned:** in a product whose core promise is *feedback, never a grade*, green reads as grading. Fix-targets and problems use a **neutral** marker (dotted ink underline / faint wash), never red or amber — pass/fail color coding is forbidden.

## Typography

**Display Font:** Spectral (Georgia, serif fallback) · **Body Font:** Hanken Grotesk (system-ui, sans-serif fallback)

- **Display** (Spectral 600, clamp(27–46px), lh 1.08): the left-column statement headline. One per screen; an italic Signal-Blue-Deep word carries the emphasis.
- **Title** (Spectral 600, 23–26px): situation-card titles and finished-message headings.
- **Body** (Hanken 400, 17px, max ~36ch): sub-lines and reading copy; also draft/message body at ~16.5px.
- **Body Small** (Hanken 400, 13–14px): card descriptions, captions, list rows.
- **Meta label** (Hanken 600, 12px, tracking 0.04em, uppercase): section labels ("THE TONE", "THE ONE THING TO TIGHTEN", "A SITUATION LIKE…").

### Named Rule
**The Serif-Statement / Sans-Support Rule.** Spectral appears only on statements, titles, and quoted lines. Everything the user reads *in order to act* — sub-lines, labels, inputs, captions, buttons — is Hanken. Never set UI controls in the serif.

## Layout — the Two-Frame Workspace (LOCKED)

v1 is **one persistent two-frame workspace**, not a sequence of pages (see `journey.md` §0). Canonical
build: `design/mockups/workspace.html`.

- **Pinned brand header** (application chrome): `position: sticky; top:0`, opaque warm-paper background,
  so the lockup never scrolls off or jumps between frames. It never resizes, relocates, hides, or
  animates. A hairline sits beneath it.
- **Below the header, a two-column grid**, top-anchored so the active heading holds a **stable vertical
  position** across frames of different heights (`align-items/align-content: start`, not centered). Max
  stage width **1260px**; columns **`440px  minmax(0,700px)`** with a **64px** gap.
  - **LEFT — Recap:** the single immediately-previous completed frame as a warm-tinted (`--tint`), still
    **editable** snapshot with a blue **Edit** action. It must look *secondary, not disabled* — never
    lower text contrast with opacity. Left border in `blue-tint-strong`. Shows the frame's key value(s)
    (e.g. Details shows recipient + context + ask). One prior frame only — never a stack.
  - **RIGHT — Active frame:** the one live frame, on the **paper surface** (no giant outer white card —
    avoid "card inside card"). Only genuine surfaces (the compose box, a fix box, the saved message) get
    a bordered card.
- **Responsive:** at ≤1160px the grid becomes a single column with the **recap directly above** the
  active frame (never squeezed side-by-side); at ≤560px paddings tighten and the header tagline is
  allowed to **wrap** (no `nowrap` clip). Interactive targets stay **≥44px**.

The situation frame's four cards are equal, full-width primary cards stacked vertically (not a 2×2 grid in
the workspace), with the quiet "Something else?" escape beneath. *(The older standalone-page 2×2 grid and
the 0.86/1.14 split are retired — the workspace is the locked layout.)*

## Elevation & Depth

Flat-but-floating. Surfaces are flat and matte; the only depth is a soft ambient shadow under cards (so they float on the paper) and a blue-tinted glow under the brand logo. Depth deepens only in response to state — cards lift on hover.

- **Card ambient** (`0 1px 2px rgba(28,40,72,0.05), 0 14px 30px -18px rgba(28,40,72,0.20)`): resting.
- **Card lift** (`0 6px 16px -8px rgba(30,50,90,0.14), 0 26px 50px -24px rgba(30,50,90,0.26)`): hover/focus.
- **Logo glow** (`0 8px 18px -7px rgba(47,111,224,0.55)`): blue ambient under the brand mark only.

**The Flat-But-Floating Rule.** Nothing is beveled or glassy. Cards are flat rectangles that merely *float*; the shadow's job is separation from the paper, not decoration.

## Shapes

The signature is the tension between **sharp cards and soft controls**. Cards have **square corners (0 radius)** — the editorial, considered gesture. The only rounded shapes are the brand logo (15px rounded square), circular controls (the field arrow, pill radius), and the primary pill button. Focus rings use a 6px radius.

**The Sharp-Card Rule.** Cards are never rounded. Rounding them turns editorial into generic-SaaS.

## Components

### Situation Card (signature component)
- **Corner Style:** square (0 radius). **Background:** Card White on Warm Paper. **Border:** 1px Hairline. **Shadow:** ambient → lift on hover.
- **Anatomy (current):** a scenario **title** (Spectral) → a plain **benefit** line → a **persistent CTA-with-arrow** in Signal Blue (e.g. "Create follow-up →"). *Index numbers (01–04) and "e.g." lead-ins were removed — the numbers implied a sequence; the CTA is always visible, not hover-only.*
- **Hover / Focus:** translateY(-3px), border → Signal Blue, CTA text → blue-deep, arrow slides right. Cards are native `<button>`s (keyboard-safe). A `.is-loading` pulse acknowledges the tap.

### Field (intake primitive)
- A single-line field with a **1.5px bottom border only** (no box); focus/hover shifts the border to Signal Blue. Paired with a circular arrow button that fills blue on hover and stays **disabled until there's text** (error prevention). Used for the "something else" escape (Home ①) and the Personalize questions (②). *(Screens are named in `journey.md`.)*

### Pill Button
- Signal-Blue pill (9999px), white label + sliding arrow, soft blue shadow; hover → blue-deep. A `.ghost` variant is transparent/ink-soft for secondary actions.

### Path-choice (Choose how to start ③) — *new*
- The fork after intake. **Deliberately unequal weight, never a 50/50 pair of buttons** (a tired user always taps "do it for me" — see `journey.md` §3 and Decision 7). Anatomy: a **loud primary action** — the write-your-own default, styled as the Pill Button with one line of coach framing beneath — and a **quiet secondary text link** ("Not sure where to start? Let NOD draft one you can react to."), set in Hanken ink-soft, never a matching button. The visual dominance *is* the default.

### Tap-the-weak-line (fallback path ④b) — *new*
- The spot-the-flaw beat on the NOD-drafted fallback. NOD's draft is rendered with **individually selectable sentences**; the user taps the one a busy reader would trip on (plus an honest "I'm not sure" out). The tapped line takes the **neutral dotted marker** — the *same* marker as a feedback fix, because this is a point of attention, **not** a "wrong answer" (**never red/green — pass/fail colour is banned**). Only after the tap does NOD react (right/why/what-was-missed). Tap targets ≥44px; keyboard-selectable. Reuses the neutral-marker + card tokens — no new visual language.

### Decision Chips (fallback draft path ④b)
- Square 1px-bordered chips; selected state = blue border + blue tint + blue-deep text (`aria-pressed`). Used for the two hand-off decisions (tone, the ask) when NOD drafts on the fallback path.

### Workspace Recap (LEFT frame)
- The single previous completed frame, rendered warm-tinted with an uppercase meta label + a blue **Edit**. Value in Spectral; supporting detail (e.g. context / ask) below in Hanken. Secondary but never dimmed-via-opacity. On the "Your version" recap, show a real excerpt of what the user *actually wrote* (not just the first line). Edit re-activates the frame on the right and resets contradictory downstream state.

### Feedback fix + the coaching loop (Feedback ⑤)
- The fix-target in the draft gets a **neutral dotted marker** (never red/green); once edited it resolves to a blue "cleared" state. The fix is presented as *Your line → why it's worth changing → a tighter version (when we have one)*, framed as an edit the user accepts ("Use this edit") or does themselves — **advisory, never a gate**. Reads the user's **own** words (④a written, or the ④b NOD draft they judged), not a planted line.
- **Loop states (own path, LOCKED — see `journey.md` §5):** *issue → "Let me tighten it"* (solid when it's the sole action) sends the user back to the editable compose with a "one thing to tighten" reminder and the "Check it against the standard" action; up to **two** self-edit + recheck cycles; then **NOD writes a better version** (shown in a clean message card + a "the move to keep" takeaway + Save). A **clean** check shows *"It's ready — here's what's working"* with one concrete reusable judgement, then Save. Never a score.

### Saved-message list (Saved message ⑥)
- Plain rows (blue tick, situation title, date, one-line peek, hover "Reuse →"). The freshest row carries a small "just saved" chip. Called **"Your saved messages"** (never "bench").

### Brand Mark
- Card-white tile (hairline border) with the circuit-node N mark (signal-blue gradient) + name in Hanken 800 ink + tagline in Hanken 600 Signal-Blue-Deep beneath.

### Motion
- **Entrance:** one staggered reveal (translateY(12px) + fade, `cubic-bezier(.16,1,.3,1)`, ~0.66s), sequenced down the page. **Micro-interactions:** hover lifts, arrow slides, live reshape of the draft when a decision chip changes. **All motion respects `prefers-reduced-motion`** (entrance reveals are gated behind `no-preference`, so reduced-motion yields finished states). Never animate layout properties (width/height/padding/margin) — use transform/opacity.

## Shared System Architecture

- **`design/mockups/shared/system.css`** holds the tokens + reusable primitives (stage, mark, statement type, field, buttons, privacy line, card base, motion helpers). **New screens `<link>` this file** — a shared token/primitive change is then a single edit.
- The two **locked baseline** files (`recognition-editorial-blue-v3.html`, `landing-editorial-blue-v2.html`) are **self-contained frozen snapshots** and do NOT link system.css (they carry their own copy of the tokens). When the landing is next reworked, that's the moment to relink it to system.css.

## Responsive & Accessibility

- **Desktop-primary**, but every screen has mobile media queries (≤600/640px): the stage collapses to one column, Home ①'s 2×2 grid stacks to a single column, paddings tighten, the statement scales down, and interactive controls (field arrows, chips) get **≥44px tap targets**. *(Mobile CSS is CSSOM-verified; a real-device pass is still owed — the tooling can't render below ~1456px.)*
- **WCAG AA:** body/secondary text and the AA-darkened `--ink-faint` clear 4.5:1 on paper; focus-visible rings (2.5px blue) on all interactives; reduced-motion honored; English-only copy in v1.

## Do's and Don'ts

### Do
- Keep blue rare — accent, focus, and the "verified / meets-the-standard" signal only.
- Set statements/titles/quoted lines in Spectral; everything functional in Hanken.
- Keep cards square-cornered and floating on the ambient shadow.
- Keep the recognition entry concrete (real situations, persistent CTA), never a blank box.
- Keep readable text at Ink Faint (#6B6B61) or darker — never lighter.
- Frame feedback as one concrete fix pointing at the user's actual words; keep help fading.

### Don't
- Introduce green, red, or any pass/fail color coding — this product shows feedback, never a grade or score.
- Show a score, checklist, or "X/5" — surface 1–2 concrete fixes at a time instead.
- Make the primary entry an open/blank input; recognition is the entry.
- Round the cards or add glass/bevel/gradient decoration.
- Use "course / lesson / learn / grade / score / quiz / streak" — or "bench" — anywhere in the UI.
- Claim an outcome ("get a reply"); claim quality by the fixed standard only.

---

## Status & Roadmap (project note) — LOCKED

**The design is LOCKED (2026-08-21).** The flow lives in `journey.md`; this file is the visual system +
component library. The canonical, built artifact both describe is the **single two-frame workspace**,
`design/mockups/workspace.html` (logic in `shared/flow.js`), plus the marketing landing
`landing-editorial-blue-v3.html`. The earlier per-page mockups (`compose/draft/feedback/artifact/return`
etc.) are **superseded** by the workspace and are no longer the reference.

**What the build must reproduce (do not restyle):** every token in the frontmatter; the Calm Correspondent
system; the pinned brand header; the recap-left / active-right two-frame layout and its responsive stack;
the four equal situation cards + quiet escape; the Path-choice, Tap-the-weak-line, Feedback-fix +
coaching-loop, and Saved-message components above. The build ports these into React + Tailwind (tokens →
Tailwind theme / CSS variables) — a **faithful port**, not a redesign.

**Verification owed:** a real-device **mobile** pass on the workspace (tooling can't render < ~1456px, so
the ≤560px behaviour is CSS-verified only).

**Next:** `ERD.md` → `implementation.md` → build. The prototype's check is **faked**; the real hybrid
evaluator (deterministic B4 + anchored Claude call for B1/B2/B3/B5, PRD §16) is built per
`implementation.md`, and the rubric **discrimination test** runs before shipping.
