"use client";

import { useEffect, useState } from "react";
import { parseTrip, saveTrip, TRIP_CHANGED, TRIP_KEY, type MyTrip } from "@/lib/my-trip";
import { addDaysToDateKey, toParisDateKey } from "@/lib/events";

export function useLocalTrip() {
  const [trip, setTrip] = useState<MyTrip | null>(null);
  const [ready, setReady] = useState(false);
  const [storageError, setStorageError] = useState(false);
  useEffect(() => {
    const refresh = () => {
      try { setTrip(parseTrip(window.localStorage.getItem(TRIP_KEY))); setStorageError(false); }
      catch { setTrip(null); setStorageError(true); }
      setReady(true);
    };
    const storage = (event: StorageEvent) => { if (event.key === TRIP_KEY || event.key === null) refresh(); };
    refresh();
    window.addEventListener(TRIP_CHANGED, refresh);
    window.addEventListener("storage", storage);
    window.addEventListener("focus", refresh);
    return () => { window.removeEventListener(TRIP_CHANGED, refresh); window.removeEventListener("storage", storage); window.removeEventListener("focus", refresh); };
  }, []);

  function update(transform: (current: MyTrip) => MyTrip | null): boolean {
    try {
      const current = parseTrip(window.localStorage.getItem(TRIP_KEY));
      const next = current ? transform(current) : null;
      if (!next || !saveTrip(window.localStorage, next)) return false;
      window.dispatchEvent(new Event(TRIP_CHANGED));
      return true;
    } catch { return false; }
  }
  return { trip, ready, storageError, update };
}

export function tripDateWindow(trip: MyTrip | null) {
  const today = toParisDateKey(new Date());
  return { today, min: trip ? (trip.checkIn > today ? trip.checkIn : today) : "", max: trip ? addDaysToDateKey(trip.checkOut, -1) : "" };
}
