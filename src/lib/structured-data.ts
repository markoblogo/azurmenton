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
    url: "https://azurmenton.com",
    description:
      "Family-run beachfront and beachside apartments in central Menton, France.",
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
  image: string;
  accommodationCategory: string;
  occupancy: number;
  rooms: number;
  sizeSqm: number;
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
    address: {
      "@type": "PostalAddress",
      addressLocality: "Menton",
      addressRegion: "Provence-Alpes-Cote d'Azur",
      addressCountry: "FR",
    },
  };
}
