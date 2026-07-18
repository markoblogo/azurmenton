export type SeoPriorityTargetKind = "apartment" | "stay" | "event" | "guide";

export type SeoPriorityTarget = {
  id: string;
  kind: SeoPriorityTargetKind;
  slug: string;
  canonicalPath: string;
  rationale: string;
};

export const seoMonitoring = {
  baselineDate: "2026-07-18",
  reviewWindowDays: 28,
  targets: [
    {
      id: "sea-view-balcony-studio",
      kind: "apartment",
      slug: "sea-view-balcony-studio",
      canonicalPath: "/en/apartments/sea-view-balcony-studio",
      rationale: "Primary direct-booking page for couples and sea-view intent.",
    },
    {
      id: "beachside-family-apartment",
      kind: "apartment",
      slug: "beachside-family-apartment",
      canonicalPath: "/en/apartments/beachside-family-apartment",
      rationale: "Primary direct-booking page for family, terrace and parking intent.",
    },
    {
      id: "panoramic-sea-view-studio",
      kind: "apartment",
      slug: "panoramic-sea-view-studio",
      canonicalPath: "/en/apartments/panoramic-sea-view-studio",
      rationale: "Primary direct-booking page for panoramic sea-view intent.",
    },
    {
      id: "lemon-festival-stay",
      kind: "stay",
      slug: "lemon-festival-menton",
      canonicalPath: "/en/stay/lemon-festival-menton",
      rationale: "High-intent stay page for Fete du Citron planning.",
    },
    {
      id: "monaco-grand-prix-stay",
      kind: "stay",
      slug: "monaco-grand-prix-from-menton",
      canonicalPath: "/en/stay/monaco-grand-prix-from-menton",
      rationale: "High-value commercial page for Monaco Grand Prix travel intent.",
    },
    {
      id: "fete-du-citron-2027",
      kind: "event",
      slug: "menton-lemon-festival",
      canonicalPath: "/en/events/fete-du-citron-2027",
      rationale: "Priority annual event occurrence with an honest pending-date status.",
    },
    {
      id: "monaco-grand-prix-2027",
      kind: "event",
      slug: "monaco-grand-prix",
      canonicalPath: "/en/events/monaco-grand-prix-2027",
      rationale: "Confirmed high-demand annual event occurrence.",
    },
    {
      id: "best-ice-cream-menton",
      kind: "guide",
      slug: "best-ice-cream-menton",
      canonicalPath: "/en/guide/best-ice-cream-menton",
      rationale: "Existing guide with proven summer and lemon-gelato search demand.",
    },
    {
      id: "italian-riviera-day-trip-from-menton",
      kind: "guide",
      slug: "italian-riviera-day-trip-from-menton",
      canonicalPath: "/en/guide/italian-riviera-day-trip-from-menton",
      rationale: "Evergreen train day-trip intent with strong internal booking context.",
    },
    {
      id: "supermarkets-in-menton",
      kind: "guide",
      slug: "supermarkets-in-menton",
      canonicalPath: "/en/guide/supermarkets-in-menton",
      rationale: "Practical-stay guide with summer and apartment-use intent.",
    },
  ] satisfies SeoPriorityTarget[],
} as const;
