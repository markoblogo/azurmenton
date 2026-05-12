import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { localeLabels, locales, type Locale } from "@/i18n/locales";
import { navItems, routeLabels } from "@/content/navigation";

export function Navigation({ locale }: { locale: Locale }) {
  const labels = routeLabels[locale];

  return (
    <header className="sticky top-0 z-20 border-b border-[#eadfce] bg-[#fff9f0]/92 backdrop-blur">
      <div className="mx-auto flex min-h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-6 lg:px-8">
        <Link
          href={`/${locale}` as Route}
          className="flex shrink-0 items-center gap-2 text-base font-semibold tracking-[0.08em] text-[#17313a]"
        >
          <Image
            src="/images/brand/azurmenton.png"
            alt="Azur Menton"
            width={748}
            height={437}
            priority
            className="hidden h-10 w-auto sm:block"
          />
          <Image
            src="/images/brand/az.png"
            alt="Azur Menton icon"
            width={372}
            height={366}
            priority
            className="h-9 w-9 sm:hidden"
          />
          <span className="sr-only">Azur Menton</span>
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-5 text-sm font-medium md:flex">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={`/${locale}${item.href}` as Route}
              className="text-[#51646a] transition hover:text-[#0b6f8f]"
            >
              {labels[item.key]}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href={`/${locale}/check-availability` as Route}
            className="hidden rounded-md bg-[#0b6f8f] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#075a75] sm:inline-flex"
          >
            {labels.availability}
          </Link>
          <div className="flex items-center gap-1 text-xs font-medium text-[#6b5f50]">
            {locales.map((item) => (
              <Link
                key={item}
                href={`/${item}` as Route}
                className={item === locale ? "text-[#0b6f8f]" : "hover:text-[#0b6f8f]"}
                aria-label={localeLabels[item]}
              >
                {item.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
