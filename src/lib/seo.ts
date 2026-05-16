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
