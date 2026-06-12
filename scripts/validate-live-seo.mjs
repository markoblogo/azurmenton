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

  console.log(`ok ${page.path}: ${[...foundTypes].join(", ")}`);
}

for (const page of pages) {
  await validatePage(page);
}
