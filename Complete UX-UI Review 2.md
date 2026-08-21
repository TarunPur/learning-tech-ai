# Complete UX/UI Review — Round 2 (post first 9-chunk pass)

External agent review of the live two-frame workspace, run end-to-end **after** the first
review was implemented and committed. Flow reviewed:

> Landing → situation → personalize → choose path → compose → feedback → saved → reuse.

**Test data used:**

- Recipient: *Tarun, a marketing lead I met at the expo*
- Context: *He went quiet after our demo*
- Ask: *A 15-minute call*

## Do not change

- Two-frame workspace model.
- Stable global header.
- One previous recap on the left only.
- One active frame on the right only.
- No sidebar, stepper, progress, score, checklist, green, or red.
- "Write my first version" remains primary.
- "Start with a NOD draft" remains a quiet fallback.
- Keep the four equal situation choices.
- Do not turn saved history into a dashboard.

## Process for every chunk

1. Implement only that chunk.
2. Test the canonical URL in the browser.
3. Verify the acceptance criteria.
4. Commit the change.
5. Report the commit hash before starting the next chunk.

> The most important point for the building agent: **do not start another broad visual
> redesign.** The current structure is close. The next improvements need to make NOD more
> truthful, context-preserving, privacy-safe, and genuinely useful on the second attempt.

---

## Chunk 1 — P0 UX: Align the product promise with the actual evaluator

**Screens:** Landing hero · Compose CTA · Feedback clean state · Saved badge.

**Current evidence:**
- Landing says NOD checks against a "proven standard" and "one fixed standard."
- Feedback says: "This prototype check found no obvious issue."
- Feedback also says: "The full expert standard comes with the built product."
- The current evaluator only checks soft openers, missing question marks, and messages over 150 words.

**Relevant files:** `shared/flow.js` · `workspace.html` · `landing-editorial-blue-v3.html`

**Required change:** Do not hide the prototype limitation while keeping the same heuristic. Choose one honest direction:
- Either make the product-facing language consistently describe this as a lightweight prototype check.
- Or implement a real initial slice of the locked B1/B2/B4 standard.

For the clean feedback state, show one concrete reason based on the user's actual draft. Example:
> "Your ask is one clear action, so the reader knows what to say yes to."

**Acceptance criteria:**
- Landing and workspace no longer make contradictory claims.
- Clean feedback teaches one reusable judgement.
- No generic "nothing worth changing" approval.
- No score, checklist, or grading language.
- Existing soft-opener feedback still works.

**Suggested commit:** `ux: align feedback promise with evaluator behavior`

---

## Chunk 2 — P0 UX: Fix masked persistence and saved-message privacy

**Screens:** Landing FAQ · Feedback · Saved message · Saved history · Copy action.

**Current evidence:**
- FAQ promises saved copies remain masked.
- Browser local storage currently contains the real recipient name inside `finalText` and history.
- Copy action says real names are filled back in, but the stored artifact is already unmasked.

**Relevant files:** `workspace.html` · `landing-editorial-blue-v3.html` · `shared/flow.js`

**Required change:**
- Persist masked message text in `finalText` and history.
- Keep real-name restoration only for the copy-to-send action.
- Ensure saved history visibly stays masked.
- Expand the masking logic beyond only the first name if the UI promises company-detail masking.

**Acceptance criteria:**
- Inspecting `localStorage['nod.flow']` does not reveal the real recipient name in saved message text.
- Saved history displays masked text.
- Copy output restores the real recipient name.
- FAQ copy and implementation now agree.

**Suggested commit:** `fix: keep saved artifacts masked until copy`

---

## Chunk 3 — P1 UX: Preserve the complete task brief in recap and fallback

**Screens:** Personalize · Left "Your details" recap · NOD draft fallback.

**Current evidence:** The user enters recipient / context / ask. The next left recap shows only recipient and ask — **context disappears.** The NOD fallback then invents unrelated content about June and a launch instead of using the captured context.

**Relevant files:** `workspace.html` recap rendering · `shared/flow.js` `composeDraft()`.

**Required change:** Left recap should show recipient, context, ask. The NOD fallback must use the actual captured context — do not replace "He went quiet after our demo" with hard-coded June/launch copy.

**Acceptance criteria:**
- Context remains visible immediately after Personalize.
- Context appears in the fallback draft or is clearly labeled as a generic sample.
- The active composer brief continues showing situation, recipient, context, and ask.
- Editing Personalize does not leave stale downstream text.

**Suggested commit:** `fix: preserve context through recap and draft`

---

## Chunk 4 — P1 UX: Add the scoped "something else" escape

**Screen:** Initial "What are you working on?" frame.

**Current evidence:** The live screen contains four situation cards only (prospect went quiet / reach out to someone new / book a meeting or demo / follow up after an event). The PRD and journey require a scoped escape for another outreach message.

**Required change:** Add one quiet option such as "A different outreach message." This must be a scoped outreach intake, not an open-ended ChatGPT box. Keep all four existing cards equal and prominent.

**Acceptance criteria:**
- Existing four situation cards remain unchanged and equal.
- A user with a different outreach task has a path forward.
- Off-scope tasks receive a warm boundary.
- Outreach tasks route into the normal NOD flow.
- No blank generic prompt replaces the recognition screen.

**Suggested commit:** `feat: add scoped different-outreach entry`

---

## Chunk 5 — P1 UX: Make "help fades" real on the second attempt

**Screens:** Saved screen · "Write another follow-up" · Second compose attempt.

**Current evidence:** The saved screen says "Do the next one yourself — I'll jump in if you get stuck." But the second attempt currently shows the same fields, writing hints, and scaffolding as the first attempt.

**Relevant files:** `workspace.html` next-use cue · `workspace.html` compose rendering/state.

**Required change:** Track that this is a later attempt and reduce assistance:
- Keep the task brief.
- Reduce recipe-like helper copy.
- Keep a quiet "I'm stuck" route that restores partial help.
- Do not add progress meters or streaks.

**Acceptance criteria:**
- Second attempt visibly feels lighter than first attempt.
- User still receives enough context to act.
- Help can return partially if the user is stuck.
- No course-like progress UI appears.

**Suggested commit:** `feat: reduce scaffolding on repeat attempt`

---

## Chunk 6 — P2 UX: Make saved history more useful without creating a dashboard

**Screen:** Saved message history.

**Current evidence:** Reuse works correctly (do not "fix" Reuse). History rows currently show scenario title, first-line peek, generic "Saved," and a Reuse action. Multiple saved messages will be difficult to distinguish.

**Required change:** Keep the history as simple rows, but make each artifact more recognizable using a meaningful relative date, situation, one-line message peek, and optional recipient/ask context if it fits without becoming a dashboard.

**Acceptance criteria:**
- Multiple saved messages can be distinguished at a glance.
- Reuse still pre-fills the message.
- No portfolio dashboard, analytics, score, or history stack appears in the workspace recap.

**Suggested commit:** `ux: improve saved-message recognition`

---

## Chunk 7 — P1 UI: Fix mobile header overflow and touch targets

**Screens:** All workspace frames at approximately 390px width.

**Current evidence:**
- Mobile viewport 390px; document width ~433px.
- Tagline is clipped because it uses `white-space: nowrap`.
- Recap Edit is ~34px high; Ask chips are ~35px high.
- `design.md` requires interactive targets of at least 44px.

**Relevant styles:** `.ghead .gtag` · `.recap-edit` · `.chip`.

**Required change:** Allow the tagline to wrap or scale safely on narrow screens. Increase Edit and chip hit areas to at least 44px. Preserve the stable header and visual lightness.

**Acceptance criteria:**
- No horizontal overflow at 390px.
- Full tagline remains readable.
- Edit and chips have at least 44px hit areas.
- Recap remains above active content on mobile.

**Suggested commit:** `fix: make workspace header and controls mobile-safe`

---

## Chunk 8 — P2 UI: Reduce vertical jumping and oversized editor space

**Screens:** Choose path · Compose · Feedback.

**Current evidence:** The workspace uses centered grid alignment. As frame height changes, the active heading and controls move substantially between states. The compose textarea is also visually large for a short outreach message and pushes the CTA lower than necessary.

**Relevant styles:** `.cols` · `.composer textarea` · Compose `rows="8"`.

**Required change:** Give active frames a more consistent top anchor. Reduce the visible editor height slightly. Keep the CTA close to the editor. Preserve the current two-column composition.

**Acceptance criteria:**
- Heading position feels stable between frames.
- The editor does not look like a giant empty canvas.
- CTA remains adjacent to the relevant input.
- No outer giant active card is introduced.

**Suggested commit:** `refine: stabilize workspace frame spacing`

---

## Chunk 9 — P2 UI: Remove landing navigation blur

**Screen:** Landing navigation.

**Current evidence:** The live computed style still contains `backdrop-filter: saturate(1.4) blur(10px)`. This directly violates the BeUniq finding.

**Relevant file:** `landing-editorial-blue-v3.html`.

**Required change:** Remove `backdrop-filter`. Use opaque warm paper `#F6F5F1`. Keep the restrained scroll hairline. Do not add new glass, blur, gradient, or glow effects.

**Suggested commit:** `fix: remove landing navigation glass blur`

---

## Recommended order

1. Chunk 1 — evaluator/promise truth.
2. Chunk 2 — privacy persistence.
3. Chunk 3 — context integrity.
4. Chunk 4 — scoped "something else."
5. Chunk 5 — fading help.
6. Chunk 6 — saved history clarity.
7. Chunk 7 — mobile overflow/touch targets.
8. Chunk 8 — spacing/editor sizing.
9. Chunk 9 — landing blur.
