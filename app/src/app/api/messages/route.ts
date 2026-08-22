import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { assertMasked, UnmaskedPayloadError } from "@/lib/pii-guard";
import { ownsAttempt } from "@/lib/attempt-ownership";
import { parseJson, saveMessageSchema } from "@/lib/api-validation";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const parsed = await parseJson(request, saveMessageSchema);
  if (!parsed.ok) return parsed.response;
  const body = parsed.data;

  // SEC-001
  if (!(await ownsAttempt(supabase, body.attemptId, user.id))) {
    return NextResponse.json({ error: "attempt not found" }, { status: 404 });
  }

  try {
    assertMasked({ title: body.title, textMasked: body.textMasked, ask: body.ask });
  } catch (e) {
    if (e instanceof UnmaskedPayloadError) {
      return NextResponse.json({ error: e.message }, { status: 400 });
    }
    throw e;
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

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("messages")
    .select("id, title, scenario, text_masked, ask, authored, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ messages: data });
}
