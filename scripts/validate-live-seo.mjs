#!/usr/bin/env node

import * as cheerio from "cheerio";

const baseUrl = process.env.SEO_VALIDATE_BASE_URL || "https://azurmenton.com";
const pages = [
  {
    path: "/en",
    requiredJsonLdTypes: ["LodgingBusiness", "WebSite"],
  },
  {
    path: "/en/apartments",
    requiredJsonLdTypes: ["CollectionPage", "ItemList"],
  },
  {
    path: "/en/apartments/sea-view-balcony-studio",
    requiredJsonLdTypes: ["VacationRental", "BreadcrumbList"],
    validateJsonLd: validateVacationRental,
  },
  {
    path: "/en/events/nice-carnival",
    requiredJsonLdTypes: ["Article", "BreadcrumbList"],
    validateJsonLd: validateConfirmedEvent,
  },
  {
    path: "/en/events/menton-lemon-festival",
    requiredJsonLdTypes: ["Article", "BreadcrumbList"],
    validateJsonLd: validatePendingEvent,
  },
  {
    path: "/en/check-availability",
    requiredJsonLdTypes: ["ContactPage"],
  },
  {
    path: "/en/faq",
    requiredJsonLdTypes: ["FAQPage", "BreadcrumbList"],
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
  const canonical = $('link[rel="canonical"]').attr("href");
  const alternateLocales = $('link[rel="alternate"][hreflang]').length;
  const jsonLd = $('script[type="application/ld+json"]')
    .toArray()
    .map((element) => JSON.parse($(element).text()));
  const foundTypes = new Set(jsonLd.flatMap(jsonLdType));

  if (!canonical?.startsWith(baseUrl)) {
    throw new Error(`${url} missing canonical for ${baseUrl}`);
  }

  if (alternateLocales < 5) {
    throw new Error(`${url} expected hreflang alternates including x-default`);
  }

  for (const type of page.requiredJsonLdTypes) {
    if (!foundTypes.has(type)) {
      throw new Error(`${url} missing JSON-LD type ${type}`);
    }
  }

  page.validateJsonLd?.(jsonLd, page.path);

  console.log(`ok ${page.path}: ${[...foundTypes].join(", ")}`);
}

function warn(path, message) {
  console.warn(`warn ${path}: ${message}`);
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
    ["image", Array.isArray(rental.image) && rental.image.length > 0],
    ["url", rental.url],
    ["address", rental.address],
    ["geo", rental.geo],
    ["containsPlace Accommodation", containsPlace?.["@type"] === "Accommodation"],
    ["containsPlace.occupancy", containsPlace?.occupancy?.value],
    ["containsPlace.floorSize", containsPlace?.floorSize?.value],
    ["containsPlace.amenityFeature", Array.isArray(containsPlace?.amenityFeature) && containsPlace.amenityFeature.length > 0],
  ];

  for (const [label, value] of checks) {
    if (!value) warn(path, `VacationRental missing ${label}`);
  }

  for (const forbidden of ["aggregateRating", "review", "price", "priceRange", "availability"]) {
    if (rental[forbidden] !== undefined) warn(path, `VacationRental should not include ${forbidden}`);
  }
}

function validateConfirmedEvent(jsonLd, path) {
  const event = findJsonLd(jsonLd, "Event");
  if (event && !event.startDate) warn(path, "confirmed Event JSON-LD missing startDate");
}

function validatePendingEvent(jsonLd, path) {
  const event = findJsonLd(jsonLd, "Event");
  if (event) warn(path, "pending event page outputs Event JSON-LD");
}

for (const page of pages) {
  await validatePage(page);
}
