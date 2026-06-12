import { describe, expect, it } from "vitest";
import {
  contactPageJsonLd,
  itemListJsonLd,
  lodgingBusinessJsonLd,
  vacationRentalJsonLd,
} from "../../src/lib/structured-data";

describe("structured data builders", () => {
  it("describes Azur Menton as a lodging business with offer catalog data", () => {
    const data = lodgingBusinessJsonLd();

    expect(data).toMatchObject({
      "@type": "LodgingBusiness",
      "@id": "https://azurmenton.com/#lodging-business",
      geo: {
        "@type": "GeoCoordinates",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
      },
    });
  });

  it("keeps apartment listings typed as accommodations", () => {
    const data = itemListJsonLd({
      name: "Apartments",
      url: "https://azurmenton.com/en/apartments",
      items: [
        {
          type: "Accommodation",
          name: "Sea View Balcony Studio",
          url: "https://azurmenton.com/en/apartments/sea-view-balcony-studio",
          occupancy: 3,
        },
      ],
    });

    expect(data.itemListElement[0]).toMatchObject({
      item: {
        "@type": "Accommodation",
        occupancy: {
          value: 3,
        },
      },
    });
  });

  it("links vacation rentals back to the lodging business entity", () => {
    const data = vacationRentalJsonLd({
      name: "Sea View Balcony Studio",
      description: "A sea-view studio.",
      url: "https://azurmenton.com/en/apartments/sea-view-balcony-studio",
      image: ["https://azurmenton.com/image.jpg"],
      accommodationCategory: "Studio",
      occupancy: 3,
      rooms: 1,
      sizeSqm: 27,
      amenities: ["Air conditioning"],
    });

    expect(data).toMatchObject({
      "@type": "VacationRental",
      additionalType: "https://schema.org/Accommodation",
      containedInPlace: {
        "@id": "https://azurmenton.com/#lodging-business",
      },
    });
  });

  it("marks check availability as a contact page with reserve intent", () => {
    const data = contactPageJsonLd({
      name: "Check Availability",
      description: "Send a direct booking request.",
      url: "https://azurmenton.com/en/check-availability",
      locale: "en",
    });

    expect(data).toMatchObject({
      "@type": "ContactPage",
      potentialAction: {
        "@type": "ReserveAction",
      },
    });
  });
});
