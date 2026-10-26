import { afterEach, expect, it, vi } from "vitest";
import { notifyBookingOutcome } from "../../src/lib/booking-alert";

afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs(); vi.restoreAllMocks(); });

it("does not send without explicit Telegram configuration", async () => {
  vi.stubEnv("BOOKING_ALERT_TELEGRAM_BOT_TOKEN", "");
  const fetch = vi.fn();
  vi.stubGlobal("fetch", fetch);
  await notifyBookingOutcome("request", "not_configured", "Test enquiry");
  expect(fetch).not.toHaveBeenCalled();
});

it.each(["provider_accepted", "delivery_unknown"] as const)("copies the enquiry for %s with a bounded timeout", async (state) => {
  vi.stubEnv("BOOKING_ALERT_TELEGRAM_BOT_TOKEN", "test-token");
  vi.stubEnv("BOOKING_ALERT_TELEGRAM_CHAT_ID", "test-chat");
  const fetch = vi.fn().mockResolvedValue(Response.json({ ok: true }));
  vi.stubGlobal("fetch", fetch);
  await notifyBookingOutcome("request", state, "Name: TEST ONLY\nMessage: test enquiry");
  const options = fetch.mock.calls[0][1];
  expect(options.signal).toBeInstanceOf(AbortSignal);
  const body = JSON.parse(options.body);
  expect(body.chat_id).toBe("test-chat");
  expect(body.text).toContain(state);
  expect(body.text).toContain("Name: TEST ONLY");
  expect(body.parse_mode).toBeUndefined();
  expect(body.text).not.toContain("test-token");
});

it("isolates Telegram failures and never logs the secret-bearing exception", async () => {
  vi.stubEnv("BOOKING_ALERT_TELEGRAM_BOT_TOKEN", "test-secret");
  vi.stubEnv("BOOKING_ALERT_TELEGRAM_CHAT_ID", "test-chat");
  const log = vi.spyOn(console, "error").mockImplementation(() => {});
  const fetch = vi.fn().mockRejectedValue(new Error("https://api.telegram.org/bottest-secret"));
  vi.stubGlobal("fetch", fetch);
  await expect(notifyBookingOutcome("request", "provider_rejected", "private guest message")).resolves.toBeUndefined();
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(JSON.stringify(log.mock.calls)).not.toContain("test-secret");
  expect(JSON.stringify(log.mock.calls)).not.toContain("private guest message");
});

it.each([400, 401, 403, 429, 500])("records Telegram HTTP %s without logging the response body", async (status) => {
  vi.stubEnv("BOOKING_ALERT_TELEGRAM_BOT_TOKEN", "test-secret");
  vi.stubEnv("BOOKING_ALERT_TELEGRAM_CHAT_ID", "test-chat");
  const log = vi.spyOn(console, "error").mockImplementation(() => {});
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue(Response.json({ ok: false, description: "private provider response" }, { status })));
  await notifyBookingOutcome("request", "provider_accepted", "private guest message");
  expect(log).toHaveBeenCalledWith("booking_alert", { requestId: "request", state: "provider_rejected", status });
  expect(JSON.stringify(log.mock.calls)).not.toContain("private");
});

it("distinguishes a timeout without logging the exception", async () => {
  vi.stubEnv("BOOKING_ALERT_TELEGRAM_BOT_TOKEN", "test-secret");
  vi.stubEnv("BOOKING_ALERT_TELEGRAM_CHAT_ID", "test-chat");
  const log = vi.spyOn(console, "error").mockImplementation(() => {});
  vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new DOMException("timeout", "TimeoutError")));
  await notifyBookingOutcome("request", "provider_accepted", "private guest message");
  expect(log).toHaveBeenCalledWith("booking_alert", { requestId: "request", state: "timeout" });
});
