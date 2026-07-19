import { describe, expect, it } from "vitest";
import { buildLlmsText } from "../../src/lib/llms";

describe("llms.txt", () => {
  it("is concise, public, and booking-focused", () => {
    const text = buildLlmsText();

    expect(text).toContain("# Azur Menton");
    expect(text).toContain("direct booking request");
    expect(text).toContain("Supported languages: EN, FR, IT, UK.");
    expect(text).toContain("/en/apartments");
    expect(text).toContain("/en/check-availability");
    expect(text).toContain("/en/stay");
    expect(text).toContain("Fête du Citron / Lemon Festival stays");
    expect(text).toContain("Monaco event weekends from Menton");
    expect(text).toContain("Availability and prices are confirmed manually");
    expect(text).not.toMatch(/@|WhatsApp|secret|token|internal/i);
    expect(text.split("\n").length).toBeLessThan(40);
  });
});
