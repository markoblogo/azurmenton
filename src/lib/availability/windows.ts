import { compareDateKeys, diffNights, maxDateKey, mergeIntervals, minDateKey } from "@/lib/availability/date";
import type { DateInterval } from "@/lib/availability/types";

type FindAvailableWindowsArgs = {
  occupiedIntervals: DateInterval[];
  rangeStart: string;
  rangeEnd: string;
  minimumNights: number;
  maximumWindows: number;
};

export function findAvailableWindows({
  occupiedIntervals,
  rangeStart,
  rangeEnd,
  minimumNights,
  maximumWindows,
}: FindAvailableWindowsArgs) {
  const merged = mergeIntervals(occupiedIntervals)
    .map((interval) => ({
      start: maxDateKey(interval.start, rangeStart),
      end: minDateKey(interval.end, rangeEnd),
    }))
    .filter((interval) => compareDateKeys(interval.end, rangeStart) > 0 && compareDateKeys(interval.start, rangeEnd) < 0);

  const windows: DateInterval[] = [];
  let cursor = rangeStart;

  for (const interval of merged) {
    if (compareDateKeys(interval.start, cursor) > 0) {
      const freeInterval = { start: cursor, end: interval.start };
      const nights = diffNights(freeInterval.start, freeInterval.end) ?? 0;
      if (nights >= minimumNights) {
        windows.push(freeInterval);
        if (windows.length >= maximumWindows) return windows;
      }
    }

    if (compareDateKeys(interval.end, cursor) > 0) {
      cursor = interval.end;
    }
  }

  if (compareDateKeys(rangeEnd, cursor) > 0) {
    const freeInterval = { start: cursor, end: rangeEnd };
    const nights = diffNights(freeInterval.start, freeInterval.end) ?? 0;
    if (nights >= minimumNights) {
      windows.push(freeInterval);
    }
  }

  return windows.slice(0, maximumWindows);
}
