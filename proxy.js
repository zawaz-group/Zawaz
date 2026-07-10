import { NextResponse } from "next/server";

/*
 * Next.js 16 Proxy (formerly "middleware"). Runs before every matched route.
 * Responsibilities:
 *   1. Apply hardened security response headers to every page (CSP, HSTS, …)
 *   2. CSRF protection: reject cross-site mutating API requests (origin check)
 *   3. Layer-7 rate limiting on the API to blunt abuse / floods
 */

const isDev = process.env.NODE_ENV === "development";

/* ── Content Security Policy ──
 * The site relies on React/Next inline bootstrap scripts and heavy inline
 * `style={{}}` usage, so a nonce-only policy would force full dynamic rendering
 * and break static caching. We therefore allow 'unsafe-inline' for scripts/styles
 * but still lock down object/base/frame/form and restrict external origins. */
const cspHeader = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https:",
  "media-src 'self' https: blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "frame-src 'self' https://www.google.com",
  "upgrade-insecure-requests",
]
  .join("; ")
  .trim();

function securityHeaders(res) {
  res.headers.set("Content-Security-Policy", cspHeader);
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set("X-DNS-Prefetch-Control", "on");
  res.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), browsing-topics=()"
  );
  res.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload"
  );
  return res;
}

/* ── In-memory Layer-7 rate limiter (fixed window, per IP) ── */
const buckets = new Map();
const WINDOW_MS = 60_000;
const API_LIMIT = 40; // mutating + read API calls per IP per minute

function rateLimited(ip) {
  const now = Date.now();
  const entry = buckets.get(ip);
  if (!entry || now > entry.resetAt) {
    buckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > API_LIMIT;
}

// keep the Map bounded under a flood
function sweep() {
  if (buckets.size < 5000) return;
  const now = Date.now();
  for (const [k, v] of buckets) if (now > v.resetAt) buckets.delete(k);
}

function clientIp(req) {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

function sameOrigin(req) {
  const host = req.headers.get("host");
  if (!host) return false;
  const origin = req.headers.get("origin");
  if (origin) {
    try {
      return new URL(origin).host === host;
    } catch {
      return false;
    }
  }
  const referer = req.headers.get("referer");
  if (referer) {
    try {
      return new URL(referer).host === host;
    } catch {
      return false;
    }
  }
  return false;
}

export function proxy(request) {
  const { pathname } = request.nextUrl;
  const method = request.method;

  if (pathname.startsWith("/api/")) {
    const ip = clientIp(request);

    // 1. Rate limit all API traffic (L7 abuse protection)
    sweep();
    if (rateLimited(ip)) {
      return securityHeaders(
        NextResponse.json(
          { error: "Prea multe cereri. Încearcă din nou mai târziu." },
          { status: 429, headers: { "Retry-After": "60" } }
        )
      );
    }

    // 2. CSRF: mutating requests must originate from the same site.
    //    Exception: the Telegram webhook is called by Telegram's servers
    //    (legitimately cross-origin); it is authenticated by its secret URL.
    const isWebhook = pathname.startsWith("/api/telegram/webhook");
    const isMutation = ["POST", "PUT", "PATCH", "DELETE"].includes(method);
    if (isMutation && !isWebhook && !sameOrigin(request)) {
      return securityHeaders(
        NextResponse.json(
          { error: "Cerere respinsă (origine invalidă)." },
          { status: 403 }
        )
      );
    }
  }

  return securityHeaders(NextResponse.next());
}

export const config = {
  // Run on all routes except Next internals & static assets.
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
