// ANALYTICS-001 (PRD §14 / implementation.md Phase 8): the six-event
// instrumentation was deliberately deferred (owner amendment, 2026-08-21)
// past the initial build. QA's re-review flagged it as required for
// release-DoD sign-off, so the four events fully derivable from data
// already on the attempt/check rows are wired here: attempt_started,
// draft_completed, feedback_acted, nudge_sent, unaided_started, and
// unaided_completed's rubric_pass/time_to_done fields.
//
// NOT implemented: unaided_completed's `help_requests` and `ai_turns`
// fields (they always report 0 below). Populating them for real means new
// client-side counters — a "Stuck?" tap, a NOD-draft generation, a rewrite
// — threaded through every workspace action into the save payload. That's
// new product instrumentation, not a bug fix, and re-opens a scope decision
// the owner already made explicitly once (deferring Phase 8 entirely) —
// so it's left for the owner to call, not silently built or silently
// dropped.
import type { createClient } from "@/lib/supabase/server";

type SupabaseServerClient = Awaited<ReturnType<typeof createClient>>;

export type EventName =
  | "attempt_started"
  | "draft_completed"
  | "feedback_acted"
  | "nudge_sent"
  | "unaided_started"
  | "unaided_completed";

// Best-effort and non-blocking: an analytics write must never fail the user
// action it's attached to.
export async function logEvent(
  supabase: SupabaseServerClient,
  userId: string,
  name: EventName,
  attemptId: string | null,
  properties: Record<string, unknown> = {}
): Promise<void> {
  try {
    await supabase.from("events").insert({
      user_id: userId,
      attempt_id: attemptId,
      name,
      properties,
    });
  } catch (e) {
    console.error("[NOD analytics] failed to log event:", name, e);
  }
}
