import { describe, expect, it } from "vitest";
import { getHomepageFaqItems } from "../../src/content/pages";

describe("homepage FAQ", () => {
  it.each([
    ["en", "Can I see availability before requesting?"],
    ["fr", "Puis-je voir les disponibilités avant d’envoyer une demande ?"],
    ["it", "Posso vedere la disponibilità prima di inviare una richiesta?"],
    ["uk", "Чи можна побачити доступність до надсилання запиту?"],
  ] as const)("renders booking guidance in %s", (locale, availabilityQuestion) => {
    const items = getHomepageFaqItems(locale);

    expect(items).toHaveLength(4);
    expect(items.map((item) => item.question)).toContain(availabilityQuestion);
    expect(items.every((item) => item.question.length > 0 && item.answer.length > 0)).toBe(true);
  });

  it("describes availability previews as read-only guidance", () => {
    const availability = getHomepageFaqItems("en").find((item) => item.question.includes("availability"));

    expect(availability?.answer).toContain("read-only planning windows");
    expect(availability?.answer).toContain("confirm availability manually");
  });
});
