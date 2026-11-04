import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { guideArticles, localizeGuideArticle } from "../../src/content/guide";
import { places } from "../../src/content/places";
import { rivieraEvents } from "../../src/content/riviera-events";
import { guideAuthorityProfiles } from "../../src/content/guide-authority";

const slug = "nice-carnival-menton-lemon-festival-itinerary";
const guide = guideArticles.find(article => article.slug === slug)!;

describe("February festival itinerary", () => {
  it("aligns four languages, six tables and dated practical warnings", () => {
    for (const locale of ["en", "fr", "it", "uk"] as const) {
      const article = localizeGuideArticle(guide, locale);
      expect(article.sections).toHaveLength(19);
      expect(article.sections.flatMap(section => section.tables ?? []).map(table => table.rows.length)).toEqual([8, 3, 5, 7, 6, 7]);
      const text = article.sections.flatMap(section => section.body).join("\n");
      expect(text).toContain("SNCF");
      expect(text).toContain("2027");
      expect(text).toContain("23");
      expect(text).toContain("2026");
      expect(text).not.toMatch(/SEO title:|Meta description:|Suggested URL:|\[ \]|5 October 2026|could not establish the full/);
      expect(article.sections[18].body.join(" ")).toContain("2026");
    }
    expect(guideAuthorityProfiles[slug].reviewedAt).toBe("2026-11-04");
    expect(guideAuthorityProfiles[slug].sources).toHaveLength(3);
  });

  it("reuses illustrated locations and reciprocal guide and event relationships", () => {
    expect(guide.relatedPlaces).toHaveLength(6);
    for (const id of guide.relatedPlaces ?? []) {
      const place = places.find(item => item.id === id)!;
      expect(place.relatedArticleIds).toContain(slug);
      expect(place.image).toBeTruthy();
      expect(existsSync(`public${place.image}`)).toBe(true);
    }
    for (const id of guide.relatedArticles ?? []) expect(guideArticles.find(item => item.slug === id)?.relatedArticles).toContain(slug);
    for (const id of guide.relatedEvents ?? []) expect(rivieraEvents.find(item => item.slug === id)?.relatedGuideSlugs).toContain(slug);
    expect(existsSync(`public${guide.coverImage}`)).toBe(true);
  });
});
