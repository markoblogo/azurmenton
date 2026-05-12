import type { Locale } from "@/i18n/locales";

export const siteConfig = {
  name: "Azur Menton",
  siteName: "Azur Menton",
  domain: "azurmenton.com",
  url: "https://azurmenton.com",
  siteUrl: "https://azurmenton.com",
  defaultTitle: "Beachfront Apartments in Menton | Azur Menton",
  titleTemplate: "%s | Azur Menton",
  description:
    "Family-run beachfront and beachside apartments in central Menton, France. Sea-view studios, a spacious terrace apartment, and direct booking requests close to the beach and old town.",
  defaultDescription:
    "Family-run beachfront and beachside apartments in central Menton, France. Sea-view studios, a spacious terrace apartment, and direct booking requests close to the beach and old town.",
  locales: ["en", "fr", "it", "uk"] as Locale[],
  defaultLocale: "en" as Locale,
  email: "hello@azurmenton.com",
  logoPath: "/images/brand/azurmenton.png",
  iconPath: "/images/brand/az.png",
  defaultOgImage: "/images/apartments/panoramic-sea-view-studio/01-balcony-breakfast-sea-view.jpeg",
  address: {
    locality: "Menton",
    region: "Provence-Alpes-Cote d'Azur",
    country: "FR",
  },
};
