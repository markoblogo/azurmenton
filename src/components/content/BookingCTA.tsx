import { TrackedLink } from "@/components/analytics/TrackedLink";
import { Button, buttonVariants } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { Locale } from "@/i18n/locales";
import {
  bookingAttributionHref,
  compactBookingAttributionProps,
  type BookingFunnelEvent,
  type BookingFunnelProps,
  type BookingSourceAttribution,
} from "@/lib/analytics";

type BookingCTAProps = {
  locale: Locale;
  title: string;
  text?: string;
  primaryLabel: string;
  secondaryLabel?: string;
  primaryHref?: string;
  secondaryHref?: string;
  sourceAttribution?: BookingSourceAttribution;
  trackingEventName?: BookingFunnelEvent;
  trackingProps?: BookingFunnelProps;
};

export function BookingCTA({
  locale,
  title,
  text,
  primaryLabel,
  secondaryLabel,
  primaryHref,
  secondaryHref,
  sourceAttribution,
  trackingEventName,
  trackingProps,
}: BookingCTAProps) {
  const href = primaryHref ?? bookingAttributionHref(locale, sourceAttribution);
  const primaryClassName = `inline-flex min-h-11 items-center justify-center px-5 py-2.5 text-[0.72rem] font-bold uppercase tracking-[0.14em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${buttonVariants.primary}`;
  const props = {
    locale,
    ...compactBookingAttributionProps(sourceAttribution),
    ...trackingProps,
  };

  return (
    <Card className="bg-[#17313a] p-6 text-white sm:p-8">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
          {text ? <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75">{text}</p> : null}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          {trackingEventName ? (
            <TrackedLink className={primaryClassName} eventName={trackingEventName} href={href} props={props}>
              {primaryLabel}
            </TrackedLink>
          ) : (
            <Button href={href}>{primaryLabel}</Button>
          )}
          {secondaryLabel ? (
            <Button href={secondaryHref ?? `/${locale}/apartments`} variant="secondary">
              {secondaryLabel}
            </Button>
          ) : null}
        </div>
      </div>
    </Card>
  );
}
