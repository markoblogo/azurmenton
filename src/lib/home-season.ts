export type HomeSeason = "spring" | "summer" | "autumn" | "winter";

export function homeSeason(date: Date): HomeSeason {
  const month = Number(new Intl.DateTimeFormat("en", { timeZone: "Europe/Paris", month: "numeric" }).format(date));
  if (month >= 3 && month <= 5) return "spring";
  if (month >= 6 && month <= 8) return "summer";
  if (month >= 9 && month <= 11) return "autumn";
  return "winter";
}

export const homeSeasonGuideSlugs: Record<HomeSeason, readonly string[]> = {
  spring: ["best-walks-and-hikes-around-menton", "day-trips-from-menton", "menton-old-town", "best-markets-near-menton-market-days-in-france-and-italy", "halles-du-marche-menton", "italian-riviera-day-trip-from-menton"],
  summer: ["stay-cool-in-menton-summer", "best-beaches-in-menton", "menton-old-town", "day-trips-from-menton", "best-breakfast-menton", "italian-riviera-day-trip-from-menton"],
  autumn: ["menton-in-autumn", "best-walks-and-hikes-around-menton", "menton-old-town", "day-trips-from-menton", "best-markets-near-menton-market-days-in-france-and-italy", "best-coffee-menton"],
  winter: ["menton-in-winter", "museums-in-menton-nice-monaco", "menton-with-kids-family-guide", "menton-old-town", "best-coffee-menton", "halles-du-marche-menton"],
};

export function getHomeGuideSlugs(date: Date): string[] {
  const month = Number(new Intl.DateTimeFormat("en", { timeZone: "Europe/Paris", month: "numeric" }).format(date));
  const [anchor, ...options] = homeSeasonGuideSlugs[homeSeason(date)];
  const offset = (month - 1) % options.length;
  return [anchor, ...Array.from({ length: 3 }, (_, index) => options[(offset + index) % options.length])];
}
