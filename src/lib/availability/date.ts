import type { DateInterval } from "@/lib/availability/types";

const datePattern = /^\d{4}-\d{2}-\d{2}$/;

export function isDateKey(value: string) {
  return datePattern.test(value);
}

export function parseDateKey(value: string) {
  if (!isDateKey(value)) return null;
  const date = new Date(`${value}T00:00:00.000Z`);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function toDateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function addDays(dateKey: string, days: number) {
  const date = parseDateKey(dateKey);
  if (!date) throw new Error(`Invalid date key: ${dateKey}`);
  date.setUTCDate(date.getUTCDate() + days);
  return toDateKey(date);
}

export function addMonths(dateKey: string, months: number) {
  const date = parseDateKey(dateKey);
  if (!date) throw new Error(`Invalid date key: ${dateKey}`);
  date.setUTCMonth(date.getUTCMonth() + months);
  return toDateKey(date);
}

export function compareDateKeys(left: string, right: string) {
  if (left < right) return -1;
  if (left > right) return 1;
  return 0;
}

export function maxDateKey(left: string, right: string) {
  return compareDateKeys(left, right) >= 0 ? left : right;
}

export function minDateKey(left: string, right: string) {
  return compareDateKeys(left, right) <= 0 ? left : right;
}

export function diffNights(start: string, end: string) {
  const startDate = parseDateKey(start);
  const endDate = parseDateKey(end);

  if (!startDate || !endDate) return null;

  return Math.round((endDate.getTime() - startDate.getTime()) / 86_400_000);
}

export function mergeIntervals(intervals: DateInterval[]) {
  const sorted = [...intervals].sort((a, b) => compareDateKeys(a.start, b.start) || compareDateKeys(a.end, b.end));
  const merged: DateInterval[] = [];

  for (const interval of sorted) {
    if (!merged.length) {
      merged.push(interval);
      continue;
    }

    const last = merged[merged.length - 1];
    if (compareDateKeys(interval.start, last.end) <= 0) {
      last.end = maxDateKey(last.end, interval.end);
      continue;
    }

    merged.push(interval);
  }

  return merged;
}

export function intervalOverlaps(interval: DateInterval, occupied: DateInterval) {
  return compareDateKeys(interval.start, occupied.end) < 0 && compareDateKeys(interval.end, occupied.start) > 0;
}
