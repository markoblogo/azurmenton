import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { apartments } from "@/content/apartments";
import { t } from "@/content/translations";
import type { Locale } from "@/i18n/locales";
import { buildAvailabilityPrefillHref, buildFlexibleAvailabilityHref, buildOpenEndedAvailabilityPrefillHref } from "@/lib/availability/prefill";
import { describeWindow, formatTimeCheckedLabel, getAvailabilityHintLabel } from "@/lib/availability/presentation";
import type { ApartmentAvailability, DateInterval } from "@/lib/availability/types";

const copy = {
  en: {
    eyebrow: "Nearest available stays",
    title: "Choose an apartment or an available period",
    body: "The periods below are calculated automatically from the calendars connected to each apartment.",
    disclaimer: "Availability can change between updates. Every request is checked personally before your stay is confirmed.",
    updated: "Calendar last checked",
    request: "Request these dates",
    chooseDates: "Choose dates",
    nights: "nights",
    availableFrom: "Available from",
    noWindowsTitle: "No suitable stay window currently visible",
    noWindows: "This apartment has no suitable period visible in the current calendar range. Short gaps or later dates may still become available.",
    noWindowsCta: "Ask about flexible dates",
    unavailableTitle: "Live availability is temporarily unavailable",
    unavailable: "Send your preferred dates and we will check the apartment personally.",
    unavailableCta: "Request a manual check",
    viewApartment: "View apartment",
    fullView: "See all availability",
    stale: "Using the latest available calendar update",
    next: "Next available stays",
  },
  fr: {
    eyebrow: "Prochains séjours disponibles",
    title: "Choisissez un appartement ou une période disponible",
    body: "Les périodes ci-dessous sont calculées automatiquement à partir des calendriers connectés à chaque appartement.",
    disclaimer: "Les disponibilités peuvent évoluer entre deux mises à jour. Chaque demande est vérifiée personnellement avant la confirmation du séjour.",
    updated: "Calendrier vérifié pour la dernière fois",
    request: "Demander ces dates",
    chooseDates: "Choisir les dates",
    nights: "nuits",
    availableFrom: "Disponible à partir du",
    noWindowsTitle: "Aucun séjour adapté n’est visible pour le moment",
    noWindows: "Aucune période adaptée n’est visible dans la plage actuelle du calendrier. De courts créneaux ou des dates plus tardives peuvent encore apparaître.",
    noWindowsCta: "Demander avec dates flexibles",
    unavailableTitle: "La disponibilité en direct est temporairement indisponible",
    unavailable: "Envoyez vos dates souhaitées et nous vérifierons l’appartement personnellement.",
    unavailableCta: "Demander une vérification manuelle",
    viewApartment: "Voir l’appartement",
    fullView: "Voir toute la disponibilité",
    stale: "Affichage de la dernière mise à jour disponible du calendrier",
    next: "Prochains séjours disponibles",
  },
  it: {
    eyebrow: "Prossimi soggiorni disponibili",
    title: "Scegli un appartamento o un periodo disponibile",
    body: "I periodi qui sotto sono calcolati automaticamente dai calendari collegati a ciascun appartamento.",
    disclaimer: "La disponibilità può cambiare tra un aggiornamento e l’altro. Ogni richiesta viene verificata personalmente prima della conferma del soggiorno.",
    updated: "Ultimo controllo del calendario",
    request: "Richiedi queste date",
    chooseDates: "Scegli le date",
    nights: "notti",
    availableFrom: "Disponibile dal",
    noWindowsTitle: "Nessun periodo adatto visibile al momento",
    noWindows: "Questo appartamento non mostra un periodo adatto nell’attuale intervallo del calendario. Possono comunque apparire brevi disponibilità o date più lontane.",
    noWindowsCta: "Chiedi con date flessibili",
    unavailableTitle: "La disponibilità live è temporaneamente indisponibile",
    unavailable: "Inviaci le date preferite e controlleremo l’appartamento personalmente.",
    unavailableCta: "Richiedi un controllo manuale",
    viewApartment: "Vedi appartamento",
    fullView: "Vedi tutta la disponibilità",
    stale: "Mostriamo l’ultimo aggiornamento disponibile del calendario",
    next: "Prossimi soggiorni disponibili",
  },
  uk: {
    eyebrow: "Найближчі доступні періоди",
    title: "Оберіть апартаменти або доступний період",
    body: "Періоди нижче автоматично обчислюються з календарів, підключених до кожних апартаментів.",
    disclaimer: "Доступність може змінюватися між оновленнями. Кожен запит перевіряється особисто перед підтвердженням проживання.",
    updated: "Календар востаннє перевірено",
    request: "Надіслати запит на ці дати",
    chooseDates: "Обрати дати",
    nights: "ночей",
    availableFrom: "Доступно з",
    noWindowsTitle: "Зараз не видно відповідного періоду",
    noWindows: "У поточному діапазоні календаря для цих апартаментів не видно відповідного періоду. Короткі вільні проміжки або пізніші дати ще можуть з’явитися.",
    noWindowsCta: "Запитати про гнучкі дати",
    unavailableTitle: "Live-доступність тимчасово недоступна",
    unavailable: "Надішліть бажані дати, і ми особисто перевіримо ці апартаменти.",
    unavailableCta: "Запросити ручну перевірку",
    viewApartment: "Переглянути апартамент",
    fullView: "Переглянути всю доступність",
    stale: "Показано останнє доступне оновлення календаря",
    next: "Найближчі доступні періоди",
  },
} as const;

function WindowLine({ apartmentSlug, interval, locale }: { apartmentSlug: string; interval: DateInterval; locale: Locale }) {
  const local = copy[locale];
  const description = describeWindow(locale, apartmentSlug, interval);
  const href = description.openEnded
    ? buildOpenEndedAvailabilityPrefillHref(locale, apartmentSlug, interval.start)
    : buildAvailabilityPrefillHref(locale, apartmentSlug, interval);

  return (
    <div className="border border-[#eadfce] bg-white/80 p-3">
      <p className="text-[1rem] font-semibold leading-7 text-[#173f36]">{description.title}</p>
      {!description.openEnded && typeof description.nights === "number" ? (
        <p className="mt-1 text-[0.82rem] uppercase tracking-[0.08em] text-[#6b5f50]">{description.nights} {local.nights}</p>
      ) : null}
      <Link
        href={href as Route}
        className="mt-3 inline-flex min-h-10 items-center border border-[#173f36] bg-[#173f36] px-3 py-2 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-white hover:bg-[#102f28]"
      >
        {description.openEnded ? local.chooseDates : local.request}
      </Link>
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

  return (
    <section id="availability-hub" className="border border-[#dfd4c1] bg-[#fbf7ef] p-5 sm:p-6">
      <p className="editorial-label">{local.eyebrow}</p>
      <h2 className="serif-heading mt-3 text-3xl leading-tight text-[#173f36] sm:text-4xl">{local.title}</h2>
      <p className="mt-3 max-w-3xl text-[1.08rem] leading-8 text-[#5f574c]">{local.body}</p>
      <p className="mt-3 text-[0.98rem] leading-7 text-[#6b5f50]">{local.disclaimer}</p>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {availability.map((item) => {
          const apartment = cardForSlug(item.apartmentSlug);
          if (!apartment) return null;
          const hint = getAvailabilityHintLabel(locale, item);

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
                <p className="mt-3 text-[1rem] leading-7 text-[#5f574c]">{apartment.tagline[locale]}</p>
                {hint ? (
                  <p className="mt-3 text-[0.78rem] font-bold uppercase tracking-[0.12em] text-[#0b6f8f]">{hint}</p>
                ) : null}
                <div className="mt-4">
                  <p className="text-[0.78rem] font-bold uppercase tracking-[0.12em] text-[#6b5f50]">{local.next}</p>
                </div>
                <div className="mt-3 grid gap-2">
                  {item.status === "available"
                    ? item.freeWindows.slice(0, 4).map((interval) => (
                        <WindowLine key={`${interval.start}-${interval.end}`} apartmentSlug={item.apartmentSlug} interval={interval} locale={locale} />
                      ))
                    : null}
                  {item.status === "no-windows" ? (
                    <div className="border border-[#eadfce] bg-white/70 p-3">
                      <p className="text-[1rem] font-semibold leading-7 text-[#173f36]">{local.noWindowsTitle}</p>
                      <p className="mt-2 text-[1rem] leading-7 text-[#5f574c]">{local.noWindows}</p>
                      <Link
                        href={buildFlexibleAvailabilityHref(locale, item.apartmentSlug) as Route}
                        className="mt-3 inline-flex min-h-10 items-center border border-[#173f36] bg-[#173f36] px-3 py-2 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-white hover:bg-[#102f28]"
                      >
                        {local.noWindowsCta}
                      </Link>
                    </div>
                  ) : null}
                  {item.status === "temporarily-unavailable" ? (
                    <div className="border border-[#eadfce] bg-white/70 p-3">
                      <p className="text-[1rem] font-semibold leading-7 text-[#173f36]">{local.unavailableTitle}</p>
                      <p className="mt-2 text-[1rem] leading-7 text-[#5f574c]">{local.unavailable}</p>
                      <Link
                        href={buildFlexibleAvailabilityHref(locale, item.apartmentSlug) as Route}
                        className="mt-3 inline-flex min-h-10 items-center border border-[#173f36] bg-[#173f36] px-3 py-2 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-white hover:bg-[#102f28]"
                      >
                        {local.unavailableCta}
                      </Link>
                    </div>
                  ) : null}
                </div>
                {item.checkedAt ? (
                  <p className="mt-4 text-[0.98rem] leading-6 text-[#756a5d]">
                    {local.updated} {formatTimeCheckedLabel(locale, item.checkedAt)}
                  </p>
                ) : null}
                {item.sourceFreshness === "stale" ? (
                  <p className="mt-2 text-[0.95rem] leading-6 text-[#756a5d]">{local.stale}</p>
                ) : null}
                <div className="mt-auto flex flex-wrap gap-3 pt-4">
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
      {availability.checkedAt ? (
        <p className="mt-4 text-[0.95rem] leading-6 text-[#756a5d]">
          {local.updated} {formatTimeCheckedLabel(locale, availability.checkedAt)}
        </p>
      ) : null}
      {availability.sourceFreshness === "stale" ? (
        <p className="mt-2 text-[0.95rem] leading-6 text-[#756a5d]">{local.stale}</p>
      ) : null}
      <div className="mt-4 flex flex-wrap gap-3">
        {availability.status === "available" && availability.freeWindows[0] ? <WindowPreviewCta availability={availability} locale={locale} /> : null}
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

function WindowPreviewCta({ availability, locale }: { availability: ApartmentAvailability; locale: Locale }) {
  const interval = availability.freeWindows[0];
  if (!interval) return null;

  const description = describeWindow(locale, availability.apartmentSlug, interval);
  const href = description.openEnded
    ? buildOpenEndedAvailabilityPrefillHref(locale, availability.apartmentSlug, interval.start)
    : buildAvailabilityPrefillHref(locale, availability.apartmentSlug, interval);

  return (
    <Link
      href={href as Route}
      className="inline-flex min-h-10 items-center border border-[#173f36] bg-[#173f36] px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-white hover:bg-[#102f28]"
    >
      {description.openEnded ? copy[locale].chooseDates : copy[locale].request}
    </Link>
  );
}
