// ANALYTICS-001 (PRD §14 / implementation.md Phase 8): the six-event
// instrumentation was deliberately deferred (owner amendment, 2026-08-21)
// past the initial build, then wired up across two QA remediation rounds.
// All six events fire: attempt_started, draft_completed, feedback_acted,
// nudge_sent, unaided_started, unaided_completed (incl. its help_requests/
// ai_turns fields — counted client-side in Workspace.tsx's DraftState and
// passed through /api/attempts/[id]'s PATCH as event-only fields, never
// persisted as attempts columns).
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
