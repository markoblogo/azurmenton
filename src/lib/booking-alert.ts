export type BookingEmailState = "provider_accepted" | "not_configured" | "provider_rejected" | "delivery_unknown";

export async function notifyBookingOutcome(requestId: string, state: BookingEmailState, bookingText: string) {
  const token = process.env.BOOKING_ALERT_TELEGRAM_BOT_TOKEN;
  const chatId = process.env.BOOKING_ALERT_TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.warn("booking_alert", { requestId, state: "not_configured" });
    return;
  }
  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(3_000),
      body: JSON.stringify({
        chat_id: chatId,
        text: (`[Azur Menton] ${state === "provider_accepted" ? "New enquiry copy" : "EMAIL REQUIRES ATTENTION"}\nEmail state: ${state}\nRequest: ${requestId}\nNot a confirmed booking. Provider acceptance is not Inbox delivery.\n\n${bookingText}`).slice(0, 4000),
        link_preview_options: { is_disabled: true },
      }),
    });
    const data: unknown = await response.json().catch(() => null);
    if (!response.ok || !data || typeof data !== "object" || !("ok" in data) || data.ok !== true) {
      console.error("booking_alert", { requestId, state: "provider_rejected", status: response.status });
      return;
    }
    console.info("booking_alert", { requestId, state: "accepted" });
  } catch (error) {
    // Exceptions can contain the bot token in the URL. Never log them.
    const timedOut = error instanceof Error && ["TimeoutError", "AbortError"].includes(error.name);
    console.error("booking_alert", { requestId, state: timedOut ? "timeout" : "network_failure" });
  }
}
