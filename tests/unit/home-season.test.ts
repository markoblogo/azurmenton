import { describe, expect, it } from "vitest";
import { getHomeGuideSlugs, homeSeason, homeSeasonGuideSlugs } from "@/lib/home-season";
import { guideArticles } from "@/content/guide";

describe("seasonal home guides", () => {
  it("uses the date in Menton at seasonal boundaries", () => {
    expect(homeSeason(new Date("2026-08-31T21:59:00Z"))).toBe("summer");
    expect(homeSeason(new Date("2026-08-31T22:00:00Z"))).toBe("autumn");
    expect(homeSeason(new Date("2026-11-30T23:00:00Z"))).toBe("winter");
    expect(homeSeason(new Date("2027-02-28T23:00:00Z"))).toBe("spring");
  });
  it("uses distinct existing guides with covers in every seasonal pool", () => {
    for (const slugs of Object.values(homeSeasonGuideSlugs)) {
      expect(new Set(slugs).size).toBe(slugs.length);
      for (const slug of slugs) expect(guideArticles.find((guide) => guide.slug === slug)?.coverImage).toBeTruthy();
    }
  });
  it("rotates four guides monthly in Paris without duplicates", () => {
    const oct = getHomeGuideSlugs(new Date("2026-10-15T12:00:00Z"));
    const nov = getHomeGuideSlugs(new Date("2026-11-15T12:00:00Z"));
    expect(oct).toHaveLength(4);
    expect(new Set(oct).size).toBe(4);
    expect(oct[0]).toBe("menton-in-autumn");
    expect(nov[0]).toBe(oct[0]);
    expect(nov).not.toEqual(oct);
    expect(getHomeGuideSlugs(new Date("2026-11-30T23:00:00Z"))[0]).toBe("menton-in-winter");
  });
});
