import { headers } from "next/headers";
import Script from "next/script";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { nonceHeaderName } from "@/lib/security-headers";

export async function Analytics() {
  const nonce = (await headers()).get(nonceHeaderName) ?? undefined;
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const plausibleApiHost = process.env.NEXT_PUBLIC_PLAUSIBLE_API_HOST || "https://plausible.io";

  return (
    <>
      {plausibleDomain ? (
        <Script
          defer
          data-domain={plausibleDomain}
          nonce={nonce}
          src={`${plausibleApiHost}/js/script.js`}
          strategy="afterInteractive"
        />
      ) : null}
      <VercelAnalytics />
    </>
  );
}
