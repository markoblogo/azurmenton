import type { RivieraEvent } from "@/content/riviera-events";

const sportsPrestigeSeries = new Set([
  "monaco-grand-prix",
  "rolex-monte-carlo-masters",
  "monaco-e-prix",
  "monaco-run",
  "nice-half-marathon",
  "new-vision-nice-open",
  "jumping-international-monte-carlo",
  "meeting-herculis-ebs",
  "la-vuelta-monaco-start",
  "tour-de-france-femmes-nice-finish",
  "nice-cannes-marathon",
  "monaco-yacht-show",
]);

// Calendar callers already restrict records to upcoming or pending events.
// Select the curated series independently of the changing occurrence year.
export function isSportsPrestigeHighlight(event: Pick<RivieraEvent, "seriesSlug" | "slug">) {
  return sportsPrestigeSeries.has(event.seriesSlug ?? event.slug);
}
