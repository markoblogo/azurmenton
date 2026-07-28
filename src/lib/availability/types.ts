export type DateInterval = {
  start: string;
  end: string;
};

export type AvailabilitySourceFreshness = "fresh" | "stale";

export type ApartmentAvailabilityStatus = "available" | "no-windows" | "temporarily-unavailable";

export type ApartmentAvailability = {
  apartmentSlug: string;
  status: ApartmentAvailabilityStatus;
  freeWindows: DateInterval[];
  checkedAt: string;
  sourceFreshness: AvailabilitySourceFreshness;
};

export type ApartmentAvailabilitySnapshot = ApartmentAvailability & {
  occupiedIntervals: DateInterval[];
};
