import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { ScenarioId } from "@/lib/flow";

type CreateBody = { attemptId: string; scenario: ScenarioId };

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as CreateBody;
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
