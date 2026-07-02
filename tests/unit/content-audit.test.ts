import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { apartments } from "../../src/content/apartments";
import { guideArticles } from "../../src/content/guide";
import { guideIntentClusters } from "../../src/content/guide-intents";
import { places } from "../../src/content/places";
import { rivieraEvents, summerOnTheRivieraEvent } from "../../src/content/riviera-events";
import { getEventDateStatus } from "../../src/lib/events";

const publicPathExists = (sitePath: string) => existsSync(join(process.cwd(), "public", sitePath.replace(/^\//, "")));
const unique = (items: string[]) => new Set(items).size === items.length;

const guideSlugs = new Set(guideArticles.map((article) => article.slug));
const placeIds = new Set(places.map((place) => place.id));
const apartmentSlugs = new Set(apartments.map((apartment) => apartment.slug));
const eventSlugs = new Set([...rivieraEvents.map((event) => event.slug), summerOnTheRivieraEvent.slug]);
const clusteredGuideSlugs = new Set(guideIntentClusters.flatMap((cluster) => [cluster.canonicalGuideSlug, ...cluster.supportingGuideSlugs]));

const evergreenPracticalSlugs = [
  "menton-in-autumn",
  "menton-with-kids-family-guide",
  "stay-cool-in-menton-summer",
  "menton-without-a-car",
  "where-to-stay-in-menton",
  "best-beaches-in-menton",
  "day-trips-from-menton",
  "italian-riviera-day-trip-from-menton",
  "best-walks-and-hikes-around-menton",
  "cinemas-in-menton-nice-monaco",
  "museums-in-menton-nice-monaco",
  "useful-apps-websites-menton-monaco-italian-riviera",
  "useful-numbers-emergency-contacts-menton",
  "how-to-get-to-menton-from-nice-airport",
  "public-transport-in-menton",
  "supermarkets-in-menton",
];

function unresolved(values: string[] | undefined, known: Set<string>) {
  return (values ?? []).filter((value) => !known.has(value));
}

describe("content graph audit", () => {
  it("keeps primary content slugs unique", () => {
    expect(unique(guideArticles.map((article) => article.slug))).toBe(true);
    expect(unique(guideArticles.map((article) => article.id))).toBe(true);
    expect(unique(places.map((place) => place.id))).toBe(true);
    expect(unique(apartments.map((apartment) => apartment.slug))).toBe(true);
    expect(unique(rivieraEvents.map((event) => event.slug))).toBe(true);
  });

  it("keeps guide references resolvable", () => {
    const failures: string[] = [];

    for (const article of guideArticles) {
      for (const slug of unresolved(article.relatedArticles, guideSlugs)) failures.push(`${article.slug} relatedArticles -> ${slug}`);
      for (const id of unresolved(article.relatedPlaces, placeIds)) failures.push(`${article.slug} relatedPlaces -> ${id}`);
      for (const slug of unresolved(article.relatedEvents, eventSlugs)) failures.push(`${article.slug} relatedEvents -> ${slug}`);
      for (const slug of unresolved(article.relatedApartments, apartmentSlugs)) failures.push(`${article.slug} relatedApartments -> ${slug}`);

      for (const [index, section] of article.sections.entries()) {
        for (const id of unresolved(section.relatedPlaceIds, placeIds)) failures.push(`${article.slug} section ${index} relatedPlaceIds -> ${id}`);
        for (const slug of unresolved(section.relatedEventIds, eventSlugs)) failures.push(`${article.slug} section ${index} relatedEventIds -> ${slug}`);
        for (const slug of unresolved(section.relatedApartmentKeys, apartmentSlugs)) failures.push(`${article.slug} section ${index} relatedApartmentKeys -> ${slug}`);
      }
    }

    expect(failures).toEqual([]);
  });

  it("keeps guide and place image paths valid when present", () => {
    const failures: string[] = [];

    for (const article of guideArticles) {
      if (!article.coverImage) failures.push(`${article.slug} missing coverImage`);
      else if (!publicPathExists(article.coverImage)) failures.push(`${article.slug} coverImage not found: ${article.coverImage}`);
    }

    for (const place of places) {
      if (place.image && !publicPathExists(place.image)) failures.push(`${place.id} image not found: ${place.image}`);
    }

    expect(failures).toEqual([]);
  });

  it("keeps guide intent clusters connected to valid content", () => {
    const failures: string[] = [];

    for (const cluster of guideIntentClusters) {
      if (!guideSlugs.has(cluster.canonicalGuideSlug)) failures.push(`${cluster.id} canonicalGuideSlug -> ${cluster.canonicalGuideSlug}`);
      for (const slug of unresolved(cluster.supportingGuideSlugs, guideSlugs)) failures.push(`${cluster.id} supportingGuideSlugs -> ${slug}`);
      for (const id of unresolved(cluster.relatedPlaceIds, placeIds)) failures.push(`${cluster.id} relatedPlaceIds -> ${id}`);
      for (const slug of unresolved(cluster.relatedApartmentKeys, apartmentSlugs)) failures.push(`${cluster.id} relatedApartmentKeys -> ${slug}`);
      for (const slug of unresolved(cluster.relatedEventSlugs, eventSlugs)) failures.push(`${cluster.id} relatedEventSlugs -> ${slug}`);
      if (!cluster.relatedApartmentKeys.length) failures.push(`${cluster.id} missing related apartments`);
    }

    expect(failures).toEqual([]);
  });

  it("keeps intent cluster canonical articles linked to their supporting guides", () => {
    const failures: string[] = [];

    for (const cluster of guideIntentClusters) {
      const canonical = guideArticles.find((article) => article.slug === cluster.canonicalGuideSlug);
      if (!canonical) continue;

      for (const supportingSlug of cluster.supportingGuideSlugs) {
        if (!canonical.relatedArticles?.includes(supportingSlug)) failures.push(`${canonical.slug} missing cluster relatedArticle -> ${supportingSlug}`);
      }
    }

    expect(failures).toEqual([]);
  });

  it("keeps evergreen practical guides assigned to at least one intent cluster", () => {
    const failures = evergreenPracticalSlugs.filter((slug) => !clusteredGuideSlugs.has(slug));
    expect(failures).toEqual([]);
  });

  it("keeps evergreen practical guides apartment-aware", () => {
    const failures = evergreenPracticalSlugs.filter((slug) => {
      const article = guideArticles.find((candidate) => candidate.slug === slug);
      return !article || !article.relatedApartments?.length;
    });

    expect(failures).toEqual([]);
  });

  it("reports non-blocking content hygiene warnings", () => {
    const warnings: string[] = [];
    const placeById = new Map(places.map((place) => [place.id, place]));

    for (const article of guideArticles) {
      const sectionPlaceIds = new Set(article.sections.flatMap((section) => section.relatedPlaceIds ?? []));
      for (const placeId of sectionPlaceIds) {
        const place = placeById.get(placeId);
        if (place && !place.relatedArticleIds.includes(article.slug)) warnings.push(`${place.id} missing backlink to ${article.slug}`);
      }
    }

    const placesWithoutImages = places.filter((place) => !place.image).map((place) => place.id);
    if (placesWithoutImages.length) warnings.push(`${placesWithoutImages.length} places have no image`);

    const pastFeaturedEvents = rivieraEvents
      .filter((event) => event.featured && getEventDateStatus(event) === "past")
      .map((event) => event.slug);
    if (pastFeaturedEvents.length) warnings.push(`past featured events: ${pastFeaturedEvents.join(", ")}`);

    if (warnings.length) console.warn(`Content audit warnings:\n${warnings.slice(0, 30).join("\n")}`);
    expect(true).toBe(true);
  });
});
