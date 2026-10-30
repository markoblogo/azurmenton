import { describe, expect, it } from "vitest";
import { addDaysToDateKey, canRenderEventJsonLd, getEventDateStatus } from "@/lib/events";
import { getRivieraEvent, isIndexableEventDetail } from "@/content/riviera-events";

describe("event dates follow Menton time, not the host timezone",()=>{
  it("archives an ended occurrence at Paris midnight in display and JSON-LD",()=>{
    const event={dateStatus:"confirmed" as const,startDate:"2026-10-30",endDate:"2026-10-30",dateLabel:"30 October"};
    const original=process.env.TZ;
    try{
      process.env.TZ="UTC";
      const before=new Date("2026-10-30T22:59:59Z");
      const after=new Date("2026-10-30T23:00:00Z");
      expect(getEventDateStatus(event,before)).toBe("current");
      expect(getEventDateStatus(event,after)).toBe("past");
      expect(canRenderEventJsonLd(event,after)).toBe(false);
      expect(isIndexableEventDetail({...getRivieraEvent("vivaldi-gloria-menton-2026-10-31")!,...event},after)).toBe(false);
      process.env.TZ="Pacific/Kiritimati";
      expect(addDaysToDateKey("2026-10-30",1)).toBe("2026-10-31");
    }finally{if(original===undefined)delete process.env.TZ;else process.env.TZ=original;}
  });
});
