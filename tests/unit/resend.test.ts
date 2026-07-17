import { afterEach, describe, expect, it, vi } from "vitest";
import { sendBookingRequestEmail } from "../../src/lib/resend";
import type { BookingRequestPayload } from "../../src/lib/booking-request";

const originalEnv = { ...process.env };

const payload: BookingRequestPayload = {
  apartment: "sea-view-balcony-studio",
  checkIn: "2026-08-10",
  checkOut: "2026-08-14",
  adults: "2",
  children: "0",
  parking: "not-sure",
  visitingForEvent: "not-sure",
  dateFlexibility: "fixed",
  preferredLanguage: "en",
  name: "Test Guest",
  email: "guest@example.com",
  phone: "",
  message: "Test request",
  privacyAcknowledgement: "accepted",
};

afterEach(() => {
  process.env = { ...originalEnv };
  vi.unstubAllGlobals();
});

describe("sendBookingRequestEmail", () => {
  it("sends a hidden operational copy with an Azur Menton subject", async () => {
    process.env.RESEND_API_KEY = "test-key";
    process.env.BOOKING_REQUEST_TO_EMAIL = "petraetpaul@gmail.com";
    delete process.env.BOOKING_REQUEST_BCC_EMAIL;
    const fetchMock = vi.fn().mockResolvedValue(new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    await expect(sendBookingRequestEmail(payload)).resolves.toEqual({ attempted: true, ok: true });

    const request = fetchMock.mock.calls[0]?.[1] as RequestInit;
    const email = JSON.parse(String(request.body));
    expect(email).toMatchObject({
      to: "petraetpaul@gmail.com",
      bcc: "a.biletskiy@gmail.com",
      subject: "[Azur Menton] Booking request: Sea View Balcony Studio (2026-08-10 to 2026-08-14)",
    });
  });
});
