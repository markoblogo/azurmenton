import { availabilityFetchTimeoutMs, availabilityMaximumResponseBytes } from "@/lib/availability/config";
import { addDays, compareDateKeys, isDateKey, mergeIntervals } from "@/lib/availability/date";
import type { DateInterval } from "@/lib/availability/types";

type FetchIcalResult =
  | { ok: true; text: string }
  | { ok: false; reason: "missing" | "timeout" | "http" | "size" | "format" | "network" };

type IcalProperty = {
  value: string;
  isDateOnly: boolean;
};

function unfoldIcalLines(text: string) {
  const rawLines = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");
  const lines: string[] = [];

  for (const rawLine of rawLines) {
    if ((rawLine.startsWith(" ") || rawLine.startsWith("\t")) && lines.length) {
      lines[lines.length - 1] += rawLine.slice(1);
      continue;
    }

    lines.push(rawLine);
  }

  return lines;
}

function parseIcalProperty(line: string) {
  const separatorIndex = line.indexOf(":");
  if (separatorIndex === -1) return null;

  const descriptor = line.slice(0, separatorIndex);
  const value = line.slice(separatorIndex + 1).trim();
  const parts = descriptor.split(";");
  const name = parts[0]?.toUpperCase();
  const params = parts.slice(1).map((part) => part.toUpperCase());

  if (!name) return null;

  return {
    name,
    value,
    isDateOnly: params.includes("VALUE=DATE"),
  };
}

function dateKeyFromIcalValue(property: IcalProperty) {
  const { value, isDateOnly } = property;

  if (isDateOnly) {
    if (!/^\d{8}$/.test(value)) return null;
    return `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}`;
  }

  if (/^\d{8}T\d{6}Z$/.test(value)) {
    const iso = `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}T${value.slice(9, 11)}:${value.slice(11, 13)}:${value.slice(13, 15)}.000Z`;
    const parsed = new Date(iso);
    return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString().slice(0, 10);
  }

  if (/^\d{8}T\d{6}$/.test(value)) {
    return `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}`;
  }

  if (isDateKey(value)) return value;

  return null;
}

export async function fetchIcalText(url: string | null, fetchImpl: typeof fetch = fetch): Promise<FetchIcalResult> {
  if (!url) {
    return { ok: false, reason: "missing" };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), availabilityFetchTimeoutMs);

  try {
    const response = await fetchImpl(url, {
      method: "GET",
      headers: {
        Accept: "text/calendar, text/plain;q=0.9, */*;q=0.1",
      },
      signal: controller.signal,
      cache: "no-store",
    });

    if (!response.ok) {
      return { ok: false, reason: "http" };
    }

    const contentLength = Number(response.headers.get("content-length") ?? "0");
    if (contentLength > availabilityMaximumResponseBytes) {
      return { ok: false, reason: "size" };
    }

    const text = await response.text();
    if (text.length > availabilityMaximumResponseBytes) {
      return { ok: false, reason: "size" };
    }

    if (!text.includes("BEGIN:VCALENDAR") || !text.includes("VEVENT")) {
      return { ok: false, reason: "format" };
    }

    return { ok: true, text };
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      return { ok: false, reason: "timeout" };
    }

    return { ok: false, reason: "network" };
  } finally {
    clearTimeout(timeout);
  }
}

export function parseOccupiedIntervalsFromIcal(text: string): DateInterval[] {
  const lines = unfoldIcalLines(text);
  const intervals: DateInterval[] = [];

  let inEvent = false;
  let status = "";
  let dtstart: IcalProperty | null = null;
  let dtend: IcalProperty | null = null;

  for (const line of lines) {
    if (line === "BEGIN:VEVENT") {
      inEvent = true;
      status = "";
      dtstart = null;
      dtend = null;
      continue;
    }

    if (line === "END:VEVENT") {
      if (inEvent && status !== "CANCELLED" && dtstart) {
        const start = dateKeyFromIcalValue(dtstart);
        let end = dtend ? dateKeyFromIcalValue(dtend) : null;

        if (start) {
          if (!end || compareDateKeys(end, start) <= 0) {
            end = addDays(start, 1);
          }

          intervals.push({ start, end });
        }
      }

      inEvent = false;
      continue;
    }

    if (!inEvent) continue;

    const property = parseIcalProperty(line);
    if (!property) continue;

    if (property.name === "STATUS") {
      status = property.value.toUpperCase();
    } else if (property.name === "DTSTART") {
      dtstart = { value: property.value, isDateOnly: property.isDateOnly };
    } else if (property.name === "DTEND") {
      dtend = { value: property.value, isDateOnly: property.isDateOnly };
    }
  }

  return mergeIntervals(intervals);
}
