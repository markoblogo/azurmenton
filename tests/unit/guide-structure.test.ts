import { describe, expect, it } from "vitest";

import { extractGuideIntake } from "../../src/lib/guide-intake";
import { extractGuideStructure } from "../../src/lib/guide-structure";

describe("guide structure extraction", () => {
  it("extracts section prose and place-card summaries from the raw draft", () => {
    const raw = `
# **Italian Restaurants in Menton Beyond Pizza**

Living next to Italy has shaped Menton's food culture in a way few French towns can match.

## **Best Italian Restaurants in Menton**

These are the places to start if you want a proper sit-down Italian meal in town.

### **Gusto Italiano**

One of the most consistently useful addresses for pasta and classic comfort dishes.

### **Le Napoli**

A practical choice for pizza, pasta and familiar Italian mains near the centre.

## **Ventimiglia**

Ventimiglia is the easiest Italian lunch break from Menton by train.

### **Pasta & Basta**

Simple, fast and central if you want an easy border-crossing meal.

## **Related guides**

- Best pizzerias in Menton
`;

    const intake = extractGuideIntake(raw);
    const structure = extractGuideStructure(raw, intake);

    expect(structure.introParagraphs[0]).toContain("Living next to Italy has shaped Menton's food culture");
    expect(structure.sections).toEqual([
      expect.objectContaining({
        heading: "Best Italian Restaurants in Menton",
        kind: "place-group",
        bodyParagraphs: ["These are the places to start if you want a proper sit-down Italian meal in town."],
        relatedPlaceDraftNames: ["Gusto Italiano", "Le Napoli"],
        placeCards: [
          expect.objectContaining({
            draftName: "Gusto Italiano",
            bodyParagraphs: ["One of the most consistently useful addresses for pasta and classic comfort dishes."],
          }),
          expect.objectContaining({
            draftName: "Le Napoli",
            bodyParagraphs: ["A practical choice for pizza, pasta and familiar Italian mains near the centre."],
          }),
        ],
      }),
      expect.objectContaining({
        heading: "Ventimiglia",
        kind: "place-group",
        bodyParagraphs: ["Ventimiglia is the easiest Italian lunch break from Menton by train."],
        relatedPlaceDraftNames: ["Pasta & Basta"],
      }),
    ]);
  });
});
