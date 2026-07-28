import { describe, expect, it } from "vitest";

import { extractGuideIntake } from "../../src/lib/guide-intake";

describe("guide intake extraction", () => {
  it("extracts guide metadata, section headings, place candidates and related guides from a draft", () => {
    const raw = `
SEO title: Burgers in Menton: Local Burger Restaurants and Fast Food Chains
Meta description: Looking for a good burger in Menton? Discover local burger restaurants, gourmet burgers, McDonald's and nearby Burger King options around Menton and Garavan.
Suggested slug: /en/guide/burgers-menton

# **Burgers in Menton: local burger restaurants and familiar chains nearby**

Whether you're looking for a gourmet burger or a familiar fast-food stop, Menton offers several useful options.

## **Local burger restaurants**

### **All's Stars**

### **La Caz'amis**

## **Restaurant-quality burgers**

### **Le 31**

## **Related guides**

- Kebab, Shawarma and Falafel in Menton
- Best Pizza in Menton
`;

    const intake = extractGuideIntake(raw, { coverPathHint: "/tmp/cover.png" });

    expect(intake.slug).toBe("burgers-menton");
    expect(intake.title).toBe("Burgers in Menton: local burger restaurants and familiar chains nearby");
    expect(intake.seoTitle).toBe("Burgers in Menton: Local Burger Restaurants and Fast Food Chains");
    expect(intake.metaDescription).toContain("McDonald's");
    expect(intake.coverPathHint).toBe("/tmp/cover.png");
    expect(intake.sectionHeadings).toEqual(["Local burger restaurants", "Restaurant-quality burgers", "Related guides"]);
    expect(intake.placeCandidates).toEqual([
      { name: "All's Stars", section: "Local burger restaurants" },
      { name: "La Caz'amis", section: "Local burger restaurants" },
      { name: "Le 31", section: "Restaurant-quality burgers" },
    ]);
    expect(intake.relatedGuideTitles).toEqual([
      "Kebab, Shawarma and Falafel in Menton",
      "Best Pizza in Menton",
    ]);
  });

  it("ignores recommendation headings when extracting place candidates", () => {
    const raw = `
# **Italian Restaurants in Menton Beyond Pizza**

Living next to Italy has shaped Menton's food culture.

## **Best Italian Restaurants in Menton**

### **Gusto Italiano**

### **Le Napoli**

## **Ventimiglia**

### **Pasta & Basta**

# **Our Recommendations**

### **Best all-round Italian restaurant in Menton**

### **Best fine dining**
`;

    const intake = extractGuideIntake(raw, { coverPathHint: "/tmp/cover.png" });

    expect(intake.placeCandidates).toEqual([
      { name: "Gusto Italiano", section: "Best Italian Restaurants in Menton" },
      { name: "Le Napoli", section: "Best Italian Restaurants in Menton" },
      { name: "Pasta & Basta", section: "Ventimiglia" },
    ]);
  });
});
