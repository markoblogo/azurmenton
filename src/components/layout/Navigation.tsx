import Link from "next/link";
import type { Route } from "next";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import type { Locale } from "@/i18n/locales";
import { navItems, routeLabels } from "@/content/navigation";

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
        <nav aria-label="Primary" className="hidden items-center gap-4 text-[0.7rem] font-bold uppercase tracking-[0.16em] xl:flex">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={`/${locale}${item.href}` as Route}
              className="text-[#5f675f] transition hover:text-[#0a6678]"
            >
              {labels[item.key]}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link href={`/${locale}/favourites` as Route} title={favouritesLabel} aria-label={favouritesLabel} className="hidden h-11 w-11 shrink-0 items-center justify-center text-2xl text-[#173f36] xl:inline-flex">♡</Link>
          <Link href={`/${locale}/search` as Route} className="hidden text-sm font-semibold text-[#173f36] underline-offset-4 hover:underline xl:inline">{searchLabel}</Link>
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
        aria-label="Mobile primary"
        className="mx-auto flex w-full max-w-6xl gap-5 overflow-x-auto border-t border-[#eadfce] px-5 py-3 text-[0.66rem] font-bold uppercase tracking-[0.14em] text-[#5f675f] sm:px-6 xl:hidden lg:px-8"
      >
        <Link href={`/${locale}/search` as Route} className="shrink-0 hover:text-[#0a6678]">{searchLabel}</Link>
        <Link href={`/${locale}/my-trip` as Route} className="shrink-0 hover:text-[#0a6678]">{tripLabel}</Link>
        <Link href={`/${locale}/favourites` as Route} className="shrink-0 hover:text-[#0a6678]">{favouritesLabel}</Link>
        {navItems.slice(0, 5).map((item) => (
          <Link
            key={item.key}
            href={`/${locale}${item.href}` as Route}
            className="shrink-0 hover:text-[#0a6678]"
          >
            {labels[item.key]}
          </Link>
        ))}
      </nav>
    </header>
  );
}
