import { cache } from "react";
import { guideArticles } from "@/content/guide";
import { places } from "@/content/places";
import { rivieraEvents } from "@/content/riviera-events";
import { placeAnchorId, selectPlaceGuide } from "@/lib/search-place-targets";
import type { Locale } from "@/i18n/locales";

const knownPlaceIds = new Set(places.map(place => place.id));
const canonicalGuide = cache((id: string) => {
  const place = places.find(item => item.id === id);
  return place ? selectPlaceGuide(place, guideArticles, knownPlaceIds)?.slug : undefined;
});

export function placeSharePath(id: string, locale: Locale): string | undefined {
  const slug = canonicalGuide(id);
  if (slug) return `/${locale}/guide/${slug}#${placeAnchorId(id)}`;
  const event = rivieraEvents.find(item => item.detailPage && (item.relatedPlaceIds ?? []).filter(placeId => knownPlaceIds.has(placeId)).slice(0, item.placeDisplayLimit ?? 6).includes(id));
  return event ? `/${locale}/events/${event.occurrenceSlug ?? event.slug}#${placeAnchorId(id)}` : undefined;
}
