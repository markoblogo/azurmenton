import type { EventSourceAdapter, IngestionContext, RawIngestedEvent } from "@/lib/events-ingestion/types";
import { fetchTextWithTimeout } from "@/lib/events-ingestion/fetch";
import { attr, decodeHtml, stripTags } from "@/lib/events-ingestion/html";
import { parseEnglishDateRange } from "@/lib/events-ingestion/dates";

const sourceUrl = "https://www.explorenicecotedazur.com/en/events/major-events/";

export function parseNiceMajorEvents(html: string): RawIngestedEvent[] {
  const cards = html.match(/<li\b[^>]*iris-card[^>]*data-layer-wpet-offer-id=[\s\S]*?<\/li>/gi) ?? [];
  const events: RawIngestedEvent[] = [];

  for (const card of cards) {
    const sourceEventId = attr(card, "data-layer-wpet-offer-id") ?? attr(card, "data-id");
    const dataTitle = attr(card, "data-layer-wpet-offer-title");
    const title = dataTitle ?? stripTags(card.match(/<p[^>]*iris-card__content__title[\s\S]*?<\/p>/i)?.[0] ?? "");
    const href = attr(card.match(/<a\b[^>]*stretched-link[\s\S]*?>/i)?.[0] ?? "", "href") ?? sourceUrl;
    const city = (attr(card, "data-layer-wpet-offer-location") ?? "").toLowerCase().includes("nice") ? "nice" : undefined;
    const year = stripTags(card.match(/<span[^>]*iris-card__period__year[\s\S]*?<\/span>/i)?.[0] ?? "");
    const dayMatches = [...card.matchAll(/<span[^>]*iris-card__period__day[\s\S]*?<\/span>/gi)].map((match) => stripTags(match[0]));
    const monthMatches = [...card.matchAll(/<span[^>]*iris-card__period__monthName[\s\S]*?<\/span>/gi)].map((match) => stripTags(match[0]));
    const categoryLabel = stripTags(card.match(/<span class="content"[\s\S]*?<\/span>/i)?.[0] ?? "");
    const imageUrl = attr(card.match(/<img\b[^>]*>/i)?.[0] ?? "", "src");
    const dates = parseEnglishDateRange({
      startDay: dayMatches[0],
      startMonth: monthMatches[0],
      endDay: dayMatches[1],
      endMonth: monthMatches[1],
      year,
    });

    if (!title || !dates.startDate) continue;

    events.push({
      sourceId: "explore-nice-major-events",
      sourceEventId,
      title: decodeHtml(title),
      sourceUrl: href,
      dateLabel: [dayMatches[0], monthMatches[0], dayMatches[1], monthMatches[1], year].filter(Boolean).join(" "),
      ...dates,
      city,
      categoryLabel: categoryLabel || undefined,
      imageUrl,
      rawPayload: { sourceEventId, title, href, categoryLabel, imageUrl },
    });
  }

  return events;
}

export const niceMajorEventsAdapter: EventSourceAdapter = {
  sourceId: "explore-nice-major-events",
  sourceUrl,
  async fetchEvents(context: IngestionContext) {
    const html = await fetchTextWithTimeout(sourceUrl, context.timeoutMs, context.userAgent);
    return parseNiceMajorEvents(html);
  },
};
