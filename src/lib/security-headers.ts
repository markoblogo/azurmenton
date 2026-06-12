export const nonceHeaderName = "x-nonce";

export function createCspHeader(nonce: string) {
  const isDev = process.env.NODE_ENV === "development";
  const plausibleHost = process.env.NEXT_PUBLIC_PLAUSIBLE_API_HOST || "https://plausible.io";
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
      plausibleHost,
      isDev ? "'unsafe-eval'" : "",
    ].filter(Boolean).join(" "),
    ["style-src", "'self'", `'nonce-${nonce}'`].join(" "),
    "img-src 'self' data: blob:",
    "font-src 'self' data:",
    [
      "connect-src",
      "'self'",
      "https://api.open-meteo.com",
      "https://marine-api.open-meteo.com",
      "https://api.resend.com",
      "https://challenges.cloudflare.com",
      plausibleHost,
      "https://vitals.vercel-insights.com",
      "https://*.vercel-insights.com",
    ].join(" "),
    "frame-src https://challenges.cloudflare.com",
    "upgrade-insecure-requests",
  ];

  return directives.join("; ");
}
