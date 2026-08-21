import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  // Don't put this client in a module-level variable — create a new one on
  // each request (Fluid compute).
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Do not run code between createServerClient and getClaims() — it
  // validates the session token and refreshes it if needed. Removing this
  // call can cause users to be randomly signed out.
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;

  if (!user && request.nextUrl.pathname.startsWith("/app")) {
    const url = request.nextUrl.clone();
    url.pathname = "/signin";
    url.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  // Return supabaseResponse as-is (or copy its cookies onto any replacement)
  // so the refreshed session cookies actually reach the browser.
  return supabaseResponse;
}
