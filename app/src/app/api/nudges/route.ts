import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { ownsAttempt } from "@/lib/attempt-ownership";
import { createNudgeSchema, parseJson } from "@/lib/api-validation";
import { logEvent } from "@/lib/events";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const parsed = await parseJson(request, createNudgeSchema);
  if (!parsed.ok) return parsed.response;
  const body = parsed.data;

  // SEC-001
  if (!(await ownsAttempt(supabase, body.attemptId, user.id))) {
    return NextResponse.json({ error: "attempt not found" }, { status: 404 });
  }

  // DATA-002: one nudge per completed attempt — a Save retry must not
  // create a duplicate.
  const { data: existing } = await supabase
    .from("nudges")
    .select("id")
    .eq("attempt_id", body.attemptId)
    .eq("user_id", user.id)
    .maybeSingle();
  if (existing) {
    return NextResponse.json({ id: existing.id });
  }

  const { data, error } = await supabase
    .from("nudges")
    .insert({
      user_id: user.id,
      attempt_id: body.attemptId,
      scenario: body.scenario,
      status: "scheduled",
      scheduled_for: new Date().toISOString(),
    })
    .select("id")
    .single();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // ANALYTICS-001: v1 has no separate delivery step (no email) — a nudge is
  // "sent" the moment it's scheduled, since that's also the moment it
  // becomes visible in-app on the user's next load.
  await logEvent(supabase, user.id, "nudge_sent", body.attemptId, { scenario: body.scenario });

  return NextResponse.json({ id: data.id });
}

// The single most recent scheduled nudge, if any — v1 surfaces it in-app on
// the user's next visit (Decision 10, no email needed).
export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("nudges")
    .select("id, scenario")
    .eq("user_id", user.id)
    .eq("status", "scheduled")
    .order("scheduled_for", { ascending: false, nullsFirst: false })
    .limit(1)
    .maybeSingle();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ nudge: data });
}
