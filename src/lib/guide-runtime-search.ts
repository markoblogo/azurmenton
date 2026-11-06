import type { GuideArticle } from "@/content/guide";
import type { Place } from "@/content/places";
import type { Locale } from "@/i18n/locales";
import { renderedGuidePlaceIds } from "@/lib/search-place-targets";
export type RuntimeSearchRow = { url: string; title: string; type: "guide" | "place"; text: string };
export function runtimeSearchRows(articles: GuideArticle[], places: Place[], slugs: string[], locale: Locale): RuntimeSearchRow[] {
  const rows: RuntimeSearchRow[] = [];
  const seenPlaces = new Set<string>();
  const knownPlaces = new Set(places.map(p => p.id));
  for (const a of articles.filter(a => slugs.includes(a.slug))) {
    rows.push({ url: `/${locale}/guide/${a.slug}`, title: a.title[locale], type: "guide", text: [a.title[locale], a.excerpt[locale], ...a.sections.flatMap(s => [s.heading[locale], ...s.body.map(p => p[locale])])].join(" ") });
    for (const id of renderedGuidePlaceIds(a, knownPlaces)) {
      const p = places.find(p => p.id === id);
      if (!p || seenPlaces.has(id)) continue;
      seenPlaces.add(id);
      rows.push({ url: `/${locale}/guide/${a.slug}#place-${id}`, title: p.name, type: "place", text: `${p.name} ${p.shortNote[locale]} ${p.address ?? ""}` });
    }
  }
  return rows;
}
export function matchRuntimeSearch(rows: RuntimeSearchRow[], terms: string[]) {
  const normalize = (s: string) => s.toLocaleLowerCase().normalize("NFKD").replace(/\p{M}/gu, "");
  return rows.filter(row => terms.some(term => normalize(term).split(/[^\p{L}\p{N}]+/u).filter(Boolean).every(word => normalize(row.text).includes(word))));
}
