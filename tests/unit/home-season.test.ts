import { describe, expect, it } from "vitest";
import { homeSeason, homeSeasonGuideSlugs } from "@/lib/home-season";
import { guideArticles } from "@/content/guide";

describe("seasonal home guides", () => {
  it("uses the date in Menton at seasonal boundaries", () => {
    expect(homeSeason(new Date("2026-08-31T21:59:00Z"))).toBe("summer");
    expect(homeSeason(new Date("2026-08-31T22:00:00Z"))).toBe("autumn");
    expect(homeSeason(new Date("2026-11-30T23:00:00Z"))).toBe("winter");
    expect(homeSeason(new Date("2027-02-28T23:00:00Z"))).toBe("spring");
  });
  it("uses four distinct existing guides with covers in every season", () => {
    for (const slugs of Object.values(homeSeasonGuideSlugs)) {
      expect(new Set(slugs).size).toBe(4);
      for (const slug of slugs) expect(guideArticles.find((guide) => guide.slug === slug)?.coverImage).toBeTruthy();
    }
  });
});
