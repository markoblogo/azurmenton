import type { Locale } from "@/i18n/locales";

export type LocalizedText = Record<Locale, string>;

export type ApartmentImage = {
  src: string;
  alt: LocalizedText;
};

export type Apartment = {
  slug: string;
  name: LocalizedText;
  shortName: LocalizedText;
  tagline: LocalizedText;
  bestFor: LocalizedText;
  maxGuests: number;
  bedrooms: string;
  beds: string;
  bathrooms: string;
  sizeSqm: number;
  keyFeatures: LocalizedText[];
  description: LocalizedText;
  longDescription: LocalizedText;
  amenities: LocalizedText[];
  locationHighlights: LocalizedText[];
  gallery: ApartmentImage[];
  seoTitle: LocalizedText;
  seoDescription: LocalizedText;
  structuredData: {
    accommodationCategory: string;
    numberOfRooms: number;
    occupancy: number;
  };
};

const enFallback = <T extends string>(en: T): LocalizedText => ({
  en,
  fr: `[FR placeholder] ${en}`,
  it: `[IT placeholder] ${en}`,
  uk: `[UK placeholder] ${en}`,
});

export const apartments: Apartment[] = [
  {
    slug: "beachfront-studio-balcony-sea-view",
    name: enFallback("Beachfront Studio with Balcony & Sea View"),
    shortName: enFallback("Sea View Studio"),
    tagline: enFallback("A compact beachfront studio with a balcony for slow mornings by the water."),
    bestFor: enFallback("Couples, or two guests with one additional guest on the sofa bed"),
    maxGuests: 3,
    bedrooms: "Studio",
    beds: "1 double bed + sofa bed",
    bathrooms: "1 bathroom",
    sizeSqm: 25,
    keyFeatures: [
      enFallback("Beachfront position"),
      enFallback("Balcony"),
      enFallback("Sea view"),
      enFallback("Central Menton location"),
    ],
    description: enFallback(
      "A beachfront studio designed for simple, comfortable stays in central Menton, with a balcony and sea view.",
    ),
    longDescription: enFallback(
      "This studio is best suited to couples who want to stay close to the beach and the centre of Menton. It can also host an additional guest on the sofa bed when needed. The page is prepared for verified photos, final amenities, and owner-approved house notes.",
    ),
    amenities: [
      enFallback("Balcony"),
      enFallback("Kitchenette"),
      enFallback("Bathroom"),
      enFallback("Wi-Fi details to confirm"),
      enFallback("Air conditioning details to confirm"),
    ],
    locationHighlights: [
      enFallback("Beachfront setting in central Menton"),
      enFallback("Practical base for restaurants, the old town, and seafront walks"),
      enFallback("Good starting point for Monaco and the Italian Riviera"),
    ],
    gallery: [
      {
        src: "/images/apartments/sea-view-studio-hero.svg",
        alt: enFallback("Placeholder hero image for the Sea View Studio balcony in Menton"),
      },
      {
        src: "/images/apartments/sea-view-studio-room.svg",
        alt: enFallback("Placeholder room image for the Sea View Studio"),
      },
    ],
    seoTitle: enFallback("Beachfront Studio with Balcony & Sea View in Menton"),
    seoDescription: enFallback(
      "Request a direct stay at a compact beachfront studio in central Menton with balcony and sea view. Manual confirmation only.",
    ),
    structuredData: {
      accommodationCategory: "Studio apartment",
      numberOfRooms: 1,
      occupancy: 3,
    },
  },
  {
    slug: "beachside-apartment-terrace-parking",
    name: enFallback("Beachside Apartment with Terrace & Parking"),
    shortName: enFallback("Terrace Apartment"),
    tagline: enFallback("A practical beachside apartment with terrace, full kitchen, and parking."),
    bestFor: enFallback("Families, longer stays, or guests who need parking"),
    maxGuests: 4,
    bedrooms: "1 bedroom",
    beds: "1 double bed + sofa bed",
    bathrooms: "1 bathroom",
    sizeSqm: 35,
    keyFeatures: [
      enFallback("Beachside location"),
      enFallback("Terrace"),
      enFallback("Full kitchen"),
      enFallback("Parking"),
    ],
    description: enFallback(
      "A beachside apartment for families or longer stays, with a terrace, full kitchen, and parking.",
    ),
    longDescription: enFallback(
      "This apartment is the most practical choice for guests who want more day-to-day comfort: a full kitchen, terrace, and parking. It is positioned as a beachside family apartment and does not claim a sea view until verified content says so.",
    ),
    amenities: [
      enFallback("Terrace"),
      enFallback("Full kitchen"),
      enFallback("Parking"),
      enFallback("Bathroom"),
      enFallback("Laundry details to confirm"),
      enFallback("Wi-Fi details to confirm"),
    ],
    locationHighlights: [
      enFallback("Beachside central Menton location"),
      enFallback("Useful for families and longer stays"),
      enFallback("Parking available"),
    ],
    gallery: [
      {
        src: "/images/apartments/terrace-apartment-hero.svg",
        alt: enFallback("Placeholder hero image for the Terrace Apartment in Menton"),
      },
      {
        src: "/images/apartments/terrace-apartment-room.svg",
        alt: enFallback("Placeholder room image for the Terrace Apartment"),
      },
    ],
    seoTitle: enFallback("Beachside Apartment with Terrace & Parking in Menton"),
    seoDescription: enFallback(
      "Request a direct stay at a beachside Menton apartment with terrace, full kitchen, and parking. Manual confirmation only.",
    ),
    structuredData: {
      accommodationCategory: "Apartment",
      numberOfRooms: 2,
      occupancy: 4,
    },
  },
  {
    slug: "beachfront-studio-balcony-panoramic-sea-view",
    name: enFallback("Beachfront Studio with Balcony & Panoramic Sea View"),
    shortName: enFallback("Panoramic Studio"),
    tagline: enFallback("A compact studio for two with the strongest sea-view focus."),
    bestFor: enFallback("Couples who want the strongest view"),
    maxGuests: 2,
    bedrooms: "Studio",
    beds: "1 double bed",
    bathrooms: "1 bathroom",
    sizeSqm: 22,
    keyFeatures: [
      enFallback("Beachfront position"),
      enFallback("Balcony"),
      enFallback("Panoramic sea view"),
      enFallback("Compact layout for two"),
    ],
    description: enFallback(
      "A compact beachfront studio for two guests, focused on the balcony and panoramic sea view.",
    ),
    longDescription: enFallback(
      "This studio is the clearest choice for couples who value the view most. It is intentionally compact and best for two guests. The page is ready for verified gallery images and practical arrival details.",
    ),
    amenities: [
      enFallback("Balcony"),
      enFallback("Kitchenette"),
      enFallback("Bathroom"),
      enFallback("Wi-Fi details to confirm"),
      enFallback("Air conditioning details to confirm"),
    ],
    locationHighlights: [
      enFallback("Beachfront central Menton setting"),
      enFallback("Panoramic sea-view emphasis"),
      enFallback("Easy access to seafront walks and local restaurants"),
    ],
    gallery: [
      {
        src: "/images/apartments/panoramic-studio-hero.svg",
        alt: enFallback("Placeholder hero image for the Panoramic Studio balcony in Menton"),
      },
      {
        src: "/images/apartments/panoramic-studio-room.svg",
        alt: enFallback("Placeholder room image for the Panoramic Studio"),
      },
    ],
    seoTitle: enFallback("Beachfront Studio with Balcony & Panoramic Sea View in Menton"),
    seoDescription: enFallback(
      "Request a direct stay at a compact beachfront studio for two in central Menton with balcony and panoramic sea view.",
    ),
    structuredData: {
      accommodationCategory: "Studio apartment",
      numberOfRooms: 1,
      occupancy: 2,
    },
  },
];

export function getApartment(slug: string) {
  return apartments.find((apartment) => apartment.slug === slug);
}
