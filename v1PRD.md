# [name TBD]: help a non-technical professional finish one real task with AI — and do it again

**DRI:** Tarun | **Pod:** Solo founder — Learning Tech & AI (Case Study 4, Cohort 8)
**Status:** Define | **Created:** 2026-08-18 | **Last Updated:** 2026-08-19
**Figma:** none yet — `design.md` pending (owner) | **ERD / Engineering Docs:** written after design is finalised | **Analytics:** the instrumentation IS the experiment; exact event spec after design

**Document lineage:** This PRD converts our locked product detailing (`v1ProductDetailing.md`, reached via two `/grill-me` sessions) and `ProblemSolutionBase.md` into the template format, grounded in the primary-research workbook (n=160, strict target cut n=44). Once the engineering implementation plan exists, that plan becomes the execution source of truth.

---

## A note to the team reading this

This is a real v1, not a workshop build — but it is deliberately *one* honest loop, sized to test a single bet cheaply: **does guided practice on a person's own real task produce independent capability?** Everything not needed to test that is cut.

If you only read three sections, read **§1 The problem** (it's the most data-backed part), **§12 Product concept** (the inversion that defines us), and **§15–16 Key flows & logic** (where the real design decisions live).

---

> **Confidence tags**
>
> 🟢 Directly verified in our primary-research responses (n=160; strict cut n=44)
> 🟡 Supported by secondary evidence (transfer literature / competitor landscape)
> 🔵 Hypothesis, not yet validated by our responses
> 🔴 Contradicted

Unlike a greenfield idea, most of our **problem and user** claims are 🟢 — they come straight from the responses. Our **solution mechanism** is 🔵 on purpose: v1 exists to validate it.

---

## The one-paragraph version

**ICP:** a non-technical professional in India — non-builder role **and** no formal tech education (n=44/160, ~28% of our sample), skewing Marketing/Sales — who already uses AI almost daily but stalls on what to try next and can't tell if their output is any good. 🟢
**North Star:** capability transfer — the **behavioral delta between a guided first attempt and a later unaided attempt** on a similar task (fewer help requests, fewer AI turns, faster, clean rubric pass without scaffolding). 🔵 *(measurement defined; not yet validated)*
**Aha Moment:** the user reads the finished outreach message for *their own* real prospect and realizes **"I made this — it's genuinely good — and I can see exactly what made it good."** In one glance: it wasn't generic AI output handed to them, and it wasn't a lesson — they made the key calls, the product fixed *their* actual draft, and they feel **capable, not taught.** 🔵

---

## Changelog

| Change | Date | People | Comments / link |
|---|---|---|---|
| Initial PRD, converted from product detailing | 2026-08-18 | Tarun | Source: `v1ProductDetailing.md` |
| Grounded §16 rubric in named large-N sources; hardened rubric mechanics via `/grill-me` (stage-tuning, hybrid evaluation, core/advisory win + loop cap, quality-not-outcome, English-only, subject-line scope); added trust reasoning (§12) + off-scope guardrail (§13) | 2026-08-19 | Tarun + Claude | Sources: Gong, Boomerang, Backlinko, Woodpecker, Lavender, Josh Braun |

---

# PART A: WHY

## 1. The problem

Non-technical professionals in India already use AI every day, but a third stay unconfident and the gap isn't closing on its own. 🟢 Content abundance and daily exposure don't, by themselves, produce independent capability — that needs practice, feedback, and a corrected re-attempt. 🟡 The market answers with course catalogs, gamified streak apps, certifications, and "pick your AI tool" interfaces — none of which closes the loop on the user's *own* recurring task. 🟡

To be clear about the edges: we are not building a course, a streak app, a certification, or a tool-picker.

### 1.1 A real scenario

A Marketing/Sales professional with no tech degree needs to follow up with a prospect who went quiet. They use ChatGPT daily, but they're not sure how to get a genuinely good message, don't know what to improve, and can't tell if the result is good enough to send. 🔵 *(illustrative — our survey did not capture task-level walkthroughs; needs task interviews to confirm)*

### 1.2 The breakdown you can watch

open a chat tool → type a vague prompt → get a generic draft → unsure if it's good → send it anyway or give up → learn nothing repeatable. 🔵 *(illustrative; the "unsure if it's good" step ties to verified blockers below)*

### 1.3 Evidence

| Evidence | Magnitude | Source | Confidence |
|---|---|---|---|
| Target already uses AI ~daily | 64% "every single day" (strict cut n=44) | Primary workbook | 🟢 |
| …yet a third are unconfident | 36% at ≤3/5 confidence | Primary workbook | 🟢 |
| #1 blocker: don't know where to start | 36% | Primary workbook | 🟢 |
| Practice / theory / difficulty tie as next blockers | 25% each (not-enough-practice, too-theoretical, concepts-too-difficult) | Primary workbook | 🟢 |
| Nearly half are not active learners | 55% regularly learn (→ 45% don't) | Primary workbook | 🟢 |
| Barely builds with AI | 9% build (vs 18% of non-builders *with* tech education) | Primary workbook | 🟢 |
| Wants practice on real challenges | "learn by solving real-life challenges" top pick, 64% | Primary workbook | 🟢 |
| Exposure ≠ independent capability | transfer needs practice + feedback + re-attempt | Secondary (WebsearchINSIGHTS) | 🟡 |
| Fix = guided practice on their *own* task | never directly asked in the survey | Inference | 🔵 |

### 1.4 Why now

Adoption is already solved — this audience uses AI daily (64%). 🟢 The missing piece is guided *application*, not access. LLMs can now run a real task *with* a person and give contextual feedback. 🟡 India specifically has a named gap: "almost no Duolingo for AI — it has workshop factories instead." 🟡

> **Key insight**
>
> They don't need more AI content. They need to finish one real task and be able to do it again — the market sells the first and skips the second.

---

## 2. Target user

**ICP:** the strict non-technical cut — non-builder role **and** no formal tech education (n=44/160, ~28%); India; skews Marketing/Sales (20% plurality), then Operations (14%), Finance/Founder/Student (11% each), HR (9%); uses AI ~daily; ~half not active learners. 🟢

| Behaviour | Description | What it means for the product |
|---|---|---|
| Uses AI daily but can't judge quality | 64% daily use, yet 36% unconfident 🟢 | The product must supply the judgment they lack |
| Stalls on "what next" | 36% "don't know where to start" 🟢 | No blank box — recognition-based entry |
| Not a self-identified learner | 45% don't regularly learn 🟢 | Sell *utility*, never *learning* |
| No tech education | 25% "concepts too difficult" 🟢 | Never leave them staring at something hard |

**Not for:** builders / technical roles, people who want to *become* builders, users outside India (outside our sample), and the other three task types in v1.

---

## 3. The existing ecosystem, and why it falls short

| Tool / tier | What works | What fails | The ceiling |
|---|---|---|---|
| Course incumbents (Coursera, Udemy, LinkedIn Learning) | Breadth, credentials | Not practice on your own work | Completion ≠ capability |
| Gamified habit apps ("Duolingo for AI") | Engagement | Drills, not real work; upsell complaints | Transfer to messy work unproven |
| Role-based coaches (Mindstone, Section) | Workplace relevance | Not scoped to one real personal task, end to end | Closest, but not this tight |
| Build-first academies (No-Code MBA) | Real building | For aspiring builders, not everyday fluency | Wrong audience for us |
| India workshop factories (GrowthSchool, Be10x) | Mass reach | Generic; aggressive upsell | Not habit/outcome; reputational trap |
| Defaults (do nothing / ask a colleague / mandated LMS) | Zero friction / contextual / mandated | No scale / unscalable / completion-optimized | The hardest to displace |

The common ceiling: everyone starts with **content or a tool**. We start with **the user's own task**, through to a checked outcome. 🟡

---

## 4. Business impact

v1 is free and framed as an experiment, so we are deliberately **not sizing the market** yet.

| Problem | Operational effect | Estimated impact | Confidence |
|---|---|---|---|
| Capability gap despite daily AI use | Users stay dependent/unconfident | Not sized in v1 | 🔵 |
| Willingness to pay is soft | Signal, not a model | 11% "definitely", 9% hard-no, rest conditional | 🟢 |

Growth thesis: individual-led PLG — the individual gets real value free, and *becomes the channel* into their organisation later (no direct B2B in v1). 🔵

---

## 5. Problem prioritisation

| Problem | Description | Impact | Effort | Priority |
|---|---|---|---|---|
| P1 | Don't know where to start (36% #1 blocker) 🟢 | HIGH | LOW | Attack now — recognition entry |
| P2 | Can't judge if output is good (drives unconfidence) 🟢 | HIGH | MED | Attack now — rubric feedback |
| P3 | No practice on their own task (transfer gap) 🔵 | HIGH | MED | Attack now — fading scaffold on a real task |
| P4 | "Concepts too difficult" (25%) 🟢 | MED | MED | Attack now — do-it-with-them |
| P5 | Capability doesn't persist to a later attempt | HIGH | HIGH | Attack now, but **instrument-only** (measure, don't gate) |

**The chain I picked:** recognition entry (P1) → guided real-task draft (P3/P4) → concrete feedback (P2) → saved artifact → later unaided attempt (P5, instrumented).

### What I am not solving, and why

| Problem | Why it is out |
|---|---|
| The other 3 task types | Breadth recreates the overwhelm we're killing |
| Non-Marketing/Sales roles | Different task/rubric/examples; nail one first |
| Image generation (their #2 actual use) | Not a recurring work task with a checkable outcome |
| Certification | It's the orthodoxy; proof-via-artifact is stronger |
| "Pick your AI tool" | This audience doesn't want to learn AI as a subject |
| Paid tier | Effort away from proving the core loop |

---

## 6. Narrowed problem statement and key assumptions

A Marketing/Sales professional in India with no formal tech education uses AI daily but can't reliably turn a vague task ("follow up with this prospect") into a genuinely good outreach message, can't judge whether it's good, and gets no repeatable practice — so they stay dependent and unconfident. *(uses-AI-daily 🟢; unconfident 🟢; can't-judge 🔵; no-practice 🔵)*

| Assumption | Evidence | Confidence |
|---|---|---|
| They want the task *done*, not to "learn AI" | 45% aren't learners; utility framing | 🟢 |
| Recognition entry removes the where-to-start stall | 36% blocker; UX inference | 🔵 |
| Practice on their own task builds independent capability | transfer literature; not asked in survey | 🔵 |
| A fixed expert rubric reads as credible to them | not tested | 🔵 |
| One outreach message is a high-recurrence task for them | Marketing/Sales core task; not directly measured | 🔵 |
| They'll accept silent auto-mask without friction | not tested | 🔵 |

---

## 7. The approach, at a high level

The user picks a real situation from concrete examples and personalizes it in a few words. The product drafts the outreach message *with* them — showing its reasoning and handing them 1–2 key decisions — then gives concrete feedback against an expert rubric until it's genuinely good, and saves a reusable artifact. Later, when a similar real task recurs, it nudges them to do it themselves and quietly measures whether they needed less help.

---

## 8. Goals and success

A target user goes from a real stuck-situation to one genuinely good, self-owned outreach message — and, on a later real occurrence, completes a similar one with measurably less help.

**North Star:** capability transfer = the behavioral delta (help requests, AI turns, time, unscaffolded rubric pass) between the guided and the later unaided attempt. 🔵 This is deliberately **not** completion counts or self-reported confidence — measuring those would repeat the exact trap our own research names. 🟡

---

## 9. Success criteria

Targets are marked *[TBD — set with owner]*: we defined the *shape* of success, not the numbers.

| Metric | Baseline | Target | Kill signal | Type | Confidence | Hypothesis |
|---|---|---|---|---|---|---|
| First real win (artifact clears the **core** criteria B1/B2/B4) | 0 | *[TBD]* | Users can't reach a good draft | Primary | 🔵 | H1 |
| Feedback is trusted and acted on (revises toward rubric) | 0 | *[TBD]* | Users ignore the feedback | Primary | 🔵 | H2 |
| Later unaided attempt actually fires | 0 | *[TBD]* | Nobody returns | Primary | 🔵 | H3 |
| Capability delta on the later attempt (less help/turns/time) | 0 | *[TBD]* | No measurable improvement | Primary | 🔵 | H4 |
| Auto-mask never persists raw PII | — | 100% | Raw identifiers stored/sent | Guardrail | 🔵 | H5 |
| Core loop works without depending on the return | — | Yes | v1 blocked on return behaviour | Guardrail | 🔵 | H6 |

*A "win" = the draft clears the **core** criteria (B1/B2/B4); advisory criteria (B3/B5) are surfaced but don't gate, and after **max 3** revise loops the user may ship with noted misses. This keeps the win from becoming a perfectionism trap (§16, Decision 4).*

---

## 10. Hypotheses

| H# | Hypothesis | Kill signal | Gates |
|---|---|---|---|
| H1 | Recognition entry lets an overwhelmed user start without a blank-box stall | Entry still feels like "where do I start" | Front door |
| H2 | Fixed-rubric concrete feedback (not a score) is credible and gets acted on | Users distrust or ignore it | Judgment credibility |
| H3 | One outcome-tied nudge brings them back for a real recurrence | The nudge is ignored | Measurement loop |
| H4 | Practice on their own task transfers capability (less help later) | No delta between attempts | **The core thesis** |
| H5 | Fading scaffolding teaches without feeling like a course | It reads as coursework | Learning-not-lessons |
| H6 | Silent auto-mask keeps them safe without friction | Users balk, or data leaks | Data safety |

---

## 11. Non-goals

- Course catalogue / lessons library
- Gamified streaks or daily-return mechanics
- Certification
- "Pick your AI tool" interface
- Image generation (despite being the audience's #2 actual AI use)
- The other 3 task types (research/decision, spreadsheet/data, workflow-figuring-out)
- Non-Marketing/Sales roles in v1
- Non-English drafts (v1 is English-only; Hinglish/Hindi is v-next — the rubric's signals are English-validated, §16)
- Subject-line evaluation (outside the 5-criterion body backbone for v1, §16)
- Paid tier / paywall
- Any human facilitator
- Product naming / branding (deferred)

---

# PART B: WHAT

## 12. Product concept

**Name:** *[TBD — naming deferred]*

**One line:** help a non-technical professional finish one real work task with AI, and be able to do it again.

**User:** a Marketing/Sales professional in India, no tech education, daily AI user.

**The angle:** practice on your *own* real task with help that fades — not lessons, not generic exercises.

**Aha Moment:** the user reads the finished outreach message for *their own* real prospect and realizes **"I made this — it's genuinely good — and I can see exactly what made it good."** In one glance: it wasn't generic AI output handed to them, and it wasn't a lesson — they made the key calls, the product fixed *their* actual draft, and they feel **capable, not taught.** This is the moment that defuses our biggest risk (Decision 2 — doing the task *for* them yet leaving them not understanding): the "I can see *why*" clause is the point. 🔵

**Why this is the honest experiment:** one real loop tests the core bet (practice → capability) cheaply, without building the whole product to find out.

### The inversion

| Every AI-learning product | This product |
|---|---|
| Starts with content / curriculum | Starts with your real task |
| Teaches concepts | Does the task *with* you |
| Measures completion / confidence | Measures an independent re-attempt |
| Generic exercises | Your own messy situation |
| More to learn | One thing, done, repeatable |

### The architecture in one product-sentence

Concrete-example front door → conversational personalize (with auto-mask) → AI-led fading-scaffold draft → rubric feedback loop → saved artifact → later nudge + instrumentation. *(Technical architecture deferred to design + engineering.)*

### Non-negotiables

| Constraint | What it means | Basis |
|---|---|---|
| Feedback is guidance, never a score | No grades to an already-anxious user | Decision 8 |
| Sell utility, never "learning" | 45% aren't learners 🟢 | Decisions 2, 10 |
| No blank box at entry | 36% "where do I start" 🟢 | Decision 6 |
| Mask PII before any persist or model call | B2C, no compliance layer | Decision 9 |
| v1 never depends on the return attempt | Measure it, don't gate on it | Decision 4 |
| Model is invisible; the product owns the calls | Not a tool-picker | ProblemSolutionBase 🟡 |

### Why not just tell them to use ChatGPT — and why they can trust us

They already do — 64% daily — and still stay unconfident (36%). 🟢 The missing pieces are guided application, credible feedback, and a repeatable rep, which raw chat doesn't give. Concretely, the edge is three things:

- **A fixed, evidence-based standard vs. a flattering one.** Raw ChatGPT judges a draft against whatever it feels like in the moment and leans toward pleasing the user — it will call a weak message great. Our judgment applies the **same criteria every time, each grounded in large-N evidence** (§16), so it won't wave through the things the data says kill replies. *This* is why the user can trust the feedback: it's not the model's mood, and it's consistent enough to build on.
- **It catches the specific failure patterns raw AI produces.** Left alone, ChatGPT tends to write long, "I hope this finds you well," multiple-ask emails — because it optimizes for sounding *complete*, not for getting a reply. Our criteria (one clear ask, ~50–125 words, plain language, no fluff) are tuned to the opposite.
- **The user learns *why*.** ChatGPT hands over output and the user learns nothing repeatable; our feedback points at *their* actual draft and explains the fix — the mechanism that's meant to build lasting capability.

**Honest caveat:** the model *underneath* us may be the same kind of LLM. The edge isn't a smarter engine — it's the **guardrails around it** (a grounded standard, a feedback loop, fading help). Whether that produces *lasting* capability is still 🔵 — it's exactly what v1 exists to test. Grounding makes our *standard* credible; only real users prove the *product* works.

---

## 13. Key features

### P0

| # | Feature | Description | Impact | Effort | Owner |
|---|---|---|---|---|---|
| 1 | Recognition home | 3–4 concrete Marketing/Sales outreach situations + a scoped "something else" escape (a *"got a different outreach message?"* intake, not an open box) | HIGH | LOW 🔵 | Tarun |
| 2 | Personalize intake | Few-word conversational fill-in of the picked situation | HIGH | LOW 🔵 | Tarun |
| 3 | Auto-mask | Silent PII → placeholder + reassurance, before persist/model-send | HIGH | MED 🔵 | Tarun |
| 4 | Guided fading-scaffold draft | AI drafts with visible reasoning, hands the user 1–2 key decisions | HIGH | MED 🔵 | Tarun |
| 5 | Rubric feedback (not a score) | Concrete fixes vs. expert backbone + 1–2 personalized criteria | HIGH | MED 🔵 | Tarun |
| 6 | Artifact + portfolio | Save the reusable message; running history as "proof" | MED | LOW 🔵 | Tarun |
| 7 | Outcome-tied nudge | One nudge pinned to their real next occurrence | MED | LOW 🔵 | Tarun |
| 8 | Unaided-attempt capture | Instrument help requests / AI turns / time | HIGH | MED 🔵 | Tarun |

*(Effort tags are 🔵 — not yet engineering-estimated.)*

**Scope guardrail (off-scope inputs).** The "something else" box is a scoped outreach-intake, so most off-scope requests never arise — but a free-text box will still catch some. A **soft funnel** handles them (never an open ChatGPT): a lightweight intent check routes the input — an **outreach message** of any flavor flows straight into the normal loop (personalized criteria mapped from the nearest curated situation); a **real-but-off-scope task** (spreadsheet, LinkedIn post, a different role's work) gets a *warm boundary*, not a dead end — "that's not something I do yet; right now I'm great at outreach messages" plus an optional "want me to remember you asked for this?" (roadmap signal for v-next); **abuse / prompt-injection / harmful** input is refused safely and never executed. When the check is unsure, treat it as outreach and continue. Masking (Decision 9) applies to whatever they type. *Rationale: a hard "we only do outreach, goodbye" gate would turn the friendly escape into a trapdoor for an already-overwhelmed user; an open best-effort box would make us generic ChatGPT and void the rubric — the soft funnel is the only path that stays friendly and holds the scope line.* 🔵

### P1

*[To define with owner — depends on `design.md` and v1 learnings.]*

### P2 / Later

- The other 3 task types
- Additional roles beyond Marketing/Sales
- Paid tier
- Naming / branding

### Not building

Course/lessons, streaks, certification, tool-picker, image generation, human facilitator. *(see §11)*

---

## 14. Instrumentation and event spec

The instrumentation **is** the experiment (§8). Product-level events below; exact event/property names deferred to design + engineering. 🔵

| Event | Properties | Fires when | Answers |
|---|---|---|---|
| `attempt_started` | attempt_type (guided \| unaided), scenario | User starts a task | Funnel |
| `draft_completed` | rubric_pass, revision_count | A draft clears the backbone | First real win (H1) |
| `feedback_acted` | criterion, before/after | User revises after feedback | Is feedback trusted (H2) |
| `nudge_sent` / `unaided_started` | scenario | Nudge fires / user returns | Return loop (H3) |
| `unaided_completed` | help_requests, ai_turns, time_to_done, rubric_pass | Later attempt ends | Capability delta (H4) |

---

## 15. Key flows

### Primary flow

`Recognition home → pick a situation → personalize (auto-mask fires) → AI-led fading-scaffold draft → concrete feedback → revise → save artifact`

### Return / measurement flow

`Real recurrence → outcome-tied nudge → user-led unaided attempt → instrument help/turns/time → capability delta`

### Data-safety flow

`User pastes real, messy text → auto-mask swaps identifiers for placeholders BEFORE persist/model-send → gentle reassurance → normal flow continues`

*(Structure 🟢 from decisions; effectiveness 🔵 unvalidated.)*

---

## 16. Key logic

### The judgment model (product-level, not code)

The judgment the user can't supply for themselves (they use AI daily yet 36% can't tell if the output is good 🟢) comes from a **fixed expert rubric backbone** — the same five criteria every time — plus **1–2 criteria personalized** from the user's stated goal. The user never sees the rubric, a checklist, or a score: they see one or two concrete, draft-specific fixes at a time, framed as an edit *they* make. *(Decision 8.)*

**A provenance note, up front (so the tags below aren't misread):** our survey established *that* this user can't judge quality — it never asked *what makes a good outreach message*. So only the **need** for external judgment is 🟢. The five backbone criteria are now **grounded in named, large-sample evidence** — Gong (304,174 emails), Boomerang (40M emails), Backlinko (12M emails), Woodpecker (20M emails), Lavender, and the practitioner 4-T framework (Josh Braun) — **secondary evidence, 🟡, not survey-verified and not academic** (these are large-N vendor analyses + expert frameworks, cited per-criterion below). The evidence is *not uniform*: B1/B2/B4 are data-backed 🟡; **B3 (tone) is our weakest — guide-level consensus only, 🟡‑weak**; B5 is data-adjacent 🟡. The specific pass/fail *lines*, the choice of five, and the per-goal criteria remain our design **🔵**. This matters because the experiment's credibility rests entirely on this backbone being genuinely expert (§18, Decision 8). Grounding closes the *provenance* half of that gate; the *remaining* half — a discrimination test that the rubric correctly separates known-good from known-bad real messages — stays a **before-build** step (§24).

#### The fixed backbone (5 criteria, same every message) 🟡

Each criterion is scored internally as **pass / needs-work**. "Personalization" here means *earned relevance + recipient-centered framing* — a real reason this reaches this person, and value framed around them — **not** a token first name (an expert fails a mail-merge that only swaps `{FirstName}`).

**The five are universal — the message *stage* tunes them, it doesn't change the set.** The intake tells us whether this is a cold, warm, or follow-up message; that stage adjusts how **B1** and **B3** are *evaluated and phrased*, not which criteria apply. (Gong's 304K-email data: a soft "interest" ask wins on a cold first touch, a specific-time ask wins once the prospect is engaged — same criterion B1, stage-tuned bar.)

| # | What an expert checks | Why it's the bar | Passes when | Fails when | How the user hears it (never a score) | Evidence |
|---|---|---|---|---|---|---|
| **B1** | **One clear, low-friction ask** | The reader must know exactly what to do and find it easy; two asks or a vague one kills the reply; a *high-friction* ask on a cold touch suppresses replies | Exactly one action, stated plainly; friction matched to stage — a low-commitment "interest" ask when cold, a specific-time ask once engaged | No ask / multiple asks (stacking asks = "reasons to do nothing") / vague ("let me know your thoughts") / high-friction on a cold touch ("30-min call this week?") | "You're asking for a call *and* a doc review — a busy prospect does at most one, so pick the one you want most." / "Your ask is in the last line; move it up so they see it at a glance." | Gong 304K — single, stage-appropriate CTA (🟡) |
| **B2** | **Earned relevance & recipient-centered framing** (this is "personalization") | Interchangeable blasts get ignored; a *situational* reason-for-contact and a *their-side* benefit earn the read — **situational awareness, not demographic/token merge** | Opens with a true, specific reason it reaches *them* now; value framed around their goal/problem | "I hope this finds you well" / could go to anyone / a token first-name merge with no real reason / every line is "I / we / our product" | "This could go to anyone — add the one detail that makes it clearly about *them*." / "Every sentence is what *you* offer; say what changes for *them*." | Backlinko 12M (+32.7% personalized body), Woodpecker 20M, Apollo (situational>demographic), Josh Braun 4-T (🟡) |
| **B3** | **Right tone for the relationship** | Tone must fit cold vs. warm vs. follow-up and the power balance; pushy burns the lead, groveling loses credibility; a follow-up should add value, not guilt | Matches the relationship; confident and respectful; a follow-up is graceful (offers an easy out), not guilt-trippy | Presumptuous on a cold touch ("as we agreed") / apologetic / aggressive ("circling back AGAIN") / "just checking in" with no new value | "This reads a bit pushy for a first touch — make it an offer they can decline." / "No need to apologize for following up; one confident line is enough." | Practitioner best-practice consensus (SuperOffice et al.) — **🟡‑weak, guide-level, no big-N data** |
| **B4** | **Respects their time** (length & scannability) | Prospects skim on mobile in seconds; density buries the point; simpler language measurably lifts replies | ~50–125 words; 3–4 short sentences / short paragraphs; plain, ~3rd-grade-readable language; graspable in one glance | Wall of text; 150+ words / several long paragraphs; complex, college-level phrasing; the point is buried | "This is four dense paragraphs — a prospect skims in ~8 seconds. Cut it to the ask plus one reason." | Boomerang 40M (50–125 words; 3rd-grade level +36%), Gong (≤100 words / 3–4 sentences), Lavender (🟡) |
| **B5** | **No fluff — plain, direct language** | Filler dilutes the ask and signals a template; hedging and clichés read as auto-generated | No clichés, hedging, or filler pleasantries; every line advances relevance, value, or the ask; says it directly | "I wanted to reach out," "just checking in," "circle back," "synergy," "maybe we could possibly…" | "'I wanted to reach out to see if maybe…' — say it directly: 'Can we…'." | Boomerang (plain language lifts replies), Gong / Lavender (cut filler) — data-adjacent (🟡) |

*(B4 is about **length/structure**; B5 is about **language directness** — distinct axes that used to blur together.)*

#### How each criterion is evaluated (hybrid — this is what keeps the *judgment* trustworthy) 🔵

Grounding the *criteria* isn't enough: deciding whether a given draft **passes** a criterion is itself a judgment, and if we let an LLM do all of it, we've reintroduced the same untrustworthy AI-opinion the user can't rely on. So evaluation is **split by what's measurable**:

- **Deterministic (computed from the text, not an opinion):** **B4** — word count (~50–125), sentence/paragraph structure, and reading level (~3rd-grade target) are measured with real text metrics. A number, not a vibe.
- **Anchored LLM judgment (with worked pass/fail examples in the prompt):** **B1, B2, B3, B5** genuinely need reading comprehension. The model returns pass / needs-work **plus the exact quote it's reacting to** — never a bare verdict — against fixed anchor examples so it stays consistent.

This hybrid is the single biggest credibility lever in the rubric (§18 names the residual risk); the before-build discrimination test (§24) validates it end-to-end.

#### The personalized criteria (1–2, from the user's goal) 🔵

After intake, the product layers **1–2 extra pass/needs-work criteria** onto the backbone, drawn from a **curated library** mapped to the known situations — **not generated fresh per task** (Decision 8 explicitly rejected an invented per-task rubric; on the free-text "something else" path we map to the *nearest curated* criterion rather than inventing one). These are **advisory, not win-gating** — they sharpen relevance but never block the win (see Internal scoring). Curated mapping:

| Situation (recognition-home scenario) | Added criterion |
|---|---|
| Re-engage a prospect who went quiet | Gives a **graceful, low-pressure reason to reply now** — a fresh hook, not just "following up" |
| Book a demo / meeting | Makes the meeting the **obvious low-friction next step** — specific, short, with a clear payoff for their time |
| Cold intro to a new prospect | **Establishes credibility fast** — one relevant proof point, without bragging |
| Follow up after an event | **Anchors to the shared context** — references the specific event/conversation naturally |

#### Internal scoring (never shown to the user) 🔵

Not all criteria gate the win — otherwise an overwhelmed user who can't clear one is trapped in a loop, which is the exact failure we're built to avoid (Decision 4). So:

- **Core (must-pass to count as a clean win):** **B1** (clear ask), **B2** (earned relevance), **B4** (respects their time). These are our data-backed criteria.
- **Advisory (surfaced, never win-gating):** **B3** (tone), **B5** (fluff), and the personalized criteria.
- **Loop cap:** after **max 3** feedback→revise loops, the user may ship with any remaining misses noted gently — and we **record** what shipped un-cleared (it's useful capability data, not a failure).

| | Definition | Feeds |
|---|---|---|
| **Rubric pass** (the boolean in §14) | All **core** criteria (B1/B2/B4) in "pass" state; advisory criteria are logged but don't gate | `draft_completed.rubric_pass`, `unaided_completed.rubric_pass` |
| **Capability signal** | *Which* criteria passed on the **first** draft (before any revision) + *how many* feedback→revise loops it took to clear | The delta in H4 — on the later unaided attempt, does the user clear more criteria on the first try, with fewer loops? |

**Measurement-validity caveat (be honest about the confound):** part of the raw guided→unaided delta (help requests, AI turns) reflects the scaffold **fading by design**, not learning — of course an AI-led first attempt uses more AI than a user-led later one. The *cleaner* capability read is **within the drafts themselves**: which criteria the user clears on their **first unaided draft** (no scaffold), and how few loops it takes — compared against the guided attempt's first draft. That isolates "got better" from "we removed the help."

The user is never shown a count, a total, or "X/5" — that's the grade Decision 8 forbids. This score exists only for the measurement in §8/§14.

#### Feedback-delivery rules (product-level)

- Surface the **1–2 highest-impact misses first**, never the full list at once — dumping five fixes on an already-overwhelmed user is the overwhelm we're killing (§2 🟢).
- Every fix **quotes or points at the actual draft** — generic tips are the theory this audience rejects (Rule 6 below).
- Framed as *"here's the change to make,"* never *"here's what's wrong / your score is."*
- **Claim quality, never outcome.** The product may say *"this is a strong message by expert standards"* — never *"this will get a reply."* A reply depends on timing, targeting, and luck we don't control; one ignored-but-good message would otherwise shatter the trust we built. The Aha's "genuinely good" means *meets the expert bar*, not *guaranteed to land*.
- **When criteria conflict, brevity/clarity wins the tie.** Earned relevance (B2) can pull toward adding detail while "respects their time" (B4) pulls toward cutting — resolve toward the ask plus one earned reason, not more.

#### v1 scope of the rubric (deliberate, overridable)

- **English outreach only.** Every signal we grounded — reading level, cliché/fluff detection, the word-count norms — comes from **English** studies; we can't credibly judge a Hindi or Hinglish draft with an English-validated rubric. v1 is English-only, stated to the user; Hinglish/Hindi is v-next. *Honest flag: this likely trims the addressable user set (India audience) and is worth validating — but pretending the rubric works in Hindi would be the ungrounded overreach we're removing.* 🔵
- **Subject line is out of the 5-criterion body backbone.** It affects replies (Backlinko), but it isn't what the guided draft and feedback loop operate on; kept out to preserve the clean "same five every time." Revisit post-v1. 🟡

### The capability-delta model

Compare the guided attempt vs. the later unaided attempt on: help requests, AI turns, time-to-done, and unscaffolded rubric pass. 🔵

| # | Rule | Edge case / exception |
|---|---|---|
| 1 | Never show a numeric score to the user | Keep it internal for measurement only |
| 2 | Mask identifiers before any persist or model call | If uncertain, err toward masking |
| 3 | First attempt is AI-led; later attempt is user-led | Scaffolding fades on purpose |
| 4 | v1 never blocks on the return attempt | If the user never returns, the first win still counts |
| 5 | Sell utility; never frame as a lesson | No "course"/"lesson" language anywhere |
| 6 | Feedback must reference the actual draft | Generic tips = the theory they already reject |
| 7 | One nudge per completed task, tied to a real occurrence | No streaks / daily mechanics |
| 8 | Surface only the 1–2 highest-impact rubric misses at a time | Never dump all five fixes — that recreates the overwhelm (§2 🟢) |
| 9 | Only **core** criteria (B1/B2/B4) gate the win; cap at 3 revise loops | Advisory misses (B3/B5/personalized) are noted, never trap the user (Decision 4) |
| 10 | Claim quality, never a reply/outcome | "Strong by expert standards," not "this will land" |
| 11 | Read the delta from the **first unaided draft**, not raw AI-turn counts | Raw turns fall by design as the scaffold fades — that's not learning |

*(Technical rules — validation, timeouts, model routing — deferred to engineering.)*

---

## 17. User stories

### Job 1: start without overwhelm

| # | Story | Acceptance criteria | Pain point |
|---|---|---|---|
| U1 | As a Marketing/Sales pro, I want to pick my situation from real examples, so I don't face a blank box. | 3–4 concrete situations + escape; one tap to start | §1 (36% where-to-start) |

### Job 2: do the task with help that fades

| # | Story | Acceptance criteria | Pain point |
|---|---|---|---|
| U2 | I want the tool to draft *with* me and show why, so I'm not lost. | Visible reasoning; I make 1–2 key calls | §1 (25% too-difficult) |
| U3 | I want to know if it's actually good, so I can trust it. | Concrete fixes vs. rubric, not a grade | §1 (can't judge / unconfident) |

### Job 3: keep the win and prove I can do it

| # | Story | Acceptance criteria | Pain point |
|---|---|---|---|
| U4 | I want to save the message and see my history, so I have something to show. | Artifact persists; portfolio view | Growth model |
| U5 | On my next real one, I want to try it myself with backup, so I know I've got it. | Nudge → unaided attempt; help available | North Star |

---

## 18. Trade-offs, limitations, dependency risks

### What this product does not solve

| Area | Why it is out |
|---|---|
| A guarantee they *understand* (not just got the output) | Known tension — a do-it-with-you product can still leave gaps |
| The other 3 task types / other roles | Nail one loop first |
| Image generation | Not a checkable work task |
| Monetization | Prove the loop first |

### The trade-offs I made on purpose

| Trade-off | What I gave up | Why |
|---|---|---|
| One task type, one role | Breadth | Friendliness + a real testable loop (Decisions 3, 5) |
| Free, no paywall | A revenue signal now | Prove the loop first; WTP is soft anyway (11% "definitely") 🟢 |
| No streaks | A habit-retention lever | Off-brand and orthodox; utility hook instead (Decision 10) |
| Instrument, don't gate, the return | Certainty on capability in v1 | Ship something honest without betting on return behaviour (Decision 4) |
| Fixed rubric over generated | Adaptivity | Credibility and consistency (Decision 8) |

### Dependency / known-tension risks

| Risk | Impact | Fallback |
|---|---|---|
| Comprehension risk (still doesn't understand) | Fails North Star | Watch unaided-attempt data; adjust the scaffold |
| Return dependency (nobody comes back) | North Star unmeasurable | First win still counts; utility hook, not a streak |
| Rubric criteria not genuinely expert | Silently invalidates the experiment | **Grounded** in named large-N sources (§16); before-build discrimination test remains (§24) |
| Rubric *evaluation* unreliable (the LLM applying the criteria is inconsistent / hallucinates a pass) | A grounded rubric applied badly is still untrustworthy | **Hybrid** — deterministic metrics for B4, anchored-example LLM judgment for B1/B2/B3/B5 (§16); validated by the before-build test |
| Core mechanism wrong (practice doesn't transfer) | The thesis fails | That's the point — v1 *is* the test (Decision 1) |
| Model / API / DB dependencies | — | Deferred to engineering |

---

# PART C: HOW

## 19. Key milestones

*Engineering milestones are defined after `design.md` + the implementation plan. Product-level status:*

| Milestone | Owner | Planned | Actual | Comments |
|---|---|---|---|---|
| Product detailing locked | Tarun | — | 2026-08-18 | `v1ProductDetailing.md` |
| PRD drafted | Tarun | 2026-08-18 | in progress | This doc |
| Design finalised | Tarun | — | | `design.md` (owner will share) |
| ERD + implementation plan | Tarun | — | | After design |
| Build | Tarun | — | | After implementation plan |

## 20. Operational checklist

| Team | Prompt | Y/N | Action | Done? |
|---|---|---|---|---|
| Analytics | Needed? | Y | It's the experiment — define event spec after design | |
| Localisation | Multiple languages? | 🔵 | India; English + ? — to decide | |
| Legal / Privacy | Sensitive data? | Y | Auto-mask before persist; store no raw PII (Decision 9) | |
| AI / Model | Own key, server-side | Y | Product owns the calls; model invisible | |
| Partners | External partner impacted? | N | Model provider only | |
| Risk | Core mechanism unproven | Y | v1 is the test (Decision 1) | |

## 21. Marketing / GTM

Individual-led PLG: the user's saved artifact becomes the proof they carry into their organisation; no direct B2B sales in v1; free. 🔵 *(growth thesis unvalidated — details to work on)*

## 22. Rollout and phasing

**V1:** recognition entry, personalize + auto-mask, guided fading-scaffold outreach draft, rubric feedback, artifact + portfolio, outcome-tied nudge, unaided-attempt instrumentation — Marketing/Sales outreach message only.

**V-next:** the other 3 task types, additional roles, a richer portfolio.

**Later:** paid tier, org/B2B motion, naming/brand.

### 22.1 The demo / walkthrough script

*[To work on together — after design.]*

---

# PART D: WORKING SECTION

## 23. Meeting notes

Two `/grill-me` sessions produced this direction (problem/solution convergence, then a 10-decision product-detailing grill). Full provenance in `v1ProductDetailing.md`.

## 24. Open questions

| Question | Owner | Deadline / trigger |
|---|---|---|
| Define the Aha Moment | Tarun + Claude | ✅ Resolved 2026-08-18 (see §12) |
| Set numeric targets in Success Criteria (§9) | Tarun | Before build |
| ~~Exact rubric backbone criteria for an outreach message~~ | Tarun | ✅ Drafted 2026-08-18 (§16, 5 backbone + per-goal criteria) |
| ~~Ground the rubric backbone in named expert sources~~ | Tarun | ✅ Done 2026-08-19 — grounded in Gong (304K), Boomerang (40M), Backlinko (12M), Woodpecker (20M), Lavender, Josh Braun 4-T (§16) |
| **Validate the rubric** — discrimination test: does it correctly separate known-good from known-bad real messages? | Tarun | Before build — the *remaining* half of the credibility gate (§18); grounding done, empirical test pending |
| ~~Rubric mechanics: stage-tuning, hybrid evaluation, win threshold + loop cap, quality-not-outcome, English-only, subject-line scope, off-scope guardrail~~ | Tarun + Claude | ✅ Resolved 2026-08-19 via `/grill-me` (§16, §13) |
| Auto-mask mechanism (detect-and-mask vs. guide-abstract) | Design pass | `design.md` |
| Does practice actually transfer? (the core bet) | — | Validated by v1 itself |

### Staging the Aha Moment (rough-first-attempt vs. shaped-final contrast)

Optional design idea to make "I made this" undeniable — logged as open questions, not a decision:

| Question | Owner | Deadline / trigger |
|---|---|---|
| Do we stage the Aha with a visible "your rough attempt → shaped final" contrast at all? | Design pass | `design.md` |
| Does that require capturing the user's *own* rough attempt first — and will this audience produce one before AI help, given they stall on where to start (36%)? | Design pass | `design.md` |
| Does showing the contrast backfire — making the AI's help feel like *it* did the work, undercutting "I made this"? | Design pass | `design.md` |
| Where in the flow does the contrast surface (at completion? on save?) without adding friction for an overwhelmed user? | Design pass | `design.md` |

## 25. Decision log

The 10 decisions locked in `v1ProductDetailing.md` (full *why* + rejected alternative there):

| # | Decision | Confidence basis |
|---|---|---|
| 1 | v1 is the experiment, not a product that assumes its thesis | 🔵 (mechanism never asked) |
| 2 | Direction-led promise; comprehension handled by doing-it-with-them | 🟢 audience / 🔵 design |
| 3 | Anchored on Marketing/Sales drafting | 🟢 (20% plurality) |
| 4 | Success = first win now; later attempt instrumented, not gated | 🔵 |
| 5 | The one artifact = a recurring outreach message | 🔵 |
| 6 | Front door = concrete-example entry | 🟢 (36% where-to-start) |
| 7 | Fading scaffolding ("I do → we do → you do") | 🔵 |
| 8 | Judgment = fixed rubric backbone, shown as feedback not a score | 🔵 |
| 9 | Data safety = silent auto-mask + reassurance | 🔵 |
| 10 | Re-engagement = one outcome-tied nudge (no streaks) | 🟢 audience / 🔵 design |

---

*Evidence sources: primary-research workbook `AI & Tech for next gen professionals (Responses) (1).xlsx` (n=160; strict cut n=44), `ProblemSolutionBase.md`, `NonTechnical_User_Causal_Insights.md`, `CompetitiveLandscape.md`, `WebsearchINSIGHTS.md`. Confidence per the tag on each claim.*
