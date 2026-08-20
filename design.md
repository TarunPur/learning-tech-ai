<!-- STATUS: visual system current as of 2026-08-20; the FLOW it documents is superseded as of 2026-08-21 (two-path loop — see the "⚠️ Flow change" banner below and "Status & Roadmap"). Brand = NOD. Canonical implementation in design/mockups/ with shared tokens/primitives in design/mockups/shared/system.css. -->
---
name: NOD
description: Help a non-technical professional finish one real outreach message, with help that fades — and know it's good before they send.
tagline: Know it's good before you send — and get sharper each time.
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
    backgroundColor: "{colors.signal-blue}"
    textColor: "{colors.card-white}"
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

> ## ⚠️ Flow change — read before designing (2026-08-21)
> The **visual system** in this file (colors, type, cards, motion, the "Calm Correspondent" North Star) is unchanged and still authoritative. **The user flow it assumes is not.** The core-solution fork was resolved (see `v1ProductDetailing.md` Decisions 7, 8, 11 and `NEXT-SESSION.md`):
> - **Spine is now a "get better" coach, not a "get it done" assistant.** The user does the work; the help fades.
> - **The draft step is now two paths, user's choice, with *write your own draft* as the DEFAULT.** The escape hatch is *NOD drafts it → the user spots what's weak first*. The old **single "AI-led fading-scaffold draft"** (Screen 3, `draft.html`) is now just the escape-hatch path, **not** the default.
> - **The rubric now reads the user's OWN draft** (user-written or NOD-drafted), not only a NOD-authored one. Feedback (Screen 4) still = 1–2 concrete fixes at their actual words, never a score.
> - **All 6 mockups in `design/mockups/` predate this** and show the old single-path flow with a *faked* rubric check. They need reworking to: (a) a **choose-how-to-start** step, (b) a **write-your-own composer** as the primary path (`compose.html` is a usable base), (c) a **spot-the-flaw** beat before feedback on the NOD-draft path, (d) **real** categorical feedback on the entered text.
> - The design tokens/components below are all **reusable as-is** for these new screens.

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

- **Name: NOD** — the honest "yes, that's good — send it." Warm, human, banned-word-safe. The blue message+**check** logo literally *is* the nod. (Retired the earlier placeholder "Outreach Bench": in Indian professional culture "on the bench / benched" reads as *idle / unstaffed* — wrong signal for this audience. Do not reintroduce "bench" anywhere.)
- **Tagline: "Know it's good before you send — and get sharper each time."** (An earlier draft ended "…and then learn" — dropped because **"learn" is a banned UI word** and the positioning is *sell utility, not learning*.)
- **Logo:** signal-blue rounded-square tile (52px, 15px radius) with a white "message + check" glyph and a soft blue glow.

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

## Layout

A two-column editorial composition centered in a max-width **1240px** stage, vertically centered in the viewport. On desktop (≥940px) it splits **0.86fr / 1.14fr** with a **64px** gap: left is the statement column (mark, headline, sub, plus a reassurance/context line), right is the working surface (recognition grid, intake card, draft, feedback, saved messages, or a single situation card). Below 940px the stage collapses to a single column.

Screen 1's recognition grid is an **aligned 2×2** of situation cards (26px gap). *(This replaced the earlier staggered/zig-zag numbered layout.)*

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

### Feedback fix (Feedback ⑤)
- The fix-target in the draft gets a **neutral dotted marker** (never red/green); once edited it resolves to a blue "cleared" state. The fix is presented as *Your line → why it's worth changing → a tighter version*, framed as an edit the user accepts ("Use this edit") or declines ("Keep mine") — **advisory, never a gate**. Reads the user's **own** words (whether they wrote the draft ④a or judged a NOD draft ④b), not a planted line.

### Saved-message list (Saved message ⑥)
- Plain rows (blue tick, situation title, date, one-line peek, hover "Reuse →"). The freshest row carries a small "just saved" chip. Called **"Your saved messages"** (never "bench").

### Brand Mark
- Blue logo tile + name in Hanken 800 + tagline in Hanken 600 Signal-Blue-Deep beneath.

### Motion
- **Entrance:** one staggered reveal (translateY(12px) + fade, `cubic-bezier(.16,1,.3,1)`, ~0.66s), sequenced down the page. **Micro-interactions:** hover lifts, arrow slides, live reshape of the draft when a decision chip changes. **All motion respects `prefers-reduced-motion`** (entrance reveals are gated behind `no-preference`, so reduced-motion yields finished states). Never animate layout properties (width/height/padding/margin) — use transform/opacity.

## Shared System Architecture

- **`design/mockups/shared/system.css`** holds the tokens + reusable primitives (stage, mark, statement type, field, buttons, privacy line, card base, motion helpers). **New screens `<link>` this file** — a shared token/primitive change is then a single edit.
- The two **locked baseline** files (`recognition-editorial-blue-v3.html`, `landing-editorial-blue-v2.html`) are **self-contained frozen snapshots** and do NOT link system.css (they carry their own copy of the tokens). When the landing is next reworked, that's the moment to relink it to system.css.

## Responsive & Accessibility

- **Desktop-primary**, but every screen has mobile media queries (≤600/640px): the stage collapses to one column, Screen 1's 2×2 grid stacks to a single column, paddings tighten, the statement scales down, and interactive controls (field arrows, chips) get **≥44px tap targets**. *(Mobile CSS is CSSOM-verified; a real-device pass is still owed — the tooling can't render below ~1456px.)*
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

## Status & Roadmap (project note)

**The flow now lives in `journey.md`** (screens, the two paths, where they split and rejoin, the states on each). This file is the **visual system + component library**; it no longer narrates the flow. The visual system is unchanged and fully reusable for the new screens.

**All six v1 mockups were built and committed** (in `design/mockups/`) but capture the **pre-2026-08-21 single-path flow**; they need reworking to the two-path loop in `journey.md`. Mapping to the new screen set:
1. `recognition-editorial-blue-v3.html` — **Home ①** (LOCKED baseline) · *reusable as-is; the path choice is a **new** screen ③ that comes **after Personalize**, not on Home.*
2. `personalize.html` — **Personalize ②** + silent auto-mask · *reusable; feeds both paths.*
3. *(new)* **Choose how to start ③** — the fork; loud write-your-own default + quiet "let NOD draft one" fallback. See the **Path-choice** component above.
4. `compose.html` — **Write your own ④a** (the new **default** path) · *the write-your-own composer is the base; anchor it with the situation + specifics so it's never a blank page.*
5. `draft.html` — **NOD drafts + spot-the-flaw ④b** (the **fallback** path) · *add the **tap-the-weak-line** beat before feedback (see component above). Spot-the-flaw form is resolved = tap the line, not type-a-critique.*
6. `feedback.html` — **Feedback ⑤** · *must render **real** categorical fixes on the user's **own** text (arbitrary user-written on ④a), not a planted line.*
7. `artifact.html` — **Saved message ⑥** · *reusable.*
8. `return.html` (+ `compose.html`) — **Later ⑦** · *reusable; the unaided re-attempt, with the path choice reappearing and help thinner.*

Plus the marketing **landing** (`landing-editorial-blue-v3.html` is the current build; `-v2` is the LOCKED baseline).

**Design decisions resolved (the old §24 opens):** auto-mask = detect-and-mask, silent, with gentle inline reassurance; feedback UI = one concrete fix at a time pointing at the user's actual words, never a score/checklist; **spot-the-flaw = tap the weak line** (2026-08-21). Capturing the user's *own* first version is now the default (Decisions 7, 11); the "where do I start" case falls to the NOD-drafts + spot-the-flaw fallback; the *visual* rough→shaped ("Aha") staging remains design-owned and is specified in `journey.md`.

**Still to do (in order):** (a) sign off this design layer (`journey.md` + this file); (b) rework the mockups above to the two-path flow; (c) a real-device **mobile** verification pass (tooling can't render narrow); (d) then ERD / technical architecture / build (incl. the real evaluator endpoint — the prototype's check is faked). Do not start the ERD/build before the design is signed off.
