#!/usr/bin/env node

import * as cheerio from "cheerio";

const baseUrl = process.env.SEO_VALIDATE_BASE_URL || "https://azurmenton.com";
const locales = ["en", "fr", "it", "uk"];
const apartmentSlugs = [
  "sea-view-balcony-studio",
  "beachside-family-apartment",
  "panoramic-sea-view-studio",
];

const localizedPages = locales.flatMap((locale) => [
  {
    path: `/${locale}`,
    localizedPath: "",
    requiredJsonLdTypes: locale === "en" ? ["LodgingBusiness", "WebSite"] : ["WebSite"],
  },
  {
    path: `/${locale}/apartments`,
    localizedPath: "apartments",
    requiredJsonLdTypes: ["CollectionPage", "ItemList"],
  },
  {
    path: `/${locale}/check-availability`,
    localizedPath: "check-availability",
    requiredJsonLdTypes: ["ContactPage"],
  },
  {
    path: `/${locale}/faq`,
    localizedPath: "faq",
    requiredJsonLdTypes: ["FAQPage", "BreadcrumbList"],
  },
  ...apartmentSlugs.map((slug) => ({
    path: `/${locale}/apartments/${slug}`,
    localizedPath: `apartments/${slug}`,
    requiredJsonLdTypes: ["VacationRental", "BreadcrumbList"],
    validateJsonLd: validateVacationRental,
  })),
]);

const pages = [
  ...localizedPages,
  {
    path: "/en/events/nice-carnival",
    localizedPath: "events/nice-carnival",
    requiredJsonLdTypes: ["Article", "BreadcrumbList", "Event"],
    validateJsonLd: validateConfirmedEvent,
  },
  {
    path: "/en/events/menton-lemon-festival",
    localizedPath: "events/menton-lemon-festival",
    requiredJsonLdTypes: ["Article", "BreadcrumbList"],
    validateJsonLd: validatePendingEvent,
  },
];

function jsonLdType(value) {
  const type = value?.["@type"];
  return Array.isArray(type) ? type : [type].filter(Boolean);
}

async function validatePage(page) {
  const url = new URL(page.path, baseUrl).toString();
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`${url} returned ${response.status}`);
  }

  const html = await response.text();
  const $ = cheerio.load(html);
  validateCanonicalAndHreflang($, page, url);

  const jsonLd = $('script[type="application/ld+json"]')
    .toArray()
    .map((element) => JSON.parse($(element).text()));
  const foundTypes = new Set(jsonLd.flatMap(jsonLdType));

  for (const type of page.requiredJsonLdTypes) {
    if (!foundTypes.has(type)) {
      throw new Error(`${url} missing JSON-LD type ${type}`);
    }
  }

  page.validateJsonLd?.(jsonLd, page.path);

  console.log(`ok ${page.path}: ${[...foundTypes].join(", ")}`);
}

function localizedPath(locale, path = "") {
  return path ? `/${locale}/${path}` : `/${locale}`;
}

function absoluteUrl(path) {
  return new URL(path, baseUrl).toString();
}

function validateCanonicalAndHreflang($, page, url) {
  const canonical = $('link[rel="canonical"]').attr("href");
  const expectedCanonical = absoluteUrl(page.path);

  if (canonical !== expectedCanonical) {
    throw new Error(`${url} expected canonical ${expectedCanonical}, found ${canonical || "none"}`);
  }

  const alternates = new Map(
    $('link[rel="alternate"][hreflang]')
      .toArray()
      .map((element) => [$(element).attr("hreflang"), $(element).attr("href")]),
  );
  const localized = page.localizedPath;
  const expectedAlternates = new Map([
    ...locales.map((locale) => [locale, absoluteUrl(localizedPath(locale, localized))]),
    ["x-default", absoluteUrl(localizedPath("en", localized))],
  ]);

  for (const [hreflang, href] of expectedAlternates) {
    if (alternates.get(hreflang) !== href) {
      throw new Error(`${url} expected hreflang ${hreflang}=${href}, found ${alternates.get(hreflang) || "none"}`);
    }
  }
}

function findJsonLd(jsonLd, type) {
  return jsonLd.find((item) => jsonLdType(item).includes(type));
}

function validateVacationRental(jsonLd, path) {
  const rental = findJsonLd(jsonLd, "VacationRental");
  if (!rental) return;

  const containsPlace = rental.containsPlace;
  const checks = [
    ["identifier", rental.identifier],
    ["name", rental.name],
    ["description", rental.description],
    ["image", Array.isArray(rental.image) && rental.image.every((image) => typeof image === "string" && image.startsWith(baseUrl))],
    ["url", rental.url],
    ["address.addressLocality", rental.address?.addressLocality],
    ["address.addressCountry", rental.address?.addressCountry],
    ["geo.latitude", rental.geo?.latitude],
    ["geo.longitude", rental.geo?.longitude],
    ["containsPlace Accommodation", containsPlace?.["@type"] === "Accommodation"],
    ["containsPlace.occupancy", containsPlace?.occupancy?.value],
    ["containsPlace.floorSize", containsPlace?.floorSize?.value],
    ["containsPlace.amenityFeature", Array.isArray(containsPlace?.amenityFeature) && containsPlace.amenityFeature.length > 0],
  ];

  for (const [label, value] of checks) {
    if (!value) throw new Error(`${path} VacationRental missing ${label}`);
  }

  for (const forbidden of ["aggregateRating", "review", "price", "priceRange", "availability", "offers"]) {
    if (rental[forbidden] !== undefined) throw new Error(`${path} VacationRental should not include ${forbidden}`);
  }
}

function validateConfirmedEvent(jsonLd, path) {
  const event = findJsonLd(jsonLd, "Event");
  if (!event?.startDate) throw new Error(`${path} confirmed Event JSON-LD missing startDate`);
  if (!event?.organizer?.url) throw new Error(`${path} confirmed Event JSON-LD missing organizer.url`);
  if (event.offers && !event.offers.url) throw new Error(`${path} Event JSON-LD offers missing url`);
  if (event.performer && !event.performer.name) throw new Error(`${path} Event JSON-LD performer missing name`);
}

function validatePendingEvent(jsonLd, path) {
  const event = findJsonLd(jsonLd, "Event");
  if (event) throw new Error(`${path} pending event page outputs Event JSON-LD`);
}

for (const page of pages) {
  await validatePage(page);
}
