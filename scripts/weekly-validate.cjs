#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

const path = require("node:path");
const { registerTypescriptContent } = require("./lib/register-ts-content.cjs");

const root = path.resolve(__dirname, "..");
registerTypescriptContent(root);

const { guideArticles } = require("../src/content/guide.ts");
const { rivieraEvents, summerOnTheRivieraEvent } = require("../src/content/riviera-events.ts");
const { weeklyDigests } = require("../src/content/weekly-digests.ts");
const { locales } = require("../src/i18n/locales.ts");

const failures = [];
const warnings = [];
const validLocales = new Set(locales);
const guideSlugs = new Set(guideArticles.map((article) => article.slug));
const eventSlugs = new Set([...rivieraEvents.map((event) => event.slug), summerOnTheRivieraEvent.slug]);
const datePattern = /^\d{4}-\d{2}-\d{2}$/;

function fail(message) {
  failures.push(message);
}

function warn(message) {
  warnings.push(message);
}

function isFilled(value) {
  return typeof value === "string" && value.trim().length > 0;
}

for (const digest of weeklyDigests) {
  const owner = `weekly:${digest.slug}:${digest.locale}`;
  if (!isFilled(digest.slug)) fail(`${owner}.slug missing`);
  if (!validLocales.has(digest.locale)) fail(`${owner}.locale invalid`);
  if (!["draft", "reviewed", "published"].includes(digest.sourceStatus)) fail(`${owner}.sourceStatus invalid`);
  if (digest.sourceStatus === "draft") warn(`${owner} is draft and will not be shown publicly`);

  const publiclyDisplayable = digest.sourceStatus === "reviewed" || digest.sourceStatus === "published";
  if (!publiclyDisplayable) continue;

  if (!datePattern.test(digest.dateRangeStart ?? "")) fail(`${owner}.dateRangeStart missing or invalid`);
  if (!datePattern.test(digest.dateRangeEnd ?? "")) fail(`${owner}.dateRangeEnd missing or invalid`);
  if (!isFilled(digest.title)) fail(`${owner}.title missing`);
  if (!isFilled(digest.summary)) fail(`${owner}.summary missing`);
  if (!digest.lastChecked || !datePattern.test(digest.lastChecked)) fail(`${owner}.lastChecked missing or invalid`);

  for (const [index, item] of digest.items.entries()) {
    const itemOwner = `${owner}.items[${index}]`;
    if (!isFilled(item.title)) fail(`${itemOwner}.title missing`);
    if (!isFilled(item.description)) fail(`${itemOwner}.description missing`);
    if (!isFilled(item.travelNoteFromMenton)) fail(`${itemOwner}.travelNoteFromMenton missing`);
    if (!isFilled(item.sourceUrl)) fail(`${itemOwner}.sourceUrl missing`);
    if (item.sourceUrl && !/^https?:\/\//.test(item.sourceUrl)) fail(`${itemOwner}.sourceUrl should be absolute`);
    if (item.relatedEventSlug && !eventSlugs.has(item.relatedEventSlug)) fail(`${itemOwner}.relatedEventSlug -> ${item.relatedEventSlug}`);
    if (item.relatedGuideSlug && !guideSlugs.has(item.relatedGuideSlug)) fail(`${itemOwner}.relatedGuideSlug -> ${item.relatedGuideSlug}`);
  }
}

console.log("Azur Menton weekly digest validation");
console.log(`Weekly digests checked: ${weeklyDigests.length}`);
if (warnings.length) {
  console.log(`Warnings: ${warnings.length}`);
  for (const message of warnings.slice(0, 20)) console.log(`- ${message}`);
}

if (failures.length) {
  console.log(`Failures: ${failures.length}`);
  for (const message of failures.slice(0, 80)) console.log(`- ${message}`);
  process.exit(1);
}

console.log("OK");
