import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { apartments } from "@/content/apartments";
import { t } from "@/content/translations";
import type { Locale } from "@/i18n/locales";
import { getApartmentCalendarConfig, isApartmentCalendarSlug } from "@/lib/availability/config";
import { addMonths, compareDateKeys, diffNights, toDateKey } from "@/lib/availability/date";
import { buildAvailabilityPrefillHref } from "@/lib/availability/prefill";
import type { ApartmentAvailability, DateInterval } from "@/lib/availability/types";

const copy = {
  en: {
    eyebrow: "Current stay windows",
    title: "Find the nearest dates that may work",
    body: "These dates are calculated automatically from the calendars currently connected to each apartment. They are a planning guide, not instant booking confirmation.",
    disclaimer: "Availability can change between updates. Every request is checked personally before your stay is confirmed.",
    updated: "Calendar last checked",
    request: "Request these dates",
    nights: "nights",
    availableFrom: "Available from",
    noWindows: "No suitable stay window is currently visible in the next 12 months. You can still send flexible dates and we will check personally.",
    unavailable: "Live calendar information is temporarily unavailable. Send your preferred dates and we will check them personally.",
    viewApartment: "View apartment",
    fullView: "See all current windows",
  },
  fr: {
    eyebrow: "Créneaux de séjour disponibles",
    title: "Trouvez les prochaines dates susceptibles de convenir",
    body: "Ces dates sont calculées automatiquement à partir des calendriers actuellement connectés à chaque appartement. Elles sont fournies à titre indicatif et ne constituent pas une confirmation de réservation instantanée.",
    disclaimer: "Les disponibilités peuvent évoluer entre deux mises à jour. Chaque demande est vérifiée personnellement avant la confirmation du séjour.",
    updated: "Calendrier vérifié pour la dernière fois",
    request: "Demander ces dates",
    nights: "nuits",
    availableFrom: "Disponible à partir du",
    noWindows: "Aucun créneau adapté n’est actuellement visible pour les 12 prochains mois. Vous pouvez néanmoins envoyer des dates flexibles et nous les vérifierons personnellement.",
    unavailable: "Les informations du calendrier sont temporairement indisponibles. Envoyez-nous vos dates souhaitées et nous les vérifierons personnellement.",
    viewApartment: "Voir l’appartement",
    fullView: "Voir toutes les périodes actuelles",
  },
  it: {
    eyebrow: "Periodi di soggiorno disponibili",
    title: "Trova le prossime date che potrebbero essere adatte",
    body: "Queste date vengono calcolate automaticamente dai calendari attualmente collegati a ciascun appartamento. Sono indicative e non costituiscono una conferma immediata della prenotazione.",
    disclaimer: "La disponibilità può cambiare tra un aggiornamento e l’altro. Ogni richiesta viene verificata personalmente prima della conferma del soggiorno.",
    updated: "Ultimo controllo del calendario",
    request: "Richiedi queste date",
    nights: "notti",
    availableFrom: "Disponibile dal",
    noWindows: "Al momento non è visibile un periodo adatto nei prossimi 12 mesi. Puoi comunque inviare date flessibili e le verificheremo personalmente.",
    unavailable: "Le informazioni in tempo reale del calendario sono temporaneamente indisponibili. Inviaci le date preferite e le verificheremo personalmente.",
    viewApartment: "Vedi appartamento",
    fullView: "Vedi tutti i periodi attuali",
  },
  uk: {
    eyebrow: "Доступні періоди проживання",
    title: "Знайдіть найближчі дати, які можуть вам підійти",
    body: "Ці дати автоматично розраховуються на основі календарів, підключених до кожного апартаменту. Вони допомагають планувати поїздку, але не є миттєвим підтвердженням бронювання.",
    disclaimer: "Доступність може змінюватися між оновленнями. Кожен запит перевіряється особисто перед підтвердженням проживання.",
    updated: "Календар востаннє перевірено",
    request: "Надіслати запит на ці дати",
    nights: "ночей",
    availableFrom: "Доступно з",
    noWindows: "Наразі в наступні 12 місяців не відображається відповідний вільний період. Ви все одно можете надіслати гнучкі дати, і ми перевіримо їх особисто.",
    unavailable: "Актуальна інформація календаря тимчасово недоступна. Надішліть бажані дати, і ми перевіримо їх особисто.",
    viewApartment: "Переглянути апартамент",
    fullView: "Переглянути всі поточні періоди",
  },
} as const;

function formatDate(locale: Locale, date: string) {
  return new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", year: "numeric" }).format(new Date(`${date}T00:00:00.000Z`));
}

function formatCheckedAt(locale: Locale, checkedAt: string) {
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(checkedAt));
}

function isOpenEndedWindow(apartmentSlug: string, interval: DateInterval) {
  if (!isApartmentCalendarSlug(apartmentSlug)) return false;
  const horizonEnd = addMonths(toDateKey(new Date()), getApartmentCalendarConfig(apartmentSlug).searchHorizonMonths);
  return compareDateKeys(interval.end, horizonEnd) >= 0;
}

function WindowLine({ apartmentSlug, interval, locale }: { apartmentSlug: string; interval: DateInterval; locale: Locale }) {
  const local = copy[locale];
  const nights = diffNights(interval.start, interval.end);

  if (isOpenEndedWindow(apartmentSlug, interval)) {
    return (
      <div className="border border-[#eadfce] bg-white/70 px-3 py-3">
        <p className="text-sm font-semibold leading-6 text-[#173f36]">
          {local.availableFrom} {formatDate(locale, interval.start)}
        </p>
      </div>
    );
  }

  return (
    <div className="border border-[#eadfce] bg-white/70 px-3 py-3">
      <p className="text-[1rem] font-semibold leading-7 text-[#173f36]">
        {formatDate(locale, interval.start)}–{formatDate(locale, interval.end)}
      </p>
      {typeof nights === "number" ? <p className="mt-1 text-[0.82rem] uppercase tracking-[0.08em] text-[#6b5f50]">{nights} {local.nights}</p> : null}
    </div>
  );
}

function cardForSlug(apartmentSlug: string) {
  return apartments.find((apartment) => apartment.slug === apartmentSlug);
}

export function AvailabilityOverviewSection({
  locale,
  availability,
}: {
  locale: Locale;
  availability: ApartmentAvailability[];
}) {
  const local = copy[locale];
  const allUnavailable = availability.every((item) => item.status === "temporarily-unavailable");

  return (
    <section className="mb-5 border border-[#dfd4c1] bg-[#fbf7ef] p-5 sm:p-6">
      <p className="editorial-label">{local.eyebrow}</p>
      <h2 className="serif-heading mt-3 text-3xl leading-tight text-[#173f36] sm:text-4xl">{local.title}</h2>
      <p className="mt-3 max-w-3xl text-[1.08rem] leading-8 text-[#5f574c]">{local.body}</p>
      {allUnavailable ? (
        <div className="mt-4 border border-[#eadfce] bg-white/75 px-4 py-3 text-sm leading-6 text-[#5f574c]">
          {local.unavailable}
        </div>
      ) : null}
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {availability.map((item) => {
          const apartment = cardForSlug(item.apartmentSlug);
          if (!apartment) return null;
          const isUnavailable = item.status === "temporarily-unavailable";

          return (
            <article key={item.apartmentSlug} className="flex h-full flex-col overflow-hidden border border-[#dfd4c1] bg-white">
              <div className="relative aspect-[4/2.35] overflow-hidden bg-[#efe4d1]">
                <Image src={apartment.cardImage} alt={apartment.shortName[locale]} fill sizes="(min-width: 1280px) 24vw, (min-width: 768px) 46vw, 100vw" className="object-cover" />
              </div>
              <div className="flex h-full flex-col p-4 sm:p-5">
                <h3 className="serif-heading text-[1.9rem] leading-tight text-[#173f36]">{apartment.shortName[locale]}</h3>
                <p className="mt-2 text-[0.78rem] font-bold uppercase tracking-[0.12em] text-[#0b6f8f]">
                  {t[locale].upTo} {apartment.maxGuests} {t[locale].guests.toLowerCase()}
                </p>
                <div className="mt-4 grid gap-2">
                  {item.status === "available"
                    ? item.freeWindows.slice(0, 2).map((interval) => (
                        <WindowLine key={`${interval.start}-${interval.end}`} apartmentSlug={item.apartmentSlug} interval={interval} locale={locale} />
                      ))
                    : null}
                  {item.status === "no-windows" ? <p className="border border-[#eadfce] bg-white/70 px-3 py-3 text-[1rem] leading-7 text-[#5f574c]">{local.noWindows}</p> : null}
                  {isUnavailable && !allUnavailable ? (
                    <p className="border border-[#eadfce] bg-white/70 px-3 py-3 text-[1rem] leading-7 text-[#5f574c]">{local.unavailable}</p>
                  ) : null}
                </div>
                {item.checkedAt ? (
                  <p className="mt-4 text-[0.98rem] leading-6 text-[#756a5d]">
                    {local.updated} {formatCheckedAt(locale, item.checkedAt)}
                  </p>
                ) : null}
                <div className="mt-auto flex flex-wrap gap-3 pt-4">
                  {item.status === "available" && item.freeWindows[0] ? (
                    <Link
                      href={buildAvailabilityPrefillHref(locale, item.apartmentSlug, item.freeWindows[0]) as Route}
                      className="inline-flex min-h-11 items-center border border-[#173f36] bg-[#173f36] px-4 py-2.5 text-[0.74rem] font-bold uppercase tracking-[0.14em] text-white hover:bg-[#102f28]"
                    >
                      {local.request}
                    </Link>
                  ) : null}
                  <Link
                    href={`/${locale}/apartments/${item.apartmentSlug}` as Route}
                    className="inline-flex min-h-11 items-center border border-[#c6a66a] px-4 py-2.5 text-[0.74rem] font-bold uppercase tracking-[0.14em] text-[#173f36] hover:bg-[#f3ead7]"
                  >
                    {local.viewApartment}
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
      <p className="mt-4 text-[1rem] leading-7 text-[#6b5f50]">{local.disclaimer}</p>
    </section>
  );
}

export function ApartmentAvailabilityPreview({
  locale,
  availability,
}: {
  locale: Locale;
  availability: ApartmentAvailability;
}) {
  const local = copy[locale];

  if (availability.status === "temporarily-unavailable") {
    return null;
  }

  return (
    <div className="mt-5 border border-[#dfd4c1] bg-[#fbf7ef] p-4">
      <p className="editorial-label">{local.eyebrow}</p>
      <div className="mt-3 grid gap-2">
        {availability.status === "available"
          ? availability.freeWindows.slice(0, 2).map((interval) => (
              <WindowLine key={`${interval.start}-${interval.end}`} apartmentSlug={availability.apartmentSlug} interval={interval} locale={locale} />
            ))
          : <p className="text-sm leading-6 text-[#5f574c]">{local.noWindows}</p>}
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        {availability.status === "available" && availability.freeWindows[0] ? (
          <Link
            href={buildAvailabilityPrefillHref(locale, availability.apartmentSlug, availability.freeWindows[0]) as Route}
            className="inline-flex min-h-10 items-center border border-[#173f36] bg-[#173f36] px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-white hover:bg-[#102f28]"
          >
            {local.request}
          </Link>
        ) : null}
        <Link
          href={`/${locale}/check-availability` as Route}
          className="inline-flex min-h-10 items-center border border-[#c6a66a] px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#173f36] hover:bg-[#f3ead7]"
        >
          {local.fullView}
        </Link>
      </div>
    </div>
  );
}
