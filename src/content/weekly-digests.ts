import type { Locale } from "@/i18n/locales";

export type WeeklyDigestSourceStatus = "draft" | "reviewed" | "published";
export type WeeklyDigestBookingRelevance = "high" | "medium" | "low";
export type WeeklyDigestCategory = "event" | "food" | "family" | "culture" | "transport" | "weather" | "day-trip";
export type LocalizedText = Record<Locale, string>;

export type WeeklyDigestItem = {
  title: string;
  description: string;
  city: string;
  dateLabel: string;
  category: WeeklyDigestCategory;
  sourceUrl: string;
  relatedEventSlug?: string;
  relatedGuideSlug?: string;
  travelNoteFromMenton: string;
  bookingRelevance: WeeklyDigestBookingRelevance;
};

export type WeeklyDigest = {
  slug: string;
  locale: Locale;
  dateRangeStart?: string;
  dateRangeEnd?: string;
  title: string;
  summary: string;
  items: WeeklyDigestItem[];
  lastChecked?: string;
  sourceStatus: WeeklyDigestSourceStatus;
};

export const weeklyDigests: WeeklyDigest[] = [];

export function getPublicWeeklyDigest(locale: Locale) {
  return weeklyDigests
    .filter((digest) => digest.locale === locale)
    .filter((digest) => digest.sourceStatus === "reviewed" || digest.sourceStatus === "published")
    .sort((left, right) => (right.dateRangeStart ?? "").localeCompare(left.dateRangeStart ?? ""))[0];
}
