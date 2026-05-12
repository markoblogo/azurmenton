import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { Locale } from "@/i18n/locales";

type BookingCTAProps = {
  locale: Locale;
  title: string;
  text?: string;
  primaryLabel: string;
  secondaryLabel?: string;
  primaryHref?: string;
  secondaryHref?: string;
};

export function BookingCTA({
  locale,
  title,
  text,
  primaryLabel,
  secondaryLabel,
  primaryHref,
  secondaryHref,
}: BookingCTAProps) {
  return (
    <Card className="bg-[#17313a] p-6 text-white sm:p-8">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
          {text ? <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75">{text}</p> : null}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={primaryHref ?? `/${locale}/check-availability`}>{primaryLabel}</Button>
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
