import { describe, expect, it } from "vitest";
import { createRequire } from "node:module";

const { parseArgs, guideExpectations } = createRequire(import.meta.url)("../../scripts/guide-browser-check.cjs");

describe("reusable guide browser check", () => {
  it("accepts a safe guide and only a local run or the public project domain", () => {
    expect(parseArgs(["--slug", "example-guide"])).toEqual({ slug: "example-guide", public: false });
    expect(parseArgs(["--slug", "example-guide", "--public"])).toEqual({ slug: "example-guide", public: true });
    for (const args of [["--slug", "../private"], ["--slug", "ok", "--base-url", "https://other.test"], ["--public"], ["--slug", "ok", "--public", "--public"]]) {
      expect(() => parseArgs(args)).toThrow();
    }
  });

  it("derives assertions from the real guide rather than per-guide boilerplate", () => {
    const guide = { slug: "example-guide", title: { en: "Example" }, coverImage: "/images/guide/example.png", relatedPlaces: ["one"], sections: [{ relatedPlaceIds: ["one", "two"], tables: { en: [{ rows: [[], []] }], fr: [{ rows: [[], [], []] }] } }] };
    expect(guideExpectations(guide, [{ id: "one", image: "/one.png" }, { id: "two" }])).toMatchObject({ tableRows: [2], illustratedPlaceIds: ["one"], missingPlaceIds: ["two"] });
    expect(guideExpectations(guide, [{ id: "one" }, { id: "two" }], "fr").tableRows).toEqual([3]);
    expect(() => guideExpectations({ ...guide, coverImage: undefined }, [])).toThrow(/cover/i);
    expect(() => guideExpectations(guide, [{ id: "one", image: "/one.png" }])).toThrow(/two/);
  });
});
