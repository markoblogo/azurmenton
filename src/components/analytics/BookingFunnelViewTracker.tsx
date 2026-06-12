"use client";

import { useEffect } from "react";
import { bookingFunnelEvents, trackBookingFunnelEvent } from "@/lib/analytics";
import type { Locale } from "@/i18n/locales";

export function BookingFunnelViewTracker({ locale }: { locale: Locale }) {
  useEffect(() => {
    trackBookingFunnelEvent(bookingFunnelEvents.checkAvailabilityView, { locale });
  }, [locale]);

  return null;
}
