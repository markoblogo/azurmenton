import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { apartments } from "@/content/apartments";
import { eventPages } from "@/content/events";
import { guidePages } from "@/content/guide";
import { locales } from "@/i18n/locales";
import { absoluteUrl, localizedPath } from "@/lib/seo";

const staticRoutes = [
  "",
  "apartments",
  "check-availability",
  "guide",
  "events",
  "faq",
  "contact",
  "privacy",
  "legal",
  "cookies",
  "booking-terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = locales.flatMap((locale) => [
    ...staticRoutes.map((path) => localizedPath(locale, path)),
    ...apartments.map((apartment) => localizedPath(locale, `apartments/${apartment.slug}`)),
    ...guidePages[locale].map((page) => localizedPath(locale, `guide/${page.slug}`)),
    ...eventPages[locale].map((event) => localizedPath(locale, `events/${event.slug}`)),
  ]);

  return routes.map((route) => ({
    url: absoluteUrl(route),
    lastModified: new Date(),
    changeFrequency: route.includes("apartments") ? "monthly" : "weekly",
    priority: route === `/${siteConfig.defaultLocale}` ? 1 : 0.7,
  }));
}
