import type { Locale } from "@/i18n/locales";

export const siteConfig = {
  name: "Azur Menton",
  domain: "azurmenton.com",
  url: "https://azurmenton.com",
  description:
    "Family-run beachfront and beachside apartments in central Menton, France, with direct manual request-to-book enquiries.",
  locales: ["en", "fr", "it", "uk"] as Locale[],
  defaultLocale: "en" as Locale,
  email: "hello@azurmenton.com",
  address: {
    locality: "Menton",
    region: "Provence-Alpes-Cote d'Azur",
    country: "FR",
  },
};
