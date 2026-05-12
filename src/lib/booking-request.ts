export type BookingRequestPayload = {
  apartment: string;
  checkIn: string;
  checkOut: string;
  adults: string;
  children: string;
  parking: string;
  preferredLanguage: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  privacyAcknowledgement: string;
};

export type BookingRequestValidation = {
  ok: boolean;
  error?: string;
  payload?: BookingRequestPayload;
};

const requiredFields: Array<keyof BookingRequestPayload> = [
  "apartment",
  "checkIn",
  "checkOut",
  "adults",
  "children",
  "parking",
  "preferredLanguage",
  "name",
  "privacyAcknowledgement",
];

const validApartments = new Set([
  "sea-view-balcony-studio",
  "beachside-family-apartment",
  "panoramic-sea-view-studio",
  "not-sure",
]);

const validParking = new Set(["yes", "no", "not-sure"]);
const validLanguages = new Set(["en", "fr", "it", "uk"]);

export function formDataToBookingPayload(formData: FormData): BookingRequestPayload {
  return {
    apartment: String(formData.get("apartment") ?? "").trim(),
    checkIn: String(formData.get("checkIn") ?? "").trim(),
    checkOut: String(formData.get("checkOut") ?? "").trim(),
    adults: String(formData.get("adults") ?? "").trim(),
    children: String(formData.get("children") ?? "").trim(),
    parking: String(formData.get("parking") ?? "").trim(),
    preferredLanguage: String(formData.get("preferredLanguage") ?? "").trim(),
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
    privacyAcknowledgement: String(formData.get("privacyAcknowledgement") ?? "").trim(),
  };
}

export function unknownToBookingPayload(input: unknown): BookingRequestPayload | null {
  if (!input || typeof input !== "object") {
    return null;
  }

  const record = input as Record<string, unknown>;

  return {
    apartment: String(record.apartment ?? "").trim(),
    checkIn: String(record.checkIn ?? "").trim(),
    checkOut: String(record.checkOut ?? "").trim(),
    adults: String(record.adults ?? "").trim(),
    children: String(record.children ?? "").trim(),
    parking: String(record.parking ?? "").trim(),
    preferredLanguage: String(record.preferredLanguage ?? "").trim(),
    name: String(record.name ?? "").trim(),
    email: String(record.email ?? "").trim(),
    phone: String(record.phone ?? "").trim(),
    message: String(record.message ?? "").trim(),
    privacyAcknowledgement: String(record.privacyAcknowledgement ?? "").trim(),
  };
}

function dateOnlyToUtc(date: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return null;
  }

  const parsed = new Date(`${date}T00:00:00.000Z`);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export function validateBookingRequest(payload: BookingRequestPayload): BookingRequestValidation {
  const missingField = requiredFields.find((field) => !payload[field]);

  if (missingField) {
    return {
      ok: false,
      error: "Please complete the required fields before sending your request.",
    };
  }

  if (!payload.email && !payload.phone) {
    return {
      ok: false,
      error: "Please provide either an email address or a phone/WhatsApp number.",
    };
  }

  if (!validApartments.has(payload.apartment)) {
    return { ok: false, error: "Please choose a valid apartment option." };
  }

  if (!validParking.has(payload.parking)) {
    return { ok: false, error: "Please choose a valid parking option." };
  }

  if (!validLanguages.has(payload.preferredLanguage)) {
    return { ok: false, error: "Please choose a valid preferred language." };
  }

  if (payload.privacyAcknowledgement !== "accepted") {
    return {
      ok: false,
      error: "Please confirm that Azur Menton may use your details to respond to this request.",
    };
  }

  const adults = Number(payload.adults);
  const children = Number(payload.children);

  if (!Number.isInteger(adults) || adults < 1 || adults > 8) {
    return { ok: false, error: "Please enter a valid number of adults." };
  }

  if (!Number.isInteger(children) || children < 0 || children > 8) {
    return { ok: false, error: "Please enter a valid number of children." };
  }

  const checkIn = dateOnlyToUtc(payload.checkIn);
  const checkOut = dateOnlyToUtc(payload.checkOut);

  if (!checkIn || !checkOut) {
    return { ok: false, error: "Please enter valid check-in and check-out dates." };
  }

  if (checkOut <= checkIn) {
    return { ok: false, error: "Check-out must be after check-in." };
  }

  const today = new Date();
  const todayUtc = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());

  if (checkIn.getTime() < todayUtc) {
    return { ok: false, error: "Check-in cannot be in the past." };
  }

  const nights = (checkOut.getTime() - checkIn.getTime()) / 86_400_000;

  if (nights > 90) {
    return {
      ok: false,
      error: "Please send a message for stays longer than 90 nights so we can review them manually.",
    };
  }

  return { ok: true, payload };
}

export function createBookingRequestLog(payload: BookingRequestPayload) {
  return {
    source: "azurmenton.com",
    type: "direct-booking-request",
    receivedAt: new Date().toISOString(),
    request: {
      apartment: payload.apartment,
      checkIn: payload.checkIn,
      checkOut: payload.checkOut,
      adults: payload.adults,
      children: payload.children,
      parking: payload.parking,
      preferredLanguage: payload.preferredLanguage,
      hasEmail: Boolean(payload.email),
      hasPhone: Boolean(payload.phone),
      hasMessage: Boolean(payload.message),
      privacyAcknowledgement: payload.privacyAcknowledgement === "accepted",
    },
    futureIntegrations: {
      resendEmail: "TODO: send host and guest email notification",
      telegramNotification: "TODO: notify host channel/chat",
      airtableOrSupabasePersistence: "TODO: persist request for follow-up",
    },
  };
}
