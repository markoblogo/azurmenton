#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

const path = require("node:path");
const { registerTypescriptContent } = require("./lib/register-ts-content.cjs");

const root = path.resolve(__dirname, "..");
registerTypescriptContent(root);

const { guideArticles } = require("../src/content/guide.ts");
const { places } = require("../src/content/places.ts");
const { rivieraEvents, summerOnTheRivieraEvent } = require("../src/content/riviera-events.ts");
const { locales } = require("../src/i18n/locales.ts");

const failures = [];
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
  if (place.sourceStatus === "verified" && !place.googleMapsUrl && !place.programmeUrl) {
    fail(`${owner} is verified but has no source URL`);
  }
}

for (const event of [...rivieraEvents, summerOnTheRivieraEvent]) {
  const owner = `event:${event.slug}`;
  if (!slugPattern.test(event.slug)) fail(`${owner}.slug should be kebab-case`);
  if (!idPattern.test(event.id)) fail(`${owner}.id should be kebab-case`);
  if (!isFilledText(event.title)) fail(`${owner}.title missing`);
  if (event.titleLocalized) checkLocalizedText(owner, "titleLocalized", event.titleLocalized, 3);
  if (!isFilledText(event.dateLabel)) fail(`${owner}.dateLabel missing`);
  if (event.dateLabelLocalized) checkLocalizedText(owner, "dateLabelLocalized", event.dateLabelLocalized, 3);
  checkLocalizedText(owner, "shortDescription", event.shortDescription, 20);
  checkLocalizedText(owner, "whyShowOnSite", event.whyShowOnSite, 20);
  checkLocalizedText(owner, "bookingTip", event.bookingTip, 20);
  if (!event.category.length) fail(`${owner}.category should not be empty`);
  if (!event.audience.length) fail(`${owner}.audience should not be empty`);
  checkUrl(owner, "sourceUrl", event.sourceUrl);
  if (event.sourceStatus === "verified" && !event.sourceUrl) fail(`${owner} is verified but has no sourceUrl`);
  checkPath(owner, "media.image", event.media?.image);
  if (event.media?.image && !event.media.imageAlt) fail(`${owner}.media.imageAlt missing`);
  if (event.media?.imageAlt) checkLocalizedText(owner, "media.imageAlt", event.media.imageAlt, 8);
}

console.log("Azur Menton content schema lint");
console.log(`Guides checked: ${guideArticles.length}`);
console.log(`Places checked: ${places.length}`);
console.log(`Events checked: ${rivieraEvents.length + 1}`);

if (failures.length) {
  console.log(`Failures: ${failures.length}`);
  for (const failure of failures.slice(0, 80)) console.log(`- ${failure}`);
  if (failures.length > 80) console.log(`... ${failures.length - 80} more`);
  process.exit(1);
}

console.log("OK");
