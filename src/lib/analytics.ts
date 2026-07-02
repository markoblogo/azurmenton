export const bookingFunnelEvents = {
  checkAvailabilityView: "check_availability_view",
  bookingFormStart: "booking_form_start",
  bookingRequestSubmitSuccess: "booking_request_submit_success",
  bookingRequestSubmitError: "booking_request_submit_error",
} as const;

export type BookingFunnelEvent = (typeof bookingFunnelEvents)[keyof typeof bookingFunnelEvents];
export type BookingFunnelPageType = "home" | "apartments" | "apartment_detail" | "guide" | "guide_detail" | "events" | "event_detail" | "check_availability" | "contact" | "other";
export type BookingFunnelProps = Record<string, string | number | boolean>;

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
  if (page === "check-availability") return "check_availability";
  if (page === "contact") return "contact";

  return "other";
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
