import { describe, expect, it } from "vitest";
import { getGuideArticle } from "@/content/guide";
import { locales } from "@/i18n/locales";

describe("practical guide parking information", () => {
  it.each(["electric-car-charging-menton", "petrol-stations-menton"])(
    "states the Panoramic studio parking exception in every locale: %s",
    (slug) => {
      const guide = getGuideArticle(slug);
      expect(guide).toBeDefined();
      const noParking = { en: "does not have private parking", fr: "ne dispose pas de parking prive", it: "non dispone di parcheggio privato", uk: "не має приватного паркінгу" };
      for (const locale of locales) {
        const bodies = guide!.sections.flatMap((section) => section.body.map((body) => body[locale]));
        expect(bodies.some((body) => body.includes("Panoramic Sea View Studio") && body.includes(noParking[locale]))).toBe(true);
      }
    },
  );
});
