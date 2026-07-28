import type { Locale } from "@/i18n/locales";
import type { DateInterval } from "@/lib/availability/types";

export type AvailabilityPrefill = {
  apartment: string;
  checkIn: string;
  checkOut: string;
};

const datePattern = /^\d{4}-\d{2}-\d{2}$/;

export function getAvailabilityPrefillFromSearchParams(searchParams: URLSearchParams): AvailabilityPrefill | null {
  const apartment = searchParams.get("apartment")?.trim() ?? "";
  const checkIn = searchParams.get("checkIn")?.trim() ?? "";
  const checkOut = searchParams.get("checkOut")?.trim() ?? "";

  if (!apartment || !datePattern.test(checkIn) || !datePattern.test(checkOut)) {
    return null;
  }

  return { apartment, checkIn, checkOut };
}

export function buildAvailabilityPrefillHref(locale: Locale, apartment: string, interval: DateInterval) {
  const params = new URLSearchParams({
    apartment,
    checkIn: interval.start,
    checkOut: interval.end,
  });

  return `/${locale}/check-availability?${params.toString()}#direct-request-form`;
}
