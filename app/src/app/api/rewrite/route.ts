import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { rewriteDraft } from "@/lib/rubric/rewrite";
import type { ScenarioId } from "@/lib/flow";

type RewriteBody = { draftMasked: string; scenario: ScenarioId };

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as RewriteBody;
  if (!body.draftMasked || !body.scenario) {
    return NextResponse.json({ error: "missing required fields" }, { status: 400 });
  }

  const result = await rewriteDraft(body.draftMasked, body.scenario);
  return NextResponse.json(result);
}
