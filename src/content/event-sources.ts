import type { EventDiscoveryLocation } from "@/lib/event-discovery";

export type EventSourceType =
  | "official-tourism"
  | "municipality"
  | "venue"
  | "museum"
  | "theatre"
  | "regional-calendar";

export type EventSource = {
  id: string;
  name: string;
  baseUrl: string;
  city: Exclude<EventDiscoveryLocation, "all">;
  sourceType: EventSourceType;
  enabled: boolean;
  trustLevel: "primary" | "secondary";
  ingestionMethod?: "rss" | "ical" | "jsonld" | "api" | "html";
  notes?: string;
};

export const eventSources: EventSource[] = [
  {
    id: "menton-riviera-tourism",
    name: "Menton Riviera & Merveilles tourism",
    baseUrl: "https://www.menton-riviera-merveilles.fr/",
    city: "menton",
    sourceType: "official-tourism",
    enabled: true,
    trustLevel: "primary",
    notes: "First source to review for Menton and nearby village programmes. Prefer structured feeds or JSON-LD if available.",
  },
  {
    id: "ville-menton",
    name: "Ville de Menton",
    baseUrl: "https://www.menton.fr/",
    city: "menton",
    sourceType: "municipality",
    enabled: true,
    trustLevel: "primary",
    notes: "Use for municipal events, holiday access notes and official local programmes.",
  },
  {
    id: "visit-monaco-events",
    name: "Visit Monaco events",
    baseUrl: "https://www.visitmonaco.com/en/events",
    city: "monaco",
    sourceType: "official-tourism",
    enabled: true,
    trustLevel: "primary",
    notes: "Priority source for Monaco calendar events useful from a Menton base.",
  },
  {
    id: "explore-nice-events",
    name: "Explore Nice Cote d'Azur events",
    baseUrl: "https://www.explorenicecotedazur.com/",
    city: "nice",
    sourceType: "official-tourism",
    enabled: true,
    trustLevel: "primary",
    notes: "Use for Nice exhibitions, festivals and sports events before considering venue pages.",
  },
  {
    id: "comune-ventimiglia",
    name: "Comune di Ventimiglia",
    baseUrl: "https://www.comune.ventimiglia.im.it/",
    city: "ventimiglia",
    sourceType: "municipality",
    enabled: true,
    trustLevel: "primary",
    notes: "Cross-border events should stay manually reviewed until a reliable structured feed is confirmed.",
  },
  {
    id: "sanremo-tourism",
    name: "Sanremo tourism and municipality",
    baseUrl: "https://www.sanremoliveandlove.it/",
    city: "sanremo",
    sourceType: "official-tourism",
    enabled: true,
    trustLevel: "primary",
    notes: "Use for Sanremo music, markets and seasonal highlights; confirm dates against organiser pages when possible.",
  },
];

