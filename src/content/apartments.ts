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

const localized = (en: string, fr: string, it: string, uk: string): LocalizedText => ({
  en,
  fr,
  it,
  uk,
});

const seaViewImagePath = "/images/apartments/sea-view-balcony-studio";
const beachsideFamilyImagePath = "/images/apartments/beachside-family-apartment";
const panoramicSeaViewImagePath = "/images/apartments/panoramic-sea-view-studio";

export const apartments: Apartment[] = [
  {
    slug: "sea-view-balcony-studio",
    heroImage: `${seaViewImagePath}/01-balcony-breakfast-sea-view.png`,
    cardImage: `${seaViewImagePath}/01-balcony-breakfast-sea-view.png`,
    name: localized(
      "Beachfront Studio with Balcony & Sea View, Menton",
      "Studio en bord de mer avec balcon et vue mer, Menton",
      "Monolocale fronte mare con balcone e vista mare, Mentone",
      "Студія біля моря з балконом і видом на море, Ментон",
    ),
    shortName: localized("Sea View Balcony Studio", "Studio balcon vue mer", "Monolocale con balcone vista mare", "Студія з балконом і видом на море"),
    tagline: localized(
      "A bright beachfront studio with a private balcony and Mediterranean sea view.",
      "Un studio lumineux en bord de mer avec balcon privé et vue sur la Méditerranée.",
      "Un monolocale luminoso fronte mare con balcone privato e vista sul Mediterraneo.",
      "Світла студія біля моря з приватним балконом і видом на Середземне море.",
    ),
    bestFor: localized(
      "Couples, solo travellers, and guests who want to stay right by the beach.",
      "Couples, voyageurs solo et hôtes qui veulent séjourner tout près de la plage.",
      "Coppie, viaggiatori singoli e ospiti che vogliono stare proprio vicino alla spiaggia.",
      "Пари, соло-мандрівники та гості, які хочуть жити просто біля пляжу.",
    ),
    maxGuests: 3,
    bedrooms: "Studio",
    beds: "1 double bed and 1 sofa bed",
    bathrooms: "1 bathroom",
    sizeSqm: 27,
    keyFeatures: [
      localized("Private balcony with sea view", "Balcon privé avec vue mer", "Balcone privato vista mare", "Приватний балкон із видом на море"),
      localized("Beachfront location", "Emplacement en bord de mer", "Posizione fronte mare", "Розташування біля моря"),
      localized("Ideal for couples", "Idéal pour couples", "Ideale per coppie", "Ідеально для пар"),
      localized("Sofa bed for an additional guest", "Canapé-lit pour un hôte supplémentaire", "Divano letto per un ospite extra", "Диван-ліжко для додаткового гостя"),
      localized("Air conditioning", "Climatisation", "Aria condizionata", "Кондиціонер"),
      localized("Free Wi-Fi", "Wi-Fi gratuit", "Wi-Fi gratuito", "Безкоштовний Wi‑Fi"),
      localized("Kitchenette", "Kitchenette", "Angolo cottura", "Мінікухня"),
      localized("Washing machine", "Lave-linge", "Lavatrice", "Пральна машина"),
      localized("Lift access", "Ascenseur", "Ascensore", "Ліфт"),
      localized("Private parking may be available by reservation", "Parking privé possible sur réservation", "Parcheggio privato possibile su prenotazione", "Приватне паркування може бути доступне за бронюванням"),
    ],
    description: localized(
      "Wake up to the Mediterranean from this bright beachfront studio in Menton. The apartment has a private balcony with sea view, making it a lovely spot for morning coffee, reading or watching the seafront.",
      "Réveillez-vous face à la Méditerranée dans ce studio lumineux en bord de mer à Menton. Le balcon privé avec vue mer est parfait pour le café du matin, lire ou regarder le front de mer.",
      "Svegliati davanti al Mediterraneo in questo monolocale luminoso fronte mare a Mentone. Il balcone privato vista mare è ideale per il caffè del mattino, leggere o guardare il lungomare.",
      "Прокидайтеся з видом на Середземне море у цій світлій студії біля моря в Ментоні. Приватний балкон із видом на море добре підходить для ранкової кави, читання або спостереження за набережною.",
    ),
    longDescription: localized(
      "The studio-style apartment is designed for two guests, with a double bed and a sofa bed for an additional guest. It includes air conditioning, free Wi-Fi, a kitchenette, washing machine, private bathroom and lift access. Private on-site parking may be available by reservation and extra charges may apply. The beach, seafront promenade, cafes, restaurants and the old town are all easy to reach on foot. A practical choice for guests who want a simple seaside stay with a memorable view.",
      "Ce studio est pensé pour deux personnes, avec un lit double et un canapé-lit pour un hôte supplémentaire. Il comprend climatisation, Wi-Fi gratuit, kitchenette, lave-linge, salle de bain privée et ascenseur. Un parking privé sur place peut être disponible sur réservation avec supplément. La plage, la promenade, les cafés, restaurants et la vieille ville se rejoignent facilement à pied.",
      "Il monolocale è pensato per due ospiti, con letto matrimoniale e divano letto per un ospite extra. Include aria condizionata, Wi-Fi gratuito, angolo cottura, lavatrice, bagno privato e ascensore. Il parcheggio privato può essere disponibile su prenotazione con supplemento. Spiaggia, lungomare, caffè, ristoranti e centro storico sono facilmente raggiungibili a piedi.",
      "Студія розрахована на двох гостей, із двоспальним ліжком і диваном-ліжком для додаткового гостя. Є кондиціонер, безкоштовний Wi‑Fi, мінікухня, пральна машина, приватна ванна кімната та ліфт. Приватне паркування на території може бути доступне за бронюванням і за додаткову плату. Пляж, набережна, кав’ярні, ресторани й старе місто легко доступні пішки.",
    ),
    amenities: [
      localized("Private balcony with sea view", "Balcon privé avec vue mer", "Balcone privato vista mare", "Приватний балкон із видом на море"),
      localized("Air conditioning", "Climatisation", "Aria condizionata", "Кондиціонер"),
      localized("Free Wi-Fi", "Wi-Fi gratuit", "Wi-Fi gratuito", "Безкоштовний Wi‑Fi"),
      localized("Kitchenette", "Kitchenette", "Angolo cottura", "Мінікухня"),
      localized("Washing machine", "Lave-linge", "Lavatrice", "Пральна машина"),
      localized("Private bathroom", "Salle de bain privée", "Bagno privato", "Приватна ванна кімната"),
      localized("Lift access", "Ascenseur", "Ascensore", "Ліфт"),
      localized(
        "Private parking may be available by reservation and extra charges may apply",
        "Parking privé possible sur réservation avec supplément éventuel",
        "Parcheggio privato possibile su prenotazione con eventuale supplemento",
        "Приватне паркування може бути доступне за бронюванням і за додаткову плату",
      ),
    ],
    locationHighlights: [
      localized("Beachfront setting in central Menton", "Adresse en bord de mer dans le centre de Menton", "Posizione fronte mare nel centro di Mentone", "Розташування біля моря в центральному Ментоні"),
      localized("Beach and seafront promenade are easy to reach on foot", "Plage et promenade faciles à rejoindre à pied", "Spiaggia e lungomare facilmente raggiungibili a piedi", "Пляж і набережна легко доступні пішки"),
      localized("Close to cafes, restaurants and the old town", "Proche des cafés, restaurants et de la vieille ville", "Vicino a caffè, ristoranti e centro storico", "Поруч із кав’ярнями, ресторанами та старим містом"),
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
    seoTitle: localized(
      "Beachfront Studio with Balcony & Sea View in Menton | Azur Menton",
      "Studio bord de mer avec balcon et vue mer à Menton | Azur Menton",
      "Monolocale fronte mare con balcone e vista mare a Mentone | Azur Menton",
      "Студія біля моря з балконом і видом на море в Ментоні | Azur Menton",
    ),
    seoDescription: localized(
      "Stay in a bright beachfront studio in Menton with private balcony, sea view, air conditioning, kitchenette and lift access. Ideal for couples looking for a seaside stay.",
      "Séjournez dans un studio lumineux en bord de mer à Menton avec balcon privé, vue mer, climatisation, kitchenette et ascenseur. Idéal pour couples.",
      "Soggiorna in un monolocale luminoso fronte mare a Mentone con balcone privato, vista mare, aria condizionata, angolo cottura e ascensore. Ideale per coppie.",
      "Зупиніться у світлій студії біля моря в Ментоні з приватним балконом, видом на море, кондиціонером, мінікухнею та ліфтом. Ідеально для пар.",
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
    name: localized(
      "Beachside Apartment with Terrace & Parking, Menton",
      "Appartement près de la plage avec terrasse et parking, Menton",
      "Appartamento vicino alla spiaggia con terrazza e parcheggio, Mentone",
      "Апартаменти біля пляжу з терасою та паркуванням, Ментон",
    ),
    shortName: localized("Terrace & Parking Apartment", "Appartement terrasse et parking", "Appartamento con terrazza e parcheggio", "Апартаменти з терасою та паркуванням"),
    tagline: localized(
      "A spacious beachside apartment with private terrace, full kitchen and parking.",
      "Un appartement spacieux près de la plage avec terrasse privée, cuisine complète et parking.",
      "Un appartamento spazioso vicino alla spiaggia con terrazza privata, cucina completa e parcheggio.",
      "Просторі апартаменти біля пляжу з приватною терасою, повною кухнею та паркуванням.",
    ),
    bestFor: localized(
      "Families, two couples, longer stays and guests travelling by car.",
      "Familles, deux couples, séjours plus longs et voyageurs arrivant en voiture.",
      "Famiglie, due coppie, soggiorni più lunghi e ospiti che arrivano in auto.",
      "Сім’ї, дві пари, довші перебування та гості, які подорожують автомобілем.",
    ),
    maxGuests: 4,
    bedrooms: "1 bedroom",
    beds: "1 double bed and 1 sofa bed",
    bathrooms: "1 bathroom",
    sizeSqm: 54,
    keyFeatures: [
      localized("Private terrace", "Terrasse privée", "Terrazza privata", "Приватна тераса"),
      localized("Spacious 54 sqm apartment", "Appartement spacieux de 54 m²", "Appartamento spazioso di 54 m²", "Просторі апартаменти 54 м²"),
      localized("Up to 4 guests", "Jusqu'à 4 personnes", "Fino a 4 ospiti", "До 4 гостей"),
      localized("One bedroom plus living room with sofa bed", "Une chambre et salon avec canapé-lit", "Una camera e soggiorno con divano letto", "Одна спальня та вітальня з диваном-ліжком"),
      localized("Fully equipped kitchen", "Cuisine entièrement équipée", "Cucina completamente attrezzata", "Повністю обладнана кухня"),
      localized("Dishwasher", "Lave-vaisselle", "Lavastoviglie", "Посудомийна машина"),
      localized("Oven", "Four", "Forno", "Духовка"),
      localized("Washing machine", "Lave-linge", "Lavatrice", "Пральна машина"),
      localized("Air conditioning", "Climatisation", "Aria condizionata", "Кондиціонер"),
      localized("Free Wi-Fi", "Wi-Fi gratuit", "Wi-Fi gratuito", "Безкоштовний Wi‑Fi"),
      localized("On-site parking, subject to availability/reservation", "Parking sur place selon disponibilité / réservation", "Parcheggio in loco secondo disponibilità / prenotazione", "Паркування на території за наявності / бронюванням"),
      localized("Beach nearby", "Plage à proximité", "Spiaggia vicina", "Пляж поруч"),
    ],
    description: localized(
      "Enjoy an easy beachside stay in central Menton in this spacious apartment with a private terrace and on-site parking.",
      "Profitez d'un séjour facile près de la plage dans le centre de Menton, dans cet appartement spacieux avec terrasse privée et parking sur place.",
      "Goditi un soggiorno semplice vicino alla spiaggia nel centro di Mentone, in questo appartamento spazioso con terrazza privata e parcheggio in loco.",
      "Насолоджуйтеся зручним перебуванням біля пляжу в центрі Ментона в просторих апартаментах із приватною терасою та паркуванням на території.",
    ),
    longDescription: localized(
      "With one bedroom, a living room with sofa bed and a fully equipped kitchen, it is a comfortable base for a family, two couples or guests planning a longer stay. The apartment includes air conditioning, free Wi-Fi, a washing machine, dishwasher, oven and microwave. The beach is just a short walk away, and cafes, restaurants, shops, the old town and Menton train station can all be reached on foot. This is the most practical apartment in the Azur Menton collection for guests who want space, comfort and convenience close to the sea.",
      "Avec une chambre, un salon avec canapé-lit et une cuisine entièrement équipée, c'est une base confortable pour une famille, deux couples ou un séjour plus long. L'appartement comprend climatisation, Wi-Fi gratuit, lave-linge, lave-vaisselle, four et micro-ondes. La plage est à quelques minutes à pied, et cafés, restaurants, commerces, vieille ville et gare de Menton se rejoignent à pied.",
      "Con una camera, soggiorno con divano letto e cucina completamente attrezzata, è una base comoda per una famiglia, due coppie o un soggiorno più lungo. L'appartamento include aria condizionata, Wi-Fi gratuito, lavatrice, lavastoviglie, forno e microonde. La spiaggia è a pochi minuti a piedi, così come caffè, ristoranti, negozi, centro storico e stazione di Mentone.",
      "З однією спальнею, вітальнею з диваном-ліжком і повністю обладнаною кухнею це зручна база для сім’ї, двох пар або довшого перебування. Є кондиціонер, безкоштовний Wi‑Fi, пральна машина, посудомийна машина, духовка й мікрохвильова піч. Пляж за кілька хвилин пішки, а кав’ярні, ресторани, магазини, старе місто й вокзал Ментона доступні пішки.",
    ),
    amenities: [
      localized("Private terrace", "Terrasse privée", "Terrazza privata", "Приватна тераса"),
      localized("Fully equipped kitchen", "Cuisine entièrement équipée", "Cucina completamente attrezzata", "Повністю обладнана кухня"),
      localized("Dishwasher", "Lave-vaisselle", "Lavastoviglie", "Посудомийна машина"),
      localized("Oven", "Four", "Forno", "Духовка"),
      localized("Microwave", "Micro-ondes", "Microonde", "Мікрохвильова піч"),
      localized("Washing machine", "Lave-linge", "Lavatrice", "Пральна машина"),
      localized("Air conditioning", "Climatisation", "Aria condizionata", "Кондиціонер"),
      localized("Free Wi-Fi", "Wi-Fi gratuit", "Wi-Fi gratuito", "Безкоштовний Wi‑Fi"),
      localized("On-site parking, subject to availability/reservation", "Parking sur place selon disponibilité / réservation", "Parcheggio in loco secondo disponibilità / prenotazione", "Паркування на території за наявності / бронюванням"),
      localized("Private bathroom", "Salle de bain privée", "Bagno privato", "Приватна ванна кімната"),
    ],
    locationHighlights: [
      localized("Beachside central Menton location", "Emplacement central près de la plage à Menton", "Posizione centrale vicino alla spiaggia a Mentone", "Центральне розташування біля пляжу в Ментоні"),
      localized("Beach is just a short walk away", "La plage est à quelques minutes à pied", "La spiaggia è a pochi minuti a piedi", "Пляж за кілька хвилин пішки"),
      localized(
        "Cafes, restaurants, shops, the old town and Menton train station can be reached on foot",
        "Cafés, restaurants, commerces, vieille ville et gare de Menton sont accessibles à pied",
        "Caffè, ristoranti, negozi, centro storico e stazione di Mentone sono raggiungibili a piedi",
        "Кав’ярні, ресторани, магазини, старе місто й вокзал Ментона доступні пішки",
      ),
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
    seoTitle: localized(
      "Beachside Apartment with Terrace & Parking in Menton | Azur Menton",
      "Appartement avec terrasse et parking près de la plage à Menton | Azur Menton",
      "Appartamento con terrazza e parcheggio vicino alla spiaggia a Mentone | Azur Menton",
      "Апартаменти біля пляжу з терасою та паркуванням у Ментоні | Azur Menton",
    ),
    seoDescription: localized(
      "Spacious beachside apartment in central Menton for up to 4 guests, with private terrace, full kitchen, air conditioning and parking by reservation.",
      "Appartement spacieux près de la plage dans le centre de Menton pour 4 personnes, avec terrasse privée, cuisine complète, climatisation et parking sur réservation.",
      "Appartamento spazioso vicino alla spiaggia nel centro di Mentone per 4 ospiti, con terrazza privata, cucina completa, aria condizionata e parcheggio su prenotazione.",
      "Просторі апартаменти біля пляжу в центрі Ментона до 4 гостей, із приватною терасою, повною кухнею, кондиціонером і паркуванням за бронюванням.",
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
    name: localized(
      "Beachfront Studio with Balcony & Panoramic Sea View, Menton",
      "Studio en bord de mer avec balcon et vue mer panoramique, Menton",
      "Monolocale fronte mare con balcone e vista mare panoramica, Mentone",
      "Студія біля моря з балконом і панорамним видом на море, Ментон",
    ),
    shortName: localized("Panoramic Sea View Studio", "Studio vue mer panoramique", "Monolocale vista mare panoramica", "Студія з панорамним видом на море"),
    tagline: localized(
      "A compact beachfront studio where the view is the highlight.",
      "Un studio compact en bord de mer où la vue est le vrai point fort.",
      "Un monolocale compatto fronte mare dove la vista è il vero protagonista.",
      "Компактна студія біля моря, де головна перевага — краєвид.",
    ),
    bestFor: localized(
      "Couples and solo travellers who want a memorable Mediterranean view.",
      "Couples et voyageurs solo qui recherchent une vue mémorable sur la Méditerranée.",
      "Coppie e viaggiatori singoli che vogliono una vista memorabile sul Mediterraneo.",
      "Пари та соло-мандрівники, які хочуть незабутній вид на Середземне море.",
    ),
    maxGuests: 2,
    bedrooms: "Studio",
    beds: "1 double bed",
    bathrooms: "1 bathroom",
    sizeSqm: 25,
    keyFeatures: [
      localized("Panoramic Mediterranean sea view", "Vue panoramique sur la Méditerranée", "Vista panoramica sul Mediterraneo", "Панорамний вид на Середземне море"),
      localized("Private balcony", "Balcon privé", "Balcone privato", "Приватний балкон"),
      localized("Beachfront location", "Emplacement en bord de mer", "Posizione fronte mare", "Розташування біля моря"),
      localized("Ideal for two guests", "Idéal pour deux personnes", "Ideale per due ospiti", "Ідеально для двох гостей"),
      localized("Air conditioning", "Climatisation", "Aria condizionata", "Кондиціонер"),
      localized("Free Wi-Fi", "Wi-Fi gratuit", "Wi-Fi gratuito", "Безкоштовний Wi‑Fi"),
      localized("Equipped kitchenette", "Kitchenette équipée", "Angolo cottura attrezzato", "Обладнана мінікухня"),
      localized("Washing machine", "Lave-linge", "Lavatrice", "Пральна машина"),
      localized("Private bathroom", "Salle de bain privée", "Bagno privato", "Приватна ванна кімната"),
      localized("Close to beach, cafes and old town", "Proche de la plage, des cafés et de la vieille ville", "Vicino a spiaggia, caffè e centro storico", "Поруч із пляжем, кав’ярнями та старим містом"),
    ],
    description: localized(
      "Wake up to a wide Mediterranean view from this bright beachfront studio in Menton. The apartment has a balcony with sea view, making it a simple and comfortable place for breakfast, reading or an evening drink by the water.",
      "Réveillez-vous face à une large vue sur la Méditerranée dans ce studio lumineux en bord de mer à Menton. Le balcon avec vue mer en fait un lieu simple et agréable pour le petit-déjeuner, la lecture ou un verre le soir.",
      "Svegliati davanti a un'ampia vista sul Mediterraneo in questo monolocale luminoso fronte mare a Mentone. Il balcone vista mare è un posto semplice e piacevole per colazione, lettura o un drink serale sull'acqua.",
      "Прокидайтеся з широким видом на Середземне море у цій світлій студії біля моря в Ментоні. Балкон із видом на море робить її зручною для сніданку, читання або вечірнього напою біля води.",
    ),
    longDescription: localized(
      "The studio is designed for two guests and includes air conditioning, free Wi-Fi, an equipped kitchenette, a washing machine and a private bathroom. The beach, seafront promenade, cafes, restaurants and the old town are all easy to reach on foot. A practical choice for couples or solo travellers who want an easy seaside stay with a memorable view.",
      "Le studio est prévu pour deux personnes et comprend climatisation, Wi-Fi gratuit, kitchenette équipée, lave-linge et salle de bain privée. La plage, la promenade, les cafés, restaurants et la vieille ville se rejoignent facilement à pied. Un choix pratique pour couples ou voyageurs solo qui veulent un séjour simple au bord de mer avec une vue mémorable.",
      "Il monolocale è pensato per due ospiti e include aria condizionata, Wi-Fi gratuito, angolo cottura attrezzato, lavatrice e bagno privato. Spiaggia, lungomare, caffè, ristoranti e centro storico sono facilmente raggiungibili a piedi. Una scelta pratica per coppie o viaggiatori singoli che desiderano un soggiorno semplice sul mare con una vista memorabile.",
      "Студія розрахована на двох гостей і має кондиціонер, безкоштовний Wi‑Fi, обладнану мінікухню, пральну машину та приватну ванну кімнату. Пляж, набережна, кав’ярні, ресторани й старе місто легко доступні пішки. Практичний вибір для пар або соло-мандрівників, яким потрібне просте морське перебування з незабутнім видом.",
    ),
    amenities: [
      localized("Private balcony", "Balcon privé", "Balcone privato", "Приватний балкон"),
      localized("Air conditioning", "Climatisation", "Aria condizionata", "Кондиціонер"),
      localized("Free Wi-Fi", "Wi-Fi gratuit", "Wi-Fi gratuito", "Безкоштовний Wi‑Fi"),
      localized("Equipped kitchenette", "Kitchenette équipée", "Angolo cottura attrezzato", "Обладнана мінікухня"),
      localized("Washing machine", "Lave-linge", "Lavatrice", "Пральна машина"),
      localized("Private bathroom", "Salle de bain privée", "Bagno privato", "Приватна ванна кімната"),
    ],
    locationHighlights: [
      localized("Beachfront central Menton setting", "Adresse centrale en bord de mer à Menton", "Posizione centrale fronte mare a Mentone", "Центральне розташування біля моря в Ментоні"),
      localized("Close to the beach and seafront promenade", "Proche de la plage et de la promenade", "Vicino alla spiaggia e al lungomare", "Поруч із пляжем і набережною"),
      localized("Cafes, restaurants and the old town are easy to reach on foot", "Cafés, restaurants et vieille ville accessibles à pied", "Caffè, ristoranti e centro storico raggiungibili a piedi", "Кав’ярні, ресторани й старе місто легко доступні пішки"),
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
        src: `${panoramicSeaViewImagePath}/02-balcony-harbour-view.png`,
        alt: enFallback("Balcony view toward the beach, harbour and Mediterranean sea in Menton"),
        caption: enFallback("Balcony view toward the harbour"),
        category: "balcony",
        priority: true,
      },
      {
        src: `${panoramicSeaViewImagePath}/03-balcony-seafront-view.png`,
        alt: enFallback("Wide seafront and Mediterranean view from the apartment balcony"),
        caption: enFallback("Wide seafront view from the balcony"),
        category: "view",
      },
      {
        src: `${panoramicSeaViewImagePath}/04-kitchenette-dining-corner.png`,
        alt: enFallback("Kitchenette and compact dining corner in the panoramic sea view studio"),
        caption: enFallback("Kitchenette and dining corner"),
        category: "kitchen",
      },
      {
        src: `${panoramicSeaViewImagePath}/05-bathroom-washing-machine.png`,
        alt: enFallback("Private bathroom with sink, shower and washing machine"),
        caption: enFallback("Private bathroom with washing machine"),
        category: "bathroom",
      },
      {
        src: `${panoramicSeaViewImagePath}/06-bright-studio-double-bed.png`,
        alt: enFallback("Compact bright studio with double bed and balcony access"),
        caption: enFallback("Bright studio with double bed"),
        category: "bedroom",
      },
      {
        src: `${panoramicSeaViewImagePath}/07-kitchen-dining-area.png`,
        alt: enFallback("Equipped kitchenette with sink, stovetop and storage in the sea view studio"),
        caption: enFallback("Equipped kitchenette for simple meals"),
        category: "kitchen",
      },
      {
        src: `${panoramicSeaViewImagePath}/08-bathroom-shower.png`,
        alt: enFallback("Private bathroom shower in the panoramic sea view studio"),
        caption: enFallback("Bathroom with shower"),
        category: "bathroom",
      },
      {
        src: `${panoramicSeaViewImagePath}/09-harbour-sea-view.png`,
        alt: enFallback("Mediterranean sea and harbour view from the apartment balcony"),
        caption: enFallback("Mediterranean view towards the harbour"),
        category: "view",
      },
      {
        src: `${panoramicSeaViewImagePath}/10-seafront-mountain-view.png`,
        alt: enFallback("View of Menton seafront, palm trees and mountains near the apartment"),
        caption: enFallback("Seafront and mountain view"),
        category: "location",
      },
      {
        src: `${panoramicSeaViewImagePath}/11-balcony-marina-view.png`,
        alt: enFallback("Balcony view over palm trees, marina and the Mediterranean"),
        caption: enFallback("Balcony view over the marina"),
        category: "view",
      },
      {
        src: `${panoramicSeaViewImagePath}/12-menton-old-town-nearby.png`,
        alt: enFallback("Colourful old town buildings and church tower in Menton"),
        caption: enFallback("Menton old town nearby"),
        category: "location",
      },
      {
        src: `${panoramicSeaViewImagePath}/13-entry-sea-view.png`,
        alt: enFallback("Interior view from the entry area toward the sea-facing window"),
        caption: enFallback("Interior view toward the sea"),
        category: "living",
      },
      {
        src: `${panoramicSeaViewImagePath}/14-evening-mediterranean-colours.png`,
        alt: enFallback("Evening colours over the Mediterranean sea near Menton"),
        caption: enFallback("Evening colours over the Mediterranean"),
        category: "view",
      },
      {
        src: `${panoramicSeaViewImagePath}/15-additional-sea-view.png`,
        alt: enFallback("Vertical Mediterranean sea view from the apartment with boats and palm trees"),
        caption: enFallback("Additional sea view from the apartment"),
        category: "view",
      },
      {
        src: `${panoramicSeaViewImagePath}/16-living-room-sea-view.png`,
        alt: enFallback("Living area with sofa, TV and wide sea view through the balcony doors"),
        caption: enFallback("Living area with sea view"),
        category: "living",
      },
    ],
    seoTitle: localized(
      "Beachfront Studio with Panoramic Sea View in Menton | Azur Menton",
      "Studio en bord de mer avec vue panoramique à Menton | Azur Menton",
      "Monolocale fronte mare con vista panoramica a Mentone | Azur Menton",
      "Студія біля моря з панорамним видом у Ментоні | Azur Menton",
    ),
    seoDescription: localized(
      "Compact beachfront studio in Menton with balcony and panoramic Mediterranean sea view. Ideal for couples looking for a simple seaside stay close to the beach.",
      "Studio compact en bord de mer à Menton avec balcon et vue panoramique sur la Méditerranée. Idéal pour couples cherchant un séjour simple près de la plage.",
      "Monolocale compatto fronte mare a Mentone con balcone e vista panoramica sul Mediterraneo. Ideale per coppie che cercano un soggiorno semplice vicino alla spiaggia.",
      "Компактна студія біля моря в Ментоні з балконом і панорамним видом на Середземне море. Ідеально для пар, які шукають просте перебування біля пляжу.",
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
