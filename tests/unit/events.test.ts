import { describe, expect, it, vi } from "vitest";
import { rivieraEvents, eventDetailSlugs, getCanonicalEventDetailSlug, getEventDetail, getEventSearchIndexing, getRivieraEvent, inheritAnnualEventIllustrations, isIndexableEventDetail } from "../../src/content/riviera-events";
import { eventDeduplicationKey, filterDiscoverableEvents, findDuplicateEventCandidates, parseEventDiscoveryParams } from "../../src/lib/event-discovery";
import { canRenderEventJsonLd, eventOverlapsDateRange, getEventDateStatus, getParisDateRange } from "../../src/lib/events";
import { getGuideRelatedEventSlugs } from "../../src/lib/event-related-content";
import { getGuideArticle } from "../../src/content/guide";
import { getPlaces } from "../../src/content/places";

const datedEvent = {
  dateLabel: "20 November-4 December 2026",
  expectedSeason: undefined,
  startDate: "2026-11-20",
  endDate: "2026-12-04",
};

describe("event date status", () => {
  it("publishes the November Menton batch without borrowed covers and preserves both Monaco years", () => {
    for (const slug of ["mado-fait-son-cabaret-menton-2026-11-21", "delpech-ces-mots-la-menton-2026-11-21", "la-capeline-christmas-concert-menton-2026-11-29"]) {
      const event = getRivieraEvent(slug)!;
      expect(rivieraEvents.filter(e => e.slug === slug)).toHaveLength(1);
      expect(event).toMatchObject({ detailPage: true, dateStatus: "confirmed", sourceStatus: "verified", lastVerifiedAt: "2026-10-31" });
      expect(event.media?.image).toBeFalsy();
      expect(getPlaces(event.relatedPlaceIds)).toHaveLength(1);
      expect(eventDetailSlugs).toContain(slug);
    }
    expect(getRivieraEvent("delpech-ces-mots-la-menton-2026-11-21")?.schedule).toBeUndefined();
    expect(getRivieraEvent("monaco-national-day-2026")).toMatchObject({ seriesSlug: "monaco-national-day", occurrenceYear: 2026, startDate: "2026-11-18", endDate: "2026-11-19" });
    expect(getRivieraEvent("monaco-national-day")).toMatchObject({ occurrenceYear: 2027, startDate: "2027-11-19" });
    expect(getRivieraEvent("monaco-national-day-2026")?.media?.image).toBe(getRivieraEvent("monaco-national-day")?.media?.image);
    vi.useFakeTimers({ now: new Date("2026-10-31T12:00:00Z") });
    try {
      expect(getGuideRelatedEventSlugs(getGuideArticle("monaco-events-from-menton")!)).toContain("monaco-national-day-2026");
    } finally {
      vi.useRealTimers();
    }
    const festival = getRivieraEvent("cest-pas-classique-riviera-2026")!;
    expect(festival.sessions).toEqual(expect.arrayContaining([expect.objectContaining({ id: "theo-ould-menton", date: "2026-11-10", startTime: "20:00", lastVerifiedAt: "2026-10-31" })]));
    expect(festival.relatedPlaceIds).toHaveLength(14);
    const christmas = getGuideArticle("christmas-french-riviera-from-menton")!;
    expect(christmas.sections.some(s => s.relatedPlaceIds?.includes("chapelle-misericorde-menton") && s.relatedEventIds?.includes("la-capeline-christmas-concert-menton-2026-11-29"))).toBe(true);
  });
  it("links the reviewed small events to their venues and retains the existing festival", () => {
    for (const [slug, place] of [
      ["vivaldi-gloria-menton-2026-10-31", "st-john-anglican-church-menton"],
      ["jimmy-gnecco-ours-monaco-2026-11-05", "grimaldi-forum-monaco"],
      ["note-damare-bordighera-2026-11-08", "teatro-giancarlo-golzi-bordighera"],
      ["stand-up-monaco-2026-11-09", "grimaldi-forum-monaco"],
    ] as const) {
      const event = getRivieraEvent(slug)!;
      expect(event).toMatchObject({ dateStatus: "confirmed", sourceStatus: "verified", detailPage: true });
      expect(event.sourceUrl).toMatch(/^https:\/\//);
      expect(event.relatedPlaceIds).toContain(place);
    }
    const festival = getRivieraEvent("cest-pas-classique-riviera-2026")!;
    expect(festival.relatedPlaceIds).toContain("musee-departemental-des-merveilles-tende");
    expect(festival.additionalOfficialLinks?.some((link) => link.href.includes("projection-et-performance-musicale-tende"))).toBe(true);
  });
  it("publishes the six reviewed local events with sources, illustrations and relevant guide links", () => {
    vi.useFakeTimers({ now: new Date("2026-10-28T12:00:00Z") });
    try {
      const cases = [
        ["menton-fete-halloween-2026", "menton-with-kids-family-guide", "jardins-bioves"],
        ["st-johns-jazz-menton-2026-11-06", "jazz-live-music-near-menton", "st-john-anglican-church-menton"],
        ["cest-pas-classique-riviera-2026", "menton-in-autumn", null],
        ["halloween-beausoleil-2026", "monaco-events-from-menton", "centre-culturel-prince-hereditaire-jacques-beausoleil"],
        ["christmas-parade-beausoleil-2026", "monaco-events-from-menton", "boulevard-de-la-republique-beausoleil"],
        ["en-finir-avec-la-peur-menton-2026", "theatre-opera-performing-arts-near-menton", "le-lavoir-theatre-menton"],
      ] as const;
      for (const [slug, guideSlug, placeId] of cases) {
        const event = getRivieraEvent(slug)!;
        expect(event).toMatchObject({ dateStatus: "confirmed", sourceStatus: "verified", detailPage: true });
        expect(event.sourceUrl).toMatch(/^https:\/\//);
        expect(event.media?.image).toMatch(/^\/images\/events\//);
        if (placeId) expect(event.relatedPlaceIds).toContain(placeId);
        expect(getGuideRelatedEventSlugs(getGuideArticle(guideSlug)!)).toContain(slug);
      }
    } finally {
      vi.useRealTimers();
    }
  });

  it("removes an expired one-off event from guide recommendations without deleting its card", () => {
    vi.useFakeTimers({ now: new Date("2026-10-31T12:00:00Z") });
    try {
      expect(getGuideRelatedEventSlugs(getGuideArticle("menton-with-kids-family-guide")!)).not.toContain("menton-fete-halloween-2026");
      expect(getRivieraEvent("menton-fete-halloween-2026")?.detailPage).toBe(true);
    } finally {
      vi.useRealTimers();
    }
  });

  it("keeps one verified festival venue per programme city and retains all 14 cards", () => {
    const event = getRivieraEvent("cest-pas-classique-riviera-2026")!;
    expect(event.placeDisplayLimit).toBe(14);
    expect(event.relatedPlaceIds).toHaveLength(14);
    expect(new Set(event.relatedPlaceIds).size).toBe(14);
    expect(getPlaces(event.relatedPlaceIds)).toHaveLength(14);
    expect(getPlaces(event.relatedPlaceIds).every((place) => Boolean(place.image))).toBe(true);
  });
  it("routes Yacht Show planning links to the confirmed 2027 edition and preserves the 2026 archive", () => {
    const archive = getRivieraEvent("monaco-yacht-show-2026");
    const next = getRivieraEvent("monaco-yacht-show");
    expect(archive).toMatchObject({ startDate: "2026-09-23", endDate: "2026-09-26", detailPage: false, searchIndexing: "noindex" });
    expect(next).toMatchObject({ occurrenceSlug: "monaco-yacht-show-2027", dateStatus: "confirmed", startDate: "2027-09-22", endDate: "2027-09-25", detailPage: true });
    expect(getRivieraEvent("monaco-yacht-show-2027")).toBe(next);
    expect(next?.media?.image).toBe("/images/events/monaco-yacht-show-2027.webp");
    expect(archive?.media?.image).toBe("/images/events/monaco-yacht-show.jpg");
    expect(getCanonicalEventDetailSlug("monaco-yacht-show")).toBe("monaco-yacht-show-2027");
    expect(next && isIndexableEventDetail(next, new Date("2026-10-13T12:00:00Z"))).toBe(true);
    expect(eventDetailSlugs).toContain("monaco-yacht-show-2027");
    expect(eventDetailSlugs).not.toContain("monaco-yacht-show-2026");
    expect(next?.relatedApartmentKeys).toEqual(archive?.relatedApartmentKeys);
  });

  it("inherits reusable past illustrations only when an annual edition has no own image", () => {
    const previous = getRivieraEvent("monaco-yacht-show-2026")!;
    const current = getRivieraEvent("monaco-yacht-show-2027")!;
    const withoutCover = { ...current, media: undefined };
    const [inherited] = inheritAnnualEventIllustrations([withoutCover, previous]);
    expect(inherited.media).toMatchObject({ image: "/images/events/monaco-yacht-show.jpg", inheritedFromEventId: previous.id });
    expect(inheritAnnualEventIllustrations([current, previous])[0].media?.image).toBe("/images/events/monaco-yacht-show-2027.webp");
    const poster = { ...previous, media: { ...previous.media, mediaType: "official_poster" as const } };
    expect(inheritAnnualEventIllustrations([withoutCover, poster])[0].media?.image).toBeUndefined();
    const yearSpecific = { ...previous, media: { ...previous.media, image: "/images/events/yacht-show-2026.webp" } };
    expect(inheritAnnualEventIllustrations([withoutCover, yearSpecific])[0].media?.image).toBeUndefined();
    expect(inheritAnnualEventIllustrations([{ ...withoutCover, recurrence: "one_off" }, previous])[0].media?.image).toBeUndefined();
    expect(inheritAnnualEventIllustrations([previous, current])[0].media?.image).toBe(previous.media?.image);
  });

  it("keeps an event visible through its end date, then moves it to the archive", () => {
    expect(getEventDateStatus(datedEvent, new Date("2026-12-04T12:00:00Z"))).toBe("current");
    expect(getEventDateStatus(datedEvent, new Date("2026-12-05T12:00:00Z"))).toBe("past");
  });

  it("keeps dates-pending events out of confirmed date logic", () => {
    expect(getEventDateStatus({ dateLabel: "Dates pending", dateStatus: "dates_pending" })).toBe("dates_pending");
  });

  it("keeps the Riviera Christmas overview pending while reporting Nice's sourced dates", () => {
    const event = getRivieraEvent("christmas-markets-riviera")!;
    expect(event.dateStatus).toBe("dates_pending");
    expect(event.sourceUrl).toBe("https://www.explorenicecotedazur.com/evenement/village-de-noel-a-nice/");
    expect(event.shortDescription.en).toContain("27 November 2026 to 3 January 2027");
    expect(event.shortDescription.en).toContain("Monaco lists 4 December to 3 January");
    expect(event.shortDescription.en).toContain("Menton's municipal call proposes 4 December to 3 January");
    expect(getEventDetail(event.slug)?.detailContent?.officialLinks?.map((link) => link.href)).toContain("https://mairie.mc/le-village-de-noel");
    expect(getEventDetail(event.slug)?.detailContent?.officialLinks?.map((link) => link.href)).toContain("https://www.menton.fr/Appels-d-Offres-et-Marches-Publics.html");
    expect(canRenderEventJsonLd(event)).toBe(false);
  });

  it("uses verified organiser dates for Monaco Run and Milano-Sanremo", () => {
    const run = getEventDetail("monaco-run")!;
    const race = getEventDetail("milano-sanremo-cycling-race")!;
    expect(run).toMatchObject({ dateStatus: "confirmed", startDate: "2027-02-13", endDate: "2027-02-14", sourceStatus: "verified" });
    expect(race).toMatchObject({ dateStatus: "confirmed", startDate: "2027-03-20", endDate: "2027-03-20", sourceStatus: "verified" });
  });

  it("keeps disputed events unconfirmed and archives them after their planned dates", () => {
    for (const slug of ["halloween-eze", "monaco-international-triathlon"]) {
      const event = getRivieraEvent(slug)!;
      expect(event.dateStatus).toBe("dates_pending");
      expect(event.sourceStatus).toBe("needs_verification");
      expect(canRenderEventJsonLd(event, new Date("2026-10-26T12:00:00Z"))).toBe(false);
      expect(getEventDateStatus(event, new Date("2026-11-10T12:00:00Z"))).toBe("past");
      for (const locale of ["en", "fr", "it", "uk"] as const) expect(event.shortDescription[locale]).toBeTruthy();
    }
    expect(getRivieraEvent("menton-lemon-festival")?.dateStatus).toBe("confirmed");
  });

  it("keeps estimated annual windows separate from confirmed dates", () => {
    expect(getEventDateStatus({ dateLabel: "Late July", dateStatus: "estimated_annual_window" })).toBe("estimated_annual_window");
  });

  it("allows Event JSON-LD only for confirmed events with real start dates", () => {
    const today = new Date("2026-08-01T12:00:00Z");
    expect(canRenderEventJsonLd({ dateStatus: "confirmed", startDate: "2027-02-09" }, today)).toBe(true);
    expect(canRenderEventJsonLd({ dateStatus: "confirmed", startDate: "2026-07-23", endDate: "2026-07-26" }, today)).toBe(false);
    expect(canRenderEventJsonLd({ dateStatus: "dates_pending", startDate: undefined }, today)).toBe(false);
    expect(canRenderEventJsonLd({ dateStatus: "estimated_annual_window", startDate: undefined }, today)).toBe(false);
  });

  it("resolves occurrence route aliases to the current event object", () => {
    expect(getRivieraEvent("monaco-grand-prix-2027")?.slug).toBe("monaco-grand-prix");
  });

  it("keeps yearly occurrence pages canonical and excludes their duplicate series routes", () => {
    expect(getCanonicalEventDetailSlug("monaco-e-prix")).toBe("monaco-e-prix-2027");
    expect(eventDetailSlugs).toContain("monaco-e-prix-2027");
    expect(eventDetailSlugs).not.toContain("monaco-e-prix");
    expect(getCanonicalEventDetailSlug("summer-on-the-riviera")).toBe("summer-on-the-riviera");
  });

  it("keeps high-intent annual events indexable while excluding thin seasonal placeholders", () => {
    const lemonFestival = getEventDetail("menton-lemon-festival");
    const summer = getEventDetail("summer-on-the-riviera");

    expect(lemonFestival && getEventSearchIndexing(lemonFestival)).toBe("priority");
    expect(lemonFestival && isIndexableEventDetail(lemonFestival)).toBe(true);
    expect(summer && getEventSearchIndexing(summer)).toBe("noindex");
    expect(summer && isIndexableEventDetail(summer)).toBe(false);
  });

  it("excludes past confirmed event details from current SEO indexing", () => {
    const niceJazzFest = getRivieraEvent("nice-jazz-fest");
    expect(niceJazzFest && getEventSearchIndexing(niceJazzFest, new Date("2026-08-01T12:00:00Z"))).toBe("noindex");
    expect(niceJazzFest && isIndexableEventDetail(niceJazzFest, new Date("2026-08-01T12:00:00Z"))).toBe(false);
  });

  it("does not let a legacy standard indexing flag keep an ended event indexable", () => {
    const endedStandardEvent = {
      ...getRivieraEvent("fiera-di-san-romolo-sanremo-2026-10-11")!,
      searchIndexing: "standard" as const,
    };

    expect(getEventSearchIndexing(endedStandardEvent, new Date("2026-10-26T12:00:00Z"))).toBe("noindex");
    expect(isIndexableEventDetail(endedStandardEvent, new Date("2026-10-26T12:00:00Z"))).toBe(false);
  });

  it("keeps past annual editions archived while routing planning links to a pending next occurrence", () => {
    const e1Archive = getRivieraEvent("e1-monaco-2026");
    const e1Planning = getRivieraEvent("e1-monaco");

    expect(e1Archive?.detailPage).toBe(false);
    expect(e1Archive?.searchIndexing).toBe("noindex");
    expect(e1Planning?.occurrenceSlug).toBe("e1-monaco-2027");
    expect(e1Planning?.dateStatus).toBe("dates_pending");
    expect(e1Planning && canRenderEventJsonLd(e1Planning)).toBe(false);
  });

  it("archives the ended 2026 Menton Music Festival edition while keeping a 2027 planning record live", () => {
    const archive = getRivieraEvent("menton-music-festival-2026");
    const planning = getRivieraEvent("menton-music-festival");

    expect(archive?.detailPage).toBe(false);
    expect(archive?.searchIndexing).toBe("noindex");
    expect(planning?.occurrenceSlug).toBe("menton-music-festival-2027");
    expect(planning?.dateStatus).toBe("dates_pending");
    expect(planning && canRenderEventJsonLd(planning)).toBe(false);
  });

  it("uses the latest official dates for priority 2027 events", () => {
    expect(getRivieraEvent("menton-lemon-festival")).toMatchObject({
      dateStatus: "confirmed",
      startDate: "2027-02-13",
      endDate: "2027-02-28",
    });
    expect(getRivieraEvent("rallye-automobile-monte-carlo")).toMatchObject({
      startDate: "2027-01-21",
      endDate: "2027-01-24",
    });
    expect(getRivieraEvent("monaco-e-prix")).toMatchObject({
      startDate: "2027-05-01",
      endDate: "2027-05-02",
    });
  });

  it("keeps ended annual summer records as explicit archives until official next dates exist", () => {
    for (const slug of [
      "monte-carlo-summer-festival",
      "french-flyair-menton",
      "cannes-pyrotechnic-art-festival",
      "soirees-estivales-2026-nice-2026-06-26",
    ]) {
      expect(getRivieraEvent(slug)).toMatchObject({ detailPage: false, searchIndexing: "noindex" });
    }
  });

  it("calculates visitor quick date ranges in the Europe/Paris timezone", () => {
    const fridayInParis = new Date("2026-08-14T21:30:00.000Z");

    expect(getParisDateRange("today", fridayInParis)).toEqual({ from: "2026-08-14", to: "2026-08-14" });
    expect(getParisDateRange("tomorrow", fridayInParis)).toEqual({ from: "2026-08-15", to: "2026-08-15" });
    expect(getParisDateRange("weekend", fridayInParis)).toEqual({ from: "2026-08-15", to: "2026-08-16" });
    expect(getParisDateRange("custom", fridayInParis, { from: "2026-08-18", to: "2026-08-16" })).toEqual({ from: "2026-08-16", to: "2026-08-18" });
  });

  it("keeps multi-day confirmed events visible when a stay overlaps them", () => {
    expect(eventOverlapsDateRange(datedEvent, { from: "2026-12-01", to: "2026-12-02" })).toBe(true);
    expect(eventOverlapsDateRange(datedEvent, { from: "2026-12-05", to: "2026-12-06" })).toBe(false);
    expect(eventOverlapsDateRange({ dateStatus: "dates_pending", startDate: undefined }, { from: "2026-12-01", to: "2026-12-02" })).toBe(false);
  });

  it("parses shareable discovery parameters and applies combined filters", () => {
    const params = new URLSearchParams("period=custom&from=2027-06-03&to=2027-06-06&location=monaco&interest=sports&q=grand");
    const filters = parseEventDiscoveryParams(params);
    const results = filterDiscoverableEvents([getRivieraEvent("monaco-grand-prix")!], filters, new Date("2026-08-01T10:00:00.000Z"));

    expect(filters).toMatchObject({ period: "custom", location: "monaco", interest: "sports", query: "grand" });
    expect(results.map((event) => event.slug)).toEqual(["monaco-grand-prix"]);
  });

  it("builds deterministic dedupe keys for future ingestion candidates", () => {
    const first = {
      sourceId: "source",
      title: "Nice Jazz Fest",
      normalizedTitle: "nice jazz fest",
      sourceUrl: "https://example.com/event/",
      city: "Nice",
      venue: "Place Massena",
      startDate: "2026-07-24",
      reviewRequired: false,
    };
    const second = { ...first, sourceUrl: "https://example.com/event" };

    expect(eventDeduplicationKey(first)).toBe(eventDeduplicationKey(second));
    expect(findDuplicateEventCandidates([first, second])).toHaveLength(1);
  });
});
