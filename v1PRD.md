# [name TBD]: help a non-technical professional finish one real task with AI — and do it again

**DRI:** Tarun | **Pod:** Solo founder — Learning Tech & AI (Case Study 4, Cohort 8)
**Status:** Define | **Created:** 2026-08-18 | **Last Updated:** 2026-08-18
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
| First real win (rubric-passing artifact produced) | 0 | *[TBD]* | Users can't reach a good draft | Primary | 🔵 | H1 |
| Feedback is trusted and acted on (revises toward rubric) | 0 | *[TBD]* | Users ignore the feedback | Primary | 🔵 | H2 |
| Later unaided attempt actually fires | 0 | *[TBD]* | Nobody returns | Primary | 🔵 | H3 |
| Capability delta on the later attempt (less help/turns/time) | 0 | *[TBD]* | No measurable improvement | Primary | 🔵 | H4 |
| Auto-mask never persists raw PII | — | 100% | Raw identifiers stored/sent | Guardrail | 🔵 | H5 |
| Core loop works without depending on the return | — | Yes | v1 blocked on return behaviour | Guardrail | 🔵 | H6 |

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

### Why not just tell them to use ChatGPT

They already do — 64% daily — and still stay unconfident (36%). 🟢 The missing pieces are guided application, credible feedback, and a repeatable rep, which raw chat doesn't give.

---

## 13. Key features

### P0

| # | Feature | Description | Impact | Effort | Owner |
|---|---|---|---|---|---|
| 1 | Recognition home | 3–4 concrete Marketing/Sales outreach situations + a "something else" escape | HIGH | LOW 🔵 | Tarun |
| 2 | Personalize intake | Few-word conversational fill-in of the picked situation | HIGH | LOW 🔵 | Tarun |
| 3 | Auto-mask | Silent PII → placeholder + reassurance, before persist/model-send | HIGH | MED 🔵 | Tarun |
| 4 | Guided fading-scaffold draft | AI drafts with visible reasoning, hands the user 1–2 key decisions | HIGH | MED 🔵 | Tarun |
| 5 | Rubric feedback (not a score) | Concrete fixes vs. expert backbone + 1–2 personalized criteria | HIGH | MED 🔵 | Tarun |
| 6 | Artifact + portfolio | Save the reusable message; running history as "proof" | MED | LOW 🔵 | Tarun |
| 7 | Outcome-tied nudge | One nudge pinned to their real next occurrence | MED | LOW 🔵 | Tarun |
| 8 | Unaided-attempt capture | Instrument help requests / AI turns / time | HIGH | MED 🔵 | Tarun |

*(Effort tags are 🔵 — not yet engineering-estimated.)*

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

A **fixed expert rubric backbone** for an outreach message — clear single ask, personalization, right tone, appropriate length, no fluff — plus **1–2 criteria personalized** from the user's stated goal. The numeric score is kept **internal** (for measurement); the user sees only concrete fixes. 🔵 *(the backbone must be validated as genuinely expert)*

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
| Rubric not genuinely expert | Silently invalidates the experiment | Expert-author and validate the backbone |
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
| Exact rubric backbone criteria for an outreach message | Tarun | Before/at build |
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
