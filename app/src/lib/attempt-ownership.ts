// SEC-001: routes that insert a row referencing an attemptId (checks,
// messages, nudges) must confirm the attempt actually belongs to the
// caller first. RLS on `checks`/`messages`/`nudges` only checks that
// user_id === auth.uid() on the new row itself — it says nothing about
// whether attempt_id points at one of the caller's own attempts, so without
// this lookup any signed-in user could attach a row to a stranger's attempt.
import type { createClient } from "@/lib/supabase/server";

type SupabaseServerClient = Awaited<ReturnType<typeof createClient>>;

export async function ownsAttempt(
  supabase: SupabaseServerClient,
  attemptId: string,
  userId: string
): Promise<boolean> {
  const { data } = await supabase
    .from("attempts")
    .select("id")
    .eq("id", attemptId)
    .eq("user_id", userId)
    .maybeSingle();
  return !!data;
}
