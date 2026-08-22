import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// AUTH-001: every failure used to collapse to the same generic
// `?error=auth`, so the owner (or any user) hit a dead end with no idea
// whether it was a redirect-URI mismatch, a consent denial, or something
// else. This keeps a safe, coarse error *code* in the redirect (never the
// raw Supabase error message or the auth code itself — those can carry
// tokens/PII) and logs the real detail server-side only.
function redirectWithError(origin: string, next: string, code: string): NextResponse {
  const url = new URL("/signin", origin);
  url.searchParams.set("next", next);
  url.searchParams.set("error", code);
  return NextResponse.redirect(url);
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const oauthError = searchParams.get("error");
  let next = searchParams.get("next") ?? "/app";
  if (!next.startsWith("/")) {
    next = "/app";
  }

  // The provider itself refused (e.g. the user declined the Google consent
  // screen) — Supabase forwards that back as ?error=access_denied&....
  if (oauthError) {
    console.error("[NOD auth] provider returned an error:", oauthError, searchParams.get("error_description"));
    return redirectWithError(origin, next, oauthError === "access_denied" ? "access_denied" : "provider");
  }

  if (!code) {
    return redirectWithError(origin, next, "missing_code");
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    console.error("[NOD auth] session exchange failed:", error.message);
    return redirectWithError(origin, next, "exchange_failed");
  }

  const forwardedHost = request.headers.get("x-forwarded-host");
  const isLocalEnv = process.env.NODE_ENV === "development";
  if (isLocalEnv) {
    return NextResponse.redirect(`${origin}${next}`);
  } else if (forwardedHost) {
    return NextResponse.redirect(`https://${forwardedHost}${next}`);
  } else {
    return NextResponse.redirect(`${origin}${next}`);
  }
}
