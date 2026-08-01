import type { EventDiscoveryLocation } from "@/lib/event-discovery";

export type EventSourceType =
  | "official-tourism"
  | "municipality"
  | "venue"
  | "museum"
  | "theatre"
  | "regional-calendar";

export type EventIngestionMethod = "rss" | "ical" | "jsonld" | "api" | "html" | "manual";

export type EventSource = {
  id: string;
  name: string;
  baseUrl: string;
  sourceUrl: string;
  owner: string;
  city: Exclude<EventDiscoveryLocation, "all">;
  region: "menton-riviera" | "monaco" | "nice-cote-dazur" | "italian-riviera";
  sourceType: EventSourceType;
  enabled: boolean;
  automated: boolean;
  trustLevel: "primary" | "secondary";
  ingestionMethod: EventIngestionMethod;
  expectedUpdateFrequency: "daily" | "weekly" | "seasonal" | "manual-review";
  language: "en" | "fr" | "it" | "multi";
  primarySource: boolean;
  imagePolicy: string;
  descriptionPolicy: string;
  robotsPolicy: string;
  knownLimitations: string[];
  notes?: string;
};

export const eventSources: EventSource[] = [
  {
    id: "menton-riviera-tourism",
    name: "Menton Riviera & Merveilles tourism",
    baseUrl: "https://www.menton-riviera-merveilles.fr/",
    sourceUrl: "https://www.menton-riviera-merveilles.fr/sorganiser/agenda/",
    owner: "Office de Tourisme Menton, Riviera & Merveilles",
    city: "menton",
    region: "menton-riviera",
    sourceType: "official-tourism",
    enabled: true,
    automated: false,
    trustLevel: "primary",
    ingestionMethod: "manual",
    expectedUpdateFrequency: "weekly",
    language: "fr",
    primarySource: true,
    imagePolicy: "Do not ingest images automatically; use AzurMenton editorial illustrations unless reuse is manually approved.",
    descriptionPolicy: "Store factual fields only. Rewrite AzurMenton summaries manually.",
    robotsPolicy: "Manual source until a stable, public structured endpoint is confirmed.",
    knownLimitations: ["The agenda uses dynamic search infrastructure; no stable server-rendered event records were confirmed in this pass."],
    notes: "First source to review manually for Menton and nearby village programmes.",
  },
  {
    id: "ville-menton",
    name: "Ville de Menton",
    baseUrl: "https://www.menton.fr/",
    sourceUrl: "https://www.menton.fr/",
    owner: "Ville de Menton",
    city: "menton",
    region: "menton-riviera",
    sourceType: "municipality",
    enabled: true,
    automated: false,
    trustLevel: "primary",
    ingestionMethod: "manual",
    expectedUpdateFrequency: "weekly",
    language: "fr",
    primarySource: true,
    imagePolicy: "Do not ingest images automatically; use AzurMenton editorial illustrations unless reuse is manually approved.",
    descriptionPolicy: "Store factual fields only. Rewrite AzurMenton summaries manually.",
    robotsPolicy: "Manual source until a stable event feed is confirmed.",
    knownLimitations: ["Use primarily for civic context, access notes and official programme confirmation."],
    notes: "Use for municipal events, holiday access notes and official local programmes.",
  },
  {
    id: "visit-monaco-events",
    name: "Visit Monaco events",
    baseUrl: "https://www.visitmonaco.com/",
    sourceUrl: "https://www.visitmonaco.com/en/events/events-calendar",
    owner: "Visit Monaco",
    city: "monaco",
    region: "monaco",
    sourceType: "official-tourism",
    enabled: true,
    automated: false,
    trustLevel: "primary",
    ingestionMethod: "manual",
    expectedUpdateFrequency: "weekly",
    language: "en",
    primarySource: true,
    imagePolicy: "Do not ingest images automatically; use AzurMenton editorial illustrations unless reuse is manually approved.",
    descriptionPolicy: "Store factual fields only. Rewrite AzurMenton summaries manually.",
    robotsPolicy: "Manual source until stable event records are exposed without relying on React internals.",
    knownLimitations: ["The calendar page did not expose stable server-rendered event records suitable for deterministic parsing in this pass."],
    notes: "Priority manual source for Monaco calendar events useful from a Menton base.",
  },
  {
    id: "explore-nice-major-events",
    name: "Explore Nice Cote d'Azur major events",
    baseUrl: "https://www.explorenicecotedazur.com/",
    sourceUrl: "https://www.explorenicecotedazur.com/en/events/major-events/",
    owner: "Office de Tourisme Nice Cote d'Azur",
    city: "nice",
    region: "nice-cote-dazur",
    sourceType: "official-tourism",
    enabled: true,
    automated: true,
    trustLevel: "primary",
    ingestionMethod: "html",
    expectedUpdateFrequency: "daily",
    language: "en",
    primarySource: true,
    imagePolicy: "Record image URLs only as factual source metadata; do not hotlink or reuse without manual approval.",
    descriptionPolicy: "Store short factual labels only. Rewrite AzurMenton summaries.",
    robotsPolicy: "Uses stable server-rendered official tourism HTML with a polite AzurMenton user agent and daily cadence.",
    knownLimitations: ["The page is a curated major-events list, not the full Nice calendar."],
    notes: "Automated source for Nice exhibitions, festivals and sports events before considering venue pages.",
  },
  {
    id: "comune-ventimiglia",
    name: "Comune di Ventimiglia",
    baseUrl: "https://www.comune.ventimiglia.im.it/",
    sourceUrl: "https://www.comune.ventimiglia.im.it/",
    owner: "Comune di Ventimiglia",
    city: "ventimiglia",
    region: "italian-riviera",
    sourceType: "municipality",
    enabled: true,
    automated: false,
    trustLevel: "primary",
    ingestionMethod: "manual",
    expectedUpdateFrequency: "weekly",
    language: "it",
    primarySource: true,
    imagePolicy: "Do not ingest images automatically; use AzurMenton editorial illustrations unless reuse is manually approved.",
    descriptionPolicy: "Store factual fields only. Rewrite AzurMenton summaries manually.",
    robotsPolicy: "Manual source until a stable event feed is confirmed.",
    knownLimitations: ["Cross-border events should be manually selected for actual value to Menton guests."],
    notes: "Cross-border events should stay manually reviewed until a reliable structured feed is confirmed.",
  },
  {
    id: "comune-sanremo-events",
    name: "Comune di Sanremo events",
    baseUrl: "https://www.comune.sanremo.im.it/",
    sourceUrl: "https://www.comune.sanremo.im.it/it",
    owner: "Comune di Sanremo",
    city: "sanremo",
    region: "italian-riviera",
    sourceType: "municipality",
    enabled: true,
    automated: true,
    trustLevel: "primary",
    ingestionMethod: "html",
    expectedUpdateFrequency: "daily",
    language: "it",
    primarySource: true,
    imagePolicy: "Do not ingest images automatically; use AzurMenton editorial illustrations unless reuse is manually approved.",
    descriptionPolicy: "Store factual title/date/source URL only. Rewrite AzurMenton summaries.",
    robotsPolicy: "Uses stable server-rendered official municipality homepage event cards with a polite AzurMenton user agent and daily cadence.",
    knownLimitations: ["Homepage cards repeat long-running events across several days; dedupe preserves distinct date occurrences."],
    notes: "Automated source for Sanremo music, markets and seasonal highlights; confirm dates against organiser pages when possible.",
  },
  {
    id: "sanremo-live-love",
    name: "Sanremo Live & Love",
    baseUrl: "https://www.sanremoliveandlove.it/",
    sourceUrl: "https://www.sanremoliveandlove.it/",
    owner: "Sanremo Live & Love",
    city: "sanremo",
    region: "italian-riviera",
    sourceType: "official-tourism",
    enabled: true,
    automated: true,
    trustLevel: "primary",
    ingestionMethod: "html",
    expectedUpdateFrequency: "daily",
    language: "multi",
    primarySource: true,
    imagePolicy: "Do not ingest images automatically; use AzurMenton editorial illustrations unless reuse is manually approved.",
    descriptionPolicy: "Store factual date/title/source URL only. Rewrite AzurMenton summaries manually.",
    robotsPolicy: "Uses stable server-rendered official tourism event cards with a polite AzurMenton user agent and daily cadence.",
    knownLimitations: ["Homepage highlights are a partial calendar, not the full Sanremo event archive."],
    notes: "Automated supporting source for Sanremo tourism context.",
  },
];
