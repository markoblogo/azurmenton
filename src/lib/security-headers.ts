export const nonceHeaderName = "x-nonce";

function originFromUrl(value: string) {
  try {
    return new URL(value).origin;
  } catch {
    return "";
  }
}

export function createCspHeader(nonce: string) {
  const isDev = process.env.NODE_ENV === "development";
  const plausibleHost = process.env.NEXT_PUBLIC_PLAUSIBLE_API_HOST || "https://plausible.io";
  const plausibleScriptOrigin = originFromUrl(process.env.NEXT_PUBLIC_PLAUSIBLE_SCRIPT_SRC || "");
  const plausibleOrigins = Array.from(new Set([plausibleHost, plausibleScriptOrigin].filter(Boolean)));
  const directives = [
    "default-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "object-src 'none'",
    [
      "script-src",
      "'self'",
      `'nonce-${nonce}'`,
      "'strict-dynamic'",
      "https://challenges.cloudflare.com",
      ...plausibleOrigins,
      isDev ? "'unsafe-eval'" : "",
    ].filter(Boolean).join(" "),
    ["style-src", "'self'", `'nonce-${nonce}'`].join(" "),
    "img-src 'self' data: blob: https://*.tile.openstreetmap.org",
    "font-src 'self' data:",
    [
      "connect-src",
      "'self'",
      "https://api.open-meteo.com",
      "https://marine-api.open-meteo.com",
      "https://api.resend.com",
      "https://*.tile.openstreetmap.org",
      "https://challenges.cloudflare.com",
      ...plausibleOrigins,
      "https://vitals.vercel-insights.com",
      "https://*.vercel-insights.com",
    ].join(" "),
    "frame-src https://challenges.cloudflare.com https://www.youtube-nocookie.com https://player.vimeo.com",
    "upgrade-insecure-requests",
  ];

  return directives.join("; ");
}
