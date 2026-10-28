import type { Locale } from "@/i18n/locales";

const synonyms: Record<Locale, readonly (readonly string[])[]> = {
  en: [["rain", "rainy"], ["pharmacy", "pharmacies"], ["train", "railway"]],
  fr: [["pharmacie", "pharmacies"], ["train", "trains"]],
  it: [["farmacia", "farmacie"], ["treno", "treni"]],
  uk: [["аптека", "аптеки"], ["поїзд", "поїзди"]],
};

const normalize = (value: string) => value.trim().toLocaleLowerCase();

export function isCurrentSearchEvent(endDate: string | undefined, today: string): boolean {
  return Boolean(endDate && /^\d{4}-\d{2}-\d{2}$/.test(endDate) && endDate >= today);
}

export function searchQueryVariants(query: string, locale: Locale): string[] {
  const normalized = normalize(query);
  if (!normalized) return [];
  const group = synonyms[locale].find((terms) => terms.includes(normalized));
  return [normalized, ...(group ?? []).filter((term) => term !== normalized)];
}

export type RankedSearchResult = { url: string; title: string; type: "guide" | "place" | "event"; sourceRank: number; exactQuery: boolean };

export function rankSearchResults(results: readonly RankedSearchResult[], query: string, locale?: Locale): RankedSearchResult[] {
  const words = normalize(query).split(/[^\p{L}\p{N}]+/u).filter(Boolean);
  const variants = locale && words.length === 1 ? searchQueryVariants(query, locale) : [];
  const transportTerms = new Set(["train", "trains", "railway", "treno", "treni", "поїзд", "поїзди"]);
  const score = (result: RankedSearchResult) => {
    const titleWords = new Set(normalize(result.title).split(/[^\p{L}\p{N}]+/u).filter(Boolean));
    const titleMatch = variants.length ? variants.some((word) => titleWords.has(word)) : words.length > 0 && words.every((word) => titleWords.has(word));
    const transportGuide = words.some((word) => transportTerms.has(word)) && result.url.includes("/guide/public-transport-in-menton") ? 6 : 0;
    return (titleMatch ? 4 : 0) + transportGuide + (result.type === "guide" ? 1 : 0) + (result.exactQuery ? 1 : 0) + 1 / (result.sourceRank + 1);
  };
  const unique = new Map<string, RankedSearchResult>();
  for (const result of results) {
    const previous = unique.get(result.url);
    if (!previous || score(result) > score(previous)) unique.set(result.url, result);
  }
  return [...unique.values()].sort((a, b) => score(b) - score(a) || a.url.localeCompare(b.url, "en"));
}
