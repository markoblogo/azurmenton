import type { Locale } from "@/i18n/locales";

export const homeCopy: Record<
  Locale,
  {
    title: string;
    intro: string;
    proof: string[];
    primaryCta: string;
    secondaryCta: string;
    seoTitle: string;
    seoDescription: string;
  }
> = {
  en: {
    title: "Beachfront apartments in central Menton",
    intro:
      "Family-run seaside apartments just steps from the beach, old town, cafes and the Mediterranean promenade. Choose a sea-view studio with balcony or a spacious beachside apartment with terrace and parking.",
    proof: ["Beachfront or beachside", "Central Menton", "Manual request-to-book"],
    primaryCta: "View apartments",
    secondaryCta: "Check availability",
    seoTitle: "Beachfront Apartments in Menton | Azur Menton",
    seoDescription:
      "Family-run beachfront and beachside apartments in central Menton, close to the beach, old town, cafes and seafront promenade. Request a direct booking with Azur Menton.",
  },
  fr: {
    title: "[FR placeholder] Beachfront apartments in central Menton",
    intro:
      "[FR placeholder] Family-run seaside apartments just steps from the beach, old town, cafes and the Mediterranean promenade. Choose a sea-view studio with balcony or a spacious beachside apartment with terrace and parking.",
    proof: ["[FR placeholder] Beachfront or beachside", "[FR placeholder] Central Menton", "[FR placeholder] Manual request-to-book"],
    primaryCta: "Voir les appartements",
    secondaryCta: "Verifier disponibilite",
    seoTitle: "[FR placeholder] Azur Menton | Beachfront Apartments in Central Menton",
    seoDescription:
      "[FR placeholder] Family-run beachfront and beachside apartments in central Menton, France. Request availability directly; no instant booking or fake calendar.",
  },
  it: {
    title: "[IT placeholder] Beachfront apartments in central Menton",
    intro:
      "[IT placeholder] Family-run seaside apartments just steps from the beach, old town, cafes and the Mediterranean promenade. Choose a sea-view studio with balcony or a spacious beachside apartment with terrace and parking.",
    proof: ["[IT placeholder] Beachfront or beachside", "[IT placeholder] Central Menton", "[IT placeholder] Manual request-to-book"],
    primaryCta: "Vedi appartamenti",
    secondaryCta: "Controlla disponibilita",
    seoTitle: "[IT placeholder] Azur Menton | Beachfront Apartments in Central Menton",
    seoDescription:
      "[IT placeholder] Family-run beachfront and beachside apartments in central Menton, France. Request availability directly; no instant booking or fake calendar.",
  },
  uk: {
    title: "[UK placeholder] Beachfront apartments in central Menton",
    intro:
      "[UK placeholder] Family-run seaside apartments just steps from the beach, old town, cafes and the Mediterranean promenade. Choose a sea-view studio with balcony or a spacious beachside apartment with terrace and parking.",
    proof: ["[UK placeholder] Beachfront or beachside", "[UK placeholder] Central Menton", "[UK placeholder] Manual request-to-book"],
    primaryCta: "View apartments",
    secondaryCta: "Check availability",
    seoTitle: "[UK placeholder] Azur Menton | Beachfront Apartments in Central Menton",
    seoDescription:
      "[UK placeholder] Family-run beachfront and beachside apartments in central Menton, France. Request availability directly; no instant booking or fake calendar.",
  },
};

export const guidePages = [
  {
    slug: "beaches-and-seafront",
    title: "Beaches and seafront walks",
    description:
      "A practical starter guide to Menton's beaches, promenades, and easy coastal walks near the apartments.",
  },
  {
    slug: "old-town-and-markets",
    title: "Old town, markets, and everyday Menton",
    description:
      "Notes for guests who want a relaxed local base: food shopping, old town lanes, and simple day planning.",
  },
  {
    slug: "day-trips",
    title: "Easy day trips",
    description:
      "Ideas for Monaco, Italy, and nearby Riviera stops, to be expanded with verified transport notes.",
  },
];

export const events = [
  {
    title: "Menton seasonal events",
    description:
      "A future editorial page for confirmed seasonal events. Dates will only be added when verified.",
  },
  {
    title: "Nearby Riviera events",
    description:
      "A place for Monaco, Italian Riviera, and Cote d'Azur events that are useful for guests.",
  },
];

export const faqItems = [
  {
    question: "Is this instant booking?",
    answer:
      "No. The website sends a booking request only. Azur Menton confirms availability and the best direct offer manually.",
  },
  {
    question: "Are prices shown on the website?",
    answer:
      "No prices are shown until direct pricing rules are confirmed. Guests can request dates and receive a direct offer.",
  },
  {
    question: "Is there a live availability calendar?",
    answer:
      "No. A real booking engine or channel manager may be connected later, but the current website avoids showing fake availability.",
  },
  {
    question: "Which apartment is best for families?",
    answer:
      "The Beachside Apartment with Terrace & Parking is positioned for families or longer stays, with a full kitchen, terrace, and parking.",
  },
];

export const pageCopy: Record<
  string,
  Record<Locale, { title: string; description: string; note: string; seoTitle?: string; seoDescription?: string }>
> = {
  guide: {
    en: {
      title: "Menton guide",
      description: "Practical travel notes for beach days, food, local walks, and easy Riviera trips.",
      note: "Guide articles are structured now and can be expanded with verified local recommendations.",
      seoTitle: "Menton Guide for Beach Apartment Guests",
      seoDescription: "A practical Menton travel guide for Azur Menton guests, including beaches, local walks, markets, and day trips.",
    },
    fr: {
      title: "[FR placeholder] Menton guide",
      description: "[FR placeholder] Practical travel notes for beach days, food, local walks, and easy Riviera trips.",
      note: "[FR placeholder] Guide articles are structured now and can be expanded with verified local recommendations.",
    },
    it: {
      title: "[IT placeholder] Menton guide",
      description: "[IT placeholder] Practical travel notes for beach days, food, local walks, and easy Riviera trips.",
      note: "[IT placeholder] Guide articles are structured now and can be expanded with verified local recommendations.",
    },
    uk: {
      title: "[UK placeholder] Menton guide",
      description: "[UK placeholder] Practical travel notes for beach days, food, local walks, and easy Riviera trips.",
      note: "[UK placeholder] Guide articles are structured now and can be expanded with verified local recommendations.",
    },
  },
  events: {
    en: {
      title: "Events in Menton & nearby",
      description: "A careful events page prepared for verified Menton and Riviera dates.",
      note: "No dates are listed until confirmed, so this page will not invent or preserve stale event information.",
      seoTitle: "Events in Menton and Nearby Riviera Destinations",
      seoDescription: "Verified event content for Menton and nearby Riviera destinations, prepared for Azur Menton guests.",
    },
    fr: {
      title: "[FR placeholder] Events in Menton & nearby",
      description: "[FR placeholder] A careful events page prepared for verified Menton and Riviera dates.",
      note: "[FR placeholder] No dates are listed until confirmed.",
    },
    it: {
      title: "[IT placeholder] Events in Menton & nearby",
      description: "[IT placeholder] A careful events page prepared for verified Menton and Riviera dates.",
      note: "[IT placeholder] No dates are listed until confirmed.",
    },
    uk: {
      title: "[UK placeholder] Events in Menton & nearby",
      description: "[UK placeholder] A careful events page prepared for verified Menton and Riviera dates.",
      note: "[UK placeholder] No dates are listed until confirmed.",
    },
  },
  faq: {
    en: {
      title: "FAQ",
      description: "Answers about manual booking requests, availability, prices, apartments, and future booking integration.",
      note: "The FAQ is intentionally practical and avoids unconfirmed booking claims.",
      seoTitle: "FAQ | Azur Menton Apartments",
      seoDescription: "Questions about Azur Menton apartments, direct booking requests, check-in, parking, children, amenities and staying by the sea in Menton.",
    },
    fr: {
      title: "[FR placeholder] FAQ",
      description: "[FR placeholder] Answers about manual booking requests, availability, prices, apartments, and future booking integration.",
      note: "[FR placeholder] The FAQ is intentionally practical and avoids unconfirmed booking claims.",
    },
    it: {
      title: "[IT placeholder] FAQ",
      description: "[IT placeholder] Answers about manual booking requests, availability, prices, apartments, and future booking integration.",
      note: "[IT placeholder] The FAQ is intentionally practical and avoids unconfirmed booking claims.",
    },
    uk: {
      title: "[UK placeholder] FAQ",
      description: "[UK placeholder] Answers about manual booking requests, availability, prices, apartments, and future booking integration.",
      note: "[UK placeholder] The FAQ is intentionally practical and avoids unconfirmed booking claims.",
    },
  },
  contact: {
    en: {
      title: "Contact Azur Menton",
      description: "Contact the family behind Azur Menton or send a direct request for your dates.",
      note: "The booking request form is the preferred temporary contact path until the final backend is connected.",
      seoTitle: "Contact Azur Menton | Direct Booking Requests",
      seoDescription: "Contact Azur Menton for direct booking requests, apartment questions and practical information about staying in central Menton.",
    },
    fr: {
      title: "[FR placeholder] Contact Azur Menton",
      description: "[FR placeholder] Contact the family behind Azur Menton or send a direct request for your dates.",
      note: "[FR placeholder] The booking request form is the preferred temporary contact path.",
    },
    it: {
      title: "[IT placeholder] Contact Azur Menton",
      description: "[IT placeholder] Contact the family behind Azur Menton or send a direct request for your dates.",
      note: "[IT placeholder] The booking request form is the preferred temporary contact path.",
    },
    uk: {
      title: "[UK placeholder] Contact Azur Menton",
      description: "[UK placeholder] Contact the family behind Azur Menton or send a direct request for your dates.",
      note: "[UK placeholder] The booking request form is the preferred temporary contact path.",
    },
  },
  privacy: {
    en: {
      title: "Privacy policy",
      description: "Privacy placeholder for the temporary Azur Menton request-to-book website.",
      note: "Replace this placeholder before collecting production enquiries. The final text should match the selected form backend, email handling, hosting, analytics, and retention policy.",
    },
    fr: {
      title: "[FR placeholder] Privacy policy",
      description: "[FR placeholder] Privacy placeholder for the temporary Azur Menton request-to-book website.",
      note: "[FR placeholder] Replace this placeholder before collecting production enquiries.",
    },
    it: {
      title: "[IT placeholder] Privacy policy",
      description: "[IT placeholder] Privacy placeholder for the temporary Azur Menton request-to-book website.",
      note: "[IT placeholder] Replace this placeholder before collecting production enquiries.",
    },
    uk: {
      title: "[UK placeholder] Privacy policy",
      description: "[UK placeholder] Privacy placeholder for the temporary Azur Menton request-to-book website.",
      note: "[UK placeholder] Replace this placeholder before collecting production enquiries.",
    },
  },
  legal: {
    en: {
      title: "Legal notice",
      description: "Legal notice placeholder for Azur Menton.",
      note: "Add verified owner, publisher, hosting, and registration details before production launch.",
    },
    fr: {
      title: "[FR placeholder] Legal notice",
      description: "[FR placeholder] Legal notice placeholder for Azur Menton.",
      note: "[FR placeholder] Add verified legal details before production launch.",
    },
    it: {
      title: "[IT placeholder] Legal notice",
      description: "[IT placeholder] Legal notice placeholder for Azur Menton.",
      note: "[IT placeholder] Add verified legal details before production launch.",
    },
    uk: {
      title: "[UK placeholder] Legal notice",
      description: "[UK placeholder] Legal notice placeholder for Azur Menton.",
      note: "[UK placeholder] Add verified legal details before production launch.",
    },
  },
};
