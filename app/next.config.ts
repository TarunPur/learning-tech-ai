import type { NextConfig } from "next";

// SEC-002: the live root response had no CSP/X-Frame-Options/Referrer-Policy/
// Permissions-Policy, and Vercel's static-asset CDN adds a public
// access-control-allow-origin: * on prerendered pages — fine for a public
// marketing page with no reader-specific data, but /app and the API routes
// (dynamic, not statically cached) should still get real protection.
//
// script-src/style-src keep 'unsafe-inline': Next.js's hydration bootstrap
// and this app's inline style={{}} usage throughout the workspace both need
// it. A stricter nonce-based CSP is possible (Next supports it via
// middleware) but is a larger, riskier follow-up — getting a nonce CSP
// wrong silently blanks the whole app, so it isn't attempted here without a
// dedicated verification pass.
const SUPABASE_HOST = (() => {
  try {
    return new URL(process.env.NEXT_PUBLIC_SUPABASE_URL ?? "").host;
  } catch {
    return "*.supabase.co";
  }
})();

const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  `connect-src 'self' https://${SUPABASE_HOST}`,
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
