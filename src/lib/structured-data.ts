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
    name: "Azur Menton",
    legalName: "SCI Petra et Paul",
    taxID: "983 423 898 R.C.S. Nice",
    url: "https://azurmenton.com",
    logo: "https://azurmenton.com/icon.png",
    image: "https://azurmenton.com/images/apartments/panoramic-sea-view-studio/01-balcony-breakfast-sea-view.png",
    description:
      "Family-run beachfront and beachside apartments in central Menton, France. Direct booking requests are confirmed manually by the host.",
    email: "petraetpaul@gmail.com",
    telephone: "+33 6 24 71 65 65",
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
  };
}

export function vacationRentalJsonLd(input: {
  name: string;
  description: string;
  url: string;
  image: string[];
  accommodationCategory: string;
  occupancy: number;
  rooms: number;
  sizeSqm: number;
  amenities: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "VacationRental",
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
  };
}

export function articleJsonLd(input: {
  title: string;
  description: string;
  url: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    url: input.url,
    image: input.image,
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
