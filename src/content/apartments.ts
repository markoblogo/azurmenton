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
    heroImage: `${seaViewImagePath}/01-balcony-breakfast-sea-view.png`,
    cardImage: `${seaViewImagePath}/01-balcony-breakfast-sea-view.png`,
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
        src: `${seaViewImagePath}/01-balcony-breakfast-sea-view.png`,
        alt: enFallback("Private balcony table with coffee and Mediterranean sea view in Menton"),
        caption: enFallback("Morning coffee with the Mediterranean in front of you"),
        category: "balcony",
        priority: true,
      },
      {
        src: `${seaViewImagePath}/02-living-room-balcony-view.png`,
        alt: enFallback("Bright living area with sofa and balcony view toward the Mediterranean"),
        caption: enFallback("Living area facing the sea-view balcony"),
        category: "living",
      },
      {
        src: `${seaViewImagePath}/03-open-plan-studio-layout.png`,
        alt: enFallback("Open-plan studio with sofa, dining area and balcony access"),
        caption: enFallback("Open-plan studio with sea-view balcony access"),
        category: "living",
        priority: true,
      },
      {
        src: `${seaViewImagePath}/04-bedroom-balcony-view.png`,
        alt: enFallback("Double bed area with balcony doors and sea light in the studio"),
        caption: enFallback("Bedroom area with balcony light"),
        category: "bedroom",
      },
      {
        src: `${seaViewImagePath}/05-double-bed-dining-area.png`,
        alt: enFallback("Double bed and compact dining area in the sea-view studio"),
        caption: enFallback("Double bed and dining corner"),
        category: "bedroom",
      },
      {
        src: `${seaViewImagePath}/06-dining-corner.png`,
        alt: enFallback("Small dining table by the balcony in the sea view studio"),
        caption: enFallback("Dining area by the balcony"),
        category: "living",
      },
      {
        src: `${seaViewImagePath}/07-sofa-seating-area.png`,
        alt: enFallback("Sofa seating area in the bright studio apartment"),
        caption: enFallback("Seating area for relaxing after the beach"),
        category: "living",
      },
      {
        src: `${seaViewImagePath}/08-kitchenette.png`,
        alt: enFallback("Compact kitchenette with sink, microwave, kettle and kitchenware"),
        caption: enFallback("Kitchenette for simple meals during your stay"),
        category: "kitchen",
      },
      {
        src: `${seaViewImagePath}/09-bathroom-vanity.png`,
        alt: enFallback("Private bathroom with sink, mirror and shower area"),
        caption: enFallback("Private bathroom with sink and shower area"),
        category: "bathroom",
      },
      {
        src: `${seaViewImagePath}/10-bathroom-shower.png`,
        alt: enFallback("Private bathroom shower in the studio apartment"),
        caption: enFallback("Bathroom with shower"),
        category: "bathroom",
      },
      {
        src: `${seaViewImagePath}/11-balcony-sea-view.png`,
        alt: enFallback("Private balcony overlooking the beach and Mediterranean sea in Menton"),
        caption: enFallback("Private balcony overlooking the seafront"),
        category: "balcony",
      },
      {
        src: `${seaViewImagePath}/12-beachfront-palm-view.png`,
        alt: enFallback("Beachfront promenade, palm trees and Mediterranean water below the apartment"),
        caption: enFallback("Beachfront promenade and sea below"),
        category: "location",
      },
      {
        src: `${seaViewImagePath}/13-evening-seafront-view.png`,
        alt: enFallback("Evening colours over the Menton seafront from the apartment side"),
        caption: enFallback("Evening colours over the seafront"),
        category: "view",
      },
      {
        src: `${seaViewImagePath}/14-building-exterior.png`,
        alt: enFallback("Beachfront residence exterior in central Menton"),
        caption: enFallback("Beachfront residence exterior"),
        category: "exterior",
      },
      {
        src: `${seaViewImagePath}/15-residence-entrance.png`,
        alt: enFallback("Entrance area of the residence in central Menton"),
        caption: enFallback("Residence entrance"),
        category: "exterior",
      },
      {
        src: `${seaViewImagePath}/16-building-entrance.png`,
        alt: enFallback("Building entrance for the sea-view balcony studio in Menton"),
        caption: enFallback("Building entrance"),
        category: "exterior",
      },
      {
        src: `${seaViewImagePath}/17-lemon-festival-promenade.png`,
        alt: enFallback("Menton Lemon Festival atmosphere near the seafront"),
        caption: enFallback("Menton Lemon Festival atmosphere nearby"),
        category: "location",
      },
      {
        src: `${seaViewImagePath}/18-lemon-festival-gardens.png`,
        alt: enFallback("Citrus sculptures during Menton's Lemon Festival"),
        caption: enFallback("A special location during Menton's Lemon Festival"),
        category: "location",
      },
      {
        src: `${seaViewImagePath}/19-lemon-festival-town-view.png`,
        alt: enFallback("Menton Lemon Festival installations with the town and sea nearby"),
        caption: enFallback("Festival atmosphere in Menton"),
        category: "location",
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
    heroImage: `${beachsideFamilyImagePath}/01-private-terrace-breakfast.png`,
    cardImage: `${beachsideFamilyImagePath}/01-private-terrace-breakfast.png`,
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
        src: `${beachsideFamilyImagePath}/01-private-terrace-breakfast.png`,
        alt: enFallback("Private terrace with outdoor dining table and garden view in central Menton"),
        caption: enFallback("Private terrace for breakfast outdoors"),
        category: "terrace",
        priority: true,
      },
      {
        src: `${beachsideFamilyImagePath}/02-living-room-terrace-access.png`,
        alt: enFallback("Living room with sofa, TV and direct access to the private terrace"),
        caption: enFallback("Living room with direct access to the terrace"),
        category: "living",
        priority: true,
      },
      {
        src: `${beachsideFamilyImagePath}/03-comfortable-bedroom.png`,
        alt: enFallback("Comfortable bedroom with double bed, armchair and soft lighting"),
        caption: enFallback("Comfortable bedroom with double bed"),
        category: "bedroom",
      },
      {
        src: `${beachsideFamilyImagePath}/04-dining-area-equipped-kitchen.png`,
        alt: enFallback("Dining area beside an equipped kitchen in the beachside apartment"),
        caption: enFallback("Dining area and equipped kitchen"),
        category: "kitchen",
      },
      {
        src: `${beachsideFamilyImagePath}/05-living-room-sofa-bed.png`,
        alt: enFallback("Living room with sofa bed, dining table and light from the terrace"),
        caption: enFallback("Living room with sofa bed and dining area"),
        category: "living",
      },
      {
        src: `${beachsideFamilyImagePath}/06-full-kitchen-longer-stays.png`,
        alt: enFallback("Fully equipped kitchen with oven, microwave, washing machine and dishwasher"),
        caption: enFallback("Fully equipped kitchen for longer stays"),
        category: "kitchen",
      },
      {
        src: `${beachsideFamilyImagePath}/07-entry-living-room-view.png`,
        alt: enFallback("Apartment entrance area looking toward the living room and terrace"),
        caption: enFallback("Entrance area leading toward the living room"),
        category: "living",
      },
      {
        src: `${beachsideFamilyImagePath}/08-bathroom-bath-shower.png`,
        alt: enFallback("Bathroom with bath and shower in the family apartment"),
        caption: enFallback("Bathroom with bath and shower"),
        category: "bathroom",
      },
      {
        src: `${beachsideFamilyImagePath}/09-private-bathroom-sink.png`,
        alt: enFallback("Private bathroom with sink, mirror and tiled wall"),
        caption: enFallback("Private bathroom with sink"),
        category: "bathroom",
      },
      {
        src: `${beachsideFamilyImagePath}/10-garden-courtyard-view.png`,
        alt: enFallback("Garden and inner courtyard view from the apartment terrace"),
        caption: enFallback("Garden and inner courtyard view"),
        category: "view",
      },
      {
        src: `${beachsideFamilyImagePath}/11-parking-entrance.png`,
        alt: enFallback("Parking entrance near the apartment building in central Menton"),
        caption: enFallback("Parking access near the residence"),
        category: "parking",
      },
      {
        src: `${beachsideFamilyImagePath}/12-building-entrance.png`,
        alt: enFallback("Entrance to the apartment building near the beach in Menton"),
        caption: enFallback("Building entrance"),
        category: "exterior",
      },
      {
        src: `${beachsideFamilyImagePath}/13-beachside-building-exterior.png`,
        alt: enFallback("Exterior of the beachside apartment building in Menton"),
        caption: enFallback("Beachside building exterior"),
        category: "exterior",
      },
      {
        src: `${beachsideFamilyImagePath}/14-nearby-beach.jpg`,
        alt: enFallback("Nearby beach in Menton with palm trees and the Mediterranean sea"),
        caption: enFallback("The beach is just a short walk away"),
        category: "location",
      },
      {
        src: `${beachsideFamilyImagePath}/15-mediterranean-sea-nearby.jpg`,
        alt: enFallback("Mediterranean sea near the apartment in Menton"),
        caption: enFallback("Mediterranean sea nearby"),
        category: "location",
      },
      {
        src: `${beachsideFamilyImagePath}/16-menton-evening-market.png`,
        alt: enFallback("Evening seafront and old town atmosphere in Menton"),
        caption: enFallback("Menton seafront and evening atmosphere"),
        category: "location",
      },
      {
        src: `${beachsideFamilyImagePath}/17-menton-old-town.png`,
        alt: enFallback("Colourful old town buildings and church tower in Menton"),
        caption: enFallback("Menton old town within walking distance"),
        category: "location",
      },
      {
        src: `${beachsideFamilyImagePath}/18-evening-riviera-view.jpg`,
        alt: enFallback("Evening colours over the sea and mountains near Menton"),
        caption: enFallback("Evening colours over the Riviera"),
        category: "location",
      },
      {
        src: `${beachsideFamilyImagePath}/19-evening-harbour-walk.jpg`,
        alt: enFallback("Evening harbour view with lights near Menton"),
        caption: enFallback("Evening walk by the harbour"),
        category: "location",
      },
      {
        src: `${beachsideFamilyImagePath}/20-bedroom-detail.png`,
        alt: enFallback("Bedroom detail with storage and soft light"),
        caption: enFallback("Bedroom detail"),
        category: "bedroom",
      },
      {
        src: `${beachsideFamilyImagePath}/21-living-room-tv-terrace.png`,
        alt: enFallback("Living room with TV, sofa and terrace access"),
        caption: enFallback("Living room with TV and terrace access"),
        category: "living",
      },
      {
        src: `${beachsideFamilyImagePath}/22-dining-kitchen-wide.png`,
        alt: enFallback("Wide view of the dining area and equipped kitchen"),
        caption: enFallback("Dining area and kitchen"),
        category: "kitchen",
      },
      {
        src: `${beachsideFamilyImagePath}/23-parking-nearby.png`,
        alt: enFallback("Parking sign near the apartment building in central Menton"),
        caption: enFallback("Parking nearby, available by reservation"),
        category: "parking",
      },
      {
        src: `${beachsideFamilyImagePath}/24-residence-entrance.png`,
        alt: enFallback("Residence entrance near the beach in Menton"),
        caption: enFallback("Residence entrance"),
        category: "exterior",
      },
      {
        src: `${beachsideFamilyImagePath}/25-courtyard-balcony-view.png`,
        alt: enFallback("Courtyard and balcony view from the residence"),
        caption: enFallback("Courtyard and balcony view"),
        category: "view",
      },
      {
        src: `${beachsideFamilyImagePath}/26-living-room-balcony-view.png`,
        alt: enFallback("Living room with sofa and open doors toward the terrace"),
        caption: enFallback("Living room opening to the terrace"),
        category: "living",
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
    heroImage: `${panoramicSeaViewImagePath}/01-balcony-breakfast-sea-view.png`,
    cardImage: `${panoramicSeaViewImagePath}/01-balcony-breakfast-sea-view.png`,
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
        src: `${panoramicSeaViewImagePath}/01-balcony-breakfast-sea-view.png`,
        alt: enFallback("Private balcony with breakfast table overlooking the Mediterranean sea in Menton"),
        caption: enFallback("Balcony with breakfast and Mediterranean sea view"),
        category: "balcony",
        priority: true,
      },
      {
        src: `${panoramicSeaViewImagePath}/02-wide-sea-view-from-balcony.png`,
        alt: enFallback("Wide Mediterranean sea view from the apartment balcony with palm trees and seafront below"),
        caption: enFallback("Wide sea view from the balcony"),
        category: "view",
        priority: true,
      },
      {
        src: `${panoramicSeaViewImagePath}/03-bright-studio-double-bed.png`,
        alt: enFallback("Compact bright studio with double bed and balcony access"),
        caption: enFallback("Bright studio with double bed"),
        category: "bedroom",
      },
      {
        src: `${panoramicSeaViewImagePath}/04-equipped-kitchenette.png`,
        alt: enFallback("Equipped kitchenette with sink, stovetop and storage in the sea view studio"),
        caption: enFallback("Equipped kitchenette for simple meals"),
        category: "kitchen",
      },
      {
        src: `${panoramicSeaViewImagePath}/05-private-bathroom-sink.png`,
        alt: enFallback("Private bathroom with sink, mirror and shower area"),
        caption: enFallback("Private bathroom with sink and shower area"),
        category: "bathroom",
      },
      {
        src: `${panoramicSeaViewImagePath}/06-bathroom-shower.png`,
        alt: enFallback("Private bathroom shower in the panoramic sea view studio"),
        caption: enFallback("Bathroom with shower"),
        category: "bathroom",
      },
      {
        src: `${panoramicSeaViewImagePath}/07-mediterranean-harbour-view.png`,
        alt: enFallback("Mediterranean sea and harbour view from the apartment balcony"),
        caption: enFallback("Mediterranean view towards the harbour"),
        category: "view",
      },
      {
        src: `${panoramicSeaViewImagePath}/08-seafront-mountain-view.png`,
        alt: enFallback("View of Menton seafront, palm trees and mountains near the apartment"),
        caption: enFallback("Seafront and mountain view"),
        category: "location",
      },
      {
        src: `${panoramicSeaViewImagePath}/09-beachfront-palm-view.png`,
        alt: enFallback("Beachfront view with palm trees and Mediterranean sea from the apartment"),
        caption: enFallback("Beachfront view with palm trees"),
        category: "view",
      },
      {
        src: `${panoramicSeaViewImagePath}/10-sea-view-with-boats.png`,
        alt: enFallback("Mediterranean sea view with boats near Menton"),
        caption: enFallback("Sea view with boats"),
        category: "view",
      },
      {
        src: `${panoramicSeaViewImagePath}/11-seafront-promenade-nearby.png`,
        alt: enFallback("Seafront promenade with benches and marina near the apartment"),
        caption: enFallback("Seafront promenade nearby"),
        category: "location",
      },
      {
        src: `${panoramicSeaViewImagePath}/12-menton-old-town-nearby.png`,
        alt: enFallback("Colourful old town buildings and church tower in Menton"),
        caption: enFallback("Menton old town nearby"),
        category: "location",
      },
      {
        src: `${panoramicSeaViewImagePath}/13-evening-mediterranean-colours.png`,
        alt: enFallback("Evening colours over the Mediterranean sea near Menton"),
        caption: enFallback("Evening colours over the Mediterranean"),
        category: "view",
      },
      {
        src: `${panoramicSeaViewImagePath}/14-additional-sea-view.png`,
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
