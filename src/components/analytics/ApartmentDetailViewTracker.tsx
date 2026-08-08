"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { attributionFromSearchParams, bookingFunnelEvents, compactBookingAttributionProps, getBookingFunnelPageType, trackBookingFunnelEvent } from "@/lib/analytics";
import type { Locale } from "@/i18n/locales";

export function ApartmentDetailViewTracker({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const sourceAttribution = attributionFromSearchParams(searchParams, pathname);
    trackBookingFunnelEvent(bookingFunnelEvents.apartmentDetailView, {
      locale,
      page_path: pathname,
      page_type: getBookingFunnelPageType(pathname),
      ...compactBookingAttributionProps(sourceAttribution),
    });
  }, [locale, pathname, searchParams]);

  return null;
}
