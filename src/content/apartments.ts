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
    slug: "sea-view-balcony-studio",
    name: enFallback("Beachfront Studio with Balcony & Sea View, Menton"),
    shortName: enFallback("Sea View Balcony Studio"),
    tagline: enFallback(
      "A bright beachfront studio with a private balcony and Mediterranean sea view.",
    ),
    bestFor: enFallback(
      "Couples, solo travellers, and guests who want to stay right by the beach.",
    ),
    maxGuests: 3,
    bedrooms: "Studio",
    beds: "1 double bed and 1 sofa bed",
    bathrooms: "1 bathroom",
    sizeSqm: 27,
    keyFeatures: [
      enFallback("Private balcony with sea view"),
      enFallback("Beachfront location"),
      enFallback("Ideal for couples"),
      enFallback("Sofa bed for an additional guest"),
      enFallback("Air conditioning"),
      enFallback("Free Wi-Fi"),
      enFallback("Kitchenette"),
      enFallback("Washing machine"),
      enFallback("Lift access"),
      enFallback("Private parking may be available by reservation"),
    ],
    description: enFallback(
      "Wake up to the Mediterranean from this bright beachfront studio in Menton. The apartment has a private balcony with sea view, making it a lovely spot for morning coffee, reading or watching the seafront.",
    ),
    longDescription: enFallback(
      "The studio-style apartment is designed for two guests, with a double bed and a sofa bed for an additional guest. It includes air conditioning, free Wi-Fi, a kitchenette, washing machine, private bathroom and lift access. Private on-site parking may be available by reservation and extra charges may apply. The beach, seafront promenade, cafes, restaurants and the old town are all easy to reach on foot. A practical choice for guests who want a simple seaside stay with a memorable view.",
    ),
    amenities: [
      enFallback("Private balcony with sea view"),
      enFallback("Air conditioning"),
      enFallback("Free Wi-Fi"),
      enFallback("Kitchenette"),
      enFallback("Washing machine"),
      enFallback("Private bathroom"),
      enFallback("Lift access"),
      enFallback("Private parking may be available by reservation and extra charges may apply"),
    ],
    locationHighlights: [
      enFallback("Beachfront setting in central Menton"),
      enFallback("Beach and seafront promenade are easy to reach on foot"),
      enFallback("Close to cafes, restaurants and the old town"),
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
    seoTitle: enFallback("Beachfront Studio with Balcony & Sea View in Menton | Azur Menton"),
    seoDescription: enFallback(
      "Stay in a bright beachfront studio in Menton with private balcony, sea view, air conditioning, kitchenette and lift access. Ideal for couples looking for a seaside stay.",
    ),
    structuredData: {
      accommodationCategory: "Studio apartment",
      numberOfRooms: 1,
      occupancy: 3,
    },
  },
  {
    slug: "beachside-family-apartment",
    name: enFallback("Beachside Apartment with Terrace & Parking, Menton"),
    shortName: enFallback("Terrace & Parking Apartment"),
    tagline: enFallback(
      "A spacious beachside apartment with private terrace, full kitchen and parking.",
    ),
    bestFor: enFallback("Families, two couples, longer stays and guests travelling by car."),
    maxGuests: 4,
    bedrooms: "1 bedroom",
    beds: "1 double bed and 1 sofa bed",
    bathrooms: "1 bathroom",
    sizeSqm: 54,
    keyFeatures: [
      enFallback("Private terrace"),
      enFallback("Spacious 54 sqm apartment"),
      enFallback("Up to 4 guests"),
      enFallback("One bedroom plus living room with sofa bed"),
      enFallback("Fully equipped kitchen"),
      enFallback("Dishwasher"),
      enFallback("Oven"),
      enFallback("Washing machine"),
      enFallback("Air conditioning"),
      enFallback("Free Wi-Fi"),
      enFallback("On-site parking, subject to availability/reservation"),
      enFallback("Beach nearby"),
    ],
    description: enFallback(
      "Enjoy an easy beachside stay in central Menton in this spacious apartment with a private terrace and on-site parking.",
    ),
    longDescription: enFallback(
      "With one bedroom, a living room with sofa bed and a fully equipped kitchen, it is a comfortable base for a family, two couples or guests planning a longer stay. The apartment includes air conditioning, free Wi-Fi, a washing machine, dishwasher, oven and microwave. The beach is just a short walk away, and cafes, restaurants, shops, the old town and Menton train station can all be reached on foot. This is the most practical apartment in the Azur Menton collection for guests who want space, comfort and convenience close to the sea.",
    ),
    amenities: [
      enFallback("Private terrace"),
      enFallback("Fully equipped kitchen"),
      enFallback("Dishwasher"),
      enFallback("Oven"),
      enFallback("Microwave"),
      enFallback("Washing machine"),
      enFallback("Air conditioning"),
      enFallback("Free Wi-Fi"),
      enFallback("On-site parking, subject to availability/reservation"),
      enFallback("Private bathroom"),
    ],
    locationHighlights: [
      enFallback("Beachside central Menton location"),
      enFallback("Beach is just a short walk away"),
      enFallback("Cafes, restaurants, shops, the old town and Menton train station can be reached on foot"),
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
    seoTitle: enFallback("Beachside Apartment with Terrace & Parking in Menton | Azur Menton"),
    seoDescription: enFallback(
      "Spacious beachside apartment in central Menton for up to 4 guests, with private terrace, full kitchen, air conditioning and on-site parking.",
    ),
    structuredData: {
      accommodationCategory: "Apartment",
      numberOfRooms: 2,
      occupancy: 4,
    },
  },
  {
    slug: "panoramic-sea-view-studio",
    name: enFallback("Beachfront Studio with Balcony & Panoramic Sea View, Menton"),
    shortName: enFallback("Panoramic Sea View Studio"),
    tagline: enFallback("A compact beachfront studio where the view is the highlight."),
    bestFor: enFallback("Couples and solo travellers who want a memorable Mediterranean view."),
    maxGuests: 2,
    bedrooms: "Studio",
    beds: "1 double bed",
    bathrooms: "1 bathroom",
    sizeSqm: 25,
    keyFeatures: [
      enFallback("Panoramic Mediterranean sea view"),
      enFallback("Private balcony"),
      enFallback("Beachfront location"),
      enFallback("Ideal for two guests"),
      enFallback("Air conditioning"),
      enFallback("Free Wi-Fi"),
      enFallback("Equipped kitchenette"),
      enFallback("Washing machine"),
      enFallback("Private bathroom"),
      enFallback("Close to beach, cafes and old town"),
    ],
    description: enFallback(
      "Wake up to a wide Mediterranean view from this bright beachfront studio in Menton. The apartment has a balcony with sea view, making it a simple and comfortable place for breakfast, reading or an evening drink by the water.",
    ),
    longDescription: enFallback(
      "The studio is designed for two guests and includes air conditioning, free Wi-Fi, an equipped kitchenette, a washing machine and a private bathroom. The beach, seafront promenade, cafes, restaurants and the old town are all easy to reach on foot. A practical choice for couples or solo travellers who want an easy seaside stay with a memorable view.",
    ),
    amenities: [
      enFallback("Private balcony"),
      enFallback("Air conditioning"),
      enFallback("Free Wi-Fi"),
      enFallback("Equipped kitchenette"),
      enFallback("Washing machine"),
      enFallback("Private bathroom"),
    ],
    locationHighlights: [
      enFallback("Beachfront central Menton setting"),
      enFallback("Close to the beach and seafront promenade"),
      enFallback("Cafes, restaurants and the old town are easy to reach on foot"),
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
    seoTitle: enFallback(
      "Beachfront Studio with Panoramic Sea View in Menton | Azur Menton",
    ),
    seoDescription: enFallback(
      "Compact beachfront studio in Menton with balcony and panoramic Mediterranean sea view. Ideal for couples looking for a simple seaside stay close to the beach.",
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
