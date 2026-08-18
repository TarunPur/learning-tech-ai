<!-- STATUS: WORK-IN-PROGRESS. Extracted from the built Screen 1 mockup (design/mockups/recognition-editorial-blue.html). Screen 1 direction only; screens 2–6 not yet designed. Not signed off. See "Status & Roadmap" at the end. -->
---
name: Outreach Bench
description: Help a non-technical professional finish one real outreach message, with help that fades.
colors:
  warm-paper: "#F6F5F1"
  card-white: "#FFFFFF"
  ink: "#1A1A1A"
  ink-strong: "#3A3A3A"
  ink-soft: "#5F5F58"
  ink-faint: "#7C7C73"
  hairline: "#E4E3DC"
  hairline-strong: "#D8D7CF"
  signal-blue: "#2F6FE0"
  signal-blue-deep: "#1E52B0"
  blue-wash: "rgba(47,111,224,0.08)"
  blue-wash-strong: "rgba(47,111,224,0.16)"
typography:
  display:
    fontFamily: "Spectral, Georgia, serif"
    fontSize: "clamp(31px, 3.6vw, 46px)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.018em"
  title:
    fontFamily: "Spectral, Georgia, serif"
    fontSize: "26px"
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
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Spectral, Georgia, serif"
    fontSize: "14px"
    fontWeight: 400
    letterSpacing: "0.04em"
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
  card-situation:
    backgroundColor: "{colors.card-white}"
    textColor: "{colors.ink}"
    typography: "{typography.title}"
    rounded: "{rounded.sharp}"
    padding: "30px 28px 26px"
  card-situation-hover:
    backgroundColor: "{colors.card-white}"
    textColor: "{colors.ink}"
  brand-logo:
    backgroundColor: "{colors.signal-blue}"
    textColor: "{colors.card-white}"
    rounded: "{rounded.logo}"
    size: "52px"
  intake-arrow:
    backgroundColor: "transparent"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.pill}"
    size: "34px"
  intake-arrow-hover:
    backgroundColor: "{colors.signal-blue}"
    textColor: "{colors.card-white}"
    rounded: "{rounded.pill}"
    size: "34px"
---

# Design System: Outreach Bench

## Overview

**Creative North Star: "The Calm Correspondent"**

The interface behaves like a calm, genuinely expert colleague who sits down to help you write — never a teacher, never a slick tool. It meets an overwhelmed, low-confidence user with a confident editorial voice and a warm paper surface, and hands them their own real situation to pick from. Authority comes from restraint: a large serif statement, generous whitespace, one quiet blue, and clean square-cornered cards that read as considered rather than decorated.

The system is **light, warm-neutral, and editorial**. Warmth (the paper ground, the human first-person copy) does the reassurance; a single blue does the trust and action. Nothing is loud, gamified, or corporate-cold. The target feeling is **calm confidence** — the visitor should feel capable and in good hands, not taught or graded.

Deliberately rejected worlds: a heritage "brass/instrument" look (too formal/old-world) and a green-anchored friendly look (green reads as "correct/pass," i.e. grading, which this product must never do).

**Key Characteristics:**
- Warm off-white canvas, near-black ink, one restrained blue accent — no green.
- Editorial serif (Spectral) for statements; humanist sans (Hanken Grotesk) for everything you read to act.
- Square-cornered cards floating on a soft ambient shadow.
- Recognition over recall: the entry is concrete situations, never a blank box.

## Colors

A warm-neutral canvas carried almost entirely by paper and ink, with a single blue that appears sparingly for brand, action, and verification.

### Primary
- **Signal Blue** (#2F6FE0): the one accent. Brand mark, the italic emphasis word in the headline, focus rings, card-hover borders, the intake arrow, and — by intent — the "verified / meets the expert standard" signal. Used sparingly, never as a fill across regions.
- **Signal Blue Deep** (#1E52B0): the tagline, the headline's italic word, and pressed/emphasis states of the blue.

### Neutral
- **Warm Paper** (#F6F5F1): the app ground; warm enough to feel human, quiet enough to recede.
- **Card White** (#FFFFFF): situation-card surfaces, lifted off the paper.
- **Ink** (#1A1A1A): headlines, titles, primary text.
- **Ink Strong** (#3A3A3A) / **Ink Soft** (#5F5F58): secondary and body text.
- **Ink Faint** (#7C7C73): index numbers, "e.g." lead-ins, placeholder text — darkened to stay readable (AA), never lighter.
- **Hairline** (#E4E3DC) / **Hairline Strong** (#D8D7CF): card borders and dividers.

### Named Rules
**The One Blue Rule.** There is exactly one accent, and it is blue. Blue also *is* the positive/verified signal — so the system never needs a green "pass" color. Green is banned: in a product whose core promise is *feedback, never a grade*, green reads as grading.

## Typography

**Display Font:** Spectral (with Georgia, serif fallback)
**Body Font:** Hanken Grotesk (with system-ui, sans-serif fallback)

**Character:** An editorial serif carries the statements and the situation titles — confident, premium, "in expert hands." A clean humanist sans carries everything functional, keeping the interface approachable and legible for a non-technical reader.

### Hierarchy
- **Display** (Spectral 600, clamp(31–46px), lh 1.08): the left-column statement headline. One per screen.
- **Title** (Spectral 600, 23–26px, lh 1.12): situation-card titles (the user's real situation).
- **Body** (Hanken 400, 17px, lh 1.5, max ~36ch): the personal sub-line and reading copy.
- **Body Small** (Hanken 400, 14px, lh 1.5): card descriptions / examples.
- **Label** (Spectral 400, 14px, tracking 0.04em): card index numbers (01–04).
- **Brand** (Hanken 800, 22px) + tagline (Hanken 600, 13px, Signal Blue Deep).

### Named Rules
**The Serif-Statement / Sans-Support Rule.** Spectral appears only on statements and situation titles. Everything the user reads *in order to act* — sub-lines, descriptions, inputs, captions — is Hanken. Never set UI controls in the serif.

## Layout

A two-column editorial composition centered in a max-width **1240px** stage, vertically centered on the viewport. Desktop (≥940px) splits **0.86fr / 1.14fr** with a **64px** column gap: left is the statement column (mark, headline, sub, scoped intake field), right is the recognition grid. Below 940px it collapses to a single column (mobile treatment still pending — desktop is primary for now).

The recognition grid is a **staggered two-column layout**: the right column is pushed down **88px** so cards 02 and 04 sit offset below 01 and 03. Card gap **26px**.

## Elevation & Depth

Flat-but-floating. Surfaces are flat and matte; the only depth is a soft ambient shadow under the situation cards (so they float on the warm paper) and a blue-tinted glow under the brand logo. Depth deepens only in response to state — cards lift on hover.

### Shadow Vocabulary
- **Card ambient** (`box-shadow: 0 1px 2px rgba(28,40,72,0.05), 0 14px 30px -18px rgba(28,40,72,0.20)`): resting lift for situation cards.
- **Card lift** (`box-shadow: 0 6px 16px -8px rgba(30,50,90,0.14), 0 26px 50px -24px rgba(30,50,90,0.26)`): hover/focus state.
- **Logo glow** (`box-shadow: 0 8px 18px -7px rgba(47,111,224,0.55)`): blue ambient under the brand mark only.

### Named Rules
**The Flat-But-Floating Rule.** Nothing is beveled or glassy. Cards are flat rectangles that merely *float*; the shadow's job is separation from the paper, not decoration.

## Shapes

The signature is the tension between **sharp cards and soft controls**. Situation cards have **square corners (0 radius)** — the editorial, considered gesture. The only rounded shapes are the brand logo (15px rounded square) and circular controls (the intake arrow, `pill` radius). Focus rings use a 6px radius.

### Named Rules
**The Sharp-Card Rule.** Situation cards are never rounded. Rounding them turns editorial into generic-SaaS.

## Components

### Cards / Containers — Situation Card (signature component)
- **Corner Style:** square (0 radius) — see The Sharp-Card Rule.
- **Background:** Card White on Warm Paper.
- **Border:** 1px Hairline (#E4E3DC).
- **Shadow Strategy:** Card ambient at rest → Card lift on hover (see Elevation).
- **Internal Padding:** 30px 28px 26px (desktop).
- **Anatomy:** index number (Label) top-left; the title + description pushed to the lower half (`margin-top:auto`), giving the card its editorial breathing room.
- **Hover / Focus:** translateY(-3px), border shifts to Signal Blue, index number turns blue, and a blue arrow fades in at the bottom-right.

### Inputs / Fields — Scoped Intake ("something else")
- **Style:** a single-line field with a 1.5px Ink **bottom border only** (no box), plus a circular arrow button.
- **Focus / Hover:** bottom border shifts to Signal Blue; the arrow button fills Signal Blue with a white glyph and nudges right.
- **Role:** the *secondary* escape — a scoped outreach intake, never the primary entry, and never a full open box.

### Brand Mark
- Signal-Blue rounded-square logo (52px, 15px radius) with a white "message + check" glyph and a blue glow; brand name in Hanken 800; tagline in Hanken 600 Signal-Blue-Deep.

### Motion
- **Entrance:** one staggered reveal (translateY(12px) + fade, `cubic-bezier(.16,1,.3,1)`, ~0.66s), sequenced left-to-right then down the cards. Respects `prefers-reduced-motion`.

## Do's and Don'ts

### Do:
- **Do** keep blue rare — accent, focus, and the "verified/expert-standard" signal only (The One Blue Rule).
- **Do** set statements and situation titles in Spectral; everything functional in Hanken (The Serif-Statement Rule).
- **Do** keep situation cards square-cornered and floating on the ambient shadow.
- **Do** keep the four situations concrete: a real situation title + a plain "e.g." example.
- **Do** keep readable text at Ink Faint (#7C7C73) or darker — never lighter.

### Don't:
- **Don't** introduce green or any pass/fail color coding — this product shows feedback, never a grade.
- **Don't** make the primary entry an open/blank input; recognition cards are the entry, the scoped field is secondary.
- **Don't** round the situation cards or add glass/bevel/gradient decoration.
- **Don't** use "course," "lesson," "learn," "score," "grade," "quiz," or "streak" anywhere in the UI.

---

## Status & Roadmap (non-canonical, project note)

**This captures Screen 1 (Recognition Home) only, and it is not locked.** Open questions still live from the design grill: the serif's premium/formal lean vs. warmth for a low-confidence user; whether the scoped intake input should demote to a quieter link (blank-box risk); whether to reintroduce a small credibility/"expert standard" cue on entry; auto-mask reassurance moving to the Personalize screen; the placeholder product name; and the mobile treatment.

**Still to design (screens 2–6):** Personalize (+ silent auto-mask) · Guided fading-scaffold draft · Feedback (not a score) · Artifact + portfolio · Return nudge / unaided attempt. Plus the three §24 design decisions (auto-mask mechanism, Aha-staging, rubric-as-feedback UI).

**Authoritative asset:** `design/mockups/recognition-editorial-blue.html`. Superseded explorations kept for reference: `recognition-home.html`, `recognition-A-grammarly.html`, `recognition-hybrid-blue.html`, `recognition-hybrid-violet.html`, `recognition-B-headspace.html`, `recognition-C-superhuman.html`.
