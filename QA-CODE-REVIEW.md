# NOD QA and Code Review Handoff

**Role:** Testing and code-review agent

**Release decision:** `NO-GO`

**Date:** 2026-08-22

**Live deployment:** https://learning-tech-ai.vercel.app/

**Scope:** Live public-flow testing, authenticated-flow boundary testing, source review, PRD/product/design/engineering requirement comparison, local lint/build/test verification.

**Important:** No product code was changed during this review. This document is a build-agent handoff. Fix the findings in priority order, then update the verification section with evidence.

---

## 1. Instructions for the build agent

1. Treat all `P0` and `P1` findings below as implementation work, not suggestions.
2. Do not begin unrelated feature work until the P0 privacy issue and P1 reliability/auth issues are resolved.
3. Preserve the locked product model:
   - Two-frame workspace.
   - Write-your-own is the default path.
   - NOD is a fallback, not a generic chatbot.
   - No user-facing score, checklist, green/red status, or outcome guarantee.
   - B1, B2, and B4 are core criteria; B3, B5, and personalized criteria are advisory.
   - Maximum three coaching checks/revisions.
4. Do not weaken masking to make the flow work. Raw recipient/company identifiers must never be persisted or sent to the model.
5. Every API fix must include a negative test, not only a happy-path test.
6. Do not mark the release ready based on source inspection alone. Complete the authenticated browser flow and database assertions after the fixes.

---

## 2. Current verification status

| Area | Status | Evidence |
|---|---|---|
| Landing page | PASS | Live `GET /` returned HTTP 200. |
| `/app` auth gate | PASS | Unauthenticated request redirects to `/signin?next=/app`. |
| Unauthenticated API protection | PASS | `GET /api/messages` returned HTTP 401. |
| Google OAuth initiation | PASS | Supabase authorize endpoint redirects to Google. |
| Google sign-in completion | BLOCKED | Requires owner’s private Google session. |
| Authenticated workspace E2E | NOT VERIFIED | The private sign-in leg was not completed. |
| Lint | PASS | `cd app && npm run lint` passed. |
| Focused unit tests | PASS | Masking/B4 tests: 2 files, 9 tests passed. |
| Full test suite | BLOCKED | Anthropic DNS resolution failed in the test environment. |
| Default production build | FAIL | Turbopack failed while processing `landing.css` due to process/port permission error. |
| Webpack production build | PASS | `npm run build -- --webpack` compiled successfully. |

The OAuth initiation is reachable, so the exact account/callback error still needs to be captured from the owner’s browser. Do not request or store the owner’s password, OTP, or session cookie.

---

## 3. What is already implemented correctly

These areas are present and broadly aligned with the product documents:

- Live Next.js application, not only a static mockup.
- Landing CTA routes into sign-in and the workspace is protected.
- Google OAuth is wired through Supabase.
- Two-frame workspace shell with recap and active frame.
- Core situation selection plus scoped “Something else” entry.
- Progressive personalization for recipient, ask, and context.
- Write-your-own path as the default.
- NOD draft fallback with weak-line interaction and “I’m not sure” path.
- Hybrid rubric architecture with deterministic B4 and LLM-backed criteria.
- Coaching loop with rechecks and rewrite fallback.
- Saved messages, history, reuse, copy/unmask behavior, nudge mechanics, and unaided-attempt mechanics.
- Authenticated direct reads/updates generally scope by current user ID.
- Design tokens, typography, responsive workspace structure, and restrained coaching UI.
- Lint passes.
- Webpack build passes.

These are source-backed findings. The authenticated UI and visual fidelity still require a real browser pass after sign-in.

---

## 4. Release blockers

### P0 — PRIV-001: Raw personal information can bypass masking

**Requirement violated:** `ERD.md` masking invariant and `implementation.md` masking requirements.

**Evidence:**

- `app/src/components/workspace/Workspace.tsx:71-75` passes custom “Something else” text directly into `createAttempt`.
- `app/src/app/api/attempts/route.ts:25-31` stores the value as `custom_task_masked` without proving it is masked.
- `app/src/components/workspace/Workspace.tsx:65-90` masks only a first name for the details fields.
- `app/src/lib/masking.ts:30-32` exposes only `maskName`, not company/email/phone/general identifier masking.
- `app/src/lib/flow.ts:125-128` only recognizes capitalized first names. Lowercase names, initials, all-caps names, surnames, accented names, and non-English names can bypass it.
- Company names, emails, phone numbers, and identifiers in ask/context are not comprehensively masked.
- `app/src/components/workspace/Workspace.tsx:232-240` sends a raw custom title into the save path.
- `/api/messages`, `/api/nod-draft`, and `/api/rewrite` trust client-provided masked values.
- `/api/check` only performs limited unmasked-pattern detection.

**Impact:** Raw PII can be persisted in Supabase or sent to the model. This contradicts the product’s explicit privacy promise.

**Required fix:**

- Create one shared masking/PII validation boundary used by every persistence and model route.
- Support recipient names, company names, emails, phone numbers, and explicitly supplied identifiers.
- Reject or safely mask any value that fails validation.
- Do not accept a field named `*_masked` as proof that it is masked.
- Add regression tests for lowercase, all-caps, multi-word, accented, company, email, phone, and custom-task inputs.
- Verify raw values never appear in request payloads, database rows, model prompts, logs, or saved messages.

**Acceptance criteria:**

- No raw identifier is present in any request made after the details frame.
- No raw identifier is present in `attempts`, `checks`, `messages`, `events`, or `nudges`.
- Server routes reject unmasked payloads, including direct malicious requests.
- Copy/unmask restores only the browser-local mapping.

---

### P1 — REL-001: Core async failures are invisible

**Evidence:** Main workspace handlers use `try/finally` without visible `catch` handling, including situation creation, details, NOD generation, checking, rewrite, save, and nudge creation.

Relevant locations include:

- `app/src/components/workspace/Workspace.tsx:71-79`
- `app/src/components/workspace/Workspace.tsx:82-96`
- `app/src/components/workspace/Workspace.tsx:162-174`
- `app/src/components/workspace/Workspace.tsx:212-257`
- `app/src/components/workspace/frames/NodDraftFrame.tsx:36-47`
- `app/src/components/workspace/frames/SavedFrame.tsx:31-33`

**Impact:** Network, model, or database failures can leave the interface stuck, blank, or falsely empty. This is likely contributing to the current user-visible error.

**Required fix:**

- Add a shared user-facing error state.
- Show a concise human-readable message for every failed action.
- Add retry controls.
- Preserve typed draft content when a request fails.
- Disable duplicate submissions while a request is pending.
- Log safe diagnostic metadata without raw PII.

**Acceptance criteria:** Every failed API/model/database request produces a visible recoverable state, and no failure silently resets the workspace.

---

### P1 — AUTH-001: OAuth callback errors are hidden

**Evidence:** `app/src/app/auth/callback/route.ts:28` collapses all callback failures to `/signin?error=auth`. `app/src/app/signin/signin-form.tsx:7-13` reads `next` but not `error`.

**Impact:** The owner receives no actionable explanation for an account restriction, redirect mismatch, consent issue, or session exchange failure.

**Required fix:**

- Preserve a safe error code and, where appropriate, a safe error description.
- Display a useful message on the sign-in page.
- Add a retry button.
- Log the detailed server-side error safely without exposing secrets or PII.
- Add tests for `access_denied`, exchange failure, missing code, and invalid state.

**Owner verification required:** Complete Google sign-in from the live URL and capture the exact error returned after Google redirects back. Do not share credentials.

---

## 5. High-priority correctness and security findings

### P1 — DATA-001: NOD’s initial evaluator run is not written to `checks`

`/api/nod-draft` evaluates the generated text, but `handleNodProceed()` only patches the attempt:

- `app/src/app/api/nod-draft/route.ts:32-39`
- `app/src/components/workspace/Workspace.tsx:177-200`

The ERD requires one `checks` row per evaluator run. NOD and write-your-own paths must produce equivalent audit records.

**Acceptance criteria:** A NOD generation creates a complete `checks` row containing masked draft, criteria, misses, model, deterministic result, latency, path, and revision index.

### P1 — SEC-001: Cross-entity ownership is not fully checked

`/api/check`, `/api/messages`, and `/api/nudges` accept an `attemptId` without first verifying that the attempt belongs to the current user.

Examples:

- `app/src/app/api/check/route.ts:44-55`
- `app/src/app/api/messages/route.ts:28-40`
- `app/src/app/api/nudges/route.ts:16-31`

**Required fix:** Perform an ownership lookup before inserting related rows, or use a database function/constraint that guarantees owner alignment.

### P1 — FUN-001: Off-scope and abuse handling is incomplete

`app/src/lib/flow.ts:106-122` only classifies input as `outreach` or `offscope`. There is no explicit abuse or prompt-injection refusal path.

Missing:

- Abuse classification and safe refusal.
- Prompt-injection handling.
- `roadmap_signals` persistence for valid off-scope requests.
- Tests for unsafe and unrelated inputs.

Unknown text currently defaults toward outreach.

### P1 — API-001: Runtime request validation is weak

Routes rely on TypeScript casts instead of runtime schemas. Add validation for:

- Scenario enums.
- Attempt ownership and attempt/scenario consistency.
- Text length and payload size.
- Revision indexes and numeric bounds.
- `authored`, `attempt_type`, and path enums.
- Required masked fields.
- Maximum model input size.

Malformed requests should return controlled 4xx responses rather than database or model errors.

### P1 — AI-001: Failed rewrites can still be saved

`app/src/lib/rubric/rewrite.ts:35-55` can return `corePass: false`. `app/src/components/workspace/frames/FeedbackFrame.tsx:54-57` still allows Save, and `Workspace.handleSave()` saves the text.

**Required fix:** If rewrite output does not pass B1/B2/B4, do not present it as ready. Show a recoverable failure state or require another attempt.

### P1 — DATA-002: Save is not transactional or idempotent

`Workspace.handleSave()` performs separate message insert, attempt patch, and nudge insert operations at `app/src/components/workspace/Workspace.tsx:234-252`.

Failure or retry can create partial state and duplicate records.

**Required fix:** Use a server transaction or idempotent completion endpoint with one-nudge-per-attempt enforcement.

### P1 — OPS-001: No model timeout, retry, or rate limit

The Anthropic call has no clear timeout, bounded retry strategy, circuit breaker, or usage guard. Add operational protection before public usage grows.

---

## 6. Product and rubric mismatches

### P1 — ANALYTICS-001: Analytics are absent

This is an acknowledged deferral in `NEXT-SESSION.md`, not an accidental omission. However, the implementation DoD still expects the six events and capability fields described in `implementation.md:314-323` and `implementation.md:402-407`.

Missing events:

- `attempt_started`
- `draft_completed`
- `feedback_acted`
- `nudge_sent`
- `unaided_started`
- `unaided_completed`

Missing unaided capability fields:

- `help_requests`
- `ai_turns`
- `time_to_done`
- `rubric_pass`

Decide explicitly whether analytics are required for this release. If yes, implement them before launch. If no, update the release DoD so the status is not ambiguous.

### P1 — RUBRIC-001: B4 threshold and schema inconsistencies

`app/src/lib/rubric/b4.ts:13-27` defines a 50-word minimum, but `evaluateB4()` only rejects long drafts, excessive sentences, and high reading level at `b4.ts:58-99`. Drafts below 50 words can pass.

Also:

- `paragraph_count` is not returned.
- B4 metrics are returned under `deterministic`, not within the B4 criterion shape expected by the ERD.
- Evaluator quotes are not verified as exact substrings of the submitted draft.

Resolve the intended short-draft behavior in the spec, then add boundary tests.

### P1 — PRODUCT-001: Outcome and loop data are incomplete

`Workspace.handleSave()` records only `clean`, `tightened`, and `nod-rewrote` outcomes at `Workspace.tsx:243-247`.

It does not clearly represent:

- Kept.
- Shipped with misses.
- Personalized first-pass criteria.
- Actual revision-loop count versus evaluator-check count.

Align the database values, UI states, and PRD terminology.

### P2 — UX-001: NOD weak-line matching is brittle

`NodDraftFrame.tsx:51-55` matches only the first 20 characters of the evaluator quote. If no sentence matches, the interface can still say “Good eye” at `NodDraftFrame.tsx:127-129`.

Use a server-provided sentence/fragment anchor or deterministic quote validation.

### P2 — UX-002: Sign-in screen does not meet the design bar

`app/src/app/signin/signin-form.tsx:46-75` uses raw inline styling, has no visible email label, no Google loading state, and uses explicit crimson error styling.

Bring it into the established NOD brand and accessibility system.

### P2 — COPY-001: Outcome-adjacent copy conflicts with product claims policy

Current copy includes:

- “what gets a busy person to actually reply” — `FeedbackFrame.tsx:8`.
- “a single, easy thing to say yes to” — `page.tsx:481`.
- “you learn to write it yourself” in an accessible label — `page.tsx:459`.
- “partner users” while the same page describes pre-launch research — `page.tsx:601`.

Claims should describe message quality and user capability, not imply response outcomes or existing partner users.

---

## 7. Production hardening

### P2 — OPS-002: Default build command is not green

`npm run build` fails under Turbopack with a process/port permission error while the Webpack variant passes.

Required action:

- Determine whether the failure is environment-only or reproducible in CI/Vercel.
- Either stabilize the default build or document and enforce the supported build command.

### P2 — SEC-002: Security headers need review

The live root response did not show CSP, `X-Frame-Options`/`frame-ancestors`, `Referrer-Policy`, or `Permissions-Policy`. The HTML response also exposed `access-control-allow-origin: *`.

Review and add appropriate production headers. This is hardening work, not the primary product blocker.

### P2 — TEST-001: Test coverage does not cover the risky paths

Add tests for:

- Masking edge cases and direct API bypasses.
- `classifyTask`, abuse, and prompt-injection handling.
- OAuth callback error rendering.
- API schema validation.
- Attempt ownership and RLS behavior.
- NOD check persistence.
- Rewrite failure blocking.
- Save retry/idempotency.
- Coaching state transitions.
- History/reuse/copy behavior.
- Authenticated browser E2E.

---

## 8. Required implementation order

- [ ] `PRIV-001` — Fix masking and server-side PII validation.
- [ ] `REL-001` — Add visible errors, retries, and input preservation.
- [ ] `AUTH-001` — Surface OAuth callback errors and add callback tests.
- [ ] `DATA-001` — Persist NOD evaluator results in `checks`.
- [ ] `SEC-001` — Enforce attempt ownership across all related routes.
- [ ] `API-001` — Add runtime schemas, enums, size limits, and safe 4xx responses.
- [ ] `AI-001` — Block saving failed rewrites.
- [ ] `DATA-002` — Make completion and nudge creation transactional/idempotent.
- [ ] `FUN-001` — Add abuse/refusal and roadmap-signal handling.
- [ ] `RUBRIC-001` — Resolve B4/schema/quote-validation inconsistencies.
- [ ] `PRODUCT-001` — Correct outcomes, loop counts, and personalized criteria.
- [ ] `ANALYTICS-001` — Implement instrumentation or explicitly remove it from this release’s DoD.
- [ ] `OPS-001` — Add model timeout, bounded retry, and rate limiting.
- [ ] `TEST-001` — Add regression and authenticated browser coverage.
- [ ] `OPS-002` — Stabilize/document the production build command.
- [ ] `UX-001`, `UX-002`, `COPY-001`, `SEC-002` — Complete polish and hardening pass.

---

## 9. Definition of done for QA sign-off

The build agent must provide all of the following before requesting re-review:

- [ ] Live Google sign-in completed successfully.
- [ ] Authenticated live flow completed for a standard scenario.
- [ ] Authenticated live flow completed for “Something else.”
- [ ] Write-your-own path checked, revised twice, and saved.
- [ ] NOD path generated, weak line tapped, checked, and saved.
- [ ] Third-failure rewrite path tested, including rewrite failure handling.
- [ ] Saved history, reuse, copy/unmask, and nudge return tested.
- [ ] Unaided attempt tested.
- [ ] Database rows verified masked for attempts, checks, messages, events, and nudges.
- [ ] Direct API attempts containing raw names, companies, emails, phones, or custom text rejected or masked.
- [ ] Cross-user attempt IDs rejected.
- [ ] Every evaluator run creates exactly one checks row.
- [ ] Failed network/model/database calls show recoverable UI errors.
- [ ] No failed rewrite can be saved as ready.
- [ ] No duplicate message/nudge is created by retrying Save.
- [ ] Abuse and prompt-injection cases are safely refused.
- [ ] Required analytics events are present, or the release scope explicitly documents their deferral.
- [ ] Lint passes.
- [ ] Full test suite passes in an environment with Anthropic access.
- [ ] Supported production build command passes.
- [ ] No banned outcome claims or misleading user/research claims remain.

---

## 10. Retest evidence to attach

When fixes are complete, append:

1. Commit SHA or deployment URL.
2. Browser/device used for authenticated E2E.
3. Exact test steps and results for each flow above.
4. Database query results proving masking and ownership.
5. Test command output.
6. Any intentionally deferred item and the owner-approved reason.

**Current QA disposition:** `NO-GO — P0 privacy defect and unresolved authenticated/error-handling path.`

---

## 11. Retest evidence (build-agent remediation pass, 2026-08-22)

All findings in §4–§7 and the implementation order in §8 were worked this session. Full detail
and per-item reasoning is in `NEXT-SESSION.md`'s "This session's QA remediation" section — this is
the condensed retest evidence this doc itself asked for.

1. **Commit range:** `e28e985..3d481b8` on `feedback-pass-20aug` (5 commits, one per remediation
   layer: privacy/masking, API routes, workspace UI, auth, hardening/copy).
2. **Browser/device for authenticated E2E:** none — the private Google OAuth leg still can't be
   driven on the owner's behalf (same reasoning as the original deploy). Not verified this session.
3. **Test steps/results:**
   - `npx tsc --noEmit`: clean.
   - `npm run lint`: clean.
   - `npm run build` (Turbopack) and `npm run build -- --webpack`: both clean — §7 OPS-001's
     reported Turbopack failure did not reproduce in this environment.
   - `npm test`: 26/26 non-network tests passing, including 17 new regression tests (masking edge
     cases — lowercase/ALL-CAPS/accented names, company extraction, email/phone scrubbing; B4
     boundary cases). The 3 tests that make real Anthropic calls, and the 32-fixture rubric
     discrimination suite, could not be re-run to completion this session — **the Anthropic API
     key is out of credits** (`"Your credit balance is too low..."`). `RUBRIC-VALIDATION.md` shows
     a clean 100%-accuracy run from earlier the same session (05:30 today), before the test runs
     themselves exhausted the remaining credits — so this is a billing issue, not evidence the
     RUBRIC-001 changes broke discrimination. Needs a credit top-up before those 4 tests can be
     re-confirmed.
   - Manual `curl` smoke test against a local production build (`npm run start`): landing 200;
     unauthenticated `/api/messages` and `/api/attempts` both 401; `/app` redirects signed-out
     visitors to `/signin?next=/app`; malformed JSON body returns 4xx before reaching the database;
     security headers (CSP, X-Frame-Options, Referrer-Policy, Permissions-Policy) present on the
     response.
4. **Database query results proving masking and ownership:** not run — no direct DB session this
   pass. The masking fix is verified at the unit level (17 new tests) and the ownership fix is
   verified at the code level (`ownsAttempt()` called before every insert that references an
   `attemptId`); an actual `SELECT` against `attempts`/`checks`/`messages` after a real authenticated
   session is still owed once Google sign-in is confirmed.
5. **Test command output:** see point 3.
6. **Intentionally deferred items (flagged to the owner, not silently decided):**
   - B4's full 50-word floor (RUBRIC-001) — would regress the tuned discrimination fixtures and an
     existing test; a 15-word degenerate-input floor was added instead.
   - `unaided_completed`'s `help_requests`/`ai_turns` fields (ANALYTICS-001) — need new client
     instrumentation, not built.
   - Evaluator rate limiting/circuit breaker (OPS-001) — needs a paid service or a new DB-backed
     limiter; not built.
   - Route-level integration tests (ownership/validation 400s) (TEST-001) — no existing harness for
     testing Next.js route handlers + Supabase in this repo; verified manually via curl instead.
   - A "keep mine" save-with-a-miss affordance (PRODUCT-001) — mentioned in the design docs, never
     built into the real FeedbackFrame; not something this review flagged, noted as a product-
     fidelity gap for the owner to weigh in on.

**Revised disposition:** the P0 privacy defect and the SEC-001/DATA-001/AI-001 correctness issues
are resolved and verified by build/lint/typecheck/unit tests. Full sign-off per this doc's own §9
DoD still requires the owner's live Google sign-in pass and a database spot-check — both blocked
on the same two open items in `NEXT-SESSION.md` (Anthropic credits, Google OAuth smoke test).
