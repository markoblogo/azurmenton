#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

const path = require("node:path");
const { registerTypescriptContent } = require("./lib/register-ts-content.cjs");

const root = path.resolve(__dirname, "..");
registerTypescriptContent(root);

const { guideArticles } = require("../src/content/guide.ts");
const { guideIntentClusters } = require("../src/content/guide-intents.ts");
const { rivieraEvents } = require("../src/content/riviera-events.ts");

const today = new Date("2026-07-03T00:00:00Z");
const todayKey = today.toISOString().slice(0, 10);
const staleCutoff = new Date(today);
staleCutoff.setDate(staleCutoff.getDate() - 120);
const pendingSoonCutoff = new Date(today);
pendingSoonCutoff.setDate(pendingSoonCutoff.getDate() + 120);

const highPrioritySlugs = new Set([
  "menton-lemon-festival",
  "nice-carnival",
  "monaco-grand-prix",
  "monaco-yacht-show",
  "rallye-automobile-monte-carlo",
  "sanremo-music-festival",
  "rolex-monte-carlo-masters",
  "monaco-e-prix",
  "menton-music-festival",
  "french-flyair-menton",
  "monte-carlo-circus-festival",
  "christmas-markets-riviera",
]);

function guideLinksByEventSlug() {
  const links = new Map();
  const add = (eventSlug, guideSlug) => {
    if (!links.has(eventSlug)) links.set(eventSlug, new Set());
    links.get(eventSlug).add(guideSlug);
  };

  for (const article of guideArticles) {
    for (const eventSlug of article.relatedEvents ?? []) add(eventSlug, article.slug);
    for (const section of article.sections ?? []) {
      for (const eventSlug of section.relatedEventIds ?? []) add(eventSlug, article.slug);
    }
  }

  for (const cluster of guideIntentClusters) {
    for (const eventSlug of cluster.relatedEventSlugs ?? []) add(eventSlug, `intent:${cluster.id}`);
  }

  for (const event of rivieraEvents) {
    for (const guideSlug of event.relatedGuideSlugs ?? []) add(event.slug, guideSlug);
  }

  return links;
}

function monthGroupDate(event) {
  if (/^\d{4}-\d{2}$/.test(event.monthGroup)) return new Date(`${event.monthGroup}-01T00:00:00Z`);
  if (event.monthGroup === "winter-highlights") return new Date("2027-02-01T00:00:00Z");
  return undefined;
}

function isPast(event) {
  return Boolean(event.endDate && event.endDate < todayKey);
}

function isFutureish(event) {
  if (event.startDate && event.startDate >= todayKey) return true;
  if (event.dateStatus === "dates_pending" || event.dateStatus === "estimated_annual_window") return true;
  return false;
}

const linkedFrom = guideLinksByEventSlug();
const rows = [];

for (const event of rivieraEvents) {
  const links = [...(linkedFrom.get(event.slug) ?? [])].sort();

  const addRow = (risk, suggestedAction) => {
    rows.push({
      risk,
      title: event.title,
      slug: event.slug,
      dateStatus: event.dateStatus,
      startDate: event.startDate ?? "-",
      endDate: event.endDate ?? "-",
      occurrenceYear: event.occurrenceYear ?? "-",
      recurrence: event.recurrence ?? "-",
      sourceUrl: event.sourceUrl ?? "-",
      lastChecked: event.lastChecked ?? "-",
      linkedFromGuides: links.join(", ") || "-",
      suggestedAction,
    });
  };

  if (event.dateStatus === "confirmed" && event.recurrence === "annual" && event.startDate && event.startDate < todayKey) {
    addRow("high", "Update/create the next annual occurrence or move the current page to a past-edition note.");
  }

  if (isPast(event) && links.length) {
    addRow("medium", "Guide links point to a past event page; update the event page to the next edition or adjust guide links.");
  }

  if (highPrioritySlugs.has(event.slug) && !isFutureish(event)) {
    addRow("high", "High-priority event has no future occurrence visible.");
  }

  const pendingDate = monthGroupDate(event);
  if (
    (event.dateStatus === "dates_pending" || event.dateStatus === "estimated_annual_window") &&
    pendingDate &&
    pendingDate >= today &&
    pendingDate <= pendingSoonCutoff
  ) {
    addRow("medium", "Pending/estimated event falls within 120 days; check official programme.");
  }

  if (event.dateStatus === "confirmed" && event.lastChecked && new Date(`${event.lastChecked}T00:00:00Z`) < staleCutoff) {
    addRow("medium", "Confirmed event has stale lastChecked; verify source before relying on dates.");
  }

  if (!event.sourceUrl) {
    addRow("low", "Add official source URL when available.");
  }
}

const priority = { high: 0, medium: 1, low: 2 };
rows.sort((left, right) => priority[left.risk] - priority[right.risk] || left.slug.localeCompare(right.slug));

console.log("Azur Menton events review");
console.log(`Date: ${todayKey}`);
console.log(`Events checked: ${rivieraEvents.length}`);
console.log(`Items: ${rows.length}`);

if (!rows.length) {
  console.log("OK: no review items");
  process.exit(0);
}

for (const row of rows) {
  console.log("");
  console.log(`[${row.risk.toUpperCase()}] ${row.title} (${row.slug})`);
  console.log(`dateStatus=${row.dateStatus} startDate=${row.startDate} endDate=${row.endDate} occurrenceYear=${row.occurrenceYear} recurrence=${row.recurrence}`);
  console.log(`sourceUrl=${row.sourceUrl}`);
  console.log(`lastChecked=${row.lastChecked}`);
  console.log(`linkedFromGuides=${row.linkedFromGuides}`);
  console.log(`suggestedAction=${row.suggestedAction}`);
}
