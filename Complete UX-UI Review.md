# Complete UX/UI Review — NOD Workspace

> Source: external review agent, shared 2026-08-21. Filename uses a hyphen (`UX-UI`)
> because `/` is a path separator. This document is the authoritative chunk list for
> the workspace UX/UI fix pass. Each chunk carries its own acceptance criteria and a
> suggested commit. Work order and per-chunk verification are at the bottom.
> **Build log with commit status is maintained at the end of this file.**

## Shared NOD context

NOD helps a non-technical Marketing/Sales professional finish one real outreach message
and become less dependent on AI over time.

The locked product model is:

- Persistent two-frame workspace.
- Left: only the immediately previous completed frame, readable and editable.
- Right: only the active frame.
- No third column, stepper, progress percentage, score, checklist, streak, course, or dashboard.
- Default path: user writes their own draft.
- Fallback: NOD drafts one and the user taps the weak line first.
- Feedback must point to the user's actual words.
- No reply or meeting guarantees.
- Calm Correspondent visual system: warm paper, ink, restrained blue, Spectral for editorial
  statements, Hanken for functional UI, square cards, no glass, no green/red grading cues.
- Preserve the four equal recognition choices.
- Keep the NOD-draft fallback visually quieter than the write-your-own path.
- Make one chunk only, verify it, commit it, then stop for review.
- Do not push or combine unrelated changes.

Authoritative references:

- v1PRD.md §§12–16, 17–18, 20, 24–25
- v1ProductDetailing.md Decisions 6–11
- design.md
- journey.md
- NEXT-SESSION.md

---

# Chunk 1 — Keep the real task visible while writing

### Problem
Screen: Personalize → Compose. Files: `design/mockups/workspace.html:216`, `:282`.
Compose says "Your task and details are on the left," but the left recap only shows
"HOW YOU'RE STARTING / Writing my own version." Recipient, context, and ask disappear
before the user writes. Conflicts with journey.md §3 ④a (situation + specifics must stay
visible so the write-your-own path is never a blank page).

### Required change
Add a compact writing brief inside the active right frame, above or beside the composer:
Situation, Recipient, Context, Ask. Inline brief — not a card-in-card, not a third column.

### Acceptance criteria
- The composer still requires the user to write the message themselves.
- The user can see the situation, recipient, context, and ask while writing.
- The left column still shows only the immediately previous frame.
- Editing Personalize restores the same values in the brief.
- The brief is readable but visually secondary to the writing area.
- No new stepper, history stack, or dashboard is introduced.

### Suggested commit
`fix(workspace): keep task brief visible while drafting`

---

# Chunk 2 — Make the feedback state honest

### Problem A — the prototype overclaims quality
Screen: Feedback. Files: `shared/flow.js:154`, `:185`, `workspace.html:319`.
A very short draft that does not demonstrate relevance/value/length still shows
"This reads clean. / I checked it against the standard and found nothing worth changing. /
Meets the standard." The evaluator only checks soft openers, missing `?`, and >150 words —
an explicit heuristic stand-in. v1PRD §16 requires the *real* evaluator (deterministic
length/structure/readability + anchored judgment + exact quoted evidence).

### Required change (UI pass only — do NOT build the backend evaluator here)
- Stop presenting a heuristic "no obvious phrase issue" as a complete expert-standard pass.
- Keep an honest, visually subordinate prototype disclosure.
- Use wording like "This prototype check found no obvious issue" when no heuristic issue is found.
- Preserve the blue quality signal for the future real evaluator; never green/red.

### Problem B — feedback recap contradicts the result
Left recap always says "One line tightened / Meets the standard," even on a clean state.
Derive the recap from actual state: `No changes needed` / `One line tightened` / `Kept my wording`.
Only show "One line tightened" after a real edit was accepted.

### Acceptance criteria
- The prototype never claims a full expert evaluation when it only ran the heuristic.
- The prototype note remains truthful and visually quiet.
- Feedback and recap always describe the same outcome.
- No score, checklist, X/5, or pass/fail grading is added.
- The final evaluator remains explicitly deferred to build.

### Suggested commit
`fix(feedback): make prototype result and recap truthful`

---

# Chunk 3 — Make Saved support the next real use

### Problem A — saved history is not visible
Screen: Saved. File: `workspace.html:334`. journey.md §3 ⑥ requires a reusable saved artifact,
"Your saved messages," a running history, and reuse. Current screen shows only the latest
message, Copy message, and Start another →.

### Required change
Render the saved artifact as the newest row in a simple "Your saved messages" list:
Situation, Date or "Just saved", one-line preview, Reuse →. Plain rows — not a dashboard
or portfolio analytics.

### Problem B — "Start another" clears the experience without a return cue
`workspace.html:342` reloads the page. The saved artifact must survive a new attempt.

### Acceptance criteria
- The saved message remains available after starting another task.
- The newest artifact is visibly identifiable.
- Reuse starts a new attempt with the saved message as a starting reference.
- No streak, progress meter, completion percentage, or history dashboard is introduced.

### Suggested commit
`feat(saved): show reusable message history`

---

# Chunk 4 — Add the real return hook without creating a habit app

### Problem
journey.md §3 ⑦ and v1PRD Decision 10 require one outcome-tied nudge connected to the user's
real next outreach occurrence. Current Saved gives no reason to return except "Start another →."

### Required change
Add one calm, utility-led next-use cue, e.g. "Got another prospect to follow up with? Do this
one yourself — I'll jump in if you're stuck." A single contextual prompt — not a streak,
reminder calendar, notification center, or daily-habit mechanic.

### Acceptance criteria
- The cue is tied to the completed situation.
- It reinforces the write-your-own path.
- It does not show progress, scores, or "come back tomorrow."
- It does not block copying the current message.
- The product remains useful even if the user never returns.

### Suggested commit
`feat(saved): add outcome-tied next-use cue`

---

# Chunk 5 — Fix Edit state and prevent contradictory downstream data

### Problem
Edit must preserve the edited frame's values, reset/recompute downstream state, and prevent
contradictions. Current implementation risks retaining old details when the situation changes.
Relevant code: `workspace.html:227`, `:236`, `:275`.

### Acceptance test
1. Choose "A prospect went quiet." 2. Enter recipient, context, ask. 3. Choose Write my first
version. 4. Edit the situation from the recap. 5. Choose "Book a meeting or demo." 6. Confirm
old recipient/context/ask are not silently reused. 7. Confirm old draft/feedback/saved cannot
survive into the new scenario. 8. Confirm editing only the details frame preserves the situation
but resets downstream draft state.

### Suggested commit
`fix(workspace): reset downstream state when editing prior frames`

---

# Chunk 6 — Make the privacy promise technically true

### Problem
UI says "Masked before processing." Requirements (v1ProductDetailing Decision 9; v1PRD §§15, 20;
design.md auto-mask) require identifiers masked before persistence/model processing. The prototype
stores raw values in localStorage (`shared/flow.js:9`).

### Required change (build)
- Keep original names available only for the user's local display/copy experience.
- Store and send masked values for persistence/model processing.
- Ensure the reassurance matches the implementation.
- No warning gate. This is a data-safety implementation requirement, not just copy.

### Acceptance criteria
- Raw identifiers are never persisted to the backend.
- Raw identifiers are never sent to the model.
- The user can still see the original name locally where intended.
- Copy restores the real-name version only through the approved local mechanism.
- The privacy reassurance is technically accurate.

### Suggested commit
`fix(privacy): separate local display values from masked processing data`

---

# Chunk 7 — Repair responsive workspace mechanics

### Problem A — mobile order is wrong
`workspace.html:155` puts active content first and recap second. Requirement: recap immediately
above active work; active work remains visually dominant; never squeeze desktop columns.

### Problem B — viewport sizing and overflow are fragile
`workspace.html:26`, `:32` use only 100vh; mobile body padding can cause horizontal overflow.

### Required change
- Use `min-height:100vh` plus `min-height:100dvh`.
- Stack recap above active work at the narrow breakpoint.
- Keep active work stronger through spacing and type, not order reversal.
- Remove body/stage width overflow.

### Acceptance criteria
- No horizontal scrolling on narrow screens.
- Recap is directly above active content.
- Header remains stable.
- Long headings wrap without pushing the CTA far away.
- Optional context and Continue remain close.
- Textarea does not dominate the mobile viewport.

### Suggested commit
`fix(responsive): stack recap above active workspace safely`

---

# Chunk 8 — Restore the persistent header rule and verify desktop width

### Problem A — the header hairline is hidden
Design requires a subtle hairline below the stable brand lockup. `workspace.html:41` sets
`.ghair` to `display:none`.

### Problem B — the desktop grid can overflow its padded container
440px left + 64px gap + 700px active inside a stage that also has horizontal padding
(`:32`, `:44`).

### Required change
- Restore the neutral hairline without changing the header's position or size.
- Verify the desktop grid at the supported viewport; use fluid constraints / a correctly sized
  container if it overflows.
- Do not reintroduce a branding sidebar.

### Suggested commit
`fix(workspace): anchor header and contain desktop columns`

---

# Chunk 9 — Final visual refinement only after the product fixes (do last)

### Areas to audit
Left recap readability + Edit hit area; active composer whitespace after the brief is added;
textarea height vs. a short outreach message; card shadow weight vs. design.md tokens; helper
text contrast at the #6B6B61 minimum; CTA wording + proximity to the final relevant field.

### Do not change
Warm paper; Spectral/Hanken pairing; four equal recognition choices; square cards; blue
verification signal; primary write-your-own dominance; quiet NOD-draft fallback; persistent
header identity.

### Suggested commit
`polish(workspace): refine hierarchy after flow fixes`

---

## Recommended order for the building agent
1. Chunk 1 — preserve task brief.
2. Chunk 2 — make feedback and recap truthful.
3. Chunk 5 — repair Edit state.
4. Chunk 7 — repair responsive behaviour.
5. Chunk 8 — repair header/grid mechanics.
6. Chunk 3 — render saved history and reuse.
7. Chunk 4 — add the next-use cue.
8. Chunk 6 — implement privacy separation.
9. Chunk 9 — final visual polish.

After every chunk:
- Run the canonical landing → workspace → saved flow.
- Test the recorded scenario: Recipient "Tarun, a marketing lead I met at the expo",
  Context "He went quiet after our demo", Ask "A 15-minute call".
- Test both write-your-own and NOD-draft fallback paths where relevant.
- Verify no contradiction with journey.md or design.md.
- Commit only that chunk.

---

## Build log (maintained by the building agent)

| Order | Chunk | Status | Commit |
|---|---|---|---|
| 1 | 1 — task brief | pending | — |
| 2 | 2 — feedback/recap honesty | pending | — |
| 3 | 5 — edit reset | pending | — |
| 4 | 7 — responsive | pending | — |
| 5 | 8 — header/grid | pending | — |
| 6 | 3 — saved history | pending | — |
| 7 | 4 — next-use cue | pending | — |
| 8 | 6 — privacy separation | pending | — |
| 9 | 9 — visual polish | pending | — |
