import type { GuideArticle } from "@/content/guide";
import { getEventSearchIndexing, rivieraEvents, summerOnTheRivieraEvent, type RivieraEvent } from "@/content/riviera-events";

const DEFAULT_LIMIT = 12;

function unique(items: string[]) {
  return [...new Set(items)];
}

export function getGuideRenderedPlaceIds(article: Pick<GuideArticle, "relatedPlaces" | "sections">) {
  return unique([...(article.relatedPlaces ?? []), ...article.sections.flatMap((section) => section.relatedPlaceIds ?? [])]);
}

function isPublicPlanningEvent(event: RivieraEvent) {
  return event.detailPage && getEventSearchIndexing(event) !== "noindex";
}

function eventStartRank(event: RivieraEvent) {
  return event.startDate ?? event.endDate ?? "9999-12-31";
}

function relatedEventRank(event: RivieraEvent, guideSlug: string, renderedPlaceIds: Set<string>) {
  let score = 0;
  if ((event.relatedPlaceIds ?? []).some((placeId) => renderedPlaceIds.has(placeId))) score += 6;
  if ((event.relatedGuideSlugs ?? []).includes(guideSlug)) score += 4;
  if (event.location === "Menton") score += 3;
  if (event.dateStatus === "confirmed") score += 2;
  if (event.recurrence === "one_off") score += 1;
  return score;
}

export function getGuideRelatedEventSlugs(
  article: Pick<GuideArticle, "slug" | "relatedEvents" | "sections" | "relatedPlaces">,
  events: RivieraEvent[] = [...rivieraEvents, summerOnTheRivieraEvent],
  limit = DEFAULT_LIMIT,
) {
  const eventBySlug = new Map<string, RivieraEvent>();
  for (const event of events) {
    eventBySlug.set(event.slug, event);
    if (event.occurrenceSlug) eventBySlug.set(event.occurrenceSlug, event);
  }
  const explicit = unique([...(article.relatedEvents ?? []), ...article.sections.flatMap((section) => section.relatedEventIds ?? [])]).filter((eventSlug) => {
    const event = eventBySlug.get(eventSlug);
    return !event || isPublicPlanningEvent(event);
  });
  const renderedPlaceIds = new Set(getGuideRenderedPlaceIds(article));
  const inferred = events
    .filter(isPublicPlanningEvent)
    .filter((event) => {
      if ((event.relatedGuideSlugs ?? []).includes(article.slug)) return true;
      return (event.relatedPlaceIds ?? []).some((placeId) => renderedPlaceIds.has(placeId));
    })
    .sort((left, right) => relatedEventRank(right, article.slug, renderedPlaceIds) - relatedEventRank(left, article.slug, renderedPlaceIds) || eventStartRank(left).localeCompare(eventStartRank(right)))
    .map((event) => event.occurrenceSlug ?? event.slug);

  return unique([...explicit, ...inferred]).slice(0, limit);
}
