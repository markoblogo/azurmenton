#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

const path = require("node:path");
const { registerTypescriptContent } = require("./lib/register-ts-content.cjs");

const root = path.resolve(__dirname, "..");
registerTypescriptContent(root);

const { apartments } = require("../src/content/apartments.ts");
const { guideArticles } = require("../src/content/guide.ts");
const { seoMonitoring } = require("../src/content/seo-monitoring.ts");
const { getCanonicalEventDetailSlug, getRivieraEvent, isIndexableEventDetail } = require("../src/content/riviera-events.ts");
const { stayPages } = require("../src/content/stay-pages.ts");

const failures = [];
const targets = seoMonitoring.targets;
const unique = (values) => new Set(values).size === values.length;
const isDate = (value) => /^\d{4}-\d{2}-\d{2}$/.test(value);

if (targets.length < 5 || targets.length > 10) failures.push(`priority target count must be 5-10, found ${targets.length}`);
if (!isDate(seoMonitoring.baselineDate)) failures.push("baselineDate must use YYYY-MM-DD");
if (!Number.isInteger(seoMonitoring.reviewWindowDays) || seoMonitoring.reviewWindowDays < 21 || seoMonitoring.reviewWindowDays > 35) {
  failures.push("reviewWindowDays must be an integer between 21 and 35");
}
if (!unique(targets.map((target) => target.id))) failures.push("priority target ids must be unique");
if (!unique(targets.map((target) => target.canonicalPath))) failures.push("priority canonical paths must be unique");

for (const target of targets) {
  const owner = `priority:${target.id}`;
  if (!/^\/[a-z]{2}\//.test(target.canonicalPath)) failures.push(`${owner} must use a localized canonical path`);
  if (!target.rationale || target.rationale.length < 16) failures.push(`${owner} needs a clear rationale`);

  if (target.kind === "apartment") {
    if (!apartments.some((apartment) => apartment.slug === target.slug)) failures.push(`${owner} apartment slug does not resolve`);
    if (target.canonicalPath !== `/en/apartments/${target.slug}`) failures.push(`${owner} canonical path is not the apartment route`);
  }

  if (target.kind === "stay") {
    if (!stayPages.some((page) => page.slug === target.slug)) failures.push(`${owner} stay slug does not resolve`);
    if (target.canonicalPath !== `/en/stay/${target.slug}`) failures.push(`${owner} canonical path is not the stay route`);
  }

  if (target.kind === "guide") {
    if (!guideArticles.some((article) => article.slug === target.slug)) failures.push(`${owner} guide slug does not resolve`);
    if (target.canonicalPath !== `/en/guide/${target.slug}`) failures.push(`${owner} canonical path is not the guide route`);
  }

  if (target.kind === "event") {
    const event = getRivieraEvent(target.slug);
    const canonicalSlug = getCanonicalEventDetailSlug(target.slug);
    if (!event || !canonicalSlug) {
      failures.push(`${owner} event slug does not resolve`);
    } else {
      if (!isIndexableEventDetail(event)) failures.push(`${owner} event is not indexable`);
      if (target.canonicalPath !== `/en/events/${canonicalSlug}`) failures.push(`${owner} must use occurrence canonical route ${canonicalSlug}`);
    }
  }
}

if (failures.length) {
  console.error("Azur Menton SEO priority report failed");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

const baseline = new Date(`${seoMonitoring.baselineDate}T00:00:00Z`);
baseline.setUTCDate(baseline.getUTCDate() + seoMonitoring.reviewWindowDays);
const reviewDate = baseline.toISOString().slice(0, 10);

console.log("Azur Menton SEO priority report");
console.log(`Targets: ${targets.length}`);
console.log(`Baseline: ${seoMonitoring.baselineDate}`);
console.log(`Manual Search Console review due: ${reviewDate}`);
console.log("");

for (const target of targets) {
  console.log(`- ${target.canonicalPath} [${target.kind}]`);
  console.log(`  ${target.rationale}`);
}

console.log("");
console.log("Review indexed count, canonical conflicts, impressions, CTR and average position.");
console.log("Request indexing only after a production deployment, for these canonical URLs only; do not bulk-submit archives or noindex useful historical pages.");
