import type { Locale } from "@/i18n/locales";

export type LocalizedText = Record<Locale, string>;

export type StayPageSection = {
  heading: LocalizedText;
  body: LocalizedText[];
  bullets?: LocalizedText[];
};

export type StayPageFaq = {
  question: LocalizedText;
  answer: LocalizedText;
};

export type StayPageCta = {
  title: LocalizedText;
  text: LocalizedText;
  primaryLabel: LocalizedText;
  secondaryLabel: LocalizedText;
};

export type StayPage = {
  slug: string;
  title: LocalizedText;
  seoTitle: LocalizedText;
  metaDescription: LocalizedText;
  excerpt: LocalizedText;
  heroImage?: string;
  heroImageAlt?: LocalizedText;
  primaryTripIntent: string;
  relatedApartmentSlugs: string[];
  relatedGuideSlugs: string[];
  relatedEventSlugs: string[];
  sections: StayPageSection[];
  faq: StayPageFaq[];
  cta: StayPageCta;
  lastChecked: string;
};

export type LocalizedStayPage = Omit<
  StayPage,
  "title" | "seoTitle" | "metaDescription" | "excerpt" | "heroImageAlt" | "sections" | "faq" | "cta"
> & {
  title: string;
  seoTitle: string;
  metaDescription: string;
  excerpt: string;
  heroImageAlt?: string;
  sections: Array<{ heading: string; body: string[]; bullets?: string[] }>;
  faq: Array<{ question: string; answer: string }>;
  cta: { title: string; text: string; primaryLabel: string; secondaryLabel: string };
};

const t = (en: string, fr = en, it = en, uk = en): LocalizedText => ({ en, fr, it, uk });

const checkAvailability = t(
  "Check availability",
  "Verifier disponibilite",
  "Controlla disponibilita",
  "Перевірити доступність",
);

const viewApartments = t(
  "View apartments",
  "Voir les appartements",
  "Vedi appartamenti",
  "Переглянути апартаменти",
);

const allApartments = ["sea-view-balcony-studio", "beachside-family-apartment", "panoramic-sea-view-studio"];

export const stayPages: StayPage[] = [
  {
    slug: "lemon-festival-menton",
    title: t("Where to stay for Fête du Citron in Menton"),
    seoTitle: t("Where to Stay for Fête du Citron in Menton"),
    metaDescription: t("Choose a central Azur Menton apartment for Fête du Citron, with practical notes on festival access, parade tickets and apartment fit."),
    excerpt: t("A practical stay guide for Lemon Festival dates: central apartments, sea-view atmosphere, family space and realistic access notes."),
    heroImage: "/images/events/menton-lemon-festival.jpg",
    heroImageAlt: t("Fête du Citron decorations and Mediterranean winter colours in Menton"),
    primaryTripIntent: "lemon-festival",
    relatedApartmentSlugs: ["sea-view-balcony-studio", "beachside-family-apartment"],
    relatedGuideSlugs: ["fete-du-citron-menton-practical-guide", "menton-without-a-car", "where-to-stay-in-menton"],
    relatedEventSlugs: ["menton-lemon-festival"],
    sections: [
      {
        heading: t("Best Azur Menton options for festival dates"),
        body: [
          t("Fête du Citron brings parades, garden displays and controlled traffic zones into central Menton. For most guests, the best apartment is one that keeps daily movement simple: walk to the seafront, reach the old town without relying on a car, and return easily after evening events."),
          t("Sea View Balcony Studio is the strongest choice if you want balcony atmosphere, a beachfront base and a compact stay for two. Beachside Family Apartment is better when you need more space, a terrace and parking by reservation."),
        ],
        bullets: [
          t("Sea View Balcony Studio: best for couples and balcony atmosphere."),
          t("Beachside Family Apartment: best for families, space, terrace meals and parking by reservation."),
          t("Book early; winter festival dates can create unusually high demand in Menton."),
        ],
      },
      {
        heading: t("Access and tickets"),
        body: [
          t("Resident access passes help guests reach apartments inside controlled festival zones when available, but they are not official parade tickets. Parade seats, garden exhibition entry and special events should be checked and booked through official festival channels."),
          t("If you are arriving by car, ask about access and parking before finalising plans. During parade days, walking and public transport are often simpler than driving through the centre."),
        ],
      },
    ],
    faq: [
      {
        question: t("Which apartment is best for Fête du Citron?"),
        answer: t("For couples, Sea View Balcony Studio is the strongest festival option. For families or guests needing more space, Beachside Family Apartment is usually the better fit."),
      },
      {
        question: t("Do access passes include parade tickets?"),
        answer: t("No. Resident access passes, when available, help with access to controlled zones around apartments. They are not official parade tickets."),
      },
    ],
    cta: {
      title: t("Planning Fête du Citron dates?"),
      text: t("Send your dates and preferred apartment. We will confirm availability directly and flag practical access notes for festival periods."),
      primaryLabel: checkAvailability,
      secondaryLabel: viewApartments,
    },
    lastChecked: "2026-07-04",
  },
  {
    slug: "monaco-events-from-menton",
    title: t("Where to stay for Monaco events from Menton"),
    seoTitle: t("Where to Stay for Monaco Events from Menton"),
    metaDescription: t("Use Menton as a calmer seaside base for Monaco events, with direct train access and apartment choices for couples, families and short stays."),
    excerpt: t("A commercial stay guide for Monaco event weekends: train access, quieter evenings in Menton and apartment choices by trip style."),
    heroImage: "/images/guide/monaco-events-from-menton.jpg",
    heroImageAlt: t("Monaco harbour and Riviera event setting near Menton"),
    primaryTripIntent: "monaco-events",
    relatedApartmentSlugs: allApartments,
    relatedGuideSlugs: ["monaco-events-from-menton", "public-transport-in-menton", "menton-without-a-car"],
    relatedEventSlugs: [
      "monaco-grand-prix",
      "monaco-yacht-show",
      "monaco-e-prix",
      "rolex-monte-carlo-masters",
      "monte-carlo-circus-festival",
      "rallye-automobile-monte-carlo",
      "rallye-monte-carlo-historique",
    ],
    sections: [
      {
        heading: t("Why stay in Menton for Monaco events"),
        body: [
          t("Monaco can be intense during major events: hotels fill early, prices rise and evening movement can feel crowded. Menton gives you a quieter seaside base with direct regional trains to Monaco-Monte-Carlo and a more relaxed return at night."),
          t("The right apartment depends on the trip. Couples often prefer a sea-view studio. Families or longer stays usually benefit from the Beachside Family Apartment with terrace and parking by reservation. Short event stays can work well in any of the three apartments when dates are available."),
        ],
      },
      {
        heading: t("Event weekends to plan around"),
        body: [
          t("The biggest Monaco demand periods include Formula 1, the Monaco Yacht Show, Monaco E-Prix, Rolex Monte-Carlo Masters, winter rally dates and family-friendly winter events such as the Circus Festival."),
          t("Check train times close to travel and leave margin after large evening events. The Menton base works best when guests treat Monaco as the event day and Menton as the quieter place to sleep, swim and recover."),
        ],
      },
    ],
    faq: [
      {
        question: t("Is Menton practical for Monaco event trips?"),
        answer: t("Yes, especially for guests who prefer a seaside base and direct train access rather than staying inside Monaco during crowded event dates."),
      },
      {
        question: t("Which apartment should I choose for Monaco events?"),
        answer: t("Choose a sea-view studio for a couple or short stay, and the Beachside Family Apartment for families, more space or parking by reservation."),
      },
    ],
    cta: {
      title: t("Coming for a Monaco event?"),
      text: t("Tell us the event, dates and group size. We will suggest the most suitable Azur Menton apartment if availability allows."),
      primaryLabel: checkAvailability,
      secondaryLabel: viewApartments,
    },
    lastChecked: "2026-07-04",
  },
  {
    slug: "monaco-grand-prix-from-menton",
    title: t("Where to stay for the Monaco Grand Prix from Menton"),
    seoTitle: t("Where to Stay for the Monaco Grand Prix from Menton"),
    metaDescription: t("A practical Monaco Grand Prix stay page explaining why Menton can be a calmer seaside base with direct train access."),
    excerpt: t("Menton can work well for Monaco Grand Prix guests who want a quieter base, direct train access and realistic booking guidance."),
    heroImage: "/images/events/monaco-grand-prix.png",
    heroImageAlt: t("Monaco Grand Prix atmosphere near the harbour"),
    primaryTripIntent: "monaco-grand-prix",
    relatedApartmentSlugs: allApartments,
    relatedGuideSlugs: ["monaco-events-from-menton", "public-transport-in-menton", "menton-without-a-car"],
    relatedEventSlugs: ["monaco-grand-prix"],
    sections: [
      {
        heading: t("A calmer base for a high-demand weekend"),
        body: [
          t("The Monaco Grand Prix is one of the Riviera's highest-demand weekends. Monaco gets expensive and crowded, and availability across nearby towns can tighten early. Menton is not a shortcut to guaranteed low prices, but it can be a calmer seaside base with direct train access to Monaco-Monte-Carlo."),
          t("Guests should book early, confirm event tickets separately and avoid assuming last-minute apartment availability. We only confirm stays manually after checking dates."),
        ],
      },
      {
        heading: t("Apartment fit"),
        body: [
          t("Sea-view studios suit couples who want a compact stay and a Mediterranean reset after race days. Beachside Family Apartment is better for families, small groups or guests arriving by car when parking is arranged by reservation."),
        ],
        bullets: [
          t("No fake availability: send dates and wait for direct confirmation."),
          t("No guaranteed prices: Grand Prix demand changes quickly."),
          t("Use the train where possible; driving into Monaco during race periods is rarely relaxing."),
        ],
      },
    ],
    faq: [
      {
        question: t("Is Menton too far for the Monaco Grand Prix?"),
        answer: t("For many guests it is practical because regional trains connect Menton with Monaco-Monte-Carlo. Timetables and crowding should be checked close to the event."),
      },
      {
        question: t("Should I book early?"),
        answer: t("Yes. Grand Prix dates are high demand across Monaco and nearby Riviera towns, so early planning is strongly recommended."),
      },
    ],
    cta: {
      title: t("Checking Monaco Grand Prix dates?"),
      text: t("Send your dates, guest count and preferred apartment. We will confirm what is genuinely available before you make plans around it."),
      primaryLabel: checkAvailability,
      secondaryLabel: viewApartments,
    },
    lastChecked: "2026-07-04",
  },
  {
    slug: "menton-without-a-car",
    title: t("Where to stay in Menton without a car"),
    seoTitle: t("Where to Stay in Menton Without a Car"),
    metaDescription: t("Choose a walkable Menton apartment for beaches, old town, station access and car-free day trips to Monaco, Nice, Ventimiglia and Sanremo."),
    excerpt: t("A stay page for guests planning a car-free Menton trip: walkability, train access, beaches and optional parking."),
    heroImage: "/images/guide/menton-without-a-car.jpg",
    heroImageAlt: t("Walkable Menton seafront and old town for a car-free stay"),
    primaryTripIntent: "without-car",
    relatedApartmentSlugs: allApartments,
    relatedGuideSlugs: ["menton-without-a-car", "public-transport-in-menton", "how-to-get-to-menton-from-nice-airport"],
    relatedEventSlugs: ["menton-lemon-festival", "monaco-grand-prix", "nice-carnival"],
    sections: [
      {
        heading: t("Why car-free works in Menton"),
        body: [
          t("Menton is compact enough for a stay built around walking: beaches, seafront, restaurants, markets and the old town can all fit into a simple daily rhythm. Trains make Monaco, Nice, Ventimiglia and Sanremo realistic without renting a car."),
          t("Parking can be useful for road trips, but it is optional rather than essential. For many guests, the best stay is a central apartment, comfortable shoes and a train plan."),
        ],
      },
      {
        heading: t("Apartment fit"),
        body: [
          t("All Azur Menton apartments can work for car-free stays. Choose central beachfront apartments when you want beach and town routines first; choose the Panoramic Sea View Studio when you prefer the quieter Garavan side and scenic views."),
        ],
      },
    ],
    faq: [
      {
        question: t("Do I need a car in Menton?"),
        answer: t("No. Many stays work well without a car because Menton is walkable and connected by train to Monaco, Nice and the Italian Riviera."),
      },
      {
        question: t("Is parking still available?"),
        answer: t("Private parking may be available by reservation for selected apartments, but it is not required for a practical Menton stay."),
      },
    ],
    cta: {
      title: t("Planning a car-free Menton stay?"),
      text: t("Send your dates and arrival plan. We will help match the apartment to your walking and train-based itinerary."),
      primaryLabel: checkAvailability,
      secondaryLabel: viewApartments,
    },
    lastChecked: "2026-07-04",
  },
  {
    slug: "sea-view-apartment-menton",
    title: t("Sea-view apartments in Menton"),
    seoTitle: t("Sea-View Apartments in Menton"),
    metaDescription: t("Compare Azur Menton's sea-view, beachfront and terrace apartments for a direct booking request in Menton."),
    excerpt: t("A direct comparison for sea-view and beachfront search intent: balcony studio, panoramic studio and beachside terrace apartment."),
    heroImage: "/images/apartments/sea-view-balcony-studio/01-balcony-breakfast-sea-view.jpg",
    heroImageAlt: t("Breakfast on a private balcony with Mediterranean sea view in Menton"),
    primaryTripIntent: "sea-view",
    relatedApartmentSlugs: allApartments,
    relatedGuideSlugs: ["where-to-stay-in-menton", "best-beaches-in-menton", "stay-cool-in-menton-summer"],
    relatedEventSlugs: ["menton-lemon-festival", "summer-on-the-riviera"],
    sections: [
      {
        heading: t("Which sea-view stay fits your trip?"),
        body: [
          t("Sea View Balcony Studio is the clearest choice for a private balcony and beachfront atmosphere. Panoramic Sea View Studio is more about elevated Garavan views and a quieter scenic mood. Beachside Family Apartment is relevant if you want more space, a terrace and parking by reservation, even when the priority is beach proximity rather than a classic balcony view."),
        ],
        bullets: [
          t("Sea View Balcony Studio: balcony, compact layout, strong sea-view signal."),
          t("Panoramic Sea View Studio: quieter Garavan side and open Mediterranean views."),
          t("Beachside Family Apartment: terrace, space and beachside practicality for families."),
        ],
      },
      {
        heading: t("Direct booking note"),
        body: [
          t("Azur Menton confirms availability manually. That keeps the guidance honest: tell us your dates, group size and preference for balcony, terrace, parking or quiet views, and we will respond with the best available fit."),
        ],
      },
    ],
    faq: [
      {
        question: t("Which apartment has the strongest sea-view feel?"),
        answer: t("Sea View Balcony Studio is the strongest option for a private balcony and direct sea-view atmosphere."),
      },
      {
        question: t("Which option works best for a family?"),
        answer: t("Beachside Family Apartment is usually the best family fit because it offers more space, a terrace and parking by reservation."),
      },
    ],
    cta: {
      title: t("Looking for a sea-view stay in Menton?"),
      text: t("Send your dates and preferred view style. We will confirm which apartment is available and most suitable."),
      primaryLabel: checkAvailability,
      secondaryLabel: viewApartments,
    },
    lastChecked: "2026-07-04",
  },
];

export const stayPageSlugs = stayPages.map((page) => page.slug);

export function getStayPage(slug: string) {
  return stayPages.find((page) => page.slug === slug);
}

export function localizeStayPage(page: StayPage, locale: Locale): LocalizedStayPage {
  return {
    ...page,
    title: page.title[locale],
    seoTitle: page.seoTitle[locale],
    metaDescription: page.metaDescription[locale],
    excerpt: page.excerpt[locale],
    heroImageAlt: page.heroImageAlt?.[locale],
    sections: page.sections.map((section) => ({
      heading: section.heading[locale],
      body: section.body.map((paragraph) => paragraph[locale]),
      bullets: section.bullets?.map((bullet) => bullet[locale]),
    })),
    faq: page.faq.map((item) => ({
      question: item.question[locale],
      answer: item.answer[locale],
    })),
    cta: {
      title: page.cta.title[locale],
      text: page.cta.text[locale],
      primaryLabel: page.cta.primaryLabel[locale],
      secondaryLabel: page.cta.secondaryLabel[locale],
    },
  };
}
