import { describe, expect, it } from "vitest";
import { getApartment } from "@/content/apartments";
import { getGuideArticle } from "@/content/guide";
import { guideApartmentPaths } from "@/content/guide-apartment-paths";
import { locales } from "@/i18n/locales";
import { apartmentDetailAttributionHref, attributionFromSearchParams } from "@/lib/analytics";

describe("contextual guide apartment paths", () => {
  it("points only to existing apartments already related to the guide in all locales", () => {
    expect(Object.keys(guideApartmentPaths)).toHaveLength(4);
    for (const [slug, path] of Object.entries(guideApartmentPaths)) {
      const guide = getGuideArticle(slug);
      expect(guide?.sections[path.afterSectionIndex]).toBeDefined();
      expect(new Set(path.apartments).size).toBe(path.apartments.length);
      for (const locale of locales) {
        expect(path.title[locale]).toBeTruthy();
        expect(path.text[locale]).toBeTruthy();
      }
      for (const apartmentSlug of path.apartments) {
        expect(getApartment(apartmentSlug)).toBeDefined();
        expect(guide?.relatedApartments).toContain(apartmentSlug);
        const href = apartmentDetailAttributionHref("en", apartmentSlug, { sourcePageType: "guide", sourceSlug: slug, sourceGuideSlug: slug });
        const params = new URL(href, "https://example.com").searchParams;
        expect(attributionFromSearchParams(params, `/en/apartments/${apartmentSlug}`)).toMatchObject({ sourceGuideSlug: slug, sourceApartmentSlug: apartmentSlug });
      }
    }
  });
});
