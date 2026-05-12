import type { Locale } from "@/i18n/locales";

export type LocalizedText = Record<Locale, string>;

export type ApartmentImage = {
  src: string;
  alt: LocalizedText;
  caption: LocalizedText;
  category:
    | "balcony"
    | "terrace"
    | "view"
    | "living"
    | "bedroom"
    | "kitchen"
    | "bathroom"
    | "parking"
    | "location"
    | "exterior"
    | "detail";
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
  fr: en,
  it: en,
  uk: en,
});

const seaViewImagePath = "/images/apartments/sea-view-balcony-studio";
const beachsideFamilyImagePath = "/images/apartments/beachside-family-apartment";
const panoramicSeaViewImagePath = "/images/apartments/panoramic-sea-view-studio";

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
    heroImage: `${beachsideFamilyImagePath}/01-private-terrace-breakfast.jpeg`,
    cardImage: `${beachsideFamilyImagePath}/01-private-terrace-breakfast.jpeg`,
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
        src: `${beachsideFamilyImagePath}/01-private-terrace-breakfast.jpeg`,
        alt: enFallback("Private terrace with outdoor dining table and garden view in central Menton"),
        caption: enFallback("Private terrace for breakfast outdoors"),
        category: "terrace",
        priority: true,
      },
      {
        src: `${beachsideFamilyImagePath}/02-living-room-terrace-access.jpeg`,
        alt: enFallback("Living room with sofa, TV and direct access to the private terrace"),
        caption: enFallback("Living room with direct access to the terrace"),
        category: "living",
        priority: true,
      },
      {
        src: `${beachsideFamilyImagePath}/03-comfortable-bedroom.jpeg`,
        alt: enFallback("Comfortable bedroom with double bed, armchair and soft lighting"),
        caption: enFallback("Comfortable bedroom with double bed"),
        category: "bedroom",
      },
      {
        src: `${beachsideFamilyImagePath}/04-dining-area-equipped-kitchen.jpeg`,
        alt: enFallback("Dining area beside an equipped kitchen in the beachside apartment"),
        caption: enFallback("Dining area and equipped kitchen"),
        category: "kitchen",
      },
      {
        src: `${beachsideFamilyImagePath}/05-living-room-sofa-bed.jpeg`,
        alt: enFallback("Living room with sofa bed, dining table and light from the terrace"),
        caption: enFallback("Living room with sofa bed and dining area"),
        category: "living",
      },
      {
        src: `${beachsideFamilyImagePath}/06-full-kitchen-longer-stays.jpeg`,
        alt: enFallback("Fully equipped kitchen with oven, microwave, washing machine and dishwasher"),
        caption: enFallback("Fully equipped kitchen for longer stays"),
        category: "kitchen",
      },
      {
        src: `${beachsideFamilyImagePath}/07-tv-and-terrace-view.jpeg`,
        alt: enFallback("TV area in the living room with access to the terrace"),
        caption: enFallback("Living room with TV and terrace access"),
        category: "living",
      },
      {
        src: `${beachsideFamilyImagePath}/08-private-bathroom-sink.jpeg`,
        alt: enFallback("Private bathroom with sink, mirror and dark tiled wall"),
        caption: enFallback("Private bathroom with sink"),
        category: "bathroom",
      },
      {
        src: `${beachsideFamilyImagePath}/09-bathroom-bath-shower.jpeg`,
        alt: enFallback("Bathroom with bath and shower in the family apartment"),
        caption: enFallback("Bathroom with bath and shower"),
        category: "bathroom",
      },
      {
        src: `${beachsideFamilyImagePath}/10-garden-courtyard-view.jpeg`,
        alt: enFallback("Garden and inner courtyard view from the apartment terrace"),
        caption: enFallback("Garden and inner courtyard view"),
        category: "view",
      },
      {
        src: `${beachsideFamilyImagePath}/11-parking-nearby.jpeg`,
        alt: enFallback("Parking sign near the apartment building in central Menton"),
        caption: enFallback("Parking nearby, available by reservation"),
        category: "parking",
      },
      {
        src: `${beachsideFamilyImagePath}/12-building-entrance.jpeg`,
        alt: enFallback("Entrance to the apartment building near the beach in Menton"),
        caption: enFallback("Building entrance"),
        category: "exterior",
      },
      {
        src: `${beachsideFamilyImagePath}/13-beachside-building-exterior.jpeg`,
        alt: enFallback("Exterior of the beachside apartment building in Menton"),
        caption: enFallback("Beachside building exterior"),
        category: "exterior",
      },
      {
        src: `${beachsideFamilyImagePath}/14-nearby-beach.jpeg`,
        alt: enFallback("Nearby beach in Menton with palm trees and the Mediterranean sea"),
        caption: enFallback("The beach is just a short walk away"),
        category: "location",
      },
      {
        src: `${beachsideFamilyImagePath}/15-mediterranean-sea-nearby.jpeg`,
        alt: enFallback("Mediterranean sea near the apartment in Menton"),
        caption: enFallback("Mediterranean sea nearby"),
        category: "location",
      },
      {
        src: `${beachsideFamilyImagePath}/16-menton-evening-market.jpeg`,
        alt: enFallback("Evening market and colourful old town streets in Menton"),
        caption: enFallback("Menton old town and evening market"),
        category: "location",
      },
      {
        src: `${beachsideFamilyImagePath}/17-menton-old-town.jpeg`,
        alt: enFallback("Colourful old town buildings and church tower in Menton"),
        caption: enFallback("Menton old town within walking distance"),
        category: "location",
      },
      {
        src: `${beachsideFamilyImagePath}/18-menton-harbour-nearby.jpeg`,
        alt: enFallback("Boats in Menton harbour at sunset"),
        caption: enFallback("Menton harbour nearby"),
        category: "location",
      },
      {
        src: `${beachsideFamilyImagePath}/19-evening-riviera-view.jpeg`,
        alt: enFallback("Evening colours over the sea and mountains near Menton"),
        caption: enFallback("Evening colours over the Riviera"),
        category: "location",
      },
      {
        src: `${beachsideFamilyImagePath}/20-evening-harbour-walk.jpeg`,
        alt: enFallback("Evening harbour view with boats near Menton"),
        caption: enFallback("Evening walk by the harbour"),
        category: "location",
      },
    ],
    seoTitle: enFallback("Beachside Apartment with Terrace & Parking in Menton | Azur Menton"),
    seoDescription: enFallback(
      "Spacious beachside apartment in central Menton for up to 4 guests, with private terrace, full kitchen, air conditioning and parking by reservation.",
    ),
    structuredData: {
      accommodationCategory: "Apartment",
      numberOfRooms: 2,
      occupancy: 4,
    },
  },
  {
    slug: "panoramic-sea-view-studio",
    heroImage: `${panoramicSeaViewImagePath}/01-balcony-breakfast-sea-view.jpeg`,
    cardImage: `${panoramicSeaViewImagePath}/01-balcony-breakfast-sea-view.jpeg`,
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
        src: `${panoramicSeaViewImagePath}/01-balcony-breakfast-sea-view.jpeg`,
        alt: enFallback("Private balcony with breakfast table overlooking the Mediterranean sea in Menton"),
        caption: enFallback("Balcony with breakfast and Mediterranean sea view"),
        category: "balcony",
        priority: true,
      },
      {
        src: `${panoramicSeaViewImagePath}/02-wide-sea-view-from-balcony.jpeg`,
        alt: enFallback("Wide Mediterranean sea view from the apartment balcony with palm trees and seafront below"),
        caption: enFallback("Wide sea view from the balcony"),
        category: "view",
        priority: true,
      },
      {
        src: `${panoramicSeaViewImagePath}/03-bright-studio-double-bed.jpeg`,
        alt: enFallback("Compact bright studio with double bed and balcony access"),
        caption: enFallback("Bright studio with double bed"),
        category: "bedroom",
      },
      {
        src: `${panoramicSeaViewImagePath}/04-equipped-kitchenette.jpeg`,
        alt: enFallback("Equipped kitchenette with sink, stovetop and storage in the sea view studio"),
        caption: enFallback("Equipped kitchenette for simple meals"),
        category: "kitchen",
      },
      {
        src: `${panoramicSeaViewImagePath}/05-bathroom-washing-machine.jpeg`,
        alt: enFallback("Private bathroom with sink, shower area and washing machine"),
        caption: enFallback("Private bathroom with washing machine"),
        category: "bathroom",
      },
      {
        src: `${panoramicSeaViewImagePath}/06-bathroom-shower.jpeg`,
        alt: enFallback("Private bathroom shower in the panoramic sea view studio"),
        caption: enFallback("Bathroom with shower"),
        category: "bathroom",
      },
      {
        src: `${panoramicSeaViewImagePath}/07-mediterranean-harbour-view.jpeg`,
        alt: enFallback("Mediterranean sea and harbour view from the apartment balcony"),
        caption: enFallback("Mediterranean view towards the harbour"),
        category: "view",
      },
      {
        src: `${panoramicSeaViewImagePath}/08-seafront-mountain-view.jpeg`,
        alt: enFallback("View of Menton seafront, palm trees and mountains near the apartment"),
        caption: enFallback("Seafront and mountain view"),
        category: "location",
      },
      {
        src: `${panoramicSeaViewImagePath}/09-beachfront-palm-view.jpeg`,
        alt: enFallback("Beachfront view with palm trees and Mediterranean sea from the apartment"),
        caption: enFallback("Beachfront view with palm trees"),
        category: "view",
      },
      {
        src: `${panoramicSeaViewImagePath}/10-sea-view-with-boats.jpeg`,
        alt: enFallback("Mediterranean sea view with boats near Menton"),
        caption: enFallback("Sea view with boats"),
        category: "view",
      },
      {
        src: `${panoramicSeaViewImagePath}/11-seafront-promenade-nearby.jpeg`,
        alt: enFallback("Seafront promenade with benches and marina near the apartment"),
        caption: enFallback("Seafront promenade nearby"),
        category: "location",
      },
      {
        src: `${panoramicSeaViewImagePath}/12-menton-old-town-nearby.jpeg`,
        alt: enFallback("Colourful old town buildings and church tower in Menton"),
        caption: enFallback("Menton old town nearby"),
        category: "location",
      },
      {
        src: `${panoramicSeaViewImagePath}/13-evening-mediterranean-colours.jpeg`,
        alt: enFallback("Evening colours over the Mediterranean sea near Menton"),
        caption: enFallback("Evening colours over the Mediterranean"),
        category: "view",
      },
      {
        src: `${panoramicSeaViewImagePath}/14-additional-sea-view.jpeg`,
        alt: enFallback("Vertical Mediterranean sea view from the apartment with boats and palm trees"),
        caption: enFallback("Additional sea view from the apartment"),
        category: "view",
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
