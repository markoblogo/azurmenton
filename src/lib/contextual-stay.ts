import { DateTime } from "luxon";
import { apartments } from "@/content/apartments";
import type { RivieraEvent } from "@/content/riviera-events";
import type { Locale } from "@/i18n/locales";
import { bookingAttributionHref, type BookingSourceAttribution } from "@/lib/analytics";
import type { DateInterval } from "@/lib/availability/types";
import { toParisDateKey } from "@/lib/events";

export function eventStayWindow(event: RivieraEvent, now = new Date()): DateInterval | undefined {
  if (event.dateStatus !== "confirmed" || event.dateStatusConflict || event.sourceStatus !== "verified" || !event.sourceUrl || !event.detailPage || event.sessions?.length) return undefined;
  const start = DateTime.fromISO(event.startDate ?? "", { zone: "Europe/Paris" });
  const end = DateTime.fromISO(event.endDate ?? event.startDate ?? "", { zone: "Europe/Paris" });
  if (!start.isValid || !end.isValid || start.toISODate() !== event.startDate || end.toISODate() !== (event.endDate ?? event.startDate)) return undefined;
  const nights = end.diff(start, "days").days + 1;
  // A season-long programme is not a suggested stay for its entire run.
  if (nights < 1 || nights > 7 || event.startDate! < toParisDateKey(now)) return undefined;
  return { start: start.toISODate()!, end: end.plus({ days: 1 }).toISODate()! };
}

export function contextualStayHref(locale: Locale, apartmentSlug: string, attribution: BookingSourceAttribution, window?: DateInterval) {
  const knownApartment = apartments.some(apartment => apartment.slug === apartmentSlug);
  const url = new URL(bookingAttributionHref(locale, knownApartment ? { ...attribution, sourceApartmentSlug: apartmentSlug } : attribution), "https://azurmenton.com");
  if (knownApartment && window) {
    url.searchParams.set("apartment", apartmentSlug);
    url.searchParams.set("checkIn", window.start);
    url.searchParams.set("checkOut", window.end);
  }
  return `${url.pathname}${url.search}#direct-request-form`;
}
