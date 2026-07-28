import type { Locale } from "@/i18n/locales";
import type { DateInterval } from "@/lib/availability/types";

export type AvailabilityPrefill = {
  apartment?: string;
  checkIn?: string;
  checkOut?: string;
  flexible: boolean;
  openEnded: boolean;
  hasSelection: boolean;
};

const datePattern = /^\d{4}-\d{2}-\d{2}$/;
const prefillKeys = ["apartment", "checkIn", "checkOut", "flexible", "openEnded"] as const;

export function getAvailabilityPrefillFromSearchParams(searchParams: URLSearchParams): AvailabilityPrefill | null {
  const apartment = searchParams.get("apartment")?.trim() ?? "";
  const checkIn = searchParams.get("checkIn")?.trim() ?? "";
  const checkOut = searchParams.get("checkOut")?.trim() ?? "";
  const flexible = searchParams.get("flexible") === "1";
  const openEnded = searchParams.get("openEnded") === "1";

  const validCheckIn = datePattern.test(checkIn);
  const validCheckOut = datePattern.test(checkOut);

  if (!apartment && !flexible) {
    return null;
  }

  if (!apartment) {
    return {
      flexible,
      openEnded: false,
      hasSelection: false,
    };
  }

  if (!validCheckIn) {
    return null;
  }

  if (openEnded) {
    return {
      apartment,
      checkIn,
      flexible,
      openEnded: true,
      hasSelection: true,
    };
  }

  if (!validCheckOut) {
    return null;
  }

  return {
    apartment,
    checkIn,
    checkOut,
    flexible,
    openEnded: false,
    hasSelection: true,
  };
}

export function buildAvailabilityPrefillHref(
  locale: Locale,
  apartment: string,
  interval: DateInterval,
  options?: { flexible?: boolean },
) {
  const params = new URLSearchParams({
    apartment,
    checkIn: interval.start,
    checkOut: interval.end,
  });

  if (options?.flexible) {
    params.set("flexible", "1");
  }

  return `/${locale}/check-availability?${params.toString()}#direct-request-form`;
}

export function buildOpenEndedAvailabilityPrefillHref(
  locale: Locale,
  apartment: string,
  checkIn: string,
  options?: { flexible?: boolean },
) {
  const params = new URLSearchParams({
    apartment,
    checkIn,
    openEnded: "1",
  });

  if (options?.flexible) {
    params.set("flexible", "1");
  }

  return `/${locale}/check-availability?${params.toString()}#direct-request-form`;
}

export function buildFlexibleAvailabilityHref(locale: Locale, apartment?: string) {
  const params = new URLSearchParams({ flexible: "1" });
  if (apartment) {
    params.set("apartment", apartment);
  }

  return `/${locale}/check-availability?${params.toString()}#direct-request-form`;
}

export function clearAvailabilityPrefillParams(searchParams: URLSearchParams) {
  const next = new URLSearchParams(searchParams);
  for (const key of prefillKeys) {
    next.delete(key);
  }

  return next;
}
