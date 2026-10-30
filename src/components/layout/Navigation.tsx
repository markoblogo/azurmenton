import Link from "next/link";
import type { Route } from "next";
import { Search } from "lucide-react";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import type { Locale } from "@/i18n/locales";
import { primaryNavItems, secondaryNavItems, routeLabels } from "@/content/navigation";

export function Navigation({ locale }: { locale: Locale }) {
  const labels = routeLabels[locale];
  const searchLabel = { en: "Search", fr: "Recherche", it: "Cerca", uk: "Пошук" }[locale];
  const tripLabel = { en: "My trip", fr: "Mon séjour", it: "Il mio viaggio", uk: "Моя поїздка" }[locale];
  const favouritesLabel = { en: "Favourites", fr: "Favoris", it: "Preferiti", uk: "Обране" }[locale];

  return (
    <header className="sticky top-0 z-40 border-b border-[#dfd4c1] bg-[#fbf7ef]/90 backdrop-blur-xl">
      <div className="mx-auto flex min-h-18 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-6 lg:px-8">
        <Link
          href={`/${locale}` as Route}
          className="font-serif-display shrink-0 text-2xl font-semibold tracking-[-0.02em] text-[#173f36] sm:text-3xl"
        >
          Azur Menton
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href={`/${locale}/check-availability` as Route}
            className="hidden border border-[#173f36] bg-[#173f36] px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[#102f28] md:inline-flex"
          >
            {labels.availability}
          </Link>
          <LocaleSwitcher locale={locale} />
        </div>
      </div>
      <nav
        aria-label="Primary"
        className="mx-auto flex w-full max-w-6xl items-center gap-5 overflow-x-auto border-t border-[#eadfce] px-5 py-2 text-[0.75rem] uppercase tracking-normal text-[#5f675f] sm:px-6 lg:px-8"
      >
        <Link href={`/${locale}/search` as Route} aria-label={searchLabel} title={searchLabel} className="shrink-0 py-2 text-[#5f675f] hover:text-[#0a6678] md:hidden">
          <Search size={20} aria-hidden="true" />
        </Link>
        <div data-nav-group="primary" className="flex shrink-0 items-center gap-3 text-[0.75rem] font-bold text-[#173f36] md:gap-5 md:text-[0.8125rem]">
          {primaryNavItems.map(item => (
            <Link key={item.key} href={`/${locale}${item.href}` as Route} className="border-b-2 border-[#209db2] py-2 hover:text-[#0a6678] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0a6678]">
              {labels[item.key]}
            </Link>
          ))}
        </div>
        <div data-nav-group="secondary" className="flex shrink-0 items-center gap-5 border-l border-[#d8cbb5] pl-5 font-medium">
        <Link href={`/${locale}/search` as Route} className="hidden shrink-0 py-2 hover:text-[#0a6678] md:inline-flex">{searchLabel}</Link>
        <Link href={`/${locale}/my-trip` as Route} className="shrink-0 py-2 hover:text-[#0a6678]">{tripLabel}</Link>
        <Link href={`/${locale}/favourites` as Route} className="shrink-0 py-2 hover:text-[#0a6678]">{favouritesLabel}</Link>
        {secondaryNavItems.map((item) => (
          <Link
            key={item.key}
            href={`/${locale}${item.href}` as Route}
            className="shrink-0 py-2 hover:text-[#0a6678]"
          >
            {labels[item.key]}
          </Link>
        ))}
        </div>
      </nav>
    </header>
  );
}
