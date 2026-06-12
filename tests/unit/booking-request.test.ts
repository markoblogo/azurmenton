import { describe, expect, it } from "vitest";
import { validateBookingRequest, type BookingRequestPayload } from "../../src/lib/booking-request";

function futureDate(daysFromNow: number) {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() + daysFromNow);
  return date.toISOString().slice(0, 10);
}

function validPayload(overrides: Partial<BookingRequestPayload> = {}): BookingRequestPayload {
  return {
    apartment: "sea-view-balcony-studio",
    checkIn: futureDate(14),
    checkOut: futureDate(18),
    adults: "2",
    children: "0",
    parking: "not-sure",
    preferredLanguage: "en",
    name: "Guest Name",
    email: "guest@example.com",
    phone: "",
    message: "We are interested in a direct stay.",
    privacyAcknowledgement: "accepted",
    ...overrides,
  };
}

describe("validateBookingRequest", () => {
  it("accepts a complete direct booking request", () => {
    expect(validateBookingRequest(validPayload())).toMatchObject({ ok: true });
  });

  it("requires either email or phone", () => {
    expect(validateBookingRequest(validPayload({ email: "", phone: "" }))).toMatchObject({
      ok: false,
      error: "Please provide either an email address or a phone/WhatsApp number.",
    });
  });

  it("rejects checkout dates before check-in dates", () => {
    expect(
      validateBookingRequest(validPayload({ checkIn: futureDate(20), checkOut: futureDate(19) })),
    ).toMatchObject({
      ok: false,
      error: "Check-out must be after check-in.",
    });
  });

  it("rejects unknown apartment values", () => {
    expect(validateBookingRequest(validPayload({ apartment: "unknown" }))).toMatchObject({
      ok: false,
      error: "Please choose a valid apartment option.",
    });
  });
});
