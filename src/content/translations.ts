import type { Locale } from "@/i18n/locales";

type CommonTranslations = {
  checkAvailability: string;
  viewApartment: string;
  compareApartments: string;
  requestOnly: string;
  noInstantBooking: string;
  guests: string;
  bedrooms: string;
  beds: string;
  bathrooms: string;
  size: string;
  bestFor: string;
  keyFeatures: string;
  amenities: string;
  location: string;
};

export const t: Record<Locale, CommonTranslations> = {
  en: {
    checkAvailability: "Check availability",
    viewApartment: "View apartment",
    compareApartments: "Compare apartments",
    requestOnly: "Request to book",
    noInstantBooking: "No instant confirmation. We confirm availability and the best direct offer manually.",
    guests: "Guests",
    bedrooms: "Bedrooms",
    beds: "Beds",
    bathrooms: "Bathrooms",
    size: "Size",
    bestFor: "Best for",
    keyFeatures: "Key features",
    amenities: "Amenities",
    location: "Location",
  },
  fr: {
    checkAvailability: "Verifier disponibilite",
    viewApartment: "Voir l'appartement",
    compareApartments: "Comparer les appartements",
    requestOnly: "Demande de reservation",
    noInstantBooking: "Pas de confirmation instantanee. Nous confirmons manuellement la disponibilite et la meilleure offre directe.",
    guests: "Voyageurs",
    bedrooms: "Chambres",
    beds: "Lits",
    bathrooms: "Salles de bain",
    size: "Surface",
    bestFor: "Ideal pour",
    keyFeatures: "Points forts",
    amenities: "Equipements",
    location: "Localisation",
  },
  it: {
    checkAvailability: "Controlla disponibilita",
    viewApartment: "Vedi appartamento",
    compareApartments: "Confronta appartamenti",
    requestOnly: "Richiesta di prenotazione",
    noInstantBooking: "Nessuna conferma immediata. Confermiamo manualmente disponibilita e migliore offerta diretta.",
    guests: "Ospiti",
    bedrooms: "Camere",
    beds: "Letti",
    bathrooms: "Bagni",
    size: "Superficie",
    bestFor: "Ideale per",
    keyFeatures: "Punti forti",
    amenities: "Servizi",
    location: "Posizione",
  },
  uk: {
    checkAvailability: "Check availability",
    viewApartment: "View apartment",
    compareApartments: "Compare apartments",
    requestOnly: "Request to book",
    noInstantBooking: "No instant confirmation. We confirm availability and the best direct offer manually.",
    guests: "Guests",
    bedrooms: "Bedrooms",
    beds: "Beds",
    bathrooms: "Bathrooms",
    size: "Size",
    bestFor: "Best for",
    keyFeatures: "Key features",
    amenities: "Amenities",
    location: "Location",
  },
};
