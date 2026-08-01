import type { EventSourceAdapter, IngestionContext, RawIngestedEvent } from "@/lib/events-ingestion/types";
import { fetchTextWithTimeout } from "@/lib/events-ingestion/fetch";
import { attr, decodeHtml, stripTags } from "@/lib/events-ingestion/html";
import { parseItalianCalendarDate } from "@/lib/events-ingestion/dates";
import { createHash } from "node:crypto";

const sourceUrl = "https://www.comune.sanremo.im.it/it";

export function parseSanremoComuneEvents(html: string): RawIngestedEvent[] {
  const cards = html.match(/<li class="splide__slide lined_slide">[\s\S]*?<\/li>/gi) ?? [];
  const seen = new Set<string>();
  const events: RawIngestedEvent[] = [];

  for (const card of cards) {
    const monthYear = stripTags(card.match(/<span class="pt-1 pb-2 pl-0">[\s\S]*?<\/span>/i)?.[0] ?? "");
    const heading = card.match(/<h1 class="card-title h3">[\s\S]*?<\/h1>/i)?.[0] ?? "";
    const day = stripTags(heading.replace(/<span[\s\S]*?<\/span>/i, ""));
    const startDate = parseItalianCalendarDate(monthYear, day);
    const links = card.match(/<a\b[^>]*href=["']https:\/\/www\.comune\.sanremo\.im\.it\/it\/events\/[\s\S]*?<\/a>/gi) ?? [];

    for (const link of links) {
      const href = attr(link, "href");
      const title = stripTags(link);
      if (!href || !title || !startDate) continue;
      const key = `${href}|${startDate}`;
      if (seen.has(key)) continue;
      seen.add(key);
      const sourceEventId = createHash("sha1").update(key).digest("hex").slice(0, 16);
      events.push({
        sourceId: "comune-sanremo-events",
        sourceEventId: sourceEventId ? `${sourceEventId}:${startDate}` : undefined,
        title: decodeHtml(title),
        sourceUrl: href,
        dateLabel: `${day} ${monthYear}`,
        startDate,
        city: "sanremo",
        rawPayload: { href, title, monthYear, day },
      });
    }
  }

  return events;
}

export const sanremoComuneAdapter: EventSourceAdapter = {
  sourceId: "comune-sanremo-events",
  sourceUrl,
  async fetchEvents(context: IngestionContext) {
    const html = await fetchTextWithTimeout(sourceUrl, context.timeoutMs, context.userAgent);
    return parseSanremoComuneEvents(html);
  },
};
