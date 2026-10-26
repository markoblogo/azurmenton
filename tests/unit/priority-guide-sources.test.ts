import { describe, expect, it } from "vitest";
import { getGuideArticle } from "@/content/guide";
import { locales } from "@/i18n/locales";

describe("priority guide source references", () => {
  it.each([
    ["halles-du-marche-menton", "https://www.menton.fr/Marche-des-Halles-Municipales.html"],
    ["how-to-get-to-menton-from-nice-airport", "https://www.nice.aeroport.fr/en/directions/train"],
    ["how-to-get-to-menton-from-nice-airport", "https://www.nice.aeroport.fr/en/directions/public-transport"],
    ["public-transport-in-menton", "https://www.ter.sncf.com/sud-provence-alpes-cote-d-azur/se-deplacer/info-trafic/travaux"],
    ["supermarkets-in-menton", "https://www.carrefour.fr/magasin/ville/menton-06083"],
    ["fete-du-citron-menton-practical-guide", "https://www.fete-du-citron.com/?lang=en"],
  ])("keeps %s linked to its claim source", (slug, source) => {
    const article = getGuideArticle(slug);
    const section = article?.sections.find((item) => item.officialLinks?.some((link) => link.url === source));
    expect(section).toBeDefined();
    expect(section?.body.length).toBeGreaterThan(0);
    for (const locale of locales) expect(section?.officialLinks?.find((link) => link.url === source)?.label[locale]).toBeTruthy();
  });
});
