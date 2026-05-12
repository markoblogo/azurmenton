import type { Locale } from "@/i18n/locales";

export const navItems = [
  { key: "apartments", href: "/apartments" },
  { key: "guide", href: "/guide" },
  { key: "events", href: "/events" },
  { key: "faq", href: "/faq" },
  { key: "contact", href: "/contact" },
] as const;

export const routeLabels: Record<Locale, Record<string, string>> = {
  en: {
    home: "Home",
    apartments: "Apartments",
    availability: "Check availability",
    guide: "Menton guide",
    events: "Events",
    faq: "FAQ",
    contact: "Contact",
    privacy: "Privacy",
    legal: "Legal",
  },
  fr: {
    home: "Accueil",
    apartments: "Appartements",
    availability: "Verifier disponibilite",
    guide: "Guide de Menton",
    events: "Evenements",
    faq: "FAQ",
    contact: "Contact",
    privacy: "Confidentialite",
    legal: "Mentions legales",
  },
  it: {
    home: "Home",
    apartments: "Appartamenti",
    availability: "Controlla disponibilita",
    guide: "Guida di Mentone",
    events: "Eventi",
    faq: "FAQ",
    contact: "Contatti",
    privacy: "Privacy",
    legal: "Note legali",
  },
  uk: {
    home: "Home",
    apartments: "Apartments",
    availability: "Check availability",
    guide: "Menton guide",
    events: "Events",
    faq: "FAQ",
    contact: "Contact",
    privacy: "Privacy",
    legal: "Legal",
  },
};
