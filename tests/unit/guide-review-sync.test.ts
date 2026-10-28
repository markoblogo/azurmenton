import { describe, expect, it } from "vitest";
import { syncGuideReviewPlan } from "../../src/lib/guide-review";

const input = {
  slug: "heritage", plan: { slug: "heritage", coverImageStatus: "provided" as const, coverAssetPath: "/old/cover.png", plannedPlaces: [{ draftName: "New", newPlaceId: "new" }] },
  guide: { slug: "heritage", publishedOn: "2026-10-28", category: "walks-views", coverImage: "/images/guide/heritage.png", relatedArticles: ["walks"], relatedApartments: ["studio"], sections: [{ relatedPlaceIds: ["old", "new", "old"] }] },
  places: [{ id: "old", name: "Old", image: "/images/guide/old.png", relatedArticleIds: [] }, { id: "new", name: "New", requiresMapReview: true, relatedArticleIds: [] }],
  mapPoints: [{ placeId: "old" }], mapExclusions: [{ placeId: "new" }],
};
describe("explicit post-insert plan sync", () => {
  it("uses real content, preserves new-place decisions and derives image/map state without mutating inputs", () => {
    const before = JSON.stringify(input);
    const plan = syncGuideReviewPlan(input);
    expect(plan.relatedPlaceIds).toEqual(["old", "new"]);
    expect(plan.relatedArticleSlugs).toEqual(["walks"]);
    expect(plan.coverAssetPath).toBeNull();
    expect(plan.coverImageStatus).toBe("existing");
    expect(plan.plannedPlaces?.[0]).toMatchObject({ existingPlaceId: "old", imageStatus: "existing", mapAction: "point" });
    expect(plan.plannedPlaces?.[1]).toMatchObject({ newPlaceId: "new", imageStatus: "pending", mapAction: "exclude" });
    expect(JSON.stringify(input)).toBe(before);
    expect(syncGuideReviewPlan({ ...input, plan })).toEqual(plan);
    expect(syncGuideReviewPlan({ ...input, mapExclusions: [] }).plannedPlaces?.[1].mapAction).toBeNull();
  });
  it("refuses a missing guide, a different slug or an unknown public place", () => {
    expect(() => syncGuideReviewPlan({ ...input, guide: undefined })).toThrow("same existing guide");
    expect(() => syncGuideReviewPlan({ ...input, slug: "other" })).toThrow("same existing guide");
    expect(() => syncGuideReviewPlan({ ...input, places: [] })).toThrow("unknown rendered place");
  });
});
