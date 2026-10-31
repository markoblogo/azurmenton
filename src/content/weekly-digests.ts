import type { Locale } from "@/i18n/locales";
import { firstWeeklyEdition } from "./weekly-edition-2026-10-30";
import { novemberWeeklyEdition } from "./weekly-edition-2026-11-06";
import { getRivieraEvent, getEventTitle } from "./riviera-events";
import { getEventDateStatus, toParisDateKey } from "@/lib/events";
import { weeklyEventDateLabel } from "@/lib/weekly-event-label";

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
  relatedPlaceIds?: string[];
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

export const weeklyDigests: WeeklyDigest[] = (["en","fr","it","uk"] as const).flatMap(locale => [firstWeeklyEdition(locale), novemberWeeklyEdition(locale)]);

export function getPublicWeeklyDigest(locale: Locale, now=new Date()) {
  const today=toParisDateKey(now);
  const digest=weeklyDigests
    .filter((digest) => digest.locale === locale)
    .filter((digest) => digest.sourceStatus === "reviewed" || digest.sourceStatus === "published")
    .filter(digest=>digest.dateRangeStart&&digest.dateRangeEnd&&digest.dateRangeStart<=today&&digest.dateRangeEnd>=today)
    .sort((left, right) => (right.dateRangeStart ?? "").localeCompare(left.dateRangeStart ?? ""))[0];
  if(!digest)return undefined;
  const items=digest.items.flatMap(item=>{
    if(!item.relatedEventSlug)return [item];
    const event=getRivieraEvent(item.relatedEventSlug);
    if(!event||event.sourceStatus!=="verified"||!event.sourceUrl||event.dateStatus!=="confirmed"||event.dateStatusConflict||getEventDateStatus(event,now)==="past"||!event.startDate||!event.endDate||event.startDate>digest.dateRangeEnd!||event.endDate<digest.dateRangeStart!)return [];
    return [{...item,title:getEventTitle(event,locale),dateLabel:weeklyEventDateLabel(event,locale),sourceUrl:event.sourceUrl??item.sourceUrl,relatedPlaceIds:event.relatedPlaceIds??[]}];
  });
  return items.length?{...digest,items}:undefined;
}
