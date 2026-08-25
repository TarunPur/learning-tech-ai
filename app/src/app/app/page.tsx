import { getUser } from "@/lib/supabase/get-user";
import { Workspace } from "@/components/workspace/Workspace";

export default async function AppPage() {
  const user = await getUser();
  return <Workspace userId={user.id} />;
}
