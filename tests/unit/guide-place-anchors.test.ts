import { describe, expect, it } from "vitest";
import { firstPlaceSectionIndices } from "../../src/lib/guide-place-anchors";

describe("guide place anchors", () => {
  it("assigns each place to its first section even when it appears more than once", () => {
    const first = firstPlaceSectionIndices([{ relatedPlaceIds: ["a", "a"] }, {}, { relatedPlaceIds: ["a", "b"] }]);
    expect([...first]).toEqual([["a", 0], ["b", 2]]);
    expect(first.has("related-only")).toBe(false);
  });
});
