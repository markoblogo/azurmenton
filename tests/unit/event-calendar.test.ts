import { describe, expect, it } from "vitest";
import { getEventDetail, rivieraEvents } from "@/content/riviera-events";
import { eventCalendarFile, getCalendarData, googleCalendarUrl } from "@/lib/event-calendar";
import { GET } from "@/app/api/events/[slug]/calendar/route";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { AddToCalendar } from "@/components/events/AddToCalendar";

const base = getEventDetail("vivaldi-gloria-menton-2026-10-31")!;
describe("event calendar export", () => {
  it("retains the marathon's successive starts without inventing a finish", () => {
    const event = getEventDetail("nice-cannes-marathon")!;
    const file = eventCalendarFile(event, "en")!;
    expect(file).toContain("DTSTART:20261108T065700Z");
    expect(file.replace(/\r\n /g, "")).toContain("mass start from 08:03");
    expect(file).not.toContain("DTEND");
  });
  it("renders a separate download per performance in all four languages", () => {
    const event = getEventDetail("stand-up-monaco-2026-11-09")!;
    for (const locale of ["en", "fr", "it", "uk"] as const) {
      const html = renderToStaticMarkup(createElement(AddToCalendar, { event, locale }));
      expect(html).toContain(`locale=${locale}&amp;session=1900`);
      expect(html).toContain(`locale=${locale}&amp;session=2100`);
      expect(html.match(/<summary/g)).toHaveLength(1);
    }
  });
  it("requires a session and gives each performance a stable UID", async () => {
    const event = getEventDetail("stand-up-monaco-2026-11-09")!;
    expect(eventCalendarFile(event, "en")).toBeNull();
    expect(eventCalendarFile(event, "en", "missing")).toBeNull();
    expect(eventCalendarFile(event, "en", "1900")).toContain("DTSTART:20261109T180000Z");
    expect(eventCalendarFile(event, "uk", "2100")).toContain("DTSTART:20261109T200000Z");
    expect(eventCalendarFile(event, "fr", "1900")).toContain(`UID:${event.id}--1900@azurmenton.com`);
    expect(eventCalendarFile(event, "uk", "2100")).toContain(`UID:${event.id}--2100@azurmenton.com`);
    const context = { params: Promise.resolve({ slug: event.slug }) };
    expect((await GET(new Request("https://azurmenton.com/?session=2100"), context)).status).toBe(200);
    expect((await GET(new Request("https://azurmenton.com/?session=missing"), context)).status).toBe(404);
    expect(getCalendarData({ ...event, sessions: [event.sessions![0], event.sessions![0]] }, "en", "1900")).toBeNull();
    expect(getCalendarData({ ...event, sessions: [{ ...event.sessions![0], date: "2026-11-10" }] }, "en", "1900")).toBeNull();
  });
  it("exports verified Halloween hours and retains programme distinctions", () => {
    const halloween = getEventDetail("menton-fete-halloween-2026")!;
    expect(eventCalendarFile(halloween, "en")).toContain("DTSTART:20261030T123000Z");
    expect(eventCalendarFile(halloween, "en")).toContain("DTEND:20261030T150000Z");
    expect(googleCalendarUrl(getCalendarData(halloween, "en")!)).not.toBeNull();
    const jimmy = getEventDetail("jimmy-gnecco-ours-monaco-2026-11-05")!;
    expect(getCalendarData(jimmy, "en")!.description).toContain("live 20:30");
    const standup = getEventDetail("stand-up-monaco-2026-11-09")!;
    expect(standup.schedule).toBeUndefined();
    expect(getCalendarData(standup, "en", "1900")!.description).toContain("19:00 and 21:00");
    expect(eventCalendarFile(getEventDetail("st-johns-jazz-menton-2026-11-06")!, "en")).toContain("DTSTART:20261106T173000Z");
  });
  it("uses verified winter time and venue without inventing an end", () => {
    const file = eventCalendarFile(base, "en")!;
    expect(file).toContain("DTSTART:20261031T173000Z");
    expect(file).not.toContain("DTEND");
    expect(file).not.toContain("DURATION");
    expect(file).toContain("31 avenue Carnot");
    expect(googleCalendarUrl(getCalendarData(base, "en")!)).toBeNull();
  });
  it("exports inclusive date ranges with an exclusive end and localized text", () => {
    const event = { ...base, schedule: undefined, startDate: "2026-12-01", endDate: "2026-12-03" };
    const file = eventCalendarFile(event, "uk")!;
    expect(file).toContain("DTSTART;VALUE=DATE:20261201");
    expect(file).toContain("DTEND;VALUE=DATE:20261204");
    expect(file).toContain("Лише дати");
    expect(googleCalendarUrl(getCalendarData(event, "en")!)).toContain("20261201%2F20261204");
  });
  it("respects summer time, stable UID and unknown dates", () => {
    const event = { ...base, startDate: "2027-07-01", endDate: "2027-07-01" };
    expect(eventCalendarFile(event, "fr")).toContain("DTSTART:20270701T163000Z");
    expect(eventCalendarFile(event, "fr")).toContain(`UID:${base.id}@azurmenton.com`);
    expect(getCalendarData({ ...base, dateStatus: "dates_pending" }, "en")).toBeNull();
    expect(getCalendarData({ ...base, dateStatusConflict: true }, "en")).toBeNull();
    expect(getCalendarData({ ...base, startDate: "2026-02-30" }, "en")).toBeNull();
    expect(getCalendarData({ ...base, endDate: "2026-01-01" }, "en")).toBeNull();
  });
  it("rejects malformed times, DST gaps and ambiguous repeated hours", () => {
    for (const [day, time] of [["2027-03-28", "02:30"], ["2026-10-25", "02:30"], ["2026-10-31", "24:10"]]) {
      expect(getCalendarData({ ...base, startDate: day, endDate: day, schedule: { ...base.schedule!, startTime: time } }, "en")).toBeNull();
    }
    expect(getCalendarData({ ...base, schedule: { ...base.schedule!, endTime: "18:00" } }, "en")).toBeNull();
  });
  it("keeps new structured venue references resolvable", async () => {
    const { getPlaces } = await import("@/content/places");
    for (const event of rivieraEvents) {
      if (event.venue?.placeId) expect(getPlaces([event.venue.placeId])).toHaveLength(1);
      if (event.schedule) expect(getCalendarData(event, "en")).not.toBeNull();
    }
  });
  it("serves downloads, rejects missing events and invalid locale", async () => {
    const context = { params: Promise.resolve({ slug: base.slug }) };
    const response = await GET(new Request("https://azurmenton.com/api/events/test/calendar?locale=it"), context);
    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toContain("text/calendar");
    expect(response.headers.get("Content-Disposition")).toContain("attachment");
    expect((await response.text())).toContain("BEGIN:VCALENDAR");
    expect((await GET(new Request("https://azurmenton.com/?locale=xx"), context)).status).toBe(400);
    expect((await GET(new Request("https://azurmenton.com/"), { params: Promise.resolve({ slug: "missing" }) })).status).toBe(404);
  });
});
