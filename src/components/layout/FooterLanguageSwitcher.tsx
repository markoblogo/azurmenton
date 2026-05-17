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
    <nav aria-label={label} className="mt-3">
      <div className="flex flex-wrap gap-1.5">
        {locales.map((item) => {
          const isActive = item === locale;

          return (
            <Link
              key={item}
              href={localizedHref(pathname, item) as Route}
              aria-current={isActive ? "page" : undefined}
              aria-label={localeLabels[item]}
              className={[
                "inline-flex h-5 w-7 items-center justify-center border text-sm leading-none transition",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4b474]",
                isActive
                  ? "border-[#d4b474] bg-[#fbf7ef]/95"
                  : "border-white/15 bg-transparent opacity-65 hover:border-white/35 hover:opacity-100",
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
