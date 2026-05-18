import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { apartments } from "@/content/apartments";
import { guideArticles, guidePages } from "@/content/guide";
import { eventDetailSlugs, getRivieraEvent } from "@/content/riviera-events";
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
  const entries = locales.flatMap((locale) => [
    ...staticRoutes.map((path) => ({ route: localizedPath(locale, path), path, image: imageForStaticRoute(path) })),
    ...apartments.map((apartment) => ({
      route: localizedPath(locale, `apartments/${apartment.slug}`),
      path: `apartments/${apartment.slug}`,
      image: apartment.heroImage,
    })),
    ...guidePages[locale].map((page) => ({
      route: localizedPath(locale, `guide/${page.slug}`),
      path: `guide/${page.slug}`,
      image: guideArticles.find((article) => article.slug === page.slug)?.coverImage,
    })),
    ...eventDetailSlugs.map((slug) => ({
      route: localizedPath(locale, `events/${slug}`),
      path: `events/${slug}`,
      image: getRivieraEvent(slug)?.media?.image,
    })),
  ]);

  return entries.map(({ route, path, image }) => ({
    url: absoluteUrl(route),
    lastModified: new Date("2026-05-18"),
    changeFrequency: changeFrequencyForRoute(route),
    priority: priorityForRoute(route),
    alternates: {
      languages: {
        ...Object.fromEntries(locales.map((locale) => [locale, absoluteUrl(localizedPath(locale, path))])),
        "x-default": absoluteUrl(localizedPath(siteConfig.defaultLocale, path)),
      },
    },
    images: image ? [absoluteUrl(image)] : undefined,
  }));
}

function imageForStaticRoute(path: string) {
  if (path === "" || path === "apartments" || path === "check-availability") {
    return siteConfig.defaultOgImage;
  }

  if (path === "guide") {
    return "/images/guide/menton-without-a-car.jpg";
  }

  if (path === "events") {
    return "/images/events/menton-lemon-festival.png";
  }

  return undefined;
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
