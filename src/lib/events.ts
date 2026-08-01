import type { RivieraEvent } from "@/content/riviera-events";

export type EventDateStatus = "upcoming" | "current" | "past" | "dates_pending" | "estimated_annual_window";
export type EventPeriod = "today" | "tomorrow" | "weekend" | "next7" | "next30" | "custom";

type DateLikeEvent = Pick<RivieraEvent, "startDate" | "endDate" | "expectedSeason" | "dateLabel" | "dateStatus">;
type StructuredEventLike = Pick<RivieraEvent, "dateStatus" | "startDate" | "endDate">;

function toDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function toParisDateKey(date: Date) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Paris",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const value = (type: string) => parts.find((part) => part.type === type)?.value ?? "";

  return `${value("year")}-${value("month")}-${value("day")}`;
}

export function addDaysToDateKey(dateKey: string, days: number) {
  const date = new Date(`${dateKey}T12:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return toDateKey(date);
}

export function getParisDateRange(period: EventPeriod, today = new Date(), custom?: { from?: string; to?: string }) {
  const todayKey = toParisDateKey(today);

  if (period === "tomorrow") {
    const tomorrow = addDaysToDateKey(todayKey, 1);
    return { from: tomorrow, to: tomorrow };
  }

  if (period === "weekend") {
    const noon = new Date(`${todayKey}T12:00:00.000Z`);
    const day = noon.getUTCDay();
    const daysUntilSaturday = day === 0 ? 0 : (6 - day + 7) % 7;
    const saturday = addDaysToDateKey(todayKey, daysUntilSaturday);
    const sunday = addDaysToDateKey(saturday, 1);
    return { from: saturday, to: sunday };
  }

  if (period === "next7") {
    return { from: todayKey, to: addDaysToDateKey(todayKey, 6) };
  }

  if (period === "next30") {
    return { from: todayKey, to: addDaysToDateKey(todayKey, 29) };
  }

  if (period === "custom" && (custom?.from || custom?.to)) {
    const from = custom.from ?? custom.to!;
    const to = custom.to ?? custom.from!;
    return from <= to ? { from, to } : { from: to, to: from };
  }

  return { from: todayKey, to: todayKey };
}

export function eventOverlapsDateRange(event: Pick<RivieraEvent, "startDate" | "endDate" | "dateStatus">, range: { from: string; to: string }) {
  if (event.dateStatus === "dates_pending" || event.dateStatus === "estimated_annual_window" || !event.startDate) return false;

  const endDate = event.endDate ?? event.startDate;
  return event.startDate <= range.to && endDate >= range.from;
}

function compareDateKeys(left: string, right: string) {
  return left.localeCompare(right);
}

function getComparableToday(today: Date) {
  return toDateKey(today);
}

export function getEventDateStatus(event: DateLikeEvent, today = new Date()): EventDateStatus {
  const todayKey = getComparableToday(today);

  if (event.dateStatus === "dates_pending" || event.dateStatus === "estimated_annual_window") {
    return event.dateStatus;
  }

  if (event.endDate) {
    if (compareDateKeys(event.endDate, todayKey) < 0) return "past";
    if (event.startDate && compareDateKeys(event.startDate, todayKey) > 0) return "upcoming";
    if (event.startDate && compareDateKeys(event.startDate, todayKey) <= 0 && compareDateKeys(event.endDate, todayKey) >= 0) {
      return "current";
    }

    return "upcoming";
  }

  if (event.startDate) {
    if (compareDateKeys(event.startDate, todayKey) < 0) return "past";
    if (compareDateKeys(event.startDate, todayKey) === 0) return "current";
    return "upcoming";
  }

  if (event.expectedSeason || event.dateLabel) return "dates_pending";

  return "dates_pending";
}

function getSortDate(event: RivieraEvent) {
  return event.startDate ?? event.endDate ?? "9999-12-31";
}

function getPastSortDate(event: RivieraEvent) {
  return event.endDate ?? event.startDate ?? "0000-01-01";
}

export function sortUpcomingEvents(events: RivieraEvent[], today = new Date()) {
  return [...events].sort((left, right) => {
    const leftStatus = getEventDateStatus(left, today);
    const rightStatus = getEventDateStatus(right, today);

    if (leftStatus === "current" && rightStatus !== "current") return -1;
    if (rightStatus === "current" && leftStatus !== "current") return 1;

    return getSortDate(left).localeCompare(getSortDate(right));
  });
}

export function getUpcomingEvents(events: RivieraEvent[], today = new Date()) {
  return sortUpcomingEvents(
    events.filter((event) => {
      const status = getEventDateStatus(event, today);
      return status === "upcoming" || status === "current";
    }),
    today,
  );
}

export function getPastEvents(events: RivieraEvent[], today = new Date()) {
  return [...events]
    .filter((event) => getEventDateStatus(event, today) === "past")
    .sort((left, right) => getPastSortDate(right).localeCompare(getPastSortDate(left)));
}

export function getDatesPendingEvents(events: RivieraEvent[], today = new Date()) {
  return events.filter((event) => {
    const status = getEventDateStatus(event, today);
    return status === "dates_pending" || status === "estimated_annual_window";
  });
}

export function getVisibleEvents(events: RivieraEvent[], today = new Date()) {
  return {
    upcoming: getUpcomingEvents(events, today),
    datesPending: getDatesPendingEvents(events, today),
    past: getPastEvents(events, today),
  };
}

export function canRenderEventJsonLd(event: StructuredEventLike, today = new Date()) {
  if (event.dateStatus !== "confirmed" || !event.startDate) return false;
  const todayKey = toDateKey(today);
  return (event.endDate ?? event.startDate) >= todayKey;
}
