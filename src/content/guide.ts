import type { Locale } from "@/i18n/locales";

export type RelatedLink = {
  label: string;
  href: string;
};

export type GuideSection = {
  heading: string;
  body: string[];
  bullets?: string[];
  relatedApartmentKeys?: string[];
};

export type GuidePageContent = {
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  intro: string;
  heroImage?: string;
  sections: GuideSection[];
  practicalTips?: string[];
  relatedLinks: RelatedLink[];
  cta: {
    title: string;
    text: string;
    primaryLabel: string;
    secondaryLabel?: string;
  };
};

export type GuideLandingContent = {
  title: string;
  seoTitle: string;
  seoDescription: string;
  intro: string;
  sections: GuideSection[];
  cta: {
    title: string;
    primaryLabel: string;
    secondaryLabel: string;
  };
};

const translationDraft = (pageTitle: string): GuidePageContent => ({
  slug: "",
  title: `TODO_TRANSLATE: ${pageTitle}`,
  seoTitle: `TODO_TRANSLATE: ${pageTitle}`,
  seoDescription:
    "TODO_TRANSLATE: Translate this Menton guide page from the English source before publication.",
  intro:
    "TODO_TRANSLATE: English source content is available. Add a natural local-language version before final launch.",
  sections: [
    {
      heading: "TODO_TRANSLATE",
      body: [
        "TODO_TRANSLATE: Keep the same structure as the English source. Do not add exact transport times, prices or opening hours unless sourced.",
      ],
    },
  ],
  practicalTips: [
    "TODO_TRANSLATE: Add practical tips from the English source.",
  ],
  relatedLinks: [],
  cta: {
    title: "TODO_TRANSLATE: Stay by the sea in central Menton",
    text: "TODO_TRANSLATE: Send your dates and we will confirm availability manually.",
    primaryLabel: "Check availability",
    secondaryLabel: "View apartments",
  },
});

export const guideLanding: Record<Locale, GuideLandingContent> = {
  en: {
    title: "Menton guide: beaches, old town and Riviera day trips",
    seoTitle: "Menton Guide: Beaches, Old Town and Riviera Day Trips",
    seoDescription:
      "Plan an easy seaside stay in Menton with practical notes on beaches, the old town, car-free travel, day trips and where to stay.",
    intro:
      "Plan an easy seaside stay in Menton, from morning walks by the beach to colourful old-town streets and day trips to Monaco, Nice and the Italian Riviera.",
    sections: [
      {
        heading: "Why stay in Menton",
        body: [
          "Menton works well for travellers who want the Riviera without making every day complicated. The centre is walkable, the seafront is part of daily life, and nearby towns are close enough for day trips.",
        ],
      },
      {
        heading: "Best areas to stay",
        body: [
          "For a short seaside stay, central beachfront or beachside streets are the most practical. You can step out for the promenade, reach cafes easily and still get back to the apartment between beach time and dinner.",
        ],
      },
      {
        heading: "Beaches and seafront walks",
        body: [
          "Beach days in Menton can be very simple: morning coffee, a walk along the promenade, time by the water, then an evening return when the light softens.",
        ],
      },
      {
        heading: "Old town, markets and cafes",
        body: [
          "The old town is best explored slowly, on foot. It adds colour and texture to a beach stay, especially if you like small streets, simple meals and views back toward the sea.",
        ],
      },
      {
        heading: "Getting around without a car",
        body: [
          "Central Menton is a good base without a car. A car can still help for hill villages, family luggage or flexible touring, but it is not essential for beach, promenade and old-town days.",
        ],
      },
      {
        heading: "Day trips from Menton",
        body: [
          "Monaco, Nice and the Italian Riviera all fit naturally into a Menton stay. Check current transport before travel and keep plans flexible in busy seasons.",
        ],
      },
      {
        heading: "When to visit Menton",
        body: [
          "Spring and autumn are often appealing for walks and day trips. Summer is beach-focused and busier. Event periods can be lively, so it is better to request dates early.",
        ],
      },
      {
        heading: "Where Azur Menton apartments fit best",
        body: [
          "Azur Menton is built around three practical central stays: two sea-view balcony studios for couples and a larger beachside apartment with terrace and parking for families or longer stays.",
        ],
        relatedApartmentKeys: [
          "sea-view-balcony-studio",
          "beachside-family-apartment",
          "panoramic-sea-view-studio",
        ],
      },
    ],
    cta: {
      title: "Stay by the sea in central Menton",
      primaryLabel: "View apartments",
      secondaryLabel: "Check availability",
    },
  },
  fr: {
    title: "TODO_TRANSLATE: Guide de Menton: plages, vieille ville et excursions sur la Riviera",
    seoTitle: "TODO_TRANSLATE: Guide de Menton",
    seoDescription: "TODO_TRANSLATE: Translate the English guide landing page before final launch.",
    intro:
      "TODO_TRANSLATE: Planifiez un sejour facile au bord de la mer a Menton, avec plages, vieille ville et excursions sur la Riviera.",
    sections: [],
    cta: {
      title: "TODO_TRANSLATE: Sejourner pres de la mer a Menton centre",
      primaryLabel: "Voir les appartements",
      secondaryLabel: "Verifier disponibilite",
    },
  },
  it: {
    title: "TODO_TRANSLATE: Guida di Mentone: spiagge, centro storico e gite sulla Riviera",
    seoTitle: "TODO_TRANSLATE: Guida di Mentone",
    seoDescription: "TODO_TRANSLATE: Translate the English guide landing page before final launch.",
    intro:
      "TODO_TRANSLATE: Pianifica un soggiorno facile sul mare a Mentone, tra spiagge, centro storico e gite in Riviera.",
    sections: [],
    cta: {
      title: "TODO_TRANSLATE: Soggiornare vicino al mare nel centro di Mentone",
      primaryLabel: "Vedi appartamenti",
      secondaryLabel: "Controlla disponibilita",
    },
  },
  uk: {
    title: "TODO_TRANSLATE: Menton guide: beaches, old town and Riviera day trips",
    seoTitle: "TODO_TRANSLATE: Menton Guide",
    seoDescription: "TODO_TRANSLATE: Translate the English guide landing page before final launch.",
    intro:
      "TODO_TRANSLATE: Plan an easy seaside stay in Menton with beaches, old town walks and Riviera day trips.",
    sections: [],
    cta: {
      title: "TODO_TRANSLATE: Stay by the sea in central Menton",
      primaryLabel: "View apartments",
      secondaryLabel: "Check availability",
    },
  },
};

const guidePagesEn: GuidePageContent[] = [
  {
    slug: "best-beaches-in-menton",
    title: "Best beaches in Menton for an easy seaside stay",
    seoTitle: "Best beaches in Menton near Azur Menton apartments",
    seoDescription:
      "A practical guide to Menton beaches, seafront walks and where to stay close to the Mediterranean.",
    intro:
      "Menton's beaches are one of the main reasons to stay here. The useful question is not only which beach to visit, but how easy it is to move between the water, the apartment, cafes and evening walks.",
    sections: [
      {
        heading: "Beachfront and beachside stays",
        body: [
          "Staying close to the seafront changes the rhythm of a Menton trip. You can go out early, come back for a rest, and return later without planning the whole day around transport.",
          "Azur Menton focuses on this simple advantage: apartments that keep the sea, promenade and central streets within easy reach.",
        ],
        relatedApartmentKeys: [
          "sea-view-balcony-studio",
          "beachside-family-apartment",
          "panoramic-sea-view-studio",
        ],
      },
      {
        heading: "Sablettes area",
        body: [
          "The Sablettes area is one of Menton's most recognisable seafront places. It suits slow walks, photos, relaxed beach time and easy access toward the old town.",
          "Services and beach setup can change by season, so check locally when you arrive rather than relying on fixed assumptions.",
        ],
      },
      {
        heading: "Central seafront and promenade",
        body: [
          "The central seafront is ideal for simple routines: coffee near the water, a morning walk, a swim when conditions are good, and an evening promenade before dinner.",
          "Summer can be busy, especially around weekends and events. Travelling slightly outside peak hours often makes the beach feel calmer.",
        ],
      },
    ],
    practicalTips: [
      "Bring beach shoes if you prefer extra comfort on pebbles or mixed surfaces.",
      "Check seasonal beach services locally before relying on loungers, showers or lifeguard arrangements.",
      "Summer can be busy; request dates early if you want a central beachside apartment.",
      "Sea conditions can vary, so use local judgment before swimming.",
    ],
    relatedLinks: [
      { label: "Where to stay in Menton", href: "/guide/where-to-stay-in-menton" },
      { label: "Menton without a car", href: "/guide/menton-without-a-car" },
    ],
    cta: {
      title: "Stay close to the beach",
      text: "Choose a sea-view studio or a larger beachside apartment and keep beach days simple.",
      primaryLabel: "Check availability",
      secondaryLabel: "View apartments",
    },
  },
  {
    slug: "menton-old-town",
    title: "Menton old town: colourful streets, sea views and slow walks",
    seoTitle: "Menton old town guide | Walks, views and where to stay nearby",
    seoDescription:
      "Explore Menton old town, colourful streets, seafront walks and easy access from Azur Menton apartments.",
    intro:
      "Menton old town is best approached without rushing. Walk up from the seafront, follow the colour and shade, and leave room for a cafe stop or a quiet view back toward the water.",
    sections: [
      {
        heading: "Colour, texture and atmosphere",
        body: [
          "The old town gives Menton its strongest sense of place: warm facades, narrow streets, steps, small shops and glimpses of the Mediterranean between buildings.",
          "It is especially good for couples, photographers and slow travellers who prefer wandering to checking off attractions.",
        ],
      },
      {
        heading: "From seafront to old town",
        body: [
          "One of the pleasures of central Menton is moving from the beach promenade toward the old town on foot. The change from open seafront to shaded streets makes the town feel varied without needing a car.",
        ],
      },
      {
        heading: "Around Basilique Saint-Michel",
        body: [
          "The area around Basilique Saint-Michel is one of the visual anchors of the old town. This guide keeps historical detail light until sourced notes are added, but the area is worth including in an unhurried walk.",
        ],
      },
      {
        heading: "Stay near both beach and old town",
        body: [
          "Azur Menton apartments are positioned for guests who want the practical combination: beach time, old-town walks and central cafes without turning each outing into a transfer.",
        ],
        relatedApartmentKeys: ["sea-view-balcony-studio", "panoramic-sea-view-studio"],
      },
    ],
    practicalTips: [
      "Wear comfortable shoes; old-town walks can include steps and uneven streets.",
      "Go early or later in the day for softer light and calmer streets.",
      "Keep plans flexible: the best old-town moments are often small detours.",
    ],
    relatedLinks: [
      { label: "Best beaches in Menton", href: "/guide/best-beaches-in-menton" },
      { label: "Day trips from Menton", href: "/guide/day-trips-from-menton" },
    ],
    cta: {
      title: "Stay near the beach and old town",
      text: "Send your dates and we will help you choose the right apartment for your Menton stay.",
      primaryLabel: "Tell us your dates",
      secondaryLabel: "View apartments",
    },
  },
  {
    slug: "how-to-get-to-menton-from-nice-airport",
    title: "How to get to Menton from Nice Airport",
    seoTitle: "How to get from Nice Airport to Menton | Azur Menton guide",
    seoDescription:
      "Practical options for reaching Menton from Nice Airport by train, car, taxi or transfer.",
    intro:
      "Menton is accessible from Nice Cote d'Azur Airport, but the best route depends on luggage, arrival time, budget and whether you plan to use a car during the stay.",
    sections: [
      {
        heading: "Train",
        body: [
          "Train travel is often a practical option for guests who want to avoid driving on arrival. Check current routes, connections and ticket details before travel, because schedules and works can change.",
          "If you stay in central Menton, many everyday plans can then be handled on foot.",
        ],
      },
      {
        heading: "Car rental",
        body: [
          "A car can help for families, luggage, hill villages or a wider Riviera itinerary. It also makes parking arrangements more important, so mention this in your booking request.",
          "The Terrace & Parking Apartment is the clearest fit for guests travelling by car. Parking for the studios may be available by reservation and may involve extra charges.",
        ],
        relatedApartmentKeys: ["beachside-family-apartment"],
      },
      {
        heading: "Taxi, private transfer or coach",
        body: [
          "Taxi or private transfer can be the simplest arrival choice when travelling late, with children or with heavier luggage. Bus or coach options may be available depending on the season and route, but check current information before relying on them.",
        ],
      },
    ],
    practicalTips: [
      "Check transport times and routes shortly before travel.",
      "Tell the host if you expect a late arrival or need parking advice.",
      "Central Menton can be enjoyed without a car once you arrive.",
    ],
    relatedLinks: [
      { label: "Menton without a car", href: "/guide/menton-without-a-car" },
      { label: "Where to stay in Menton", href: "/guide/where-to-stay-in-menton" },
    ],
    cta: {
      title: "Need arrival advice?",
      text: "Send your dates, arrival plan and parking needs. We will reply with practical guidance.",
      primaryLabel: "Tell us your dates",
      secondaryLabel: "Compare apartments",
    },
  },
  {
    slug: "menton-without-a-car",
    title: "Menton without a car: how to enjoy the town on foot",
    seoTitle: "Menton without a car | Beach, old town and day trips",
    seoDescription:
      "Stay in central Menton and enjoy beaches, cafes, old town and nearby Riviera towns without relying on a car.",
    intro:
      "A central Menton stay can work very well without a car. The key is choosing a base where the beach, promenade, cafes, old town and station are all manageable parts of the same trip.",
    sections: [
      {
        heading: "Why central Menton helps",
        body: [
          "When you stay centrally, the day can stay flexible. You can walk to the beach, return to the apartment, go out again for the old town and keep dinner plans simple.",
        ],
      },
      {
        heading: "Beach, promenade, cafes and old town",
        body: [
          "The most useful Menton experiences are close together: seaside walks, coffee stops, market atmosphere and old-town wandering. You do not need a car for that core rhythm.",
        ],
        relatedApartmentKeys: [
          "sea-view-balcony-studio",
          "beachside-family-apartment",
          "panoramic-sea-view-studio",
        ],
      },
      {
        heading: "Day trips by train",
        body: [
          "Train access makes nearby Riviera towns possible without driving, but exact routes and schedules should always be checked before travel.",
        ],
      },
      {
        heading: "When a car helps",
        body: [
          "A car can still be useful for hill villages, more flexible family travel, supermarket runs, luggage or a wider itinerary. If you are arriving by car, ask about parking before confirming.",
        ],
      },
    ],
    practicalTips: [
      "Pack for walking: comfortable shoes matter more than formal plans.",
      "Check train options before day trips.",
      "Ask about parking early if you decide to bring a car.",
    ],
    relatedLinks: [
      { label: "How to get to Menton from Nice Airport", href: "/guide/how-to-get-to-menton-from-nice-airport" },
      { label: "Day trips from Menton", href: "/guide/day-trips-from-menton" },
    ],
    cta: {
      title: "Choose a central base",
      text: "All Azur Menton apartments are positioned for easy beach and town access.",
      primaryLabel: "View apartments",
      secondaryLabel: "Check availability",
    },
  },
  {
    slug: "day-trips-from-menton",
    title: "Best day trips from Menton: Monaco, Nice and the Italian Riviera",
    seoTitle: "Day trips from Menton | Monaco, Nice, Italy and Riviera towns",
    seoDescription:
      "Use Menton as a calm seaside base for day trips to Monaco, Nice, Eze, Ventimiglia, Sanremo and the Riviera.",
    intro:
      "Menton is a calm base for exploring both sides of the Riviera. You can spend the day in Monaco, Nice or Italy, then return to a quieter beachside apartment in the evening.",
    sections: [
      {
        heading: "Monaco",
        body: [
          "Monaco is one of the most obvious day trips from Menton. It can be busy during major events, so check access and transport before you go.",
        ],
      },
      {
        heading: "Nice",
        body: [
          "Nice offers a bigger city day: museums, shopping, long promenades and restaurants. It pairs well with a calmer return to Menton.",
        ],
      },
      {
        heading: "Eze",
        body: [
          "Eze is a classic Riviera stop, especially for guests who like dramatic views and village streets. It can involve more planning than a simple seaside walk, so check routes before travel.",
        ],
      },
      {
        heading: "Ventimiglia and Sanremo",
        body: [
          "Crossing into Italy changes the feeling of the trip quickly. Ventimiglia and Sanremo are useful ideas for guests who want an Italian Riviera day without changing base.",
        ],
      },
      {
        heading: "Return to a beachside base",
        body: [
          "After a day trip, the practical value of Menton is simple: you come back to the sea, the promenade and a smaller town rhythm.",
        ],
        relatedApartmentKeys: [
          "sea-view-balcony-studio",
          "beachside-family-apartment",
          "panoramic-sea-view-studio",
        ],
      },
    ],
    practicalTips: [
      "Check train and road conditions before travel.",
      "Avoid planning too many stops in one day.",
      "During major Riviera events, request accommodation early.",
    ],
    relatedLinks: [
      { label: "Monaco Grand Prix weekend", href: "/events/monaco-grand-prix" },
      { label: "Where to stay in Menton", href: "/guide/where-to-stay-in-menton" },
    ],
    cta: {
      title: "Return to Menton after the day trip",
      text: "Use a central beachside apartment as a practical base for the Riviera.",
      primaryLabel: "Check availability",
      secondaryLabel: "View apartments",
    },
  },
  {
    slug: "where-to-stay-in-menton",
    title: "Where to stay in Menton: beachfront, old town or near the station?",
    seoTitle: "Where to stay in Menton | Beachfront vs old town vs station area",
    seoDescription:
      "Compare Menton neighbourhoods and find the best area for beach stays, old-town walks, families and car-free travel.",
    intro:
      "Where you stay in Menton shapes the whole trip. The best choice depends on whether you care most about the sea, old-town atmosphere, transport, parking or space.",
    sections: [
      {
        heading: "Beachfront and seafront",
        body: [
          "Best for guests who want beach access, promenade walks and a strong seaside feeling. This is the clearest fit for couples who want a balcony and view.",
        ],
        relatedApartmentKeys: ["sea-view-balcony-studio", "panoramic-sea-view-studio"],
      },
      {
        heading: "Old town",
        body: [
          "Best for character, colour and atmosphere. It is appealing if you like slow walks and small streets, but check access carefully if stairs or luggage are a concern.",
        ],
      },
      {
        heading: "Near the station",
        body: [
          "Best for transport convenience, especially if day trips are the main goal. For beach-first stays, many guests still prefer being closer to the seafront.",
        ],
      },
      {
        heading: "Garavan",
        body: [
          "Garavan can feel quieter and scenic, depending on the exact location. It may suit guests who prefer a calmer edge of town, but central access should be checked against your plans.",
        ],
      },
      {
        heading: "Why Azur Menton works",
        body: [
          "Azur Menton is centred on practical beachside stays: the Sea View Balcony Studio for couples, the Panoramic Sea View Studio for view-first trips, and the Terrace & Parking Apartment for families or longer stays.",
        ],
        relatedApartmentKeys: [
          "sea-view-balcony-studio",
          "panoramic-sea-view-studio",
          "beachside-family-apartment",
        ],
      },
    ],
    practicalTips: [
      "Choose beachfront or seafront if the beach is the main reason for the trip.",
      "Choose more space and parking if travelling as a family or by car.",
      "Choose central access if you want Menton without a car.",
    ],
    relatedLinks: [
      { label: "Best beaches in Menton", href: "/guide/best-beaches-in-menton" },
      { label: "Menton without a car", href: "/guide/menton-without-a-car" },
    ],
    cta: {
      title: "Find the right Menton base",
      text: "Compare the three Azur Menton apartments and send a request when your dates are ready.",
      primaryLabel: "View apartments",
      secondaryLabel: "Tell us your dates",
    },
  },
];

export const guidePages: Record<Locale, GuidePageContent[]> = {
  en: guidePagesEn,
  fr: guidePagesEn.map((page) => ({ ...translationDraft(page.title), slug: page.slug })),
  it: guidePagesEn.map((page) => ({ ...translationDraft(page.title), slug: page.slug })),
  uk: guidePagesEn.map((page) => ({ ...translationDraft(page.title), slug: page.slug })),
};

export function getGuidePage(locale: Locale, slug: string) {
  return guidePages[locale].find((page) => page.slug === slug);
}
