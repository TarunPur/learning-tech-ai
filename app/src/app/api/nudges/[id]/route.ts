import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { parseJson, patchNudgeSchema } from "@/lib/api-validation";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const parsed = await parseJson(request, patchNudgeSchema);
  if (!parsed.ok) return parsed.response;
  const body = parsed.data;
  const patch: Record<string, unknown> = { status: body.status };
  if (body.status === "clicked") patch.clicked_at = new Date().toISOString();

  const { error } = await supabase.from("nudges").update(patch).eq("id", id).eq("user_id", user.id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
