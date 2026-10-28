import { notFound } from "next/navigation";
import { MyTripPlanner } from "@/components/content/MyTripPlanner";
import { guideArticles, guideCategoryLabels } from "@/content/guide";
import { getEventDateLabel, getEventTitle, rivieraEvents } from "@/content/riviera-events";
import { isLocale } from "@/i18n/locales";

export const metadata = { robots: { index: false, follow: true } };

export default async function MyTripPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const events = rivieraEvents.filter(e => e.detailPage && e.dateStatus === "confirmed" && e.sourceStatus === "verified" && !e.dateStatusConflict && e.startDate && e.sourceUrl).map(e => ({ id: e.id, title: getEventTitle(e, locale), href: `/${locale}/events/${e.occurrenceSlug ?? e.slug}`, start: e.startDate, end: e.endDate ?? e.startDate, date: getEventDateLabel(e, locale) })).sort((a, b) => a.start!.localeCompare(b.start!));
  const guides = guideArticles.map(g => ({ id: g.slug, title: g.title[locale], category: g.category, href: `/${locale}/guide/${g.slug}` }));
  return <MyTripPlanner locale={locale} events={events} guides={guides} interestLabels={Object.fromEntries(Object.entries(guideCategoryLabels).map(([key, value]) => [key, value[locale]]))} />;
}
