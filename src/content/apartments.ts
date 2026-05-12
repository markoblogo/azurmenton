import type { Locale } from "@/i18n/locales";

export type LocalizedText = Record<Locale, string>;

export type ApartmentImage = {
  src: string;
  alt: LocalizedText;
  caption: LocalizedText;
  category: "balcony" | "view" | "living" | "bedroom" | "kitchen" | "bathroom" | "location" | "exterior";
  priority?: boolean;
};

export type Apartment = {
  slug: string;
  heroImage: string;
  cardImage: string;
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

const seaViewImagePath = "/images/apartments/sea-view-balcony-studio";

export const apartments: Apartment[] = [
  {
    slug: "sea-view-balcony-studio",
    heroImage: `${seaViewImagePath}/04-open-plan-studio-layout.jpeg`,
    cardImage: `${seaViewImagePath}/01-balcony-coffee-sea-view.jpeg`,
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
        src: `${seaViewImagePath}/01-balcony-coffee-sea-view.jpeg`,
        alt: enFallback("Private balcony table with coffee and Mediterranean sea view in Menton"),
        caption: enFallback("Morning coffee with the Mediterranean in front of you"),
        category: "balcony",
        priority: true,
      },
      {
        src: `${seaViewImagePath}/02-sea-view-from-balcony.jpeg`,
        alt: enFallback("Mediterranean sea view with palm trees from the private balcony"),
        caption: enFallback("Sea view from the private balcony"),
        category: "view",
      },
      {
        src: `${seaViewImagePath}/03-balcony-from-inside.jpeg`,
        alt: enFallback("View from inside the studio toward the private balcony and the sea"),
        caption: enFallback("Private balcony overlooking the seafront"),
        category: "balcony",
      },
      {
        src: `${seaViewImagePath}/04-open-plan-studio-layout.jpeg`,
        alt: enFallback("Bright open-plan studio with sofa, dining table, bed and balcony access"),
        caption: enFallback("Open-plan studio with seating area and sea-view balcony"),
        category: "living",
        priority: true,
      },
      {
        src: `${seaViewImagePath}/05-double-bed-balcony-access.jpeg`,
        alt: enFallback("Double bed in a bright studio with dining area and balcony access"),
        caption: enFallback("Bright studio space with balcony access"),
        category: "bedroom",
      },
      {
        src: `${seaViewImagePath}/06-dining-area-by-balcony.jpeg`,
        alt: enFallback("Small dining table by the balcony in the sea view studio"),
        caption: enFallback("Dining area by the balcony"),
        category: "living",
      },
      {
        src: `${seaViewImagePath}/07-seating-area-sofa.jpeg`,
        alt: enFallback("Sofa seating area in the bright studio apartment"),
        caption: enFallback("Seating area for relaxing after the beach"),
        category: "living",
      },
      {
        src: `${seaViewImagePath}/08-dining-corner.jpeg`,
        alt: enFallback("Dining corner with table and chairs inside the studio apartment"),
        caption: enFallback("Dining corner for breakfast or remote work"),
        category: "living",
      },
      {
        src: `${seaViewImagePath}/09-comfortable-double-bed.jpeg`,
        alt: enFallback("Comfortable double bed with white headboard in the studio apartment"),
        caption: enFallback("Comfortable double bed"),
        category: "bedroom",
      },
      {
        src: `${seaViewImagePath}/10-kitchenette.jpeg`,
        alt: enFallback("Compact kitchenette with sink, microwave, kettle and kitchenware"),
        caption: enFallback("Kitchenette for simple meals during your stay"),
        category: "kitchen",
      },
      {
        src: `${seaViewImagePath}/11-bathroom-sink.jpeg`,
        alt: enFallback("Private bathroom with sink, mirror and shower area"),
        caption: enFallback("Private bathroom with sink and shower area"),
        category: "bathroom",
      },
      {
        src: `${seaViewImagePath}/12-bathroom-shower.jpeg`,
        alt: enFallback("Private bathroom shower in the studio apartment"),
        caption: enFallback("Bathroom with shower"),
        category: "bathroom",
      },
      {
        src: `${seaViewImagePath}/13-beachfront-view.jpeg`,
        alt: enFallback("Beachfront promenade and Mediterranean sea view from the apartment"),
        caption: enFallback("Beachfront view and promenade below"),
        category: "location",
      },
      {
        src: `${seaViewImagePath}/14-mediterranean-sea-view.jpeg`,
        alt: enFallback("Mediterranean sea and palm trees seen from the apartment balcony"),
        caption: enFallback("Mediterranean sea view from the balcony"),
        category: "view",
      },
      {
        src: `${seaViewImagePath}/15-evening-seafront-view.jpeg`,
        alt: enFallback("Evening sea view from the balcony in Menton"),
        caption: enFallback("Evening colours over the seafront"),
        category: "view",
      },
      {
        src: `${seaViewImagePath}/16-menton-lemon-festival-view.jpeg`,
        alt: enFallback("Menton Lemon Festival atmosphere seen from the apartment balcony"),
        caption: enFallback("A special location during Menton's Lemon Festival"),
        category: "location",
      },
      {
        src: `${seaViewImagePath}/17-building-entrance.jpeg`,
        alt: enFallback("Entrance to the apartment building in central Menton"),
        caption: enFallback("Building entrance"),
        category: "exterior",
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
    heroImage: "/images/apartments/terrace-apartment-hero.svg",
    cardImage: "/images/apartments/terrace-apartment-hero.svg",
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
        caption: enFallback("Terrace apartment image placeholder"),
        category: "living",
      },
      {
        src: "/images/apartments/terrace-apartment-room.svg",
        alt: enFallback("Placeholder room image for the Terrace Apartment"),
        caption: enFallback("Terrace apartment room placeholder"),
        category: "living",
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
    heroImage: "/images/apartments/panoramic-studio-hero.svg",
    cardImage: "/images/apartments/panoramic-studio-hero.svg",
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
        caption: enFallback("Panoramic studio sea view placeholder"),
        category: "view",
      },
      {
        src: "/images/apartments/panoramic-studio-room.svg",
        alt: enFallback("Placeholder room image for the Panoramic Studio"),
        caption: enFallback("Panoramic studio room placeholder"),
        category: "living",
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
