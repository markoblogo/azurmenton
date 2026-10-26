"use client";

import Link from "next/link";
import type { Route } from "next";
import { usePathname } from "next/navigation";
import { localeLabels, locales, type Locale } from "@/i18n/locales";

export function LocaleSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const pathWithoutLocale = locales.includes(segments[0] as Locale)
    ? segments.slice(1).join("/")
    : segments.join("/");

  return (
    <div className="flex items-center gap-1 text-xs font-medium text-[#6b5f50]">
      {locales.map((item) => {
        const href = pathWithoutLocale ? `/${item}/${pathWithoutLocale}` : `/${item}`;

        return (
          <Link
            key={item}
            href={href as Route}
            className={`inline-flex min-h-8 min-w-8 items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0b6f8f] ${item === locale ? "text-[#0b6f8f]" : "hover:text-[#0b6f8f]"}`}
            aria-label={`${item.toUpperCase()} - ${localeLabels[item]}`}
            aria-current={item === locale ? "page" : undefined}
            hrefLang={item}
          >
            {item.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}
