import { describe, expect, it } from "vitest";
import { getGuideArticle } from "@/content/guide";
import { getPlace } from "@/content/places";
import { eventFreshnessProfiles, getEventDetail } from "@/content/riviera-events";
import { eventCalendarFile } from "@/lib/event-calendar";
import { locales } from "@/i18n/locales";
import { transportOptionLabels, transportOptions } from "@/content/transport";

describe("2 November editorial corrections", () => {
  it("confirms the existing Monaco fair without inventing uniform daily hours", () => {
    const fair = getEventDetail("amusement-park-monaco")!;
    expect(fair.startDate).toBe("2026-10-16");
    expect(fair.endDate).toBe("2026-11-19");
    expect(fair.dateStatus).toBe("confirmed");
    expect(fair.sourceStatus).toBe("verified");
    expect(fair.venue?.placeId).toBe("port-hercule-christmas-monaco");
    expect(fair.relatedPlaceIds).toContain(fair.venue?.placeId);
    expect(eventFreshnessProfiles.some((profile) => profile.slug === fair.slug)).toBe(false);
    expect(fair.schedule).toBeUndefined();
    const file = eventCalendarFile(fair, "en")!;
    expect(file).toContain("DTSTART;VALUE=DATE:20261016");
    expect(file).toContain("DTEND;VALUE=DATE:20261120");
  });

  it("removes free-shuttle claims and links the specific November rail notice", () => {
    const guide = getGuideArticle("public-transport-in-menton")!;
    const intro = guide.sections[0];
    for (const locale of locales) {
      const body = intro.body.map((paragraph) => paragraph[locale]).join(" ");
      expect(body).not.toMatch(/free city navette|navette gratuite|navetta gratuita|безкоштовним шатлом/i);
      expect(guide.seoDescription[locale]).not.toMatch(/free navette|navette gratuite|navetta gratuita|безкоштовний шатл/i);
    }
    expect(intro.officialLinks?.some((link) => link.url.endsWith("/nice-monaco-vintimille-nice-breil-tende"))).toBe(true);
    const shuttle = transportOptions.find((option) => option.type === "navette")!;
    expect(transportOptionLabels.navette).toEqual({ en: "City shuttle", fr: "Navette du centre-ville", it: "Navetta del centro", uk: "Міський шатл" });
    expect(shuttle.name).toEqual(transportOptionLabels.navette);
    for (const locale of locales) expect(shuttle.note[locale]).toContain("1");
    expect(shuttle.note.en).toContain("€1");
  });

  it("keeps dated airport and park conditions in shared place records", () => {
    for (const id of ["nice-cote-dazur-airport", "parc-phoenix-nice", "parc-alpha-saint-martin-vesubie"]) {
      const rules = getPlace(id)!.visitRules!.conditions!;
      expect(rules.some((rule) => rule.checkedOn === "2026-11-02")).toBe(true);
      for (const rule of rules) for (const locale of locales) expect(rule.value[locale]).toBeTruthy();
    }
    expect(getPlace("parc-phoenix-nice")!.openingHoursLabel!.en).toContain("09:30-18:00");
    expect(getPlace("parc-alpha-saint-martin-vesubie")!.visitRules!.conditions![0].value.en).toContain("not evidence of closure");
  });

  it("does not turn the conflicting Monaco triathlon into a confirmed event", () => {
    expect(getEventDetail("monaco-international-triathlon")!.dateStatus).toBe("dates_pending");
  });
});
