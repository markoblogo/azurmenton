import type { Locale } from "@/i18n/locales";

export type Apartment = {
  slug: string;
  title: Record<Locale, string>;
  summary: Record<Locale, string>;
  imageLabel: string;
};

const placeholderText = {
  en: "Details, amenities, capacity, photos, and house notes will be added from the confirmed apartment source material.",
  fr: "Les details, equipements, capacite, photos et notes d'accueil seront ajoutes depuis les sources confirmees.",
  it: "Dettagli, servizi, capienza, foto e note della casa saranno aggiunti dai materiali confermati.",
  uk: "Details, amenities, capacity, photos, and house notes will be added from the confirmed apartment source material.",
};

export const apartments: Apartment[] = [
  {
    slug: "central-apartment-one",
    title: {
      en: "Central Menton apartment 1",
      fr: "Appartement central Menton 1",
      it: "Appartamento centrale Mentone 1",
      uk: "Central Menton apartment 1",
    },
    summary: placeholderText,
    imageLabel: "Placeholder apartment image 1",
  },
  {
    slug: "central-apartment-two",
    title: {
      en: "Central Menton apartment 2",
      fr: "Appartement central Menton 2",
      it: "Appartamento centrale Mentone 2",
      uk: "Central Menton apartment 2",
    },
    summary: placeholderText,
    imageLabel: "Placeholder apartment image 2",
  },
  {
    slug: "central-apartment-three",
    title: {
      en: "Central Menton apartment 3",
      fr: "Appartement central Menton 3",
      it: "Appartamento centrale Mentone 3",
      uk: "Central Menton apartment 3",
    },
    summary: placeholderText,
    imageLabel: "Placeholder apartment image 3",
  },
];

export function getApartment(slug: string) {
  return apartments.find((apartment) => apartment.slug === slug);
}
