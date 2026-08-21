import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { ScenarioId } from "@/lib/flow";

type CreateBody = { scenario: ScenarioId; customTaskMasked?: string };

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as CreateBody;
  if (!body.scenario) {
    return NextResponse.json({ error: "missing scenario" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("attempts")
    .insert({
      user_id: user.id,
      scenario: body.scenario,
      custom_task_masked: body.customTaskMasked ?? null,
    })
    .select("id")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ id: data.id });
}
