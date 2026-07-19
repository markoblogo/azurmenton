import { bookingFunnelEvents } from "@/lib/analytics";

export const bookingDashboardGoals = [
  bookingFunnelEvents.checkAvailabilityView,
  bookingFunnelEvents.guideCtaClick,
  bookingFunnelEvents.eventCtaClick,
  bookingFunnelEvents.apartmentCtaClick,
  bookingFunnelEvents.bookingFormStart,
  bookingFunnelEvents.bookingRequestSubmitSuccess,
  bookingFunnelEvents.bookingRequestSubmitError,
  bookingFunnelEvents.whatsappClick,
  bookingFunnelEvents.emailClick,
] as const;

export const bookingDashboardBreakdowns = [
  { label: "locale", dimension: "event:props:locale" },
  { label: "source page type", dimension: "event:props:sourcePageType" },
  { label: "source", dimension: "event:props:sourceSlug" },
  { label: "apartment preference", dimension: "event:props:apartmentPreference" },
] as const;

export type BookingDashboardPeriod = "7d" | "28d" | "30d" | "91d";

export function bookingDashboardPeriodFromArgs(args: string[]): BookingDashboardPeriod {
  const value = args.find((arg) => arg.startsWith("--period="))?.slice("--period=".length) ?? "28d";

  if (value === "7d" || value === "28d" || value === "30d" || value === "91d") {
    return value;
  }

  throw new Error("--period must be one of: 7d, 28d, 30d, 91d.");
}

export function bookingGoalQuery(siteId: string, period: BookingDashboardPeriod) {
  return {
    site_id: siteId,
    date_range: period,
    metrics: ["events", "visitors", "conversion_rate"],
    dimensions: ["event:goal"],
    filters: [["is", "event:goal", [...bookingDashboardGoals]]],
    order_by: [["events", "desc"]],
  };
}

export function bookingSuccessBreakdownQuery(
  siteId: string,
  period: BookingDashboardPeriod,
  dimension: string,
) {
  return {
    site_id: siteId,
    date_range: period,
    metrics: ["events", "visitors", "group_conversion_rate"],
    dimensions: [dimension],
    filters: [["is", "event:goal", [bookingFunnelEvents.bookingRequestSubmitSuccess]]],
    order_by: [["events", "desc"]],
  };
}
