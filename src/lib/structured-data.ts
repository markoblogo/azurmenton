export type JsonLd = Record<string, unknown>;

export function renderJsonLd(data: JsonLd) {
  return {
    __html: JSON.stringify(data).replace(/</g, "\\u003c"),
  };
}

export function lodgingBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "@id": "https://azurmenton.com/#lodging-business",
    name: "Azur Menton",
    legalName: "SCI Petra et Paul",
    taxID: "983 423 898 R.C.S. Nice",
    url: "https://azurmenton.com",
    logo: "https://azurmenton.com/icon.png",
    image: "https://azurmenton.com/images/apartments/panoramic-sea-view-studio/01-balcony-breakfast-sea-view.jpg",
    description:
      "Family-run beachfront and beachside apartments in central Menton, France. Direct booking requests are confirmed manually by the host.",
    email: "petraetpaul@gmail.com",
    telephone: "+33 6 24 71 65 65",
    priceRange: "Direct quote after availability request",
    geo: {
      "@type": "GeoCoordinates",
      latitude: 43.7745,
      longitude: 7.4975,
    },
    areaServed: {
      "@type": "City",
      name: "Menton",
      address: {
        "@type": "PostalAddress",
        addressCountry: "FR",
      },
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Menton",
      addressRegion: "Provence-Alpes-Cote d'Azur",
      addressCountry: "FR",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Azur Menton apartment stays",
      itemListElement: [
        "Sea View Balcony Studio",
        "Terrace & Parking Apartment",
        "Panoramic Sea View Studio",
      ].map((name) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Accommodation",
          name,
        },
      })),
    },
  };
}

export function websiteJsonLd(input: { locale: string; url: string; description: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Azur Menton",
    url: "https://azurmenton.com",
    mainEntityOfPage: input.url,
    inLanguage: input.locale,
    description: input.description,
    publisher: {
      "@type": "Organization",
      name: "Azur Menton",
      url: "https://azurmenton.com",
      logo: "https://azurmenton.com/icon.png",
    },
  };
}

export function collectionPageJsonLd(input: {
  name: string;
  description: string;
  url: string;
  locale: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: input.name,
    description: input.description,
    url: input.url,
    inLanguage: input.locale,
    isPartOf: {
      "@type": "WebSite",
      name: "Azur Menton",
      url: "https://azurmenton.com",
    },
  };
}

export function itemListJsonLd(input: {
  name: string;
  description?: string;
  url: string;
  items: Array<{
    name: string;
    url: string;
    description?: string;
    image?: string;
    type?: string;
    occupancy?: number;
  }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: input.name,
    description: input.description,
    url: input.url,
    itemListElement: input.items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": item.type ?? "Thing",
        name: item.name,
        url: item.url,
        description: item.description,
        image: item.image,
        occupancy: item.occupancy
          ? {
              "@type": "QuantitativeValue",
              value: item.occupancy,
            }
          : undefined,
      },
    })),
  };
}

export function vacationRentalJsonLd(input: {
  identifier: string;
  name: string;
  description: string;
  url: string;
  image: string[];
  accommodationCategory: string;
  occupancy: number;
  rooms: number;
  bedrooms?: string;
  bathrooms?: string;
  beds?: string;
  sizeSqm: number;
  amenities: string[];
}) {
  const bedroomCount = numberFromText(input.bedrooms);
  const bathroomCount = numberFromText(input.bathrooms);

  return {
    "@context": "https://schema.org",
    "@type": "VacationRental",
    "@id": `${input.url}#vacation-rental`,
    identifier: input.identifier,
    name: input.name,
    description: input.description,
    url: input.url,
    image: input.image,
    accommodationCategory: input.accommodationCategory,
    numberOfRooms: input.rooms,
    floorSize: {
      "@type": "QuantitativeValue",
      value: input.sizeSqm,
      unitCode: "MTK",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Menton",
      addressRegion: "Provence-Alpes-Cote d'Azur",
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 43.7745,
      longitude: 7.4975,
    },
    containsPlace: {
      "@type": "Accommodation",
      name: input.name,
      description: input.description,
      accommodationCategory: input.accommodationCategory,
      numberOfRooms: input.rooms,
      ...(bedroomCount !== undefined ? { numberOfBedrooms: bedroomCount } : {}),
      ...(bathroomCount !== undefined ? { numberOfBathroomsTotal: bathroomCount } : {}),
      ...(input.beds ? { bed: input.beds } : {}),
      floorSize: {
        "@type": "QuantitativeValue",
        value: input.sizeSqm,
        unitCode: "MTK",
      },
      occupancy: {
        "@type": "QuantitativeValue",
        value: input.occupancy,
      },
      amenityFeature: input.amenities.map((amenity) => ({
        "@type": "LocationFeatureSpecification",
        name: amenity,
        value: true,
      })),
      address: {
        "@type": "PostalAddress",
        addressLocality: "Menton",
        addressRegion: "Provence-Alpes-Cote d'Azur",
        addressCountry: "FR",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 43.7745,
        longitude: 7.4975,
      },
    },
    containedInPlace: {
      "@type": "LodgingBusiness",
      "@id": "https://azurmenton.com/#lodging-business",
      name: "Azur Menton",
    },
  };
}

function numberFromText(value?: string) {
  if (!value) return undefined;
  const match = value.match(/\d+/);
  return match ? Number(match[0]) : undefined;
}

export function contactPageJsonLd(input: {
  name: string;
  description: string;
  url: string;
  locale: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: input.name,
    description: input.description,
    url: input.url,
    inLanguage: input.locale,
    about: {
      "@type": "LodgingBusiness",
      "@id": "https://azurmenton.com/#lodging-business",
      name: "Azur Menton",
    },
    potentialAction: {
      "@type": "ReserveAction",
      target: input.url,
      result: {
        "@type": "LodgingReservation",
        reservationFor: {
          "@type": "Accommodation",
          name: "Azur Menton apartment stay",
        },
      },
    },
  };
}

export function eventJsonLd(input: {
  name: string;
  description: string;
  url: string;
  startDate: string;
  endDate?: string;
  locationName: string;
  image?: string;
  eventStatus?: "scheduled" | "completed";
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: input.name,
    description: input.description,
    url: input.url,
    startDate: input.startDate,
    endDate: input.endDate,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: input.eventStatus === "completed" ? "https://schema.org/EventCompleted" : "https://schema.org/EventScheduled",
    image: input.image,
    location: {
      "@type": "Place",
      name: input.locationName,
      address: {
        "@type": "PostalAddress",
        addressLocality: input.locationName,
        addressRegion: "French Riviera",
      },
    },
    organizer: {
      "@type": "Organization",
      name: "Official event organiser",
    },
  };
}

export function articleJsonLd(input: {
  title: string;
  description: string;
  url: string;
  image?: string;
  locale?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    url: input.url,
    image: input.image,
    inLanguage: input.locale,
    publisher: {
      "@type": "Organization",
      name: "Azur Menton",
      logo: {
        "@type": "ImageObject",
        url: "https://azurmenton.com/icon.png",
      },
    },
  };
}

export function faqPageJsonLd(items: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
