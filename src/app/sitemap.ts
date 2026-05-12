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
    lastModified: new Date("2026-05-12"),
    changeFrequency: changeFrequencyForRoute(route),
    priority: priorityForRoute(route),
  }));
}

function changeFrequencyForRoute(route: string): MetadataRoute.Sitemap[number]["changeFrequency"] {
  if (/^\/[a-z]{2}$/.test(route)) {
    return "weekly";
  }

  if (route.includes("/apartments")) {
    return "weekly";
  }

  if (route.includes("/legal") || route.includes("/privacy") || route.includes("/cookies") || route.includes("/booking-terms")) {
    return "yearly";
  }

  return "monthly";
}

function priorityForRoute(route: string) {
  if (/^\/[a-z]{2}$/.test(route)) {
    return route === `/${siteConfig.defaultLocale}` ? 1 : 0.9;
  }

  if (route.includes("/apartments")) {
    return 0.9;
  }

  if (route.includes("/guide") || route.includes("/events")) {
    return 0.7;
  }

  if (route.includes("/legal") || route.includes("/privacy") || route.includes("/cookies") || route.includes("/booking-terms")) {
    return 0.3;
  }

  return 0.6;
}
