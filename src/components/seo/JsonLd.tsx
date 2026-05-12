import type { JsonLd } from "@/lib/structured-data";
import { renderJsonLd } from "@/lib/structured-data";

export function JsonLdScript({ data }: { data: JsonLd }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={renderJsonLd(data)}
      suppressHydrationWarning
    />
  );
}
