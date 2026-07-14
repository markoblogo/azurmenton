#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

const path = require("node:path");
const { registerTypescriptContent } = require("./lib/register-ts-content.cjs");

const root = path.resolve(__dirname, "..");
registerTypescriptContent(root);

const { guideArticles } = require("../src/content/guide.ts");
const { guestPerks } = require("../src/content/guest-perks.ts");
const { localPartners, partnerLinkRel } = require("../src/content/partners.ts");
const { placeMapPoints } = require("../src/content/planning/place-map-points.ts");
const { placeMapExclusions } = require("../src/content/planning/place-map-exclusions.ts");
const { mapPlaceTypes } = require("../src/content/planning/map-taxonomy.ts");
const { places } = require("../src/content/places.ts");
const { rivieraEvents, summerOnTheRivieraEvent } = require("../src/content/riviera-events.ts");
const { locales } = require("../src/i18n/locales.ts");

const failures = [];
const guideSlugs = new Set(guideArticles.map((article) => article.slug));
const guideBySlug = new Map(guideArticles.map((article) => [article.slug, article]));
const placeIds = new Set(places.map((place) => place.id));
const mapPointByPlaceId = new Map(placeMapPoints.map((point) => [point.placeId, point]));
const mapExclusionByPlaceId = new Map(placeMapExclusions.map((exclusion) => [exclusion.placeId, exclusion]));
const partnerIds = new Set(localPartners.map((partner) => partner.id));
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const idPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function fail(message) {
  failures.push(message);
}

function isFilledText(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function checkLocalizedText(owner, field, value, minLength = 1) {
  if (!value || typeof value !== "object") {
    fail(`${owner}.${field} missing localized text`);
    return;
  }

  for (const locale of locales) {
    const text = value[locale];
    if (!isFilledText(text) || text.trim().length < minLength) {
      fail(`${owner}.${field}.${locale} is empty or too short`);
    }
  }
}

function checkPath(owner, field, value) {
  if (value && !String(value).startsWith("/images/")) {
    fail(`${owner}.${field} should use a /images/ public path`);
  }
}

function checkUrl(owner, field, value) {
  if (value && !/^https?:\/\//.test(String(value))) {
    fail(`${owner}.${field} should be an absolute URL`);
  }
}

for (const article of guideArticles) {
  const owner = `guide:${article.slug}`;
  if (!slugPattern.test(article.slug)) fail(`${owner}.slug should be kebab-case`);
  if (!idPattern.test(article.id)) fail(`${owner}.id should be kebab-case`);
  checkLocalizedText(owner, "title", article.title, 3);
  checkLocalizedText(owner, "seoTitle", article.seoTitle, 10);
  checkLocalizedText(owner, "seoDescription", article.seoDescription, 40);
  checkLocalizedText(owner, "excerpt", article.excerpt, 20);
  if (!article.tags.length) fail(`${owner}.tags should not be empty`);
  if (!article.bestFor.length) fail(`${owner}.bestFor should not be empty`);
  if (!article.locationTags.length) fail(`${owner}.locationTags should not be empty`);
  checkPath(owner, "coverImage", article.coverImage);
  checkPath(owner, "heroImage", article.heroImage);
  if (article.coverImage && !article.coverImageAlt) fail(`${owner}.coverImageAlt missing`);
  if (article.coverImageAlt) checkLocalizedText(owner, "coverImageAlt", article.coverImageAlt, 8);
  if (!article.sections.length) fail(`${owner}.sections should not be empty`);
  if (article.canonicalPlaceTypes && !article.canonicalPlaceTypes.length) fail(`${owner}.canonicalPlaceTypes should not be empty when set`);

  for (const [index, section] of article.sections.entries()) {
    const sectionOwner = `${owner}.sections[${index}]`;
    checkLocalizedText(sectionOwner, "heading", section.heading, 3);
    if (!section.body.length) fail(`${sectionOwner}.body should not be empty`);
    for (const [bodyIndex, body] of section.body.entries()) checkLocalizedText(sectionOwner, `body[${bodyIndex}]`, body, 20);
    for (const [bulletIndex, bullet] of (section.bullets ?? []).entries()) checkLocalizedText(sectionOwner, `bullets[${bulletIndex}]`, bullet, 5);
  }

  for (const [index, tool] of (article.appTools ?? []).entries()) {
    const toolOwner = `${owner}.appTools[${index}]`;
    if (!idPattern.test(tool.id)) fail(`${toolOwner}.id should be kebab-case`);
    if (!isFilledText(tool.name)) fail(`${toolOwner}.name missing`);
    checkLocalizedText(toolOwner, "useFor", tool.useFor, 20);
    checkLocalizedText(toolOwner, "bestFor", tool.bestFor, 3);
    checkPath(toolOwner, "image", tool.image);
    if (tool.image && !tool.imageAlt) fail(`${toolOwner}.imageAlt missing`);
    if (tool.imageAlt) checkLocalizedText(toolOwner, "imageAlt", tool.imageAlt, 8);
    checkUrl(toolOwner, "iosUrl", tool.iosUrl);
    checkUrl(toolOwner, "androidUrl", tool.androidUrl);
  }
}

for (const place of places) {
  const owner = `place:${place.id}`;
  if (!idPattern.test(place.id)) fail(`${owner}.id should be kebab-case`);
  if (!isFilledText(place.name)) fail(`${owner}.name missing`);
  checkLocalizedText(owner, "shortNote", place.shortNote, 20);
  if (!place.bestFor.length) fail(`${owner}.bestFor should not be empty`);
  for (const [index, bestFor] of place.bestFor.entries()) checkLocalizedText(owner, `bestFor[${index}]`, bestFor, 3);
  checkPath(owner, "image", place.image);
  if (place.image && !place.imageAlt) fail(`${owner}.imageAlt missing`);
  if (place.imageAlt) checkLocalizedText(owner, "imageAlt", place.imageAlt, 8);
  checkUrl(owner, "googleMapsUrl", place.googleMapsUrl);
  checkUrl(owner, "googleMapsSearchUrl", place.googleMapsSearchUrl);
  checkUrl(owner, "programmeUrl", place.programmeUrl);
  for (const guideSlug of place.guideCoverageSlugs ?? []) {
    const guide = guideBySlug.get(guideSlug);
    if (!guide) {
      fail(`${owner}.guideCoverageSlugs -> ${guideSlug}`);
      continue;
    }
    if (!place.relatedArticleIds.includes(guideSlug)) fail(`${owner}.guideCoverageSlugs -> ${guideSlug} is missing from relatedArticleIds`);
    const guidePlaceIds = new Set([...(guide.relatedPlaces ?? []), ...guide.sections.flatMap((section) => section.relatedPlaceIds ?? [])]);
    if (!guidePlaceIds.has(place.id)) fail(`${owner}.guideCoverageSlugs -> ${guideSlug} does not render this place`);
  }
  if (place.sourceStatus === "verified" && !place.googleMapsUrl && !place.programmeUrl) {
    fail(`${owner} is verified but has no source URL`);
  }
  if (place.requiresMapReview) {
    const point = mapPointByPlaceId.get(place.id);
    const exclusion = mapExclusionByPlaceId.get(place.id);
    if (!point && !exclusion) {
      fail(`${owner} requires a reviewed map point or an explicit map exclusion`);
    } else if (point && exclusion) {
      fail(`${owner} has both a map point and a map exclusion`);
    } else if (point && !point.review) {
      fail(`${owner} requires map review but placeMapPoints entry has no review`);
    } else if (point) {
      if (!point.review.sourceUrl) fail(`${owner} map review missing sourceUrl`);
      if (!/^\d{4}-\d{2}-\d{2}$/.test(point.review.checkedOn)) fail(`${owner} map review checkedOn should be YYYY-MM-DD`);
    }
  }
}

for (const article of guideArticles) {
  if (!article.canonicalPlaceTypes?.length) continue;
  const guidePlaceIds = new Set([...(article.relatedPlaces ?? []), ...article.sections.flatMap((section) => section.relatedPlaceIds ?? [])]);

  for (const place of places.filter((candidate) => candidate.relatedArticleIds.includes(article.slug) && article.canonicalPlaceTypes.includes(candidate.type))) {
    if (!guidePlaceIds.has(place.id)) fail(`guide:${article.slug}.canonicalPlaceTypes -> ${place.id} does not render this place`);
    if (!place.guideCoverageSlugs?.includes(article.slug)) fail(`guide:${article.slug}.canonicalPlaceTypes -> ${place.id} missing guideCoverageSlugs`);
  }
}

for (const point of placeMapPoints) {
  if (!placeIds.has(point.placeId)) fail(`placeMapPoint:${point.placeId} does not match a place id`);
  if (!Number.isFinite(point.lat) || !Number.isFinite(point.lng)) fail(`placeMapPoint:${point.placeId} has invalid coordinates`);
}

for (const exclusion of placeMapExclusions) {
  const owner = `placeMapExclusion:${exclusion.placeId}`;
  if (!placeIds.has(exclusion.placeId)) fail(`${owner} does not match a place id`);
  if (!mapPlaceTypes.has(places.find((place) => place.id === exclusion.placeId)?.type)) fail(`${owner} is not map eligible`);
  if (!/^(coordinate_unverified|not_a_fixed_venue|outside_map_scope)$/.test(exclusion.reason)) fail(`${owner} has invalid reason`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(exclusion.checkedOn)) fail(`${owner}.checkedOn should be YYYY-MM-DD`);
  checkUrl(owner, "sourceUrl", exclusion.sourceUrl);
  if (mapPointByPlaceId.has(exclusion.placeId)) fail(`${owner} duplicates a placeMapPoint`);
}

for (const event of [...rivieraEvents, summerOnTheRivieraEvent]) {
  const owner = `event:${event.slug}`;
  if (!slugPattern.test(event.slug)) fail(`${owner}.slug should be kebab-case`);
  if (!idPattern.test(event.id)) fail(`${owner}.id should be kebab-case`);
  if (!isFilledText(event.title)) fail(`${owner}.title missing`);
  if (!isFilledText(event.seriesSlug)) fail(`${owner}.seriesSlug missing`);
  if (!event.recurrence) fail(`${owner}.recurrence missing`);
  if (!event.dateStatus) fail(`${owner}.dateStatus missing`);
  if (event.titleLocalized) checkLocalizedText(owner, "titleLocalized", event.titleLocalized, 3);
  if (!isFilledText(event.dateLabel)) fail(`${owner}.dateLabel missing`);
  if (event.dateLabelLocalized) checkLocalizedText(owner, "dateLabelLocalized", event.dateLabelLocalized, 3);
  if (event.dateStatus === "confirmed" && !event.startDate && !event.endDate) fail(`${owner} is confirmed but has no startDate or endDate`);
  if ((event.dateStatus === "dates_pending" || event.dateStatus === "estimated_annual_window") && (event.startDate || event.endDate)) {
    fail(`${owner} has pending/estimated status but also has concrete dates`);
  }
  checkLocalizedText(owner, "shortDescription", event.shortDescription, 20);
  checkLocalizedText(owner, "whyShowOnSite", event.whyShowOnSite, 20);
  checkLocalizedText(owner, "bookingTip", event.bookingTip, 20);
  if (event.typicalDateWindow) checkLocalizedText(owner, "typicalDateWindow", event.typicalDateWindow, 5);
  if (event.theme) checkLocalizedText(owner, "theme", event.theme, 3);
  if (event.travelNote) checkLocalizedText(owner, "travelNote", event.travelNote, 10);
  if (!event.category.length) fail(`${owner}.category should not be empty`);
  if (!event.audience.length) fail(`${owner}.audience should not be empty`);
  checkUrl(owner, "sourceUrl", event.sourceUrl);
  checkUrl(owner, "programmeUrl", event.programmeUrl);
  checkUrl(owner, "ticketsUrl", event.ticketsUrl);
  for (const guideSlug of event.relatedGuideSlugs ?? []) {
    if (!guideSlugs.has(guideSlug)) fail(`${owner}.relatedGuideSlugs -> ${guideSlug}`);
  }
  if (event.sourceStatus === "verified" && !event.sourceUrl) fail(`${owner} is verified but has no sourceUrl`);
  checkPath(owner, "media.image", event.media?.image);
  if (event.media?.image && !event.media.imageAlt) fail(`${owner}.media.imageAlt missing`);
  if (event.media?.imageAlt) checkLocalizedText(owner, "media.imageAlt", event.media.imageAlt, 8);
}

for (const partner of localPartners) {
  const owner = `partner:${partner.id}`;
  if (!idPattern.test(partner.id)) fail(`${owner}.id should be kebab-case`);
  if (!isFilledText(partner.name)) fail(`${owner}.name missing`);
  if (!isFilledText(partner.category)) fail(`${owner}.category missing`);
  if (!isFilledText(partner.city)) fail(`${owner}.city missing`);
  checkUrl(owner, "website", partner.website);
  if (partner.status === "sponsored" && partner.publicVisibility !== "sponsored") {
    fail(`${owner} has sponsored status but publicVisibility is not sponsored`);
  }
  if (partner.publicVisibility === "sponsored" && partner.status !== "sponsored") {
    fail(`${owner} has sponsored visibility but status is not sponsored`);
  }
  if (partner.status === "sampling" && partner.publicVisibility !== "none" && partner.publicVisibility !== "guest_only") {
    fail(`${owner} sampling must not imply public placement`);
  }
  if (partner.publicVisibility === "sponsored" && partner.website && partnerLinkRel(partner) !== "sponsored") {
    fail(`${owner} sponsored public links must be prepared for rel=sponsored`);
  }
}

for (const perk of guestPerks) {
  const owner = `guestPerk:${perk.id}`;
  if (!idPattern.test(perk.id)) fail(`${owner}.id should be kebab-case`);
  if (!partnerIds.has(perk.partnerId)) fail(`${owner}.partnerId -> ${perk.partnerId}`);
  checkLocalizedText(owner, "title", perk.title, 3);
  checkLocalizedText(owner, "description", perk.description, 20);
  if (perk.terms) checkLocalizedText(owner, "terms", perk.terms, 10);
  if (perk.validFrom && !/^\d{4}-\d{2}-\d{2}$/.test(perk.validFrom)) fail(`${owner}.validFrom should be YYYY-MM-DD`);
  if (perk.validUntil && !/^\d{4}-\d{2}-\d{2}$/.test(perk.validUntil)) fail(`${owner}.validUntil should be YYYY-MM-DD`);
  if (perk.visibility === "public" && !perk.requiresBooking) {
    fail(`${owner} public guest perk should still make booking requirement explicit`);
  }
}

console.log("Azur Menton content schema lint");
console.log(`Guides checked: ${guideArticles.length}`);
console.log(`Places checked: ${places.length}`);
console.log(`Events checked: ${rivieraEvents.length + 1}`);
console.log(`Partners checked: ${localPartners.length}`);
console.log(`Guest perks checked: ${guestPerks.length}`);

if (failures.length) {
  console.log(`Failures: ${failures.length}`);
  for (const failure of failures.slice(0, 80)) console.log(`- ${failure}`);
  if (failures.length > 80) console.log(`... ${failures.length - 80} more`);
  process.exit(1);
}

console.log("OK");
