import { createHash } from "node:crypto";
import type { EventSourceAdapter, IngestionContext, RawIngestedEvent } from "@/lib/events-ingestion/types";
import { fetchTextWithTimeout } from "@/lib/events-ingestion/fetch";
import { attr, decodeHtml, stripTags } from "@/lib/events-ingestion/html";

const sourceUrl = "https://www.sanremoliveandlove.it/";

function parseItalianNumericDate(value: string) {
  const match = value.trim().match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!match) return undefined;
  return `${match[3]}-${match[2]}-${match[1]}`;
}

export function parseSanremoLiveLoveEvents(html: string): RawIngestedEvent[] {
  const eventSection = html.match(/<section[^>]*id=["']eventi["'][\s\S]*?<\/section>/i)?.[0] ?? html;
  const cards = eventSection.match(/<li\b[\s\S]*?<\/li>/gi) ?? [];
  const events: RawIngestedEvent[] = [];

  for (const card of cards) {
    const rawDate = stripTags(card.match(/<span[^>]*uppercase[^>]*>[\s\S]*?<\/span>/i)?.[0] ?? "");
    const startDate = parseItalianNumericDate(rawDate);
    const title = stripTags(card.match(/<h3[^>]*>[\s\S]*?<\/h3>/i)?.[0] ?? "");
    const href = attr(card.match(/<a\b[^>]*href=["'][^"']+["'][\s\S]*?>/i)?.[0] ?? "", "href");
    if (!title || !startDate || !href) continue;
    const sourceEventId = createHash("sha1").update(`${href}|${startDate}`).digest("hex").slice(0, 16);
    events.push({
      sourceId: "sanremo-live-love",
      sourceEventId,
      title: decodeHtml(title),
      sourceUrl: href.startsWith("http") ? href : new URL(href, sourceUrl).toString(),
      dateLabel: rawDate,
      startDate,
      city: "sanremo",
      rawPayload: { href, title, rawDate },
    });
  }

  return events;
}

export const sanremoLiveLoveAdapter: EventSourceAdapter = {
  sourceId: "sanremo-live-love",
  sourceUrl,
  async fetchEvents(context: IngestionContext) {
    const html = await fetchTextWithTimeout(sourceUrl, context.timeoutMs, context.userAgent);
    return parseSanremoLiveLoveEvents(html);
  },
};
