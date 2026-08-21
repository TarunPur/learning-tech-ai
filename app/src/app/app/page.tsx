import { getUser } from "@/lib/supabase/get-user";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

async function signOut() {
  "use server";
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/signin");
}

// Placeholder — Phase 4 replaces this with the real two-frame workspace shell.
export default async function AppPage() {
  const user = await getUser();

  return (
    <main style={{ maxWidth: 480, margin: "80px auto", padding: 24 }}>
      <p>Signed in as {user.email}</p>
      <form action={signOut}>
        <button type="submit">Sign out</button>
      </form>
    </main>
  );
}
