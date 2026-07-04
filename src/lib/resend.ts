import type { BookingRequestPayload } from "@/lib/booking-request";

type ResendResult = {
  attempted: boolean;
  ok: boolean;
  error?: string;
};

const resendApiUrl = "https://api.resend.com/emails";

function apartmentLabel(value: string) {
  const labels: Record<string, string> = {
    "sea-view-balcony-studio": "Sea View Balcony Studio",
    "beachside-family-apartment": "Terrace & Parking Apartment",
    "panoramic-sea-view-studio": "Panoramic Sea View Studio",
    "not-sure": "Not sure, please recommend",
  };

  return labels[value] ?? value;
}

function parkingLabel(value: string) {
  const labels: Record<string, string> = {
    yes: "Yes",
    no: "No",
    "not-sure": "Not sure",
  };

  return labels[value] ?? value;
}

function eventLabel(value: string) {
  const labels: Record<string, string> = {
    "not-sure": "No specific event / not sure",
    "menton-lemon-festival": "Fete du Citron / Lemon Festival",
    "monaco-grand-prix": "Monaco Grand Prix",
    "monaco-yacht-show": "Monaco Yacht Show",
    "nice-carnival": "Nice Carnival",
    "sanremo-music-festival": "Sanremo Music Festival",
    "rolex-monte-carlo-masters": "Rolex Monte-Carlo Masters",
    "monaco-e-prix": "Monaco E-Prix",
    other: "Other",
  };

  return labels[value] ?? value;
}

function dateFlexibilityLabel(value: string) {
  const labels: Record<string, string> = {
    fixed: "Fixed dates",
    "one-two-days": "Flexible by 1-2 days",
    "same-week": "Flexible within the same week",
    "flexible-month": "Flexible month / looking for suggestions",
  };

  return labels[value] ?? value;
}

function languageLabel(value: string) {
  const labels: Record<string, string> = {
    en: "English",
    fr: "French",
    it: "Italian",
    uk: "Ukrainian",
  };

  return labels[value] ?? value;
}

function htmlEscape(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildEmailHtml(payload: BookingRequestPayload) {
  const rows = [
    ["Apartment", apartmentLabel(payload.apartment)],
    ["Check-in", payload.checkIn],
    ["Check-out", payload.checkOut],
    ["Adults", payload.adults],
    ["Children", payload.children],
    ["Need parking", parkingLabel(payload.parking)],
    ["Visiting for event", eventLabel(payload.visitingForEvent)],
    ["Date flexibility", dateFlexibilityLabel(payload.dateFlexibility)],
    ["Preferred language", languageLabel(payload.preferredLanguage)],
    ["Name", payload.name],
    ["Email", payload.email || "Not provided"],
    ["Phone / WhatsApp", payload.phone || "Not provided"],
    ["Message", payload.message || "No message"],
    ["Privacy acknowledgement", payload.privacyAcknowledgement === "accepted" ? "Accepted" : "Missing"],
  ];

  return `
    <div style="font-family: Arial, sans-serif; color: #17313a; line-height: 1.5;">
      <h1 style="font-size: 22px;">New Azur Menton booking request</h1>
      <p>This is a manual request-to-book enquiry. Confirm availability before replying with an offer.</p>
      <table cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%;">
        ${rows
          .map(
            ([label, value]) => `
              <tr>
                <th align="left" style="border-bottom: 1px solid #eadfce; width: 180px;">${htmlEscape(label)}</th>
                <td style="border-bottom: 1px solid #eadfce;">${htmlEscape(value)}</td>
              </tr>
            `,
          )
          .join("")}
      </table>
    </div>
  `;
}

function buildEmailText(payload: BookingRequestPayload) {
  const rows = [
    ["Apartment", apartmentLabel(payload.apartment)],
    ["Check-in", payload.checkIn],
    ["Check-out", payload.checkOut],
    ["Adults", payload.adults],
    ["Children", payload.children],
    ["Need parking", parkingLabel(payload.parking)],
    ["Visiting for event", eventLabel(payload.visitingForEvent)],
    ["Date flexibility", dateFlexibilityLabel(payload.dateFlexibility)],
    ["Preferred language", languageLabel(payload.preferredLanguage)],
    ["Name", payload.name],
    ["Email", payload.email || "Not provided"],
    ["Phone / WhatsApp", payload.phone || "Not provided"],
    ["Message", payload.message || "No message"],
    ["Privacy acknowledgement", payload.privacyAcknowledgement === "accepted" ? "Accepted" : "Missing"],
  ];

  return [
    "New Azur Menton booking request",
    "This is a manual request-to-book enquiry. Confirm availability before replying with an offer.",
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
  ].join("\n");
}

export async function sendBookingRequestEmail(
  payload: BookingRequestPayload,
): Promise<ResendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.BOOKING_REQUEST_TO_EMAIL;
  const from = process.env.BOOKING_REQUEST_FROM_EMAIL ?? "Azur Menton <onboarding@resend.dev>";

  if (!apiKey || !to) {
    return {
      attempted: false,
      ok: false,
      error: "RESEND_API_KEY or BOOKING_REQUEST_TO_EMAIL is not configured.",
    };
  }

  const response = await fetch(resendApiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      subject: `Azur Menton request: ${apartmentLabel(payload.apartment)} (${payload.checkIn} to ${payload.checkOut})`,
      html: buildEmailHtml(payload),
      text: buildEmailText(payload),
      reply_to: payload.email || undefined,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text().catch(() => "");
    return {
      attempted: true,
      ok: false,
      error: `Resend returned ${response.status}: ${errorBody.slice(0, 300)}`,
    };
  }

  return { attempted: true, ok: true };
}
