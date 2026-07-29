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

  it("ignores service preamble headings when building structure output", () => {
    const raw = `
# **SEO**

SEO title: Post Offices, Stamps & Parcel Services in Menton (Plus Monaco & Nice)
Meta description: Looking for a post office in Menton?
Suggested slug: /en/guide/post-offices-stamps-menton

# **Post Offices, Stamps & Parcel Services in Menton**

Many visitors still enjoy sending a real postcard from the French Riviera.

## **Menton**

The central office is usually enough for most travellers.

### **Main Post Office (La Poste Menton)**

The easiest full-service post office in town.
`;

    const intake = extractGuideIntake(raw);
    const structure = extractGuideStructure(raw, intake);

    expect(structure.title).toBe("Post Offices, Stamps & Parcel Services in Menton");
    expect(structure.introParagraphs).toEqual(["Many visitors still enjoy sending a real postcard from the French Riviera."]);
    expect(structure.sections).toEqual([
      expect.objectContaining({
        heading: "Menton",
        kind: "place-group",
        bodyParagraphs: ["The central office is usually enough for most travellers."],
        relatedPlaceDraftNames: ["Main Post Office (La Poste Menton)"],
      }),
    ]);
  });
});
