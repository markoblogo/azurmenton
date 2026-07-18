import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { locales, type Locale } from "@/i18n/locales";

type MetadataInput = {
  locale: Locale;
  path?: string;
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  keywords?: string[];
  index?: boolean;
};

const defaultKeywords: Record<Locale, string[]> = {
  en: [
    "Menton apartments",
    "beachfront apartments Menton",
    "Azur Menton",
    "direct booking Menton",
    "French Riviera apartments",
  ],
  fr: [
    "appartements Menton",
    "appartements bord de mer Menton",
    "Azur Menton",
    "reservation directe Menton",
    "appartements Riviera francaise",
  ],
  it: [
    "appartamenti Mentone",
    "appartamenti fronte mare Mentone",
    "Azur Menton",
    "prenotazione diretta Mentone",
    "appartamenti Costa Azzurra",
  ],
  uk: [
    "апартаменти Ментон",
    "апартаменти біля моря Ментон",
    "Azur Menton",
    "пряме бронювання Ментон",
    "апартаменти Французька Рив'єра",
  ],
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

export function absoluteImageUrl(path = siteConfig.defaultOgImage) {
  return path.startsWith("http") ? path : absoluteUrl(path);
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
  image = siteConfig.defaultOgImage,
  imageAlt = siteConfig.name,
  type = "website",
  keywords,
  index = true,
}: MetadataInput): Metadata {
  const currentPath = localizedPath(locale, path);
  const metadataTitle = title ?? siteConfig.defaultTitle;
  const imageUrl = absoluteImageUrl(image);

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      absolute: metadataTitle.includes(siteConfig.name)
        ? metadataTitle
        : `${metadataTitle} | ${siteConfig.name}`,
    },
    description,
    keywords: keywords ?? defaultKeywords[locale],
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    robots: {
      index,
      follow: true,
      googleBot: {
        index,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    alternates: {
      canonical: absoluteUrl(currentPath),
      languages: {
        ...languageAlternates(path),
        "x-default": absoluteUrl(localizedPath(siteConfig.defaultLocale, path)),
      },
    },
    openGraph: {
      title: metadataTitle,
      description,
      url: absoluteUrl(currentPath),
      siteName: siteConfig.name,
      locale,
      type,
      images: [
        {
          url: imageUrl,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metadataTitle,
      description,
      images: [imageUrl],
    },
  };
}
