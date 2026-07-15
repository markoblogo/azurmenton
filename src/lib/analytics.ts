export const bookingFunnelEvents = {
  checkAvailabilityView: "check_availability_view",
  guideCtaClick: "guide_cta_click",
  eventCtaClick: "event_cta_click",
  apartmentCtaClick: "apartment_cta_click",
  bookingFormStart: "booking_form_start",
  bookingRequestSubmitSuccess: "booking_request_submit_success",
  bookingRequestSubmitError: "booking_request_submit_error",
  whatsappClick: "whatsapp_click",
  emailClick: "email_click",
  airportBoardLoaded: "airport_board_loaded",
  airportBoardFailed: "airport_board_failed",
  airportArrivalsExternalClick: "airport_arrivals_external_click",
  airportDeparturesExternalClick: "airport_departures_external_click",
  airportTransportGuideClick: "airport_transport_guide_click",
} as const;

export type BookingFunnelEvent = (typeof bookingFunnelEvents)[keyof typeof bookingFunnelEvents];
export type BookingFunnelPageType = "home" | "apartments" | "apartment_detail" | "guide" | "guide_detail" | "events" | "event_detail" | "stay" | "stay_detail" | "check_availability" | "contact" | "other";
export type BookingFunnelProps = Record<string, string | number | boolean>;
export type BookingSourcePageType = "home" | "apartment" | "guide" | "event" | "stay" | "other";

export type BookingSourceAttribution = {
  sourcePageType: BookingSourcePageType;
  sourceSlug?: string;
  sourceGuideSlug?: string;
  sourceEventSlug?: string;
  sourceApartmentSlug?: string;
};

type SearchParamsLike = {
  get(name: string): string | null;
};

type PlausibleWindow = Window & {
  plausible?: (eventName: string, options?: { props?: Record<string, string | number | boolean> }) => void;
};

export function trackBookingFunnelEvent(
  eventName: BookingFunnelEvent,
  props?: BookingFunnelProps,
) {
  if (typeof window === "undefined") {
    return;
  }

  (window as PlausibleWindow).plausible?.(eventName, props ? { props } : undefined);
}

export function getBookingFunnelPageType(pathname: string): BookingFunnelPageType {
  const segments = pathname.split("/").filter(Boolean);
  const page = segments[1] ?? "";
  const detail = segments[2];

  if (!page) return "home";
  if (page === "apartments") return detail ? "apartment_detail" : "apartments";
  if (page === "guide") return detail ? "guide_detail" : "guide";
  if (page === "events") return detail ? "event_detail" : "events";
  if (page === "stay") return detail ? "stay_detail" : "stay";
  if (page === "check-availability") return "check_availability";
  if (page === "contact") return "contact";

  return "other";
}

export function sourcePageTypeFromPathname(pathname: string): BookingSourcePageType {
  const pageType = getBookingFunnelPageType(pathname);

  if (pageType === "home") return "home";
  if (pageType === "apartment_detail" || pageType === "apartments") return "apartment";
  if (pageType === "guide_detail" || pageType === "guide") return "guide";
  if (pageType === "event_detail" || pageType === "events") return "event";
  if (pageType === "stay_detail" || pageType === "stay" || pageType === "check_availability") return "stay";

  return "other";
}

export function sourceSlugFromPathname(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  return segments[2] ?? "";
}

export function bookingAttributionHref(locale: string, attribution?: BookingSourceAttribution) {
  const base = `/${locale}/check-availability`;

  if (!attribution) {
    return base;
  }

  const params = new URLSearchParams();
  params.set("sourcePageType", attribution.sourcePageType);

  if (attribution.sourceSlug) params.set("sourceSlug", attribution.sourceSlug);
  if (attribution.sourceGuideSlug) params.set("sourceGuideSlug", attribution.sourceGuideSlug);
  if (attribution.sourceEventSlug) params.set("sourceEventSlug", attribution.sourceEventSlug);
  if (attribution.sourceApartmentSlug) params.set("sourceApartmentSlug", attribution.sourceApartmentSlug);

  return `${base}?${params.toString()}`;
}

export function compactBookingAttributionProps(attribution?: Partial<BookingSourceAttribution>) {
  if (!attribution?.sourcePageType) {
    return {};
  }

  return {
    sourcePageType: attribution.sourcePageType,
    ...(attribution.sourceSlug ? { sourceSlug: attribution.sourceSlug } : {}),
    ...(attribution.sourceGuideSlug ? { sourceGuideSlug: attribution.sourceGuideSlug } : {}),
    ...(attribution.sourceEventSlug ? { sourceEventSlug: attribution.sourceEventSlug } : {}),
    ...(attribution.sourceApartmentSlug ? { sourceApartmentSlug: attribution.sourceApartmentSlug } : {}),
  };
}

const validSourcePageTypes = new Set<BookingSourcePageType>(["home", "apartment", "guide", "event", "stay", "other"]);

function sourceParam(searchParams: SearchParamsLike, key: keyof BookingSourceAttribution) {
  return String(searchParams.get(key) ?? "").trim();
}

export function attributionFromSearchParams(searchParams: SearchParamsLike, pathname: string): BookingSourceAttribution {
  const sourcePageType = sourceParam(searchParams, "sourcePageType");
  const sourceSlug = sourceParam(searchParams, "sourceSlug");
  const sourceGuideSlug = sourceParam(searchParams, "sourceGuideSlug");
  const sourceEventSlug = sourceParam(searchParams, "sourceEventSlug");
  const sourceApartmentSlug = sourceParam(searchParams, "sourceApartmentSlug");
  const fallbackSlug = sourceSlugFromPathname(pathname);

  return {
    sourcePageType: validSourcePageTypes.has(sourcePageType as BookingSourcePageType)
      ? (sourcePageType as BookingSourcePageType)
      : sourcePageTypeFromPathname(pathname),
    ...(sourceSlug ? { sourceSlug } : fallbackSlug ? { sourceSlug: fallbackSlug } : {}),
    ...(sourceGuideSlug ? { sourceGuideSlug } : {}),
    ...(sourceEventSlug ? { sourceEventSlug } : {}),
    ...(sourceApartmentSlug ? { sourceApartmentSlug } : {}),
  };
}

export function daysBetweenDates(start: string, end: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(start) || !/^\d{4}-\d{2}-\d{2}$/.test(end)) {
    return undefined;
  }

  const startDate = new Date(`${start}T00:00:00.000Z`);
  const endDate = new Date(`${end}T00:00:00.000Z`);
  const diff = Math.round((endDate.getTime() - startDate.getTime()) / 86_400_000);

  return Number.isFinite(diff) ? diff : undefined;
}

export function leadTimeDays(checkIn: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(checkIn)) {
    return undefined;
  }

  const checkInDate = new Date(`${checkIn}T00:00:00.000Z`);
  const now = new Date();
  const todayUtc = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const diff = Math.round((checkInDate.getTime() - todayUtc) / 86_400_000);

  return Number.isFinite(diff) ? diff : undefined;
}
