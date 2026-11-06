import type { GuideArticle } from "@/content/guide";
import type { Place } from "@/content/places";
import type { Locale } from "@/i18n/locales";
import { selectPlaceGuide } from "@/lib/search-place-targets";
export type RuntimeSearchRow = { url: string; title: string; type: "guide" | "place"; text: string; placeId?: string };
export function runtimeSearchRows(articles: GuideArticle[], places: Place[], slugs: string[], locale: Locale): RuntimeSearchRow[] {
  const rows: RuntimeSearchRow[] = [];
  const knownPlaces = new Set(places.map(p => p.id));
  for (const a of articles.filter(a => slugs.includes(a.slug))) {
    rows.push({ url: `/${locale}/guide/${a.slug}`, title: a.title[locale], type: "guide", text: [a.title[locale], a.excerpt[locale], ...a.sections.flatMap(s => [s.heading[locale], ...s.body.map(p => p[locale]), ...(s.bullets ?? []).map(p => p[locale])])].join(" ") });
  }
  // Canonical targets can change even when the remaining card belongs to an unchanged guide.
  for (const p of slugs.length ? places : []) {
    const target = selectPlaceGuide(p, articles, knownPlaces);
    if (!target) continue;
    rows.push({ url: `/${locale}/guide/${target.slug}#place-${p.id}`, placeId: p.id, title: p.name, type: "place", text: [p.name, p.shortNote[locale], p.area?.[locale], p.address, ...(p.bestFor ?? []).map(item => item[locale])].filter(Boolean).join(" ") });
  }
  return rows;
}
export function isRuntimeSearchReplacement(url: string, rows: RuntimeSearchRow[], slugs: string[], locale: Locale) {
  const path = new URL(url, "https://azurmenton.com");
  const placeId = path.hash.startsWith("#place-") ? path.hash.slice(7) : undefined;
  return rows.some(row => row.url === path.pathname + path.hash || (placeId && row.placeId === placeId)) || slugs.some(slug => path.pathname === `/${locale}/guide/${slug}`);
}
export function matchRuntimeSearch(rows: RuntimeSearchRow[], terms: string[]) {
  const normalize = (s: string) => s.toLocaleLowerCase().normalize("NFKD").replace(/\p{M}/gu, "");
  return rows.filter(row => terms.some(term => normalize(term).split(/[^\p{L}\p{N}]+/u).filter(Boolean).every(word => normalize(row.text).includes(word))));
}
