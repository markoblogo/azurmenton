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
  email: "petraetpaul@gmail.com",
  phoneDisplay: "+33 6 24 71 65 65",
  phoneHref: "tel:+33624716565",
  whatsappDisplay: "+33 6 24 71 65 65",
  whatsappHref: "https://wa.me/33624716565",
  legalEntity: {
    name: "SCI Petra et Paul",
    legalForm: "Societe civile immobiliere",
    registration: "983 423 898 R.C.S. Nice",
    euid: "FR0605.983423898",
    registeredOffice: "13 Avenue Porte de France, 06500 Menton, France",
    publicationDirector: "Ruslan Volokh",
  },
  logoPath: "/icon.png",
  iconPath: "/icon.png",
  defaultOgImage: "/images/apartments/panoramic-sea-view-studio/01-balcony-breakfast-sea-view.jpg",
  address: {
    locality: "Menton",
    region: "Provence-Alpes-Cote d'Azur",
    country: "FR",
  },
};
