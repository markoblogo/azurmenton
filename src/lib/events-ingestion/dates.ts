const englishMonths: Record<string, number> = {
  january: 1,
  february: 2,
  march: 3,
  april: 4,
  may: 5,
  june: 6,
  july: 7,
  august: 8,
  september: 9,
  october: 10,
  november: 11,
  december: 12,
};

const italianMonths: Record<string, number> = {
  gennaio: 1,
  febbraio: 2,
  marzo: 3,
  aprile: 4,
  maggio: 5,
  giugno: 6,
  luglio: 7,
  agosto: 8,
  settembre: 9,
  ottobre: 10,
  novembre: 11,
  dicembre: 12,
};

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function dateKey(year: number, month: number, day: number) {
  return `${year}-${pad(month)}-${pad(day)}`;
}

export function parseEnglishDateRange(parts: { startDay: string; startMonth: string; endDay?: string; endMonth?: string; year: string }) {
  const startMonth = englishMonths[parts.startMonth.toLowerCase()];
  const endMonth = parts.endMonth ? englishMonths[parts.endMonth.toLowerCase()] : startMonth;
  const year = Number(parts.year);
  if (!startMonth || !endMonth || !year) return {};
  const startDate = dateKey(year, startMonth, Number(parts.startDay));
  const endDate = parts.endDay ? dateKey(year, endMonth, Number(parts.endDay)) : undefined;
  return { startDate, endDate };
}

export function parseItalianCalendarDate(monthYear: string, day: string) {
  const match = monthYear.trim().match(/^([A-Za-zÀ-ÿ]+)\s+(\d{4})$/);
  if (!match) return undefined;
  const month = italianMonths[match[1].toLowerCase()];
  const year = Number(match[2]);
  const numericDay = Number(day);
  if (!month || !year || !numericDay) return undefined;
  return dateKey(year, month, numericDay);
}
