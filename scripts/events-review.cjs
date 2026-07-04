#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

const path = require("node:path");
const { registerTypescriptContent } = require("./lib/register-ts-content.cjs");

const root = path.resolve(__dirname, "..");
registerTypescriptContent(root);

const { guideArticles } = require("../src/content/guide.ts");
const { guideIntentClusters } = require("../src/content/guide-intents.ts");
const { eventFreshnessProfiles, rivieraEvents, summerOnTheRivieraEvent } = require("../src/content/riviera-events.ts");
const { canRenderEventJsonLd, getEventDateStatus } = require("../src/lib/events.ts");

const today = new Date(process.env.EVENT_REVIEW_TODAY ? `${process.env.EVENT_REVIEW_TODAY}T00:00:00Z` : new Date().toISOString().slice(0, 10));
const todayKey = today.toISOString().slice(0, 10);

const highPrioritySlugs = new Set([
  "menton-lemon-festival",
  "monaco-grand-prix",
  "nice-carnival",
  "monaco-yacht-show",
  "rolex-monte-carlo-masters",
  "sanremo-music-festival",
  "rallye-automobile-monte-carlo",
  "monaco-e-prix",
  "monte-carlo-circus-festival",
  "menton-music-festival",
  "french-flyair-menton",
]);

const freshnessProfiles = {
  highPriorityConfirmed: 60,
  highPriorityPending: 30,
  standardConfirmed: 120,
  standardPending: 90,
  officialProgrammePending: 45,
};

const eventFreshnessProfileBySlug = new Map(eventFreshnessProfiles.map((profile) => [profile.slug, profile]));
const allEvents = [...rivieraEvents, summerOnTheRivieraEvent];
const allEventSlugs = new Set(allEvents.flatMap((event) => [event.slug, event.occurrenceSlug].filter(Boolean)));

function addGuideLink(links, eventSlug, guideSlug) {
  if (!eventSlug || !allEventSlugs.has(eventSlug)) return;
  if (!links.has(eventSlug)) links.set(eventSlug, new Set());
  links.get(eventSlug).add(guideSlug);
}

function guideLinksByEventSlug() {
  const links = new Map();

  for (const article of guideArticles) {
    for (const eventSlug of article.relatedEvents ?? []) addGuideLink(links, eventSlug, article.slug);
    for (const section of article.sections ?? []) {
      for (const eventSlug of section.relatedEventIds ?? []) addGuideLink(links, eventSlug, article.slug);
    }
  }

  for (const cluster of guideIntentClusters) {
    for (const eventSlug of cluster.relatedEventSlugs ?? []) addGuideLink(links, eventSlug, `intent:${cluster.id}`);
  }

  for (const event of allEvents) {
    for (const guideSlug of event.relatedGuideSlugs ?? []) {
      addGuideLink(links, event.slug, guideSlug);
      if (event.occurrenceSlug) addGuideLink(links, event.occurrenceSlug, guideSlug);
    }
  }

  return links;
}

function parseDate(value) {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return undefined;
  return new Date(`${value}T00:00:00Z`);
}

function daysBetween(left, right) {
  return Math.floor((right.getTime() - left.getTime()) / 86_400_000);
}

function daysUntil(date) {
  return daysBetween(today, date);
}

function dateFromMonthGroup(event) {
  if (/^\d{4}-\d{2}$/.test(event.monthGroup)) return new Date(`${event.monthGroup}-01T00:00:00Z`);
  if (event.monthGroup === "winter-highlights") return new Date("2027-02-01T00:00:00Z");
  return undefined;
}

function nextPlanningDate(event) {
  return parseDate(event.startDate) ?? parseDate(event.endDate) ?? dateFromMonthGroup(event);
}

function isPast(event) {
  return getEventDateStatus(event, today) === "past";
}

function isFuturePlanningEvent(event) {
  const status = getEventDateStatus(event, today);
  return status === "upcoming" || status === "current" || status === "dates_pending" || status === "estimated_annual_window";
}

function hasFutureOccurrenceOrPlanningStatus(event) {
  return allEvents.some((candidate) => {
    if (candidate === event) return isFuturePlanningEvent(candidate);
    if (candidate.seriesSlug !== event.seriesSlug && candidate.slug !== event.slug) return false;
    return isFuturePlanningEvent(candidate);
  });
}

function sourceIsOfficial(event) {
  return event.sourceStatus === "verified";
}

function freshnessMaxAgeDays(event) {
  const profile = eventFreshnessProfileBySlug.get(event.slug);
  const highPriority = highPrioritySlugs.has(event.slug);
  const pending = event.dateStatus === "dates_pending" || event.dateStatus === "estimated_annual_window" || event.sourceStatus !== "verified";

  if (profile?.status === "awaiting_official_program") return freshnessProfiles.officialProgrammePending;
  if (highPriority && pending) return freshnessProfiles.highPriorityPending;
  if (highPriority) return freshnessProfiles.highPriorityConfirmed;
  if (pending) return freshnessProfiles.standardPending;
  return freshnessProfiles.standardConfirmed;
}

function sourceAgeDays(event) {
  const checked = parseDate(event.lastChecked);
  if (!checked) return undefined;
  return Math.max(0, daysBetween(checked, today));
}

function eventLinks(event, linkedFrom) {
  return [...new Set([...(linkedFrom.get(event.slug) ?? []), ...(event.occurrenceSlug ? linkedFrom.get(event.occurrenceSlug) ?? [] : [])])].sort();
}

function formatValue(value) {
  return value === undefined || value === "" ? "-" : String(value);
}

const linkedFrom = guideLinksByEventSlug();
const rows = [];
const rowKeys = new Set();

function addReview(event, severity, reason, recommendedAction) {
  const links = eventLinks(event, linkedFrom);
  const key = `${event.slug}:${severity}:${reason}`;
  if (rowKeys.has(key)) return;
  rowKeys.add(key);
  rows.push({
    severity,
    reason,
    eventTitle: event.title,
    slug: event.slug,
    dateStatus: event.dateStatus ?? "-",
    startDate: event.startDate ?? "-",
    endDate: event.endDate ?? "-",
    recurrence: event.recurrence ?? "-",
    occurrenceYear: event.occurrenceYear ?? "-",
    lastChecked: event.lastChecked ?? "-",
    sourceUrl: event.sourceUrl ?? "-",
    sourceStatus: event.sourceStatus ?? "-",
    linkedFromGuides: links.join(", ") || "-",
    recommendedAction,
  });
}

for (const event of allEvents) {
  const links = eventLinks(event, linkedFrom);
  const planningDate = nextPlanningDate(event);
  const ageDays = sourceAgeDays(event);
  const maxAgeDays = freshnessMaxAgeDays(event);
  const canRenderJsonLd = canRenderEventJsonLd(event);

  if (event.dateStatus === "confirmed" && event.recurrence === "annual" && event.endDate && event.endDate < todayKey) {
    addReview(event, "high", "confirmed_annual_past", "Update this annual event to the next occurrence, or move it to an explicit archive/past-edition state.");
  }

  if (event.recurrence === "annual" && isPast(event) && !hasFutureOccurrenceOrPlanningStatus(event)) {
    addReview(event, "high", "past_annual_without_next_planning", "Create the next occurrence/planning state, or mark the series as intentionally archived.");
  }

  if (isPast(event) && links.length) {
    addReview(event, "medium", "guide_links_to_past_event", "Review guide and intent links; point guests to the next edition or keep the event page clearly archived.");
  }

  if (highPrioritySlugs.has(event.slug) && (ageDays === undefined || ageDays > maxAgeDays)) {
    addReview(event, "high", "high_priority_stale_last_checked", `Recheck the official source; freshness profile allows ${maxAgeDays} days.`);
  }

  if (event.dateStatus === "dates_pending" && planningDate) {
    const dueIn = daysUntil(planningDate);
    if (dueIn >= 0 && dueIn <= 120) {
      addReview(event, "medium", "pending_event_within_120_days", "Check official programme/date publication and update status before guests use it for travel planning.");
    }
  }

  if (event.dateStatus === "estimated_annual_window" && planningDate) {
    const dueIn = daysUntil(planningDate);
    if (dueIn >= 0 && dueIn <= 180) {
      addReview(event, "medium", "estimated_window_within_180_days", "Replace estimated annual window with official dates or keep a clearly labelled pending planning note.");
    }
  }

  if (!event.sourceUrl) {
    addReview(event, highPrioritySlugs.has(event.slug) ? "high" : "medium", "missing_source_url", "Add an official sourceUrl before relying on this event in public planning content.");
  }

  if (!sourceIsOfficial(event)) {
    addReview(event, highPrioritySlugs.has(event.slug) ? "high" : "low", "source_not_verified", "Verify against an official organiser/tourism source or keep the event explicitly pending.");
  }

  if (event.detailPage && event.dateStatus === "confirmed" && !canRenderJsonLd) {
    addReview(event, "medium", "confirmed_event_missing_event_json_ld", "Add a real startDate so the detail page can render Event JSON-LD, or mark dates as pending.");
  }

  if ((event.dateStatus === "dates_pending" || event.dateStatus === "estimated_annual_window") && canRenderJsonLd) {
    addReview(event, "high", "pending_event_outputs_event_json_ld", "Remove fake concrete dates or fix the JSON-LD guard so pending/estimated pages do not output Event schema.");
  }
}

const severityPriority = { high: 0, medium: 1, low: 2 };
rows.sort((left, right) => severityPriority[left.severity] - severityPriority[right.severity] || left.slug.localeCompare(right.slug) || left.reason.localeCompare(right.reason));

const highRiskCount = rows.filter((row) => row.severity === "high").length;
const pendingReviewCount = rows.filter((row) => row.reason === "pending_event_within_120_days" || row.reason === "estimated_window_within_180_days").length;
const staleSourceCount = rows.filter((row) => row.reason === "high_priority_stale_last_checked").length;
const missingSourceCount = rows.filter((row) => row.reason === "missing_source_url").length;

console.log("Azur Menton events review");
console.log(`Date: ${todayKey}`);
console.log(`Events checked: ${allEvents.length}`);
console.log(`Review items: ${rows.length}`);
console.log("");
console.log("Summary");
console.log(`high-risk count: ${highRiskCount}`);
console.log(`pending review count: ${pendingReviewCount}`);
console.log(`stale source count: ${staleSourceCount}`);
console.log(`missing source count: ${missingSourceCount}`);

if (!rows.length) {
  console.log("");
  console.log("OK: no review items");
  process.exit(0);
}

for (const row of rows) {
  console.log("");
  console.log(`[${row.severity.toUpperCase()}] ${row.eventTitle} (${row.slug})`);
  console.log(`reason=${row.reason}`);
  console.log(`dateStatus=${formatValue(row.dateStatus)} startDate=${formatValue(row.startDate)} endDate=${formatValue(row.endDate)}`);
  console.log(`recurrence=${formatValue(row.recurrence)} occurrenceYear=${formatValue(row.occurrenceYear)}`);
  console.log(`lastChecked=${formatValue(row.lastChecked)}`);
  console.log(`sourceStatus=${formatValue(row.sourceStatus)} sourceUrl=${formatValue(row.sourceUrl)}`);
  console.log(`linkedFromGuides=${formatValue(row.linkedFromGuides)}`);
  console.log(`recommendedAction=${row.recommendedAction}`);
}
