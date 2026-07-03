import type { RivieraEvent } from "@/content/riviera-events";

export type EventDateStatus = "upcoming" | "current" | "past" | "dates_pending" | "estimated_annual_window";

type DateLikeEvent = Pick<RivieraEvent, "startDate" | "endDate" | "expectedSeason" | "dateLabel" | "dateStatus">;
type StructuredEventLike = Pick<RivieraEvent, "dateStatus" | "startDate">;

function toDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
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

export function canRenderEventJsonLd(event: StructuredEventLike) {
  return event.dateStatus === "confirmed" && Boolean(event.startDate);
}
