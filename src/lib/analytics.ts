export const bookingFunnelEvents = {
  checkAvailabilityView: "check_availability_view",
  bookingFormStart: "booking_form_start",
  bookingRequestSubmitSuccess: "booking_request_submit_success",
  bookingRequestSubmitError: "booking_request_submit_error",
} as const;

export type BookingFunnelEvent = (typeof bookingFunnelEvents)[keyof typeof bookingFunnelEvents];

type PlausibleWindow = Window & {
  plausible?: (eventName: string, options?: { props?: Record<string, string | number | boolean> }) => void;
};

export function trackBookingFunnelEvent(
  eventName: BookingFunnelEvent,
  props?: Record<string, string | number | boolean>,
) {
  if (typeof window === "undefined") {
    return;
  }

  (window as PlausibleWindow).plausible?.(eventName, props ? { props } : undefined);
}
