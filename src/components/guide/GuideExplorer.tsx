"use client";

import Link from "next/link";
import type { Route } from "next";
import { useMemo, useState } from "react";
import type { GuideCategory, GuideDuration } from "@/content/guide";
import { guideBestForOptions, guideCategoryLabels, guideDurationLabels, guideFilterLabels, guideLocationOptions } from "@/content/guide";
import { GuideVisual, type GuideVisualTheme } from "@/components/guide/GuideVisual";
import type { Locale } from "@/i18n/locales";

type GuideCardItem = {
  slug: string;
  title: string;
  excerpt: string;
  category: GuideCategory;
  categoryLabel: string;
  tags: string[];
  bestFor: string[];
  duration?: GuideDuration;
  durationLabel?: string;
  locationTags: string[];
  placeNames: string[];
  featured?: boolean;
  coverImage?: string;
  coverImageAlt?: string;
  visualTheme?: GuideVisualTheme;
  visualStatus?: "real_image" | "project_illustration" | "editorial_placeholder";
};

type GuideExplorerProps = {
  locale: Locale;
  articles: GuideCardItem[];
};

const filters = {
  en: { articles: "Guide articles", searchTitle: "Search the Menton guide", searchText: "Find beaches, food, family ideas, car-free routes, transport notes and local places in one pass.", showMore: "Show more guides", showingRange: "Showing" },
  fr: { articles: "Articles du guide", searchTitle: "Rechercher dans le guide de Menton", searchText: "Trouvez plages, cuisine, idees famille, trajets sans voiture, transport et lieux utiles en une recherche.", showMore: "Afficher plus de guides", showingRange: "Affichage" },
  it: { articles: "Guide", searchTitle: "Cerca nella guida di Mentone", searchText: "Trova spiagge, cibo, idee famiglia, percorsi senza auto, trasporti e luoghi utili in un passaggio.", showMore: "Mostra altre guide", showingRange: "Mostrando" },
  uk: { articles: "Статті гіда", searchTitle: "Пошук у гіді Ментона", searchText: "Знайдіть пляжі, їжу, сімейні ідеї, маршрути без авто, транспорт і корисні місця одним пошуком.", showMore: "Показати більше гідів", showingRange: "Показано" },
};

const PAGE_SIZE = 12;

export function GuideExplorer({ locale, articles }: GuideExplorerProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [bestFor, setBestFor] = useState("");
  const [duration, setDuration] = useState("");
  const [location, setLocation] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const copy = guideFilterLabels;
  const local = filters[locale];

  const activeFilters = [category, bestFor, duration, location, query.trim()].filter(Boolean);

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return articles.filter((article) => {
      const matchesCategory = !category || article.category === category;
      const matchesBestFor = !bestFor || article.bestFor.some((item) => item.toLowerCase() === bestFor.toLowerCase());
      const matchesDuration = !duration || article.duration === duration;
      const matchesLocation = !location || article.locationTags.includes(location);
      const haystack = [
        article.title,
        article.excerpt,
        article.categoryLabel,
        ...article.tags,
        ...article.bestFor,
        ...article.locationTags,
        ...article.placeNames,
      ].join(" ").toLowerCase();
      const matchesQuery = !normalizedQuery || haystack.includes(normalizedQuery);
      return matchesCategory && matchesBestFor && matchesDuration && matchesLocation && matchesQuery;
    });
  }, [articles, bestFor, category, duration, location, query]);

  function resetVisible() {
    setVisibleCount(PAGE_SIZE);
  }

  const visibleArticles = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  function clearFilters() {
    setQuery("");
    setCategory("");
    setBestFor("");
    setDuration("");
    setLocation("");
    resetVisible();
  }

  return (
    <div className="space-y-8">
      <section className="border border-[#173f36] bg-[#173f36] p-4 text-white sm:p-5" aria-label="Guide filters">
        <div className="mb-4 grid gap-2 md:grid-cols-[0.42fr_1fr] md:items-end">
          <div>
            <p className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[#c6a66a]">Guide finder</p>
            <h2 className="mt-2 serif-heading text-3xl leading-none">{local.searchTitle}</h2>
          </div>
          <p className="max-w-3xl text-sm leading-6 text-[#e8dcc9]">{local.searchText}</p>
        </div>
        <div className="grid gap-3 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <label className="block">
            <span className="sr-only">{copy.searchPlaceholder[locale]}</span>
            <input
              className="h-11 w-full border border-[#c6a66a] bg-white px-3 text-sm text-[#173f36] outline-none focus:border-[#c6a66a]"
              value={query}
              onChange={(event) => {
                resetVisible();
                setQuery(event.target.value);
              }}
              placeholder={copy.searchPlaceholder[locale]}
            />
          </label>
          <Select value={category} onChange={(value) => { resetVisible(); setCategory(value); }} label={copy.category[locale]} options={Object.entries(guideCategoryLabels).map(([value, label]) => ({ value, label: label[locale] }))} allLabel={copy.all[locale]} />
          <Select value={bestFor} onChange={(value) => { resetVisible(); setBestFor(value); }} label={copy.bestFor[locale]} options={guideBestForOptions.map((option) => ({ value: option.label[locale], label: option.label[locale] }))} allLabel={copy.all[locale]} />
          <Select value={duration} onChange={(value) => { resetVisible(); setDuration(value); }} label={copy.duration[locale]} options={Object.entries(guideDurationLabels).map(([value, label]) => ({ value, label: label[locale] }))} allLabel={copy.all[locale]} />
          <Select value={location} onChange={(value) => { resetVisible(); setLocation(value); }} label={copy.location[locale]} options={guideLocationOptions.map((option) => ({ value: option.value, label: option.label[locale] }))} allLabel={copy.all[locale]} />
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-[#e8dcc9]">
          <p>{copy.showing[locale]} <span className="font-semibold text-white">{filtered.length}</span> {copy.guides[locale]}</p>
          {activeFilters.length ? (
            <button className="border border-[#c6a66a] px-3 py-2 text-[0.64rem] font-bold uppercase tracking-[0.14em] text-white hover:bg-white/10" type="button" onClick={clearFilters}>
              {copy.clear[locale]}
            </button>
          ) : null}
        </div>
      </section>

      <section aria-labelledby="guide-results">
        <div className="flex items-end justify-between gap-4 border-b border-[#dfd2b8] pb-4">
          <h2 id="guide-results" className="serif-heading text-3xl leading-none text-[#173f36]">{local.articles}</h2>
          {filtered.length ? <p className="text-xs text-[#71665b]">{local.showingRange} {visibleArticles.length} / {filtered.length}</p> : null}
        </div>
        {filtered.length ? (
          <>
            <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {visibleArticles.map((article) => <GuideArticleCard key={article.slug} article={article} locale={locale} />)}
            </div>
            {hasMore ? (
              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  className="inline-flex min-h-11 items-center border border-[#173f36] bg-[#173f36] px-5 py-2.5 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-white hover:bg-[#102f28]"
                  onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
                >
                  {local.showMore}
                </button>
              </div>
            ) : null}
          </>
        ) : (
          <div className="mt-5 border border-[#dfd2b8] bg-[#fffaf0] p-6 text-sm text-[#5c5044]">{copy.empty[locale]}</div>
        )}
      </section>
    </div>
  );
}

function Select({ value, onChange, label, options, allLabel }: { value: string; onChange: (value: string) => void; label: string; options: { value: string; label: string }[]; allLabel: string }) {
  return (
    <label className="block">
      <span className="sr-only">{label}</span>
      <select className="h-11 w-full border border-[#c6a66a] bg-white px-3 text-xs font-semibold uppercase tracking-[0.09em] text-[#173f36] outline-none focus:border-[#c6a66a]" value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="">{label}: {allLabel}</option>
        {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
    </label>
  );
}

function GuideArticleCard({ article, locale, priority = false }: { article: GuideCardItem; locale: Locale; priority?: boolean }) {
  return (
    <Link
      className={`group block h-full cursor-pointer border border-[#dfd2b8] bg-[#fffaf0] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#c6a66a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c6a66a] ${priority ? "md:col-span-1" : ""}`}
      href={`/${locale}/guide/${article.slug}` as Route}
    >
      <article className="h-full">
        <GuideVisual
          image={article.coverImage}
          imageAlt={article.coverImageAlt}
          locale={locale}
          theme={article.visualTheme ?? "sea"}
          label={article.categoryLabel}
          priority={priority}
          className={priority ? "aspect-[4/2.35]" : "aspect-[4/2.05]"}
        />
        <div className="p-5">
          <div className="flex flex-wrap gap-2 text-[0.62rem] font-bold uppercase tracking-[0.12em] text-[#71665b]">
            {article.durationLabel ? <span>{article.durationLabel}</span> : null}
            {article.tags.slice(0, 2).map((tag) => <span key={tag}>/ {tag}</span>)}
          </div>
          <h3 className="mt-3 serif-heading text-2xl leading-[1.05] text-[#173f36] transition-colors group-hover:text-[#0b6f8f]">{article.title}</h3>
          <p className="mt-3 overflow-hidden text-sm leading-6 text-[#5c5044] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]">{article.excerpt}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {article.bestFor.slice(0, 3).map((item) => <span key={item} className="border border-[#dfd2b8] px-2 py-1 text-[0.62rem] text-[#71665b]">{item}</span>)}
          </div>
          <span aria-hidden="true" className="mt-5 inline-flex border border-[#c6a66a] px-3 py-2 text-[0.64rem] font-bold uppercase tracking-[0.14em] text-[#173f36] transition-colors group-hover:bg-[#f3ead7]">
            {guideFilterLabels.read[locale]}
          </span>
        </div>
      </article>
    </Link>
  );
}
