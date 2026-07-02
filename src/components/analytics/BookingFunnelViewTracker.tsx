"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { bookingFunnelEvents, getBookingFunnelPageType, trackBookingFunnelEvent } from "@/lib/analytics";
import type { Locale } from "@/i18n/locales";

export function BookingFunnelViewTracker({ locale }: { locale: Locale }) {
  const pathname = usePathname();

  useEffect(() => {
    trackBookingFunnelEvent(bookingFunnelEvents.checkAvailabilityView, {
      locale,
      page_path: pathname,
      page_type: getBookingFunnelPageType(pathname),
    });
  }, [locale, pathname]);

  return null;
}
