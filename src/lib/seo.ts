import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { locales, type Locale } from "@/i18n/locales";

type MetadataInput = {
  locale: Locale;
  path?: string;
  title?: string;
  description?: string;
};

function normalizePath(path = "") {
  return path === "/" ? "" : path.replace(/^\/+|\/+$/g, "");
}

export function localizedPath(locale: Locale, path = "") {
  const cleanPath = normalizePath(path);
  return cleanPath ? `/${locale}/${cleanPath}` : `/${locale}`;
}

export function absoluteUrl(path = "") {
  return new URL(path, siteConfig.url).toString();
}

export function languageAlternates(path = "") {
  return Object.fromEntries(
    locales.map((locale) => [locale, absoluteUrl(localizedPath(locale, path))]),
  );
}

export function createMetadata({
  locale,
  path,
  title,
  description = siteConfig.description,
}: MetadataInput): Metadata {
  const currentPath = localizedPath(locale, path);

  return {
    metadataBase: new URL(siteConfig.url),
    title: title ? `${title} | ${siteConfig.name}` : siteConfig.name,
    description,
    alternates: {
      canonical: absoluteUrl(currentPath),
      languages: {
        ...languageAlternates(path),
        "x-default": absoluteUrl(localizedPath(siteConfig.defaultLocale, path)),
      },
    },
    openGraph: {
      title: title ?? siteConfig.name,
      description,
      url: absoluteUrl(currentPath),
      siteName: siteConfig.name,
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: title ?? siteConfig.name,
      description,
    },
  };
}
