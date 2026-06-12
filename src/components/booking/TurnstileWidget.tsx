import { headers } from "next/headers";
import Script from "next/script";
import { nonceHeaderName } from "@/lib/security-headers";

export async function TurnstileWidget() {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  if (!siteKey) {
    return null;
  }

  const nonce = (await headers()).get(nonceHeaderName) ?? undefined;

  return (
    <>
      <Script
        nonce={nonce}
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="afterInteractive"
      />
      <div className="cf-turnstile" data-sitekey={siteKey} />
    </>
  );
}
