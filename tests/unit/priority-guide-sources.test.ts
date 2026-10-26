import { describe, expect, it } from "vitest";
import { getGuideArticle } from "@/content/guide";
import { getPlace } from "@/content/places";
import { placeMapPoints } from "@/content/planning/place-map-points";
import { locales } from "@/i18n/locales";

describe("priority guide source references", () => {
  it.each([
    ["halles-du-marche-menton", "https://www.menton.fr/Marche-des-Halles-Municipales.html"],
    ["how-to-get-to-menton-from-nice-airport", "https://www.nice.aeroport.fr/en/directions/train"],
    ["how-to-get-to-menton-from-nice-airport", "https://www.nice.aeroport.fr/en/directions/public-transport"],
    ["public-transport-in-menton", "https://www.ter.sncf.com/sud-provence-alpes-cote-d-azur/se-deplacer/info-trafic/travaux"],
    ["supermarkets-in-menton", "https://www.carrefour.fr/magasin/ville/menton-06083"],
    ["fete-du-citron-menton-practical-guide", "https://www.fete-du-citron.com/?lang=en"],
    ["best-ice-cream-menton", "https://glacierdemontis.fr/contact/"],
    ["best-ice-cream-menton", "https://www.menton-riviera-merveilles.fr/offres/puro-piacere-glacier-menton-fr-3776123/"],
    ["car-rental-menton-nice-airport-convertibles", "https://www.nice.aeroport.fr/services/location-de-voiture"],
    ["airports-near-menton-live-flights", "https://www.nice.aeroport.fr/en/directions/train"],
    ["airports-near-menton-live-flights", "https://www.nice.aeroport.fr/en/flights/arrivals"],
    ["airports-near-menton-live-flights", "https://www.nice.aeroport.fr/en/flights/departures"],
    ["monaco-events-from-menton", "https://www.sncf-connect.com/en-en/train/timetables/menton/monaco"],
    ["where-to-stay-in-menton", "https://www.menton-riviera-merveilles.fr/offres/plage-rondelli-menton-fr-3051231/"],
    ["best-souvenir-shops-menton-monaco-nice", "https://www.menton-riviera-merveilles.fr/aventures-merveilleuses/citrons-et-merveilles/"],
    ["cheap-eats-menton-budget-lunch", "https://www.menton-riviera-merveilles.fr/offres/restaurant-mon-gout-menton-fr-5072583/"],
    ["best-seafood-restaurants-menton", "https://www.menton-riviera-merveilles.fr/offres/restaurant-le-cabanon-roquebrune-cap-martin-fr-3051195/"],
    ["best-coffee-menton", "https://www.menton-riviera-merveilles.fr/offres/coffee-shop-edwige-coffee-menton-fr-3051528/"],
    ["best-pizzerias-menton", "https://www.menton-riviera-merveilles.fr/offres/restaurant-pecora-negra-menton-fr-3051694/"],
  ])("keeps %s linked to its claim source", (slug, source) => {
    const article = getGuideArticle(slug);
    const section = article?.sections.find((item) => item.officialLinks?.some((link) => link.url === source));
    expect(section).toBeDefined();
    expect(section?.body.length).toBeGreaterThan(0);
    for (const locale of locales) expect(section?.officialLinks?.find((link) => link.url === source)?.label[locale]).toBeTruthy();
  });

  it("keeps the Puro Piacere address and geocoded map point aligned", () => {
    const place = getPlace("puro-piacere-menton");
    const point = placeMapPoints.find((item) => item.placeId === place?.id);
    expect(place?.address).toContain("2 Avenue Boyer");
    expect(point).toMatchObject({ lat: 43.773209, lng: 7.498808, review: { precision: "area", source: "official_address" } });
  });

  it("does not place the Place d'Armes toilets in Garavan", () => {
    const article = getGuideArticle("public-toilets-menton");
    const section = article?.sections.find((item) => item.relatedPlaceIds?.includes("public-toilets-place-darmes-menton"));
    expect(section?.body[0].en).toContain("western side, Place d'Armes");
    expect(section?.body[0].en).not.toContain("Garavan and the eastern seafront, Place d'Armes");
  });

  it("distinguishes the Victoria Beach studio from the family apartment", () => {
    const article = getGuideArticle("where-to-stay-in-menton");
    const section = article?.sections.find((item) => item.heading.en === "Central beachfront: Victoria Beach area");
    expect(section?.body[1].en).toContain("Sea View Balcony Studio");
    expect(section?.body[1].en).toContain("Beachside Family Apartment");
    expect(section?.body[1].en).not.toContain("sea-view studios");
  });

  it("distinguishes citrus boutiques from producer domains", () => {
    expect(getPlace("au-pays-du-citron-menton")?.address).toContain("22 Rue Saint-Michel");
    expect(getPlace("maison-gannac-menton")?.address).toContain("10 Rue Saint-Michel");
    expect(getPlace("maison-gannac-menton")?.address).toContain("2970 Route de Super-Garavan");
  });

  it("records the sourced Le Cabanon closure as dated rather than permanent", () => {
    const place = getPlace("le-cabanon-plage-du-buse");
    for (const locale of locales) expect(place?.openingHoursLabel?.[locale]).toContain("2026");
    expect(place?.openingHoursLabel?.en).toContain("confirm before visiting");
    expect(place?.sourceStatus).toBe("needs_verification");
  });
});
