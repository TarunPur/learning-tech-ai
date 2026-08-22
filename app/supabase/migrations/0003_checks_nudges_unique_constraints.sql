-- 0003_checks_nudges_unique_constraints.sql
-- QA-CODE-REVIEW.md DATA-001/DATA-002 (flagged across rounds 1/3/5): app-level
-- idempotency (check-then-insert) already prevents new duplicates, but there
-- was no database-level guarantee. These are additive, non-destructive unique
-- indexes — they only reject a future duplicate insert, they don't touch or
-- remove any existing row.
--
-- checks: one row per (attempt_id, revision_index) — matches the audit-trail
-- invariant in ERD.md ("revision_index: 0=first check, 1=after edit1, ...").
create unique index if not exists checks_attempt_revision_uniq
  on public.checks (attempt_id, revision_index);

-- nudges: one outcome-tied nudge per completed attempt (Decision 10).
create unique index if not exists nudges_attempt_uniq
  on public.nudges (attempt_id);
