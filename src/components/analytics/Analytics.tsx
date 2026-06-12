import { headers } from "next/headers";
import Script from "next/script";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { nonceHeaderName } from "@/lib/security-headers";

export async function Analytics() {
  const nonce = (await headers()).get(nonceHeaderName) ?? undefined;
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const plausibleApiHost = process.env.NEXT_PUBLIC_PLAUSIBLE_API_HOST || "https://plausible.io";
  const plausibleScriptSrc =
    process.env.NEXT_PUBLIC_PLAUSIBLE_SCRIPT_SRC ||
    (plausibleDomain ? `${plausibleApiHost}/js/script.js` : "");

  return (
    <>
      {plausibleScriptSrc ? (
        <>
          <Script
            async
            data-domain={plausibleDomain}
            nonce={nonce}
            src={plausibleScriptSrc}
            strategy="afterInteractive"
          />
          <Script
            id="plausible-init"
            nonce={nonce}
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html:
                "window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init();",
            }}
          />
        </>
      ) : null}
      <VercelAnalytics />
    </>
  );
}
