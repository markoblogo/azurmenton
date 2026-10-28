"use client";

import { useEffect, useMemo, useState } from "react";
import type { Locale } from "@/i18n/locales";
import { isCurrentSearchEvent, rankSearchResults, searchQueryVariants, type RankedSearchResult } from "@/lib/search-ranking";

type Kind = "guide" | "place" | "event";
type PagefindResult = { url: string; meta: { title: string; type: Kind; endDate?: string } };
type PagefindInstance = { search: (query: string) => Promise<{ results: { data: () => Promise<PagefindResult> }[] }>; destroy: () => Promise<void> };
type PagefindModule = { createInstance: () => PagefindInstance };
const copy = {
  en: { title: "Search Azur Menton", label: "What are you looking for?", placeholder: "Try pharmacy, train or rainy day", all: "All", guide: "Guides", place: "Places", event: "Events", empty: "No results. Try a different word.", loading: "Searching…", error: "Search is unavailable. Please try again later.", count: "results" },
  fr: { title: "Rechercher sur Azur Menton", label: "Que recherchez-vous ?", placeholder: "Pharmacie, train ou pluie", all: "Tout", guide: "Guides", place: "Lieux", event: "Événements", empty: "Aucun résultat. Essayez un autre mot.", loading: "Recherche…", error: "La recherche est indisponible. Réessayez plus tard.", count: "résultats" },
  it: { title: "Cerca su Azur Menton", label: "Cosa stai cercando?", placeholder: "Farmacia, treno o pioggia", all: "Tutti", guide: "Guide", place: "Luoghi", event: "Eventi", empty: "Nessun risultato. Prova un'altra parola.", loading: "Ricerca…", error: "La ricerca non è disponibile. Riprova più tardi.", count: "risultati" },
  uk: { title: "Пошук на Azur Menton", label: "Що ви шукаєте?", placeholder: "Аптека, поїзд або дощ", all: "Усе", guide: "Гіди", place: "Місця", event: "Події", empty: "Нічого не знайдено. Спробуйте інше слово.", loading: "Шукаємо…", error: "Пошук недоступний. Спробуйте пізніше.", count: "результатів" },
};

export function SearchExperience({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Kind | "all">("all");
  const [results, setResults] = useState<RankedSearchResult[]>([]);
  const [state, setState] = useState<"idle" | "loading" | "ready" | "error">("idle");
  useEffect(() => {
    let active = true;
    const variants = searchQueryVariants(query, locale);
    if (!variants.length) return;
    const timer = window.setTimeout(async () => {
      setState("loading");
      let pagefind: PagefindInstance | undefined;
      try {
        const url = "/pagefind/pagefind.js";
        const pagefindModule = await import(/* webpackIgnore: true */ url) as PagefindModule;
        const previousLanguage = document.documentElement.lang;
        document.documentElement.lang = locale;
        try { pagefind = pagefindModule.createInstance(); } finally { document.documentElement.lang = previousLanguage; }
        const search = pagefind;
        const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Paris", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
        const batches: RankedSearchResult[][] = [];
        for (const [variantIndex, term] of variants.entries()) {
          const found = await search.search(term);
          const items = await Promise.all(found.results.slice(0, 100).map(async (result, sourceRank) => ({ item: await result.data(), sourceRank })));
          batches.push(items.filter(({ item }) => item.meta.type !== "event" || isCurrentSearchEvent(item.meta.endDate, today)).map(({ item, sourceRank }) => ({ url: item.url, title: item.meta.title, type: item.meta.type, sourceRank, exactQuery: variantIndex === 0 })));
        }
        if (active) { setResults(rankSearchResults(batches.flat(), query, locale)); setState("ready"); }
      } catch (error) { console.error("Search failed", error); if (active) setState("error"); } finally { if (pagefind) await pagefind.destroy(); }
    }, 200);
    return () => { active = false; window.clearTimeout(timer); };
  }, [query, locale]);
  const shown = useMemo(() => filter === "all" ? results : results.filter((item) => item.type === filter), [results, filter]);
  const hasQuery = Boolean(query.trim());
  return <section className="mx-auto min-h-[65vh] w-full max-w-5xl px-5 py-12 sm:px-6 sm:py-16">
    <h1 className="serif-heading text-4xl text-[#173f36] sm:text-5xl">{t.title}</h1>
    <div className="mt-8 max-w-2xl"><label htmlFor="site-search" className="block text-sm font-semibold text-[#173f36]">{t.label}</label><input id="site-search" type="search" value={query} onChange={(event) => { setQuery(event.target.value); setState(event.target.value.trim() ? "loading" : "idle"); }} placeholder={t.placeholder} autoComplete="off" className="mt-2 min-h-12 w-full border border-[#b9a98f] bg-white px-4 text-base text-[#173f36] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a6678]" /></div>
    <div role="group" aria-label={t.all} className="mt-6 flex flex-wrap gap-2">{(["all", "guide", "place", "event"] as const).map((kind) => <button key={kind} type="button" aria-pressed={filter === kind} onClick={() => setFilter(kind)} className={`min-h-10 border px-4 text-sm font-semibold ${filter === kind ? "border-[#173f36] bg-[#173f36] text-white" : "border-[#c6b89f] bg-white text-[#173f36]"}`}>{t[kind]}</button>)}</div>
    <div aria-live="polite" className="mt-6 text-sm text-[#5c5044]">{hasQuery && state === "loading" ? t.loading : hasQuery && state === "error" ? t.error : hasQuery && state === "ready" ? (shown.length ? `${shown.length} ${t.count}` : t.empty) : null}</div>
    {hasQuery && state === "ready" ? <ul className="mt-4 divide-y divide-[#dfd2b8] border-y border-[#dfd2b8]">{shown.map((item) => <li key={item.url}><a href={item.url} className="block py-4 text-[#173f36] hover:underline focus-visible:outline-2 focus-visible:outline-[#0a6678]"><span className="block text-xs font-semibold uppercase text-[#8a692d]">{t[item.type]}</span><span className="mt-1 block text-lg font-semibold">{item.title}</span></a></li>)}</ul> : null}
  </section>;
}
