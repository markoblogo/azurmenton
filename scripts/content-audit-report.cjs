#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require("node:fs");
const Module = require("node:module");
const path = require("node:path");
const ts = require("typescript");

const root = path.resolve(__dirname, "..");
const originalResolveFilename = Module._resolveFilename;

Module._resolveFilename = function resolveFilename(request, parent, isMain, options) {
  if (request.startsWith("@/")) {
    return originalResolveFilename.call(this, path.join(root, "src", request.slice(2)), parent, isMain, options);
  }

  return originalResolveFilename.call(this, request, parent, isMain, options);
};

for (const extension of [".ts", ".tsx"]) {
  require.extensions[extension] = function compileTypescript(module, filename) {
    const source = fs.readFileSync(filename, "utf8");
    const output = ts.transpileModule(source, {
      compilerOptions: {
        esModuleInterop: true,
        jsx: ts.JsxEmit.ReactJSX,
        module: ts.ModuleKind.CommonJS,
        moduleResolution: ts.ModuleResolutionKind.NodeJs,
        target: ts.ScriptTarget.ES2020,
      },
      fileName: filename,
    });

    module._compile(output.outputText, filename);
  };
}

const { apartments } = require("../src/content/apartments.ts");
const { guideArticles } = require("../src/content/guide.ts");
const { guideIntentClusters, guideLinkAuditProfiles } = require("../src/content/guide-intents.ts");
const { places } = require("../src/content/places.ts");
const { eventFreshnessProfiles, rivieraEvents, summerOnTheRivieraEvent } = require("../src/content/riviera-events.ts");
const { getEventDateStatus } = require("../src/lib/events.ts");

const apartmentSlugs = new Set(apartments.map((apartment) => apartment.slug));
const clusteredGuideSlugs = new Set(guideIntentClusters.flatMap((cluster) => [cluster.canonicalGuideSlug, ...cluster.supportingGuideSlugs]));
const guideLinkAuditProfileBySlug = new Map(guideLinkAuditProfiles.map((profile) => [profile.slug, profile]));
const eventFreshnessProfileBySlug = new Map(eventFreshnessProfiles.map((profile) => [profile.slug, profile]));
const today = new Date();

function uniq(values) {
  return [...new Set(values)];
}

function sectionPlaceIds(article) {
  return uniq(article.sections.flatMap((section) => section.relatedPlaceIds ?? []));
}

function sectionApartmentKeys(article) {
  return uniq(article.sections.flatMap((section) => section.relatedApartmentKeys ?? []));
}

function guideHasApartmentCta(article) {
  return Boolean(article.relatedApartments?.length || sectionApartmentKeys(article).length);
}

function guidePlaceCount(article) {
  return uniq([...(article.relatedPlaces ?? []), ...sectionPlaceIds(article)]).length;
}

const backlinkReviewExclusions = new Map(
  [
    ["halles-du-marche", "museums-in-menton-nice-monaco", "supporting old-town context near Menton museum stops"],
    ["plage-sablettes", "museums-in-menton-nice-monaco", "supporting nearby stop, not a museum recommendation"],
    ["cimetiere-vieux-chateau", "museums-in-menton-nice-monaco", "supporting old-town context, covered by old-town/photo guides"],
    ["musee-massena-nice", "michelin-restaurants-menton-nice-monaco", "nearby Nice context, not restaurant content"],
    ["palais-lascaris-nice", "michelin-restaurants-menton-nice-monaco", "nearby Nice context, not restaurant content"],
    ["plage-sablettes", "useful-apps-websites-menton-monaco-italian-riviera", "weather/offline-map example, covered by beach and family guides"],
    ["promenade-du-soleil", "useful-apps-websites-menton-monaco-italian-riviera", "weather/offline-map example, covered by walk and stay guides"],
    ["jardin-val-rahmeh", "useful-apps-websites-menton-monaco-italian-riviera", "weather fallback example, covered by garden and heat guides"],
    ["musee-jean-cocteau-bastion", "useful-apps-websites-menton-monaco-italian-riviera", "indoor fallback example, covered by museum guides"],
    ["mirazur-menton", "useful-apps-websites-menton-monaco-italian-riviera", "restaurant-app example, covered by restaurant guides"],
    ["orangerie-menton", "useful-apps-websites-menton-monaco-italian-riviera", "restaurant-app example, covered by food and restaurant guides"],
    ["le-louis-xv-monaco", "useful-apps-websites-menton-monaco-italian-riviera", "restaurant-app example, covered by Monaco restaurant guides"],
    ["flaveur-nice", "useful-apps-websites-menton-monaco-italian-riviera", "restaurant-app example, covered by Nice restaurant guides"],
  ].map(([placeId, articleSlug, reason]) => [`${placeId}|${articleSlug}`, reason]),
);

function backlinkExclusion(placeId, articleSlug) {
  return backlinkReviewExclusions.get(`${placeId}|${articleSlug}`);
}

function printGroup(title, items, format = (item) => item, limit = 25) {
  console.log(`\n${title}: ${items.length}`);
  if (!items.length) {
    console.log("  OK");
    return;
  }

  for (const item of items.slice(0, limit)) console.log(`  - ${format(item)}`);
  if (items.length > limit) console.log(`  ... ${items.length - limit} more`);
}

const placesWithoutImages = places
  .filter((place) => !place.image)
  .sort((left, right) => left.id.localeCompare(right.id));

const guideLinkAuditRows = guideArticles
  .map((article) => {
    const relatedArticles = article.relatedArticles?.length ?? 0;
    const relatedPlaces = guidePlaceCount(article);
    const clustered = clusteredGuideSlugs.has(article.slug);

    return {
      slug: article.slug,
      relatedArticles,
      relatedPlaces,
      clustered,
      reasons: [
        relatedArticles < 3 ? "relatedArticles" : undefined,
        relatedPlaces < 2 ? "places" : undefined,
        !clustered ? "cluster" : undefined,
      ].filter(Boolean),
    };
  })
  .filter((article) => article.reasons.length)
  .sort((left, right) => left.slug.localeCompare(right.slug));

const guidesWithWeakLinks = [];
const guideLinkAuditExclusions = [];

for (const article of guideLinkAuditRows) {
  const profile = guideLinkAuditProfileBySlug.get(article.slug);
  const activeReasons = article.reasons.filter((reason) => !profile?.ignore.includes(reason));

  if (activeReasons.length) guidesWithWeakLinks.push({ ...article, reasons: activeReasons });
  else guideLinkAuditExclusions.push({ ...article, reason: profile?.reason ?? "explicit editorial exception" });
}

const guidesWithoutApartmentCta = guideArticles
  .filter((article) => !guideHasApartmentCta(article))
  .sort((left, right) => left.slug.localeCompare(right.slug));

const placeBacklinkGaps = [];
const placeBacklinkExclusions = [];
for (const article of guideArticles) {
  for (const placeId of sectionPlaceIds(article)) {
    const place = places.find((candidate) => candidate.id === placeId);
    if (!place || place.relatedArticleIds.includes(article.slug)) continue;

    const exclusion = backlinkExclusion(placeId, article.slug);
    if (exclusion) placeBacklinkExclusions.push({ placeId, articleSlug: article.slug, reason: exclusion });
    else placeBacklinkGaps.push({ placeId, articleSlug: article.slug });
  }
}

const orphanPlaces = places
  .filter((place) => !place.relatedArticleIds.length)
  .sort((left, right) => left.id.localeCompare(right.id));

const incomingGuideLinks = new Map(guideArticles.map((article) => [article.slug, 0]));
for (const article of guideArticles) {
  for (const relatedSlug of article.relatedArticles ?? []) {
    if (incomingGuideLinks.has(relatedSlug)) incomingGuideLinks.set(relatedSlug, incomingGuideLinks.get(relatedSlug) + 1);
  }
}
for (const place of places) {
  for (const articleSlug of place.relatedArticleIds) {
    if (incomingGuideLinks.has(articleSlug)) incomingGuideLinks.set(articleSlug, incomingGuideLinks.get(articleSlug) + 1);
  }
}
for (const cluster of guideIntentClusters) {
  for (const articleSlug of [cluster.canonicalGuideSlug, ...cluster.supportingGuideSlugs]) {
    if (incomingGuideLinks.has(articleSlug)) incomingGuideLinks.set(articleSlug, incomingGuideLinks.get(articleSlug) + 1);
  }
}

const orphanArticles = guideArticles
  .filter((article) => (incomingGuideLinks.get(article.slug) ?? 0) === 0 && !article.featured)
  .sort((left, right) => left.slug.localeCompare(right.slug));

const allEvents = [...rivieraEvents, summerOnTheRivieraEvent];
const pendingEvents = allEvents
  .filter((event) => {
    const status = getEventDateStatus(event, today);
    return status !== "past" && (status === "dates_pending" || event.sourceStatus !== "verified");
  })
  .sort((left, right) => left.slug.localeCompare(right.slug));

const pendingEventsAwaitingProgramme = pendingEvents
  .filter((event) => eventFreshnessProfileBySlug.has(event.slug))
  .sort((left, right) => left.slug.localeCompare(right.slug));

const pendingEventsNeedingReview = pendingEvents
  .filter((event) => !eventFreshnessProfileBySlug.has(event.slug))
  .sort((left, right) => left.slug.localeCompare(right.slug));

const expiredEvents = allEvents
  .filter((event) => getEventDateStatus(event, today) === "past")
  .sort((left, right) => left.slug.localeCompare(right.slug));

const expiredEventsNeedingSourceReview = expiredEvents
  .filter((event) => event.sourceStatus !== "verified")
  .sort((left, right) => left.slug.localeCompare(right.slug));

const expiredEventArchive = expiredEvents
  .filter((event) => event.sourceStatus === "verified")
  .sort((left, right) => left.slug.localeCompare(right.slug));

const expiredFeaturedEvents = expiredEvents
  .filter((event) => event.featured)
  .sort((left, right) => left.slug.localeCompare(right.slug));

const eventApartmentGaps = allEvents
  .filter((event) => event.detailPage && !(event.relatedApartmentKeys ?? []).some((key) => apartmentSlugs.has(key)))
  .sort((left, right) => left.slug.localeCompare(right.slug));

console.log("Azur Menton content audit report");
console.log(`Generated: ${today.toISOString().slice(0, 10)}`);
console.log(`Guides: ${guideArticles.length}`);
console.log(`Places: ${places.length}`);
console.log(`Events: ${allEvents.length}`);
console.log(`Apartments: ${apartments.length}`);
console.log(`Intent clusters: ${guideIntentClusters.length}`);

printGroup("Places without images", placesWithoutImages, (place) => `${place.id} (${place.name})`);
printGroup(
  "Guides with weak links",
  guidesWithWeakLinks,
  (article) => `${article.slug} (${article.reasons.join(", ")}; relatedArticles=${article.relatedArticles}, places=${article.relatedPlaces}, clustered=${article.clustered})`,
);
printGroup("Guide link audit exclusions", guideLinkAuditExclusions, (article) => `${article.slug}: ${article.reason}`, 15);
printGroup("Guides without apartment CTA", guidesWithoutApartmentCta, (article) => article.slug);
printGroup("Place backlink gaps", placeBacklinkGaps, (gap) => `${gap.placeId} missing ${gap.articleSlug}`);
printGroup("Intentional supporting-card backlink exclusions", placeBacklinkExclusions, (gap) => `${gap.placeId} / ${gap.articleSlug}: ${gap.reason}`, 10);
printGroup("Orphan places", orphanPlaces, (place) => `${place.id} (${place.name})`);
printGroup("Orphan guide articles", orphanArticles, (article) => article.slug);
printGroup("Pending or unverified events needing review", pendingEventsNeedingReview, (event) => `${event.slug} (${getEventDateStatus(event, today)}, ${event.sourceStatus})`);
printGroup(
  "Events awaiting official programme",
  pendingEventsAwaitingProgramme,
  (event) => `${event.slug} (${eventFreshnessProfileBySlug.get(event.slug).status}; ${eventFreshnessProfileBySlug.get(event.slug).reason})`,
  15,
);
printGroup("Expired events needing source review", expiredEventsNeedingSourceReview, (event) => `${event.slug} (${event.dateLabel}, ${event.sourceStatus})`);
printGroup("Verified expired event archive", expiredEventArchive, (event) => `${event.slug} (${event.dateLabel})`);
printGroup("Expired featured events", expiredFeaturedEvents, (event) => `${event.slug} (${event.dateLabel})`);
printGroup("Event detail pages without apartment links", eventApartmentGaps, (event) => event.slug);

const totalActionItems =
  placesWithoutImages.length +
  guidesWithWeakLinks.length +
  guidesWithoutApartmentCta.length +
  placeBacklinkGaps.length +
  orphanPlaces.length +
  orphanArticles.length +
  pendingEventsNeedingReview.length +
  expiredEventsNeedingSourceReview.length +
  expiredFeaturedEvents.length +
  eventApartmentGaps.length;

console.log(`\nTotal review items: ${totalActionItems}`);
if (totalActionItems) console.log("Use this report before publishing new guide, place or event content.");
