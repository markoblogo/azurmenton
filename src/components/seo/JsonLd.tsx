import { headers } from "next/headers";
import type { JsonLd } from "@/lib/structured-data";
import { renderJsonLd } from "@/lib/structured-data";
import { nonceHeaderName } from "@/lib/security-headers";

export async function JsonLdScript({ data }: { data: JsonLd }) {
  const nonce = (await headers()).get(nonceHeaderName) ?? undefined;

  return (
    <script
      nonce={nonce}
      type="application/ld+json"
      dangerouslySetInnerHTML={renderJsonLd(data)}
      suppressHydrationWarning
    />
  );
}
