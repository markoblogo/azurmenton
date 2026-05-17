"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Route } from "next";
import { localeLabels, locales, type Locale } from "@/i18n/locales";

const flagByLocale: Record<Locale, string> = {
  en: "🇬🇧",
  fr: "🇫🇷",
  it: "🇮🇹",
  uk: "🇺🇦",
};

function localizedHref(pathname: string, nextLocale: Locale) {
  const parts = pathname.split("/");
  const currentLocale = parts[1];

  if (locales.includes(currentLocale as Locale)) {
    parts[1] = nextLocale;
    return parts.join("/") || `/${nextLocale}`;
  }

  return `/${nextLocale}${pathname === "/" ? "" : pathname}`;
}

export function FooterLanguageSwitcher({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname();

  return (
    <nav aria-label={label} className="mt-5">
      <p className="editorial-label text-white/55">{label}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {locales.map((item) => {
          const isActive = item === locale;

          return (
            <Link
              key={item}
              href={localizedHref(pathname, item) as Route}
              aria-current={isActive ? "page" : undefined}
              aria-label={localeLabels[item]}
              className={[
                "inline-flex h-9 w-9 items-center justify-center border text-lg transition",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4b474]",
                isActive
                  ? "border-[#d4b474] bg-[#fbf7ef] shadow-[0_0_0_1px_rgba(212,180,116,0.2)]"
                  : "border-white/15 bg-white/5 opacity-72 hover:border-white/35 hover:bg-white/10 hover:opacity-100",
              ].join(" ")}
            >
              <span aria-hidden="true">{flagByLocale[item]}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
