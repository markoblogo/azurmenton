import { describe, expect, it } from "vitest";
import { guideArticles, getGuideArticle } from "@/content/guide";
import { places } from "@/content/places";
import { rivieraEvents, getRivieraEvent } from "@/content/riviera-events";
import { placeSharePath } from "@/lib/place-share-target";
import { renderedGuidePlaceIds } from "@/lib/search-place-targets";

describe("shareable place cards", () => {
  it("resolves every guide/event-rendered place to a real card, including event-only venues", () => {
    const known = new Set(places.map(place => place.id));
    const publicIds = new Set(guideArticles.flatMap(guide => [...renderedGuidePlaceIds(guide, known)]));
    rivieraEvents.filter(event => event.detailPage).forEach(event => (event.relatedPlaceIds ?? []).filter(id => known.has(id)).slice(0, event.placeDisplayLimit ?? 6).forEach(id => publicIds.add(id)));
    for (const id of publicIds) {
      const path = placeSharePath(id, "en");
      expect(path, id).toBeDefined();
      const [, , type, slug] = path!.split("#")[0].split("/");
      expect(path!.endsWith(`#place-${id}`)).toBe(true);
      if (type === "guide") expect(renderedGuidePlaceIds(getGuideArticle(slug)!, known).has(id)).toBe(true);
      else expect((getRivieraEvent(slug)?.relatedPlaceIds ?? []).filter(placeId => known.has(placeId)).slice(0, getRivieraEvent(slug)?.placeDisplayLimit ?? 6)).toContain(id);
    }
    expect(placeSharePath("unknown-place", "en")).toBeUndefined();
  });
});
