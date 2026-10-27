export type HomeSeason = "spring" | "summer" | "autumn" | "winter";

export function homeSeason(date: Date): HomeSeason {
  const month = Number(new Intl.DateTimeFormat("en", { timeZone: "Europe/Paris", month: "numeric" }).format(date));
  if (month >= 3 && month <= 5) return "spring";
  if (month >= 6 && month <= 8) return "summer";
  if (month >= 9 && month <= 11) return "autumn";
  return "winter";
}

export const homeSeasonGuideSlugs: Record<HomeSeason, readonly string[]> = {
  spring: ["best-walks-and-hikes-around-menton", "day-trips-from-menton", "menton-old-town", "best-markets-near-menton-market-days-in-france-and-italy"],
  summer: ["stay-cool-in-menton-summer", "best-beaches-in-menton", "menton-old-town", "day-trips-from-menton"],
  autumn: ["menton-in-autumn", "best-walks-and-hikes-around-menton", "menton-old-town", "day-trips-from-menton"],
  winter: ["museums-in-menton-nice-monaco", "menton-with-kids-family-guide", "menton-old-town", "day-trips-from-menton"],
};
