import { unstable_cache } from "next/cache";
import { apartmentCalendarRegistry, availabilityRevalidateSeconds, getApartmentCalendarConfig, isApartmentCalendarSlug, readApartmentCalendarUrl, type ApartmentCalendarSlug } from "@/lib/availability/config";
import { addMonths, compareDateKeys, intervalOverlaps, mergeIntervals, toDateKey } from "@/lib/availability/date";
import { fetchIcalText, parseOccupiedIntervalsFromIcal } from "@/lib/availability/ical";
import type { ApartmentAvailability, ApartmentAvailabilitySnapshot, DateInterval } from "@/lib/availability/types";
import { findAvailableWindows } from "@/lib/availability/windows";

const lastSuccessfulSnapshots = new Map<ApartmentCalendarSlug, ApartmentAvailabilitySnapshot>();

function todayDateKey() {
  return toDateKey(new Date());
}

function sanitizeAvailabilityResult(
  apartmentSlug: ApartmentCalendarSlug,
  occupiedIntervals: DateInterval[],
  checkedAt: string,
  sourceFreshness: ApartmentAvailability["sourceFreshness"],
): ApartmentAvailabilitySnapshot {
  const config = getApartmentCalendarConfig(apartmentSlug);
  const rangeStart = todayDateKey();
  const rangeEnd = addMonths(rangeStart, config.searchHorizonMonths);
  const freeWindows = findAvailableWindows({
    occupiedIntervals,
    rangeStart,
    rangeEnd,
    minimumNights: config.minimumDisplayedNights,
    maximumWindows: config.maximumWindows,
  });

  return {
    apartmentSlug,
    status: freeWindows.length ? "available" : "no-windows",
    freeWindows,
    checkedAt,
    sourceFreshness,
    occupiedIntervals,
  };
}

function unavailableAvailability(apartmentSlug: ApartmentCalendarSlug, checkedAt = "", sourceFreshness: ApartmentAvailability["sourceFreshness"] = "stale"): ApartmentAvailabilitySnapshot {
  return {
    apartmentSlug,
    status: "temporarily-unavailable",
    freeWindows: [],
    checkedAt,
    sourceFreshness,
    occupiedIntervals: [],
  };
}

async function refreshApartmentAvailability(apartmentSlug: ApartmentCalendarSlug) {
  const url = readApartmentCalendarUrl(apartmentSlug);
  const fetched = await fetchIcalText(url);

  if (!fetched.ok) {
    throw new Error(`Failed to refresh calendar for ${apartmentSlug}`);
  }

  const occupiedIntervals = mergeIntervals(parseOccupiedIntervalsFromIcal(fetched.text));
  const snapshot = sanitizeAvailabilityResult(apartmentSlug, occupiedIntervals, new Date().toISOString(), "fresh");
  lastSuccessfulSnapshots.set(apartmentSlug, snapshot);
  return snapshot;
}

function availabilityCache(apartmentSlug: ApartmentCalendarSlug) {
  return unstable_cache(
    async () => refreshApartmentAvailability(apartmentSlug),
    [`availability-v1:${apartmentSlug}`],
    { revalidate: availabilityRevalidateSeconds },
  );
}

export async function getApartmentAvailability(apartmentSlug: ApartmentCalendarSlug): Promise<ApartmentAvailabilitySnapshot> {
  try {
    return await availabilityCache(apartmentSlug)();
  } catch {
    const previous = lastSuccessfulSnapshots.get(apartmentSlug);
    if (previous) {
      return {
        ...previous,
        sourceFreshness: "stale",
      };
    }

    return unavailableAvailability(apartmentSlug);
  }
}

export async function getAllApartmentAvailability() {
  const entries = await Promise.all(
    (Object.keys(apartmentCalendarRegistry) as ApartmentCalendarSlug[]).map(async (slug) => [slug, await getApartmentAvailability(slug)] as const),
  );

  return Object.fromEntries(entries) as Record<ApartmentCalendarSlug, ApartmentAvailabilitySnapshot>;
}

export async function getPublicApartmentAvailability(apartmentSlug: string): Promise<ApartmentAvailability | null> {
  if (!isApartmentCalendarSlug(apartmentSlug)) return null;
  const snapshot = await getApartmentAvailability(apartmentSlug);
  return {
    apartmentSlug: snapshot.apartmentSlug,
    status: snapshot.status,
    freeWindows: snapshot.freeWindows,
    checkedAt: snapshot.checkedAt,
    sourceFreshness: snapshot.sourceFreshness,
  };
}

export async function getPublicAllApartmentAvailability() {
  const snapshots = await getAllApartmentAvailability();
  return Object.values(snapshots).map((snapshot) => ({
    apartmentSlug: snapshot.apartmentSlug,
    status: snapshot.status,
    freeWindows: snapshot.freeWindows,
    checkedAt: snapshot.checkedAt,
    sourceFreshness: snapshot.sourceFreshness,
  }));
}

export async function validateRequestedApartmentDates(apartmentSlug: string, interval: DateInterval) {
  if (!isApartmentCalendarSlug(apartmentSlug)) {
    return { ok: false as const, reason: "unknown-apartment" as const, alternatives: [] as DateInterval[] };
  }

  const snapshot = await getApartmentAvailability(apartmentSlug);

  if (snapshot.status === "temporarily-unavailable") {
    return { ok: true as const, reason: "calendar-unavailable" as const, alternatives: [] as DateInterval[] };
  }

  const overlaps = snapshot.occupiedIntervals.some((occupied) => intervalOverlaps(interval, occupied));
  if (!overlaps) {
    return { ok: true as const, reason: "available" as const, alternatives: [] as DateInterval[] };
  }

  const alternatives = snapshot.freeWindows.filter((window) => compareDateKeys(window.start, interval.start) >= 0).slice(0, 3);
  return { ok: false as const, reason: "occupied" as const, alternatives };
}
