import type { Locale } from "@/i18n/locales";

export const siteConfig = {
  name: "Azur Menton",
  domain: "azurmenton.com",
  url: "https://azurmenton.com",
  description:
    "Family-run short-term rentals in central Menton, France, with manual request-to-book enquiries.",
  locales: ["en", "fr", "it", "uk"] as Locale[],
  defaultLocale: "en" as Locale,
  email: "hello@azurmenton.com",
};

export const routeLabels: Record<Locale, Record<string, string>> = {
  en: {
    home: "Home",
    apartments: "Apartments",
    availability: "Request to book",
    guide: "Guide",
    events: "Events",
    faq: "FAQ",
    contact: "Contact",
    privacy: "Privacy",
    legal: "Legal",
  },
  fr: {
    home: "Accueil",
    apartments: "Appartements",
    availability: "Demande de reservation",
    guide: "Guide",
    events: "Evenements",
    faq: "FAQ",
    contact: "Contact",
    privacy: "Confidentialite",
    legal: "Mentions legales",
  },
  it: {
    home: "Home",
    apartments: "Appartamenti",
    availability: "Richiedi prenotazione",
    guide: "Guida",
    events: "Eventi",
    faq: "FAQ",
    contact: "Contatti",
    privacy: "Privacy",
    legal: "Note legali",
  },
  uk: {
    home: "Home",
    apartments: "Apartments",
    availability: "Request to book",
    guide: "Guide",
    events: "Events",
    faq: "FAQ",
    contact: "Contact",
    privacy: "Privacy",
    legal: "Legal",
  },
};
