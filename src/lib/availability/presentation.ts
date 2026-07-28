import type { Locale } from "@/i18n/locales";
import { addMonths, compareDateKeys, diffNights, toDateKey } from "@/lib/availability/date";
import { getApartmentCalendarConfig, isApartmentCalendarSlug } from "@/lib/availability/config";
import type { ApartmentAvailability, DateInterval } from "@/lib/availability/types";

const checkedCopy = {
  en: {
    justNow: "Checked just now",
    minutesAgo: (minutes: number) => `Checked ${minutes} minutes ago`,
    todayAt: (value: string) => `Checked today at ${value}`,
    lastChecked: (value: string) => `Last checked ${value}`,
    nextAvailable: "Next available",
    availableFrom: "Available from",
    flexibleDates: "Check flexible dates",
  },
  fr: {
    justNow: "Vérifié à l’instant",
    minutesAgo: (minutes: number) => `Vérifié il y a ${minutes} min`,
    todayAt: (value: string) => `Vérifié aujourd’hui à ${value}`,
    lastChecked: (value: string) => `Dernière vérification ${value}`,
    nextAvailable: "Prochaine disponibilité",
    availableFrom: "Disponible à partir du",
    flexibleDates: "Voir dates flexibles",
  },
  it: {
    justNow: "Controllato poco fa",
    minutesAgo: (minutes: number) => `Controllato ${minutes} min fa`,
    todayAt: (value: string) => `Controllato oggi alle ${value}`,
    lastChecked: (value: string) => `Ultimo controllo ${value}`,
    nextAvailable: "Prossima disponibilità",
    availableFrom: "Disponibile dal",
    flexibleDates: "Verifica date flessibili",
  },
  uk: {
    justNow: "Щойно перевірено",
    minutesAgo: (minutes: number) => `Перевірено ${minutes} хв тому`,
    todayAt: (value: string) => `Перевірено сьогодні о ${value}`,
    lastChecked: (value: string) => `Востаннє перевірено ${value}`,
    nextAvailable: "Найближча доступність",
    availableFrom: "Доступно з",
    flexibleDates: "Перевірити гнучкі дати",
  },
} as const;

function formatDate(locale: Locale, date: string) {
  return new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", year: "numeric" }).format(new Date(`${date}T00:00:00.000Z`));
}

export function formatTimeCheckedLabel(locale: Locale, checkedAt: string) {
  if (!checkedAt) return "";
  const copy = checkedCopy[locale];
  const checked = new Date(checkedAt);
  if (Number.isNaN(checked.getTime())) return "";

  const diffMs = Date.now() - checked.getTime();
  if (diffMs < 90_000) return copy.justNow;

  const diffMinutes = Math.round(diffMs / 60_000);
  if (diffMinutes < 60) return copy.minutesAgo(diffMinutes);

  const today = new Date();
  const isToday =
    checked.getFullYear() === today.getFullYear() &&
    checked.getMonth() === today.getMonth() &&
    checked.getDate() === today.getDate();

  if (isToday) {
    const time = new Intl.DateTimeFormat(locale, { hour: "2-digit", minute: "2-digit" }).format(checked);
    return copy.todayAt(time);
  }

  const stamp = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  }).format(checked);

  return copy.lastChecked(stamp);
}

export function isOpenEndedWindow(apartmentSlug: string, interval: DateInterval) {
  if (!isApartmentCalendarSlug(apartmentSlug)) return false;
  const horizonEnd = addMonths(toDateKey(new Date()), getApartmentCalendarConfig(apartmentSlug).searchHorizonMonths);
  return compareDateKeys(interval.end, horizonEnd) >= 0;
}

export function describeWindow(locale: Locale, apartmentSlug: string, interval: DateInterval) {
  const nights = diffNights(interval.start, interval.end);
  const openEnded = isOpenEndedWindow(apartmentSlug, interval);

  return {
    openEnded,
    title: openEnded
      ? `${checkedCopy[locale].availableFrom} ${formatDate(locale, interval.start)}`
      : `${formatDate(locale, interval.start)}–${formatDate(locale, interval.end)}`,
    nights,
  };
}

export function getAvailabilityHintLabel(locale: Locale, availability: ApartmentAvailability) {
  if (availability.sourceFreshness !== "fresh") return null;
  if (availability.status === "temporarily-unavailable") return null;
  if (availability.status === "no-windows") return checkedCopy[locale].flexibleDates;

  const firstWindow = availability.freeWindows[0];
  if (!firstWindow) return checkedCopy[locale].flexibleDates;
  if (isOpenEndedWindow(availability.apartmentSlug, firstWindow)) {
    return `${checkedCopy[locale].availableFrom} ${new Intl.DateTimeFormat(locale, { day: "numeric", month: "long" }).format(new Date(`${firstWindow.start}T00:00:00.000Z`))}`;
  }

  return `${checkedCopy[locale].nextAvailable}: ${new Intl.DateTimeFormat(locale, { day: "numeric", month: "long" }).format(new Date(`${firstWindow.start}T00:00:00.000Z`))}`;
}
