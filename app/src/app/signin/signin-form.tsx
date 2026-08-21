"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function SignInForm() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/app";
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function signInWithGoogle() {
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    });
    if (error) setError(error.message);
  }

  async function signInWithMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setSent(true);
    }
  }

  return (
    <main style={{ maxWidth: 360, margin: "80px auto", padding: 24 }}>
      <h1>Sign in to NOD</h1>

      <button onClick={signInWithGoogle} type="button" style={{ width: "100%", padding: 12, marginTop: 16 }}>
        Continue with Google
      </button>

      <div style={{ textAlign: "center", margin: "20px 0", opacity: 0.6 }}>or</div>

      {sent ? (
        <p>Check your email for a sign-in link.</p>
      ) : (
        <form onSubmit={signInWithMagicLink}>
          <input
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: 10, marginBottom: 8 }}
          />
          <button type="submit" disabled={loading} style={{ width: "100%", padding: 12 }}>
            {loading ? "Sending…" : "Send magic link"}
          </button>
        </form>
      )}

      {error && <p style={{ color: "crimson", marginTop: 12 }}>{error}</p>}
    </main>
  );
}
