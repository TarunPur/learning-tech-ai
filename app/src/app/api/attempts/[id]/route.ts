import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

type PatchBody = {
  recipient_masked?: string;
  ask?: string;
  context_masked?: string;
  path?: "own" | "nod";
  draft_text_masked?: string;
  check_count?: number;
  outcome?: "clean" | "tightened" | "kept" | "nod-rewrote" | "shipped-with-misses";
  first_pass_criteria?: Record<string, boolean>;
  loops_to_clear?: number;
  completed_at?: string;
};

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as PatchBody;
  const { error } = await supabase.from("attempts").update(body).eq("id", id).eq("user_id", user.id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
