// Centralized security helpers: input sanitization, rate limiting, origin checks.
// No SQL database is used (data is stored as JSON via Vercel Blob), so classic
// SQL injection does not apply — but we still strictly sanitize every value to
// neutralize stored-XSS and HTML/script injection.

/* ───────────────────────── Sanitization (anti-XSS) ───────────────────────── */

// Strip anything that could execute or inject markup. Keeps plain text intact.
export function sanitizeString(value) {
  if (typeof value !== "string") return value;
  return value
    // remove <script>…</script> blocks entirely
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    // remove <style>…</style> blocks
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
    // strip any remaining HTML tags
    .replace(/<\/?[a-z][^>]*>/gi, "")
    // neutralize dangerous protocols
    .replace(/javascript:/gi, "")
    .replace(/data:text\/html/gi, "")
    // strip inline event handlers like onclick=
    .replace(/\son\w+\s*=/gi, " ")
    .trim();
}

// Recursively sanitize every string in an object/array. Caps depth & size to
// prevent algorithmic-complexity abuse from deeply nested payloads.
export function sanitizeDeep(input, depth = 0) {
  if (depth > 8) return null;
  if (typeof input === "string") return sanitizeString(input);
  if (Array.isArray(input)) {
    return input.slice(0, 500).map((v) => sanitizeDeep(v, depth + 1));
  }
  if (input && typeof input === "object") {
    const out = {};
    for (const key of Object.keys(input).slice(0, 200)) {
      // block prototype-pollution keys
      if (key === "__proto__" || key === "constructor" || key === "prototype") continue;
      out[key] = sanitizeDeep(input[key], depth + 1);
    }
    return out;
  }
  return input; // numbers, booleans, null
}

// Parse a request body as JSON, enforce a max size, and deep-sanitize it.
// Use in place of `await req.json()` in every mutating route.
export async function readSanitizedBody(req, maxBytes = 256 * 1024) {
  const raw = await req.text();
  if (raw.length > maxBytes) {
    throw new Error("Payload too large");
  }
  let parsed;
  try {
    parsed = raw ? JSON.parse(raw) : {};
  } catch {
    throw new Error("Invalid JSON");
  }
  return sanitizeDeep(parsed);
}

// Escape text for safe interpolation into HTML (for dangerouslySetInnerHTML).
export function escapeHtml(str) {
  if (typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/* ───────────────────────── Rate limiting (anti-DoS / L7) ───────────────────────── */

// In-memory fixed-window limiter. Sufficient for a single-region deployment;
// for multi-region scale move this to Upstash/Redis with the same interface.
const buckets = new Map();

export function rateLimit(key, { limit = 30, windowMs = 60_000 } = {}) {
  const now = Date.now();
  const entry = buckets.get(key);

  if (!entry || now > entry.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1, resetAt: now + windowMs };
  }

  entry.count += 1;
  const ok = entry.count <= limit;
  return {
    ok,
    remaining: Math.max(0, limit - entry.count),
    resetAt: entry.resetAt,
  };
}

// Opportunistic cleanup so the Map cannot grow unbounded under attack.
export function sweepBuckets() {
  const now = Date.now();
  if (buckets.size < 5000) return;
  for (const [k, v] of buckets) {
    if (now > v.resetAt) buckets.delete(k);
  }
}

export function clientIp(req) {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

/* ───────────────────────── CSRF / origin verification ───────────────────────── */

// For state-changing API requests, require that the Origin (or Referer) matches
// the host the request was sent to. Blocks cross-site form/fetch CSRF.
export function isSameOrigin(req) {
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (!host) return false;

  if (origin) {
    try {
      return new URL(origin).host === host;
    } catch {
      return false;
    }
  }

  // Fall back to Referer when Origin is absent (e.g. some same-origin GETs).
  const referer = req.headers.get("referer");
  if (referer) {
    try {
      return new URL(referer).host === host;
    } catch {
      return false;
    }
  }

  // No Origin and no Referer on a mutating request → reject.
  return false;
}
