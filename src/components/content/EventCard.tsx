import Link from "next/link";
import type { Route } from "next";
import { Card } from "@/components/ui/Card";
import type { EventPageContent, EventsLandingContent } from "@/content/events";
import type { Locale } from "@/i18n/locales";

type EventCardProps = {
  event: EventPageContent | EventsLandingContent["cards"][number];
  locale: Locale;
};

export function EventCard({ event, locale }: EventCardProps) {
  const href = "slug" in event ? `/events/${event.slug}` : event.href;
  const title = event.title;
  const description = "intro" in event ? event.intro : event.description;

  return (
    <Card className="p-6 transition hover:-translate-y-0.5 hover:border-[#0b6f8f]">
      <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#0b6f8f]">
        {event.expectedSeason}
      </p>
      <h2 className="mt-3 text-xl font-semibold text-[#17313a]">
        {href ? <Link href={`/${locale}${href}` as Route}>{title}</Link> : title}
      </h2>
      <p className="mt-3 text-sm leading-6 text-[#5c5044]">{description}</p>
      {href ? (
        <Link
          className="mt-5 inline-flex text-sm font-semibold text-[#0b6f8f] hover:text-[#075a75]"
          href={`/${locale}${href}` as Route}
        >
          Read event guide
        </Link>
      ) : null}
    </Card>
  );
}
