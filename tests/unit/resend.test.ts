import { afterEach, describe, expect, it, vi } from "vitest";
import { sendBookingRequestEmail } from "../../src/lib/resend";
import type { BookingRequestPayload } from "../../src/lib/booking-request";

const originalEnv = { ...process.env };

const payload: BookingRequestPayload = {
  apartment: "sea-view-balcony-studio",
  checkIn: "2026-08-21",
  checkOut: "2026-08-25",
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
  vi.restoreAllMocks();
});

describe("sendBookingRequestEmail", () => {
  it.each([200, 503])("duplicates validated enquiries to Telegram after email HTTP %s", async (status) => {
    process.env.RESEND_API_KEY = "test-key";
    process.env.BOOKING_REQUEST_TO_EMAIL = "host@example.com";
    process.env.BOOKING_ALERT_TELEGRAM_BOT_TOKEN = "test-bot";
    process.env.BOOKING_ALERT_TELEGRAM_CHAT_ID = "test-owner";
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(Response.json({}, { status }))
      .mockResolvedValueOnce(Response.json({ ok: true }));
    vi.stubGlobal("fetch", fetchMock);
    const result = await sendBookingRequestEmail(payload);
    expect(result.ok).toBe(status === 200);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock.mock.calls[1][0]).toBe("https://api.telegram.org/bottest-bot/sendMessage");
    const copy = JSON.parse(fetchMock.mock.calls[1][1].body);
    expect(copy.chat_id).toBe("test-owner");
    expect(copy.text).toContain(payload.message);
    expect(copy.text).toContain(status === 200 ? "provider_accepted" : "provider_rejected");
  });
  it("correlates provider acceptance without logging guest data or claiming delivery", async () => {
    process.env.RESEND_API_KEY = "test-key";
    process.env.BOOKING_REQUEST_TO_EMAIL = "host@example.com";
    const id = "00000000-0000-4000-8000-000000000001";
    const log = vi.spyOn(console, "info").mockImplementation(() => {});
    const fetchMock = vi.fn().mockResolvedValue(Response.json({ id }));
    vi.stubGlobal("fetch", fetchMock);
    await expect(sendBookingRequestEmail(payload)).resolves.toMatchObject({ ok: true, providerMessageId: id });
    const sent = JSON.parse(fetchMock.mock.calls[0][1].body);
    const requestId = sent.headers["X-Azur-Request-ID"];
    expect(requestId).toMatch(/^[a-f0-9-]{36}$/);
    expect(sent.tags).toEqual([{ name: "request_id", value: requestId }]);
    expect(log).toHaveBeenLastCalledWith("booking_email", expect.objectContaining({ requestId, state: "provider_accepted", providerMessageId: id }));
    const output = JSON.stringify(log.mock.calls);
    for (const value of [payload.name, payload.email, payload.message, payload.checkIn, "test-key", "host@example.com"]) expect(output).not.toContain(value);
    expect(output).not.toContain('"delivered"');
  });

  it("records ambiguous timeout without a false rejection or automatic retry", async () => {
    process.env.RESEND_API_KEY = "test-key";
    process.env.BOOKING_REQUEST_TO_EMAIL = "host@example.com";
    const log = vi.spyOn(console, "error").mockImplementation(() => {});
    const fetchMock = vi.fn().mockRejectedValue(new DOMException("timeout", "TimeoutError"));
    vi.stubGlobal("fetch", fetchMock);
    await sendBookingRequestEmail(payload);
    expect(log).toHaveBeenCalledWith("booking_email", expect.objectContaining({ state: "delivery_unknown" }));
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
  it.each([new TypeError("fetch failed"), new DOMException("timeout", "TimeoutError")])("handles provider network failures without throwing or retrying", async (error) => {
    process.env.RESEND_API_KEY = "test-key";
    process.env.BOOKING_REQUEST_TO_EMAIL = "host@example.com";
    const fetchMock = vi.fn().mockRejectedValue(error);
    vi.stubGlobal("fetch", fetchMock);
    await expect(sendBookingRequestEmail(payload)).resolves.toMatchObject({ attempted: true, ok: false });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0][1].signal).toBeInstanceOf(AbortSignal);
  });

  it("does not include provider response bodies in operational errors", async () => {
    process.env.RESEND_API_KEY = "test-key";
    process.env.BOOKING_REQUEST_TO_EMAIL = "host@example.com";
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("private provider detail", { status: 503 })));
    await expect(sendBookingRequestEmail(payload)).resolves.toEqual({ attempted: true, ok: false, error: "Resend returned 503" });
  });
  it("sends a configured operational copy with an Azur Menton subject", async () => {
    process.env.RESEND_API_KEY = "test-key";
    process.env.BOOKING_REQUEST_TO_EMAIL = "petraetpaul@gmail.com";
    process.env.BOOKING_REQUEST_BCC_EMAIL = "operations@example.com";
    const fetchMock = vi.fn().mockResolvedValue(new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    await expect(sendBookingRequestEmail(payload)).resolves.toEqual({ attempted: true, ok: true });

    const request = fetchMock.mock.calls[0]?.[1] as RequestInit;
    const email = JSON.parse(String(request.body));
    expect(email).toMatchObject({
      to: "petraetpaul@gmail.com",
      bcc: "operations@example.com",
      subject: "[Azur Menton] Booking request: Sea View Balcony Studio (2026-08-21 to 2026-08-25)",
    });
  });

  it.each([undefined, "", "   "])("preserves the owner-approved copy when the override is %s", async (override) => {
    process.env.RESEND_API_KEY = "test-key";
    process.env.BOOKING_REQUEST_TO_EMAIL = "host@example.com";
    if (override === undefined) delete process.env.BOOKING_REQUEST_BCC_EMAIL;
    else process.env.BOOKING_REQUEST_BCC_EMAIL = override;
    const fetchMock = vi.fn().mockResolvedValue(new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    await expect(sendBookingRequestEmail(payload)).resolves.toEqual({ attempted: true, ok: true });

    const request = fetchMock.mock.calls[0]?.[1] as RequestInit;
    const email = JSON.parse(String(request.body));
    expect(email.bcc).toBe("a.biletskiy@gmail.com");
  });

  it("omits the parking row for apartments without parking", async () => {
    process.env.RESEND_API_KEY = "test-key";
    process.env.BOOKING_REQUEST_TO_EMAIL = "petraetpaul@gmail.com";
    const fetchMock = vi.fn().mockResolvedValue(new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    await expect(
      sendBookingRequestEmail({
        ...payload,
        apartment: "panoramic-sea-view-studio",
        parking: "",
      }),
    ).resolves.toEqual({ attempted: true, ok: true });

    const request = fetchMock.mock.calls[0]?.[1] as RequestInit;
    const email = JSON.parse(String(request.body));
    expect(String(email.html)).not.toContain("Need parking");
    expect(String(email.text)).not.toContain("Need parking");
  });
});
