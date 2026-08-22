"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { BrandHeader } from "@/components/ui/BrandHeader";
import { Button } from "@/components/ui/Button";
import { Field, FieldInput } from "@/components/ui/Field";

// AUTH-001: turn the callback route's safe error code into something a
// signed-out user (including the owner, doing the live OAuth smoke test)
// can actually act on.
const DEFAULT_CALLBACK_ERROR = "Something went wrong signing you in. Try again.";
const CALLBACK_ERROR_MESSAGES: Record<string, string> = {
  access_denied: "Sign-in was cancelled before it finished — no problem, try again when you're ready.",
  provider: "Google couldn't complete sign-in right now. Try again in a moment.",
  missing_code: "That sign-in link looks incomplete. Try signing in again from this page.",
  exchange_failed:
    "Sign-in didn't complete on our end. If this keeps happening, it's likely a configuration issue — try again, and let us know if it persists.",
  auth: DEFAULT_CALLBACK_ERROR,
};

export function SignInForm() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/app";
  const callbackError = searchParams.get("error");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(
    callbackError ? (CALLBACK_ERROR_MESSAGES[callbackError] ?? DEFAULT_CALLBACK_ERROR) : null
  );
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  async function signInWithGoogle() {
    setError(null);
    setGoogleLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    });
    // On success the browser navigates away to Google immediately, so
    // googleLoading only ever needs resetting on the failure path.
    if (error) {
      setError(error.message);
      setGoogleLoading(false);
    }
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
    <div className="nod-stage">
      <BrandHeader />
      <main style={{ maxWidth: 400, margin: "56px auto", padding: "0 24px" }}>
        <h2 className="nod-f-title">
          Sign in to <em>NOD.</em>
        </h2>
        <p className="nod-f-lede" style={{ marginBottom: 28 }}>
          Google is the fastest way in — a magic link works too if you&rsquo;d rather not.
        </p>

        {error && (
          <div className="nod-recap" style={{ marginBottom: 20 }}>
            <p style={{ margin: 0, fontSize: 14, color: "var(--ink-soft)" }}>{error}</p>
          </div>
        )}

        <Button onClick={signInWithGoogle} disabled={googleLoading} style={{ width: "100%" }}>
          {googleLoading ? "Opening Google…" : "Continue with Google"}
        </Button>

        <div style={{ textAlign: "center", margin: "22px 0", fontSize: 13, color: "var(--ink-faint)" }}>or</div>

        {sent ? (
          <p className="nod-f-lede">Check your email for a sign-in link.</p>
        ) : (
          <form onSubmit={signInWithMagicLink}>
            <Field label="Email" labelProps={{ htmlFor: "signin-email" }}>
              <FieldInput
                id="signin-email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Field>
            <div className="nod-actions" style={{ marginTop: 14 }}>
              <Button type="submit" variant="ghost" disabled={loading} style={{ width: "100%" }}>
                {loading ? "Sending…" : "Send magic link"}
              </Button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
