import { describe, expect, it } from "vitest";
import { guideArticles } from "../../src/content/guide";
import { places } from "../../src/content/places";
import { firstPlaceSectionIndices } from "../../src/lib/guide-place-anchors";
import { placeAnchorId, renderedGuidePlaceIds, selectPlaceGuide } from "../../src/lib/search-place-targets";
import { isCurrentSearchEvent, rankSearchResults, searchQueryVariants } from "../../src/lib/search-ranking";

describe("search place targets", () => {
  it("selects only actual rendered cards with a unique corresponding anchor across the catalogue", () => {
    const known = new Set(places.map((place) => place.id));
    let indexed = 0;
    for (const place of places) {
      const guide = selectPlaceGuide(place, guideArticles, known);
      if (!guide) continue;
      indexed++;
      expect(renderedGuidePlaceIds(guide, known).has(place.id)).toBe(true);
      const first = firstPlaceSectionIndices(guide.sections);
      const sectionCount = guide.sections.reduce((count, section, index) => count + ((section.relatedPlaceIds ?? []).includes(place.id) && first.get(place.id) === index ? 1 : 0), 0);
      const related = [...new Set([...(guide.relatedPlaces ?? []), ...guide.sections.flatMap((section) => section.relatedPlaceIds ?? [])])].filter((id) => known.has(id)).slice(0, 6);
      expect(sectionCount + (!first.has(place.id) && related.includes(place.id) ? 1 : 0)).toBe(1);
      expect(placeAnchorId(place.id)).toBe(`place-${place.id}`);
    }
    expect(indexed).toBeGreaterThan(500);
  });
  it("prefers the pharmacy specialist guide when it renders the place", () => {
    const place = places.find((item) => item.id === "pharmacie-garavan-menton")!;
    expect(selectPlaceGuide(place, guideArticles, new Set(places.map((item) => item.id)))?.slug).toBe("pharmacies-in-menton-and-nice-airport");
  });
});

describe("search relevance", () => {
  it("excludes past or undated events from a stale index", () => {
    expect(isCurrentSearchEvent("2026-10-27", "2026-10-28")).toBe(false);
    expect(isCurrentSearchEvent("2026-10-28", "2026-10-28")).toBe(true);
    expect(isCurrentSearchEvent(undefined, "2026-10-28")).toBe(false);
    expect(isCurrentSearchEvent("invalid", "2026-10-28")).toBe(false);
  });
  it.each([
    ["en", "pharmacy", ["pharmacy", "pharmacies"]], ["en", "rain", ["rain", "rainy"]],
    ["fr", "pharmacie", ["pharmacie", "pharmacies"]], ["it", "farmacia", ["farmacia", "farmacie"]],
    ["uk", "аптека", ["аптека", "аптеки"]], ["en", "pharmcy", ["pharmcy"]],
  ] as const)("expands %s %s conservatively", (locale, query, expected) => {
    expect(searchQueryVariants(query, locale)).toEqual(expected);
  });
  it("does not boost Rainier as an exact match for rain and deduplicates variants", () => {
    const ranked = rankSearchResults([
      { url: "/zoo", title: "Rainier Zoo", type: "place", sourceRank: 0, exactQuery: true },
      { url: "/rain-guide", title: "Rain plans", type: "guide", sourceRank: 4, exactQuery: true },
      { url: "/rain-guide", title: "Rain plans", type: "guide", sourceRank: 1, exactQuery: false },
    ], "rain");
    expect(ranked.map((item) => item.url)).toEqual(["/rain-guide", "/zoo"]);
  });
  it("recognizes Ukrainian whole-word titles", () => {
    const ranked = rankSearchResults([
      { url: "/other", title: "Аптекар", type: "place", sourceRank: 0, exactQuery: true },
      { url: "/pharmacy", title: "Аптека в Ментоні", type: "guide", sourceRank: 3, exactQuery: true },
    ], "аптека");
    expect(ranked[0].url).toBe("/pharmacy");
  });
  it("recognizes equivalent title words for the current language", () => {
    const ranked = rankSearchResults([
      { url: "/airport", title: "Airport Pharmacy", type: "place", sourceRank: 0, exactQuery: true },
      { url: "/pharmacies", title: "Pharmacies in Menton", type: "guide", sourceRank: 2, exactQuery: true },
    ], "pharmacy", "en");
    expect(ranked[0].url).toBe("/pharmacies");
  });
});
