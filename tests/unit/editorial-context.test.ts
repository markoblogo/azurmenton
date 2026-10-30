import { describe, expect, it } from "vitest";
import { correctionFromHash, correctionHref } from "@/lib/editorial-context";
import { validateEditorialSubmission } from "@/lib/editorial-submission";

describe("contextual corrections", () => {
  it("round-trips a localized place anchor without creating a query URL", () => {
    const href = correctionHref("uk", "/uk/guide/menton-old-town?filter=test#place-halles-du-marche", "Halles du Marché & cafés");
    expect(href.split("#")[0]).toBe("/uk/events");
    expect(correctionFromHash(new URL(href, "https://azurmenton.com").hash)).toEqual({page:"https://azurmenton.com/uk/guide/menton-old-town#place-halles-du-marche", subject:"Halles du Marché & cafés"});
  });
  it("ignores forged destinations and oversized fragments", () => {
    for (const page of ["https://evil.test/en/events", "javascript:alert(1)", "https://azurmenton.com@evil.test/en/events", "https://azurmenton.com/en/check-availability"]) {
      expect(correctionFromHash(`#suggest-event?${new URLSearchParams({page,subject:"Test"})}`)).toBeNull();
    }
    expect(correctionFromHash(`#suggest-event?${"a".repeat(4000)}`)).toBeNull();
  });
  it("validates the reason and retains context for manual moderation only", () => {
    const data = {type:"correction", name:"Test", email:"test@example.com", page:"https://azurmenton.com/en/events/test", subject:"Event name", reason:"dates", message:"The date has changed",privacy:"accepted"};
    expect(validateEditorialSubmission(data)).toMatchObject({subject:"Event name", reason:"dates"});
    expect(validateEditorialSubmission({...data,reason:"publish-now"})).toBeNull();
    expect(validateEditorialSubmission({...data,subject:"x".repeat(201)})).toBeNull();
  });
});
