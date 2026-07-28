export const availabilityRevalidateSeconds = 3600;
export const availabilityFetchTimeoutMs = 10_000;
export const availabilityMaximumResponseBytes = 512_000;

export const apartmentCalendarRegistry = {
  "panoramic-sea-view-studio": {
    envKey: "AZUR_ICAL_PANORAMIC_SEA_VIEW_STUDIO",
    minimumDisplayedNights: 3,
    searchHorizonMonths: 12,
    maximumWindows: 4,
  },
  "beachside-family-apartment": {
    envKey: "AZUR_ICAL_TERRACE_PARKING_APARTMENT",
    legacyEnvKeys: ["AZUR_ICAL_BEACHSIDE_FAMILY_APARTMENT"],
    minimumDisplayedNights: 3,
    searchHorizonMonths: 12,
    maximumWindows: 4,
  },
  "sea-view-balcony-studio": {
    envKey: "AZUR_ICAL_SEA_VIEW_BALCONY_STUDIO",
    minimumDisplayedNights: 3,
    searchHorizonMonths: 12,
    maximumWindows: 4,
  },
} as const;

export type ApartmentCalendarSlug = keyof typeof apartmentCalendarRegistry;

export function isApartmentCalendarSlug(value: string): value is ApartmentCalendarSlug {
  return value in apartmentCalendarRegistry;
}

export function getApartmentCalendarConfig(slug: ApartmentCalendarSlug) {
  return apartmentCalendarRegistry[slug];
}

export function readApartmentCalendarUrl(slug: ApartmentCalendarSlug) {
  const config = apartmentCalendarRegistry[slug];
  const primary = process.env[config.envKey]?.trim();

  if (primary) return primary;

  const legacyEnvKeys = "legacyEnvKeys" in config ? config.legacyEnvKeys : [];

  for (const legacyKey of legacyEnvKeys) {
    const legacy = process.env[legacyKey]?.trim();
    if (legacy) return legacy;
  }

  return null;
}
