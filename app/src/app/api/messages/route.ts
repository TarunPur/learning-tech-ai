import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { ScenarioId } from "@/lib/flow";

type CreateBody = {
  attemptId: string;
  title: string;
  scenario: ScenarioId;
  textMasked: string;
  ask?: string;
  authored: "own" | "nod" | "nod-rewrote";
};

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as CreateBody;
  if (!body.attemptId || !body.textMasked) {
    return NextResponse.json({ error: "missing required fields" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("messages")
    .insert({
      user_id: user.id,
      attempt_id: body.attemptId,
      title: body.title,
      scenario: body.scenario,
      text_masked: body.textMasked,
      ask: body.ask ?? null,
      authored: body.authored,
    })
    .select("id")
    .single();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ id: data.id });
}
