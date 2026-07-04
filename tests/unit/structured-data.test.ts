import { describe, expect, it } from "vitest";
import {
  contactPageJsonLd,
  eventJsonLd,
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
      identifier: "azur-menton-sea-view-balcony-studio",
      name: "Sea View Balcony Studio",
      description: "A sea-view studio.",
      url: "https://azurmenton.com/en/apartments/sea-view-balcony-studio",
      image: ["https://azurmenton.com/image.jpg"],
      accommodationCategory: "Studio",
      occupancy: 3,
      rooms: 1,
      sizeSqm: 27,
      bedrooms: "Studio",
      bathrooms: "1 bathroom",
      beds: "1 double bed and 1 sofa bed",
      amenities: ["Air conditioning"],
    });

    expect(data).toMatchObject({
      "@type": "VacationRental",
      identifier: "azur-menton-sea-view-balcony-studio",
      geo: {
        "@type": "GeoCoordinates",
      },
      containsPlace: {
        "@type": "Accommodation",
        occupancy: {
          value: 3,
        },
        numberOfBathroomsTotal: 1,
        bed: "1 double bed and 1 sofa bed",
        amenityFeature: [
          {
            "@type": "LocationFeatureSpecification",
            name: "Air conditioning",
            value: true,
          },
        ],
      },
      containedInPlace: {
        "@id": "https://azurmenton.com/#lodging-business",
      },
    });
    expect(data).not.toHaveProperty("aggregateRating");
    expect(data).not.toHaveProperty("review");
    expect(data).not.toHaveProperty("priceRange");
    expect(data).not.toHaveProperty("additionalType");
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

  it("builds event structured data only from real dates", () => {
    const data = eventJsonLd({
      name: "Nice Carnival",
      description: "A confirmed event.",
      url: "https://azurmenton.com/en/events/nice-carnival",
      startDate: "2027-02-09",
      endDate: "2027-02-28",
      locationName: "Nice",
      eventStatus: "scheduled",
    });

    expect(data).toMatchObject({
      "@type": "Event",
      startDate: "2027-02-09",
      endDate: "2027-02-28",
      eventStatus: "https://schema.org/EventScheduled",
      location: {
        "@type": "Place",
      },
    });
  });

  it("can mark confirmed past events as completed", () => {
    const data = eventJsonLd({
      name: "Past event",
      description: "A completed event.",
      url: "https://azurmenton.com/en/events/past-event",
      startDate: "2026-06-01",
      endDate: "2026-06-02",
      locationName: "Menton",
      eventStatus: "completed",
    });

    expect(data).toMatchObject({
      "@type": "Event",
      eventStatus: "https://schema.org/EventCompleted",
    });
  });
});
