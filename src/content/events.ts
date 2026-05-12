import type { Locale } from "@/i18n/locales";
import type { GuideSection, RelatedLink } from "@/content/guide";

export type EventPageContent = {
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  intro: string;
  eventType: string;
  location: string;
  expectedSeason: string;
  exactDates?: string;
  sourceUrl?: string;
  sections: GuideSection[];
  bookingTips: string[];
  relatedApartmentKeys: string[];
  relatedLinks: RelatedLink[];
  cta: {
    title: string;
    text: string;
    primaryLabel: string;
    secondaryLabel?: string;
  };
};

export type EventsLandingContent = {
  title: string;
  seoTitle: string;
  seoDescription: string;
  intro: string;
  sections: GuideSection[];
  cards: Array<{
    title: string;
    description: string;
    href?: string;
    expectedSeason: string;
  }>;
};

const translationDraft = (pageTitle: string): EventPageContent => ({
  slug: "",
  title: `TODO_TRANSLATE: ${pageTitle}`,
  seoTitle: `TODO_TRANSLATE: ${pageTitle}`,
  seoDescription:
    "TODO_TRANSLATE: Translate this events page from the English source before publication.",
  intro:
    "TODO_TRANSLATE: English source content is available. Do not add exact event dates unless sourced.",
  eventType: "TODO_TRANSLATE",
  location: "Menton and nearby Riviera",
  expectedSeason: "TODO",
  exactDates: undefined,
  sourceUrl: undefined,
  sections: [
    {
      heading: "TODO_TRANSLATE",
      body: [
        "TODO_TRANSLATE: Keep the same structure as the English source. Do not invent exact dates, ticket rules, routes or access restrictions.",
      ],
    },
  ],
  bookingTips: ["TODO_TRANSLATE: Add booking tips from the English source."],
  relatedApartmentKeys: [
    "sea-view-balcony-studio",
    "beachside-family-apartment",
    "panoramic-sea-view-studio",
  ],
  relatedLinks: [],
  cta: {
    title: "TODO_TRANSLATE: Visiting for an event?",
    text: "TODO_TRANSLATE: Send your dates early and we will confirm availability manually.",
    primaryLabel: "Check availability",
    secondaryLabel: "View apartments",
  },
});

export const eventsLanding: Record<Locale, EventsLandingContent> = {
  en: {
    title: "Events in Menton and nearby",
    seoTitle: "Events in Menton and nearby | When to book a beachside apartment",
    seoDescription:
      "Plan your Menton stay around the Lemon Festival, summer events, Monaco weekends and Riviera day trips.",
    intro:
      "Menton is calm and seaside-focused most of the year, but the calendar becomes especially lively during the Lemon Festival, summer evenings and major Riviera weekends. Use this guide to decide when to stay by the sea.",
    sections: [
      {
        heading: "Why events matter for booking early",
        body: [
          "Busy Riviera periods can affect availability, parking and arrival plans. If your dates overlap with a major event, request accommodation earlier and mention how you plan to arrive.",
        ],
      },
      {
        heading: "Menton Lemon Festival",
        body: [
          "The Lemon Festival is Menton's signature seasonal event. Exact dates, routes and access details should be checked through official sources before travel.",
        ],
      },
      {
        heading: "Summer in Menton",
        body: [
          "Summer is beach-focused: longer evenings, busier restaurants, promenade walks and more demand for air-conditioned apartments close to the sea.",
        ],
      },
      {
        heading: "Monaco events and Grand Prix weekends",
        body: [
          "Major Monaco weekends can increase demand across the Riviera. Menton can work as a calmer base, but transport and access should be checked early.",
        ],
      },
      {
        heading: "Nice and wider Riviera events",
        body: [
          "Nice, Monaco and nearby towns add cultural and seasonal reasons to visit, but Menton keeps the stay grounded by the sea.",
        ],
      },
      {
        heading: "Italian Riviera markets and day trips",
        body: [
          "Italian Riviera day trips can add a different rhythm to a Menton stay. Check transport and market information close to travel dates.",
        ],
      },
      {
        heading: "Tips for booking during busy dates",
        body: [
          "Request dates early, confirm parking needs, avoid assuming instant availability and ask the host for practical arrival advice.",
        ],
      },
    ],
    cards: [
      {
        title: "Menton Lemon Festival",
        description: "A signature annual Menton event that can make central stays especially useful.",
        href: "/events/menton-lemon-festival",
        expectedSeason: "February / March",
      },
      {
        title: "Monaco Grand Prix",
        description: "A major Riviera weekend where Menton can be a calmer seaside base.",
        href: "/events/monaco-grand-prix",
        expectedSeason: "May",
      },
      {
        title: "Summer evenings on the Riviera",
        description: "Beach days, promenade walks, restaurants and nearby seasonal events.",
        href: "/events/summer-events-on-the-riviera",
        expectedSeason: "July and August",
      },
      {
        title: "Italian Riviera day trips",
        description: "Evergreen day-trip ideas across the border, without changing base.",
        expectedSeason: "Year-round",
      },
      {
        title: "Christmas and winter stays in Menton",
        description: "A quieter seaside stay with town walks and winter light.",
        expectedSeason: "Winter",
      },
    ],
  },
  fr: {
    title: "TODO_TRANSLATE: Evenements a Menton et aux alentours",
    seoTitle: "TODO_TRANSLATE: Evenements a Menton et aux alentours",
    seoDescription: "TODO_TRANSLATE: Translate the English events landing page before final launch.",
    intro:
      "TODO_TRANSLATE: Menton reste calme et tournee vers la mer, mais certaines periodes deviennent plus animees.",
    sections: [],
    cards: [],
  },
  it: {
    title: "TODO_TRANSLATE: Eventi a Mentone e dintorni",
    seoTitle: "TODO_TRANSLATE: Eventi a Mentone e dintorni",
    seoDescription: "TODO_TRANSLATE: Translate the English events landing page before final launch.",
    intro:
      "TODO_TRANSLATE: Mentone e tranquilla e legata al mare, ma alcune periodi sono piu vivaci.",
    sections: [],
    cards: [],
  },
  uk: {
    title: "TODO_TRANSLATE: Events in Menton and nearby",
    seoTitle: "TODO_TRANSLATE: Events in Menton and nearby",
    seoDescription: "TODO_TRANSLATE: Translate the English events landing page before final launch.",
    intro:
      "TODO_TRANSLATE: Menton is calm and seaside-focused most of the year, with livelier event periods.",
    sections: [],
    cards: [],
  },
};

const eventPagesEn: EventPageContent[] = [
  {
    slug: "menton-lemon-festival",
    title: "Menton Lemon Festival: where to stay by the sea",
    seoTitle: "Menton Lemon Festival accommodation | Stay by the sea with Azur Menton",
    seoDescription:
      "Plan a stay for Menton's Lemon Festival with beachside apartments close to the seafront, old town and event atmosphere.",
    intro:
      "The Menton Lemon Festival is one of the town's signature annual events. It can make the centre livelier and busier, so accommodation and arrival planning matter more than usual.",
    eventType: "Annual town festival",
    location: "Menton",
    expectedSeason: "February / March",
    sections: [
      {
        heading: "Why stay centrally",
        body: [
          "During festival periods, central accommodation can reduce the need for extra transfers. You are closer to the seafront, old town and event atmosphere, while still having a private base to return to.",
        ],
      },
      {
        heading: "Balconies and views",
        body: [
          "A sea-view balcony can feel especially atmospheric during a lively Menton stay. This does not mean parade views are guaranteed; event routes and views should only be confirmed from official information or direct host advice.",
        ],
        relatedApartmentKeys: ["sea-view-balcony-studio", "panoramic-sea-view-studio"],
      },
      {
        heading: "Access and traffic",
        body: [
          "Access, parking and traffic rules may change during festival periods. Guests should check official information before arrival and tell the host if they are travelling by car.",
        ],
        relatedApartmentKeys: ["beachside-family-apartment"],
      },
    ],
    bookingTips: [
      "Book earlier than for normal off-season dates.",
      "Confirm parking and arrival access if travelling by car.",
      "Expect busier streets and restaurants.",
      "Ask the host for practical arrival advice before travel.",
    ],
    relatedApartmentKeys: [
      "sea-view-balcony-studio",
      "panoramic-sea-view-studio",
      "beachside-family-apartment",
    ],
    relatedLinks: [
      { label: "Where to stay in Menton", href: "/guide/where-to-stay-in-menton" },
      { label: "Menton old town", href: "/guide/menton-old-town" },
    ],
    cta: {
      title: "Planning Lemon Festival dates?",
      text: "Tell us your dates and parking needs. We will confirm availability manually.",
      primaryLabel: "Check availability",
      secondaryLabel: "View apartments",
    },
  },
  {
    slug: "monaco-grand-prix",
    title: "Monaco Grand Prix weekend: staying in Menton",
    seoTitle: "Stay in Menton for Monaco Grand Prix weekend | Azur Menton",
    seoDescription:
      "Use Menton as a calmer seaside base during Monaco Grand Prix weekend, with beachside apartments and train access to the Riviera.",
    intro:
      "Major Monaco weekends can increase demand across the Riviera. Menton can be a calmer seaside base than staying directly in Monaco, especially if you want beach time around the event.",
    eventType: "Major Riviera sports weekend",
    location: "Monaco and Riviera",
    expectedSeason: "May",
    sections: [
      {
        heading: "A calmer base than Monaco",
        body: [
          "Menton keeps the stay more seaside-focused. You can plan Monaco time, then return to a quieter town with beaches, cafes and a slower evening rhythm.",
        ],
      },
      {
        heading: "Transport and access",
        body: [
          "Guests should check transport and event access early. Do not rely on normal assumptions during major event weekends.",
        ],
      },
      {
        heading: "Prices and availability",
        body: [
          "Prices and availability may change during major event weekends. Azur Menton confirms direct offers manually, so send dates early and avoid assuming instant availability.",
        ],
        relatedApartmentKeys: [
          "sea-view-balcony-studio",
          "beachside-family-apartment",
          "panoramic-sea-view-studio",
        ],
      },
    ],
    bookingTips: [
      "Request accommodation early.",
      "Consider train access and check current options.",
      "Ask about parking if arriving by car.",
      "Leave extra time around event travel.",
    ],
    relatedApartmentKeys: [
      "sea-view-balcony-studio",
      "beachside-family-apartment",
      "panoramic-sea-view-studio",
    ],
    relatedLinks: [
      { label: "Day trips from Menton", href: "/guide/day-trips-from-menton" },
      { label: "Menton without a car", href: "/guide/menton-without-a-car" },
    ],
    cta: {
      title: "Visiting during a Monaco weekend?",
      text: "Tell us your dates and how you plan to arrive, and we will confirm availability directly.",
      primaryLabel: "Tell us your dates",
      secondaryLabel: "Compare apartments",
    },
  },
  {
    slug: "summer-events-on-the-riviera",
    title: "Summer on the Riviera: beach days, evenings and day trips",
    seoTitle: "Summer events near Menton | Riviera beach stays and day trips",
    seoDescription:
      "Plan a summer stay in Menton with beach days, evening walks, Riviera day trips and seasonal events nearby.",
    intro:
      "Summer in Menton is beach-focused and busy. The best stays keep the practical things close: air conditioning, the seafront, evening walks and a comfortable base between outings.",
    eventType: "Seasonal summer travel",
    location: "Menton and nearby Riviera",
    expectedSeason: "July and August",
    sections: [
      {
        heading: "Beach days and long evenings",
        body: [
          "Summer days often revolve around the beach and promenade. Evenings are useful for old-town walks, restaurants and a cooler return to the apartment.",
        ],
      },
      {
        heading: "Riviera day trips",
        body: [
          "Menton, Monaco, Nice and the Italian Riviera can all fit into a summer stay. Check transport before travel and avoid overloading each day.",
        ],
      },
      {
        heading: "Which apartment fits summer best",
        body: [
          "The sea-view studios work well for couples who want a balcony and seaside mood. The Terrace & Parking Apartment is better for families, longer stays and guests who need more space.",
        ],
        relatedApartmentKeys: [
          "sea-view-balcony-studio",
          "panoramic-sea-view-studio",
          "beachside-family-apartment",
        ],
      },
    ],
    bookingTips: [
      "Request July and August dates early.",
      "Air conditioning is useful in summer.",
      "Ask about parking before arrival if travelling by car.",
      "Keep day-trip plans flexible during busy periods.",
    ],
    relatedApartmentKeys: [
      "sea-view-balcony-studio",
      "panoramic-sea-view-studio",
      "beachside-family-apartment",
    ],
    relatedLinks: [
      { label: "Best beaches in Menton", href: "/guide/best-beaches-in-menton" },
      { label: "Day trips from Menton", href: "/guide/day-trips-from-menton" },
    ],
    cta: {
      title: "Planning a summer seaside stay?",
      text: "Send your dates and preferred apartment. We will confirm availability and the best direct offer.",
      primaryLabel: "Check availability",
      secondaryLabel: "View apartments",
    },
  },
];

export const eventPages: Record<Locale, EventPageContent[]> = {
  en: eventPagesEn,
  fr: eventPagesEn.map((page) => ({ ...translationDraft(page.title), slug: page.slug })),
  it: eventPagesEn.map((page) => ({ ...translationDraft(page.title), slug: page.slug })),
  uk: eventPagesEn.map((page) => ({ ...translationDraft(page.title), slug: page.slug })),
};

export function getEventPage(locale: Locale, slug: string) {
  return eventPages[locale].find((page) => page.slug === slug);
}
