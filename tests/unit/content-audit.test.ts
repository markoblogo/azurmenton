import { existsSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { apartments } from "../../src/content/apartments";
import { contentCollections, contentIntentMap, resolveContentCollectionGuideSlugs } from "../../src/content/content-map";
import { guestPerks } from "../../src/content/guest-perks";
import { guideArticles } from "../../src/content/guide";
import { guideIntentClusters, guideLinkAuditProfiles } from "../../src/content/guide-intents";
import { localPartners, partnerLinkRel } from "../../src/content/partners";
import { places } from "../../src/content/places";
import { eventFreshnessProfiles, rivieraEvents, summerOnTheRivieraEvent } from "../../src/content/riviera-events";
import { getRadioStationsForTenant, radioStations } from "../../src/content/utility/radio";
import { getEventDateStatus } from "../../src/lib/events";

const publicPathExists = (sitePath: string) => existsSync(join(process.cwd(), "public", sitePath.replace(/^\//, "")));
const publicPathSize = (sitePath: string) => statSync(join(process.cwd(), "public", sitePath.replace(/^\//, ""))).size;
const unique = (items: string[]) => new Set(items).size === items.length;

const guideSlugs = new Set(guideArticles.map((article) => article.slug));
const placeIds = new Set(places.map((place) => place.id));
const apartmentSlugs = new Set(apartments.map((apartment) => apartment.slug));
const partnerIds = new Set(localPartners.map((partner) => partner.id));
const eventSlugs = new Set([...rivieraEvents.map((event) => event.slug), summerOnTheRivieraEvent.slug]);
const radioStationIds = new Set(radioStations.map((station) => station.id));
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
    expect(unique(localPartners.map((partner) => partner.id))).toBe(true);
    expect(unique(guestPerks.map((perk) => perk.id))).toBe(true);
    expect(unique(rivieraEvents.map((event) => event.slug))).toBe(true);
    expect(unique(rivieraEvents.flatMap((event) => (event.occurrenceSlug ? [event.slug, event.occurrenceSlug] : [event.slug])))).toBe(true);
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
      if (!article.coverImage) {
        if (article.visualStatus !== "editorial_placeholder") failures.push(`${article.slug} missing coverImage`);
      } else if (!publicPathExists(article.coverImage)) failures.push(`${article.slug} coverImage not found: ${article.coverImage}`);
    }

    for (const place of places) {
      if (place.image && !publicPathExists(place.image)) failures.push(`${place.id} image not found: ${place.image}`);
    }

    expect(failures).toEqual([]);
  });

  it("keeps guide utility blocks resolvable", () => {
    const failures: string[] = [];

    for (const article of guideArticles) {
      for (const block of article.utilityBlocks ?? []) {
        if (block.type === "localRadio") {
          const stations = getRadioStationsForTenant(block.region, block.stationIds);
          if (block.stationIds?.length) {
            if (new Set(block.stationIds).size !== block.stationIds.length) {
              failures.push(`${article.slug} localRadio block contains duplicate station ids`);
            }
            for (const stationId of block.stationIds) {
              if (!radioStationIds.has(stationId)) {
                failures.push(`${article.slug} utility block references missing radio station ${stationId}`);
              }
            }
          } else if (!stations.length) {
            failures.push(`${article.slug} localRadio block for ${block.region} has no stations`);
          }

          for (const station of stations) {
            if (!station.image || !publicPathExists(station.image)) {
              failures.push(`${article.slug} radio station ${station.id} is missing its image`);
            } else if (publicPathSize(station.image) > 500 * 1024) {
              failures.push(`${article.slug} radio station ${station.id} image exceeds 500 KiB`);
            }
            if (station.audioStreamUrl && !station.audioStreamUrl.startsWith("https://")) {
              failures.push(`${article.slug} radio station ${station.id} uses a non-HTTPS stream`);
            }
          }
        }
      }
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

  it("keeps guide collections and the compact intent map connected to valid guides", () => {
    const failures: string[] = [];

    if (!unique(contentCollections.map((collection) => collection.id))) failures.push("duplicate content collection ids");
    if (!unique(contentIntentMap.map((intent) => intent.id))) failures.push("duplicate content intent ids");

    for (const collection of contentCollections) {
      const guideSlugs = resolveContentCollectionGuideSlugs(collection, guideArticles);
      const collectionGuideSlugs = new Set(guideSlugs);
      if (!guideSlugs.length) failures.push(`${collection.id} has no matching guides`);
      for (const slug of unresolved(collection.priorityGuideSlugs, collectionGuideSlugs)) failures.push(`${collection.id} priorityGuideSlugs -> ${slug}`);
      for (const slug of unresolved(collection.includeGuideSlugs, collectionGuideSlugs)) failures.push(`${collection.id} includeGuideSlugs -> ${slug}`);
    }

    const collectionIds = new Set(contentCollections.map((collection) => collection.id));
    for (const intent of contentIntentMap) {
      if (!collectionIds.has(intent.collectionId)) failures.push(`${intent.id} collectionId -> ${intent.collectionId}`);
      if (intent.status === "covered" && (!intent.targetGuideSlug || !guideSlugs.has(intent.targetGuideSlug))) {
        failures.push(`${intent.id} covered intent missing valid targetGuideSlug`);
      }
    }

    expect(failures).toEqual([]);
  });

  it("keeps guide link audit profiles attached to valid guides", () => {
    const failures = guideLinkAuditProfiles.filter((profile) => !guideSlugs.has(profile.slug)).map((profile) => profile.slug);
    expect(failures).toEqual([]);
  });

  it("keeps event freshness profiles attached to valid events", () => {
    const failures = eventFreshnessProfiles.filter((profile) => !eventSlugs.has(profile.slug)).map((profile) => profile.slug);
    expect(failures).toEqual([]);
  });

  it("keeps event guide links resolvable", () => {
    const failures = rivieraEvents.flatMap((event) => unresolved(event.relatedGuideSlugs, guideSlugs).map((slug) => `${event.slug} relatedGuideSlugs -> ${slug}`));
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

  it("keeps event detail pages apartment-aware and avoids expired featured events", () => {
    const allEvents = [...rivieraEvents, summerOnTheRivieraEvent];
    const failures: string[] = [];

    for (const event of allEvents) {
      if (event.detailPage && !(event.relatedApartmentKeys ?? []).some((key) => apartmentSlugs.has(key))) {
        failures.push(`${event.slug} missing relatedApartmentKeys`);
      }

      if (event.featured && getEventDateStatus(event) === "past") {
        failures.push(`${event.slug} is expired and still featured`);
      }
    }

    expect(failures).toEqual([]);
  });

  it("keeps guest perks private-first and partner references valid", () => {
    const failures: string[] = [];

    for (const partner of localPartners) {
      if (partner.status === "sponsored" && partner.publicVisibility !== "sponsored") {
        failures.push(`${partner.id} sponsored status requires sponsored visibility`);
      }
      if (partner.publicVisibility === "sponsored" && partner.status !== "sponsored") {
        failures.push(`${partner.id} sponsored visibility requires sponsored status`);
      }
      if (partner.status === "sampling" && partner.publicVisibility !== "none" && partner.publicVisibility !== "guest_only") {
        failures.push(`${partner.id} sampling must not imply public placement`);
      }
      if (partner.publicVisibility === "sponsored" && partner.website && partnerLinkRel(partner) !== "sponsored") {
        failures.push(`${partner.id} sponsored website link missing rel helper`);
      }
    }

    for (const perk of guestPerks) {
      if (!partnerIds.has(perk.partnerId)) failures.push(`${perk.id} partnerId -> ${perk.partnerId}`);
      if (perk.visibility === "guest_only" && !perk.requiresBooking) failures.push(`${perk.id} guest-only perk should require booking`);
    }

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
