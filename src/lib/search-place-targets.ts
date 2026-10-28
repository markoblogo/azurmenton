import type { GuideArticle } from "@/content/guide";
import type { Place } from "@/content/places";

export function renderedGuidePlaceIds(guide: Pick<GuideArticle, "relatedPlaces" | "sections">, knownPlaceIds: ReadonlySet<string>): Set<string> {
  const sectionIds = guide.sections.flatMap((section) => section.relatedPlaceIds ?? []);
  const relatedIds = [...new Set([...(guide.relatedPlaces ?? []), ...sectionIds])]
    .filter((id) => knownPlaceIds.has(id)).slice(0, 6);
  return new Set([...sectionIds.filter((id) => knownPlaceIds.has(id)), ...relatedIds]);
}

export function selectPlaceGuide(place: Pick<Place, "id" | "type" | "guideCoverageSlugs" | "relatedArticleIds">, guides: readonly GuideArticle[], knownPlaceIds: ReadonlySet<string>): GuideArticle | undefined {
  const score = (guide: GuideArticle) =>
    (place.guideCoverageSlugs?.includes(guide.slug) ? 100 : 0)
    + (place.type === "pharmacy" && guide.slug === "pharmacies-in-menton-and-nice-airport" ? 90 : 0)
    + (guide.sections.some((section) => section.relatedPlaceIds?.includes(place.id)) ? 20 : 0)
    + (place.relatedArticleIds.includes(guide.slug) ? 10 : 0);
  return guides.filter((guide) => renderedGuidePlaceIds(guide, knownPlaceIds).has(place.id))
    .sort((a, b) => score(b) - score(a) || a.slug.localeCompare(b.slug, "en"))[0];
}

export function placeAnchorId(placeId: string): string {
  return `place-${placeId}`;
}
