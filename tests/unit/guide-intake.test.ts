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
    expect(intake.categoryHint).toBeUndefined();
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

  it("normalizes numbered headings and extracts related guide hints from links and alternate labels", () => {
    const raw = `
Title tag: Italian restaurants in Menton beyond pizza
Description: A practical guide to Ligurian and Italian restaurants around Menton.
Suggested URL: /en/guide/italian-restaurants-in-menton-beyond-pizza

# **Italian restaurants in Menton: beyond pizza**

Living next to Italy shapes everyday eating in Menton.

## **1. Menton**

### **1. Gusto Italiano**

### **2. Le Napoli**

## **2. Beyond Menton**

### **Pasta & Basta**

## **Relevant guides**

- [Italian Riviera Day Trip from Menton](https://azurmenton.com/en/guide/italian-riviera-day-trip-from-menton)
- https://azurmenton.com/en/guide/local-food-menton
- Best pizza in Menton
`;

    const intake = extractGuideIntake(raw);

    expect(intake.slug).toBe("italian-restaurants-in-menton-beyond-pizza");
    expect(intake.seoTitle).toBe("Italian restaurants in Menton beyond pizza");
    expect(intake.metaDescription).toBe("A practical guide to Ligurian and Italian restaurants around Menton.");
    expect(intake.sectionHeadings).toEqual(["Menton", "Beyond Menton", "Relevant guides"]);
    expect(intake.placeCandidates).toEqual([
      { name: "Gusto Italiano", section: "Menton" },
      { name: "Le Napoli", section: "Menton" },
      { name: "Pasta & Basta", section: "Beyond Menton" },
    ]);
    expect(intake.relatedGuideTitles).toEqual([
      "Italian Riviera Day Trip from Menton",
      "Local Food Menton",
      "Best pizza in Menton",
    ]);
  });

  it("skips SEO-style preamble headings before the real guide H1", () => {
    const raw = `
# SEO

SEO title: Air Adventures Near Menton: Helicopter Flights, Paragliding & Skydiving on the French Riviera
Meta description: Discover the best helicopter flights, paragliding, skydiving and scenic air experiences near Menton, Monaco, Nice and the Italian Riviera.

# **Air Adventures Near Menton: Helicopter Flights, Paragliding & Skydiving on the French Riviera**

Menton works well as a base for air experiences across the Riviera.

## **Helicopter flights**

### **Monaco helicopter experiences**

## **Paragliding**

### **Roquebrune paragliding area**
`;

    const intake = extractGuideIntake(raw);

    expect(intake.title).toBe("Air Adventures Near Menton: Helicopter Flights, Paragliding & Skydiving on the French Riviera");
    expect(intake.slug).toBe("air-adventures-near-menton-helicopter-flights-paragliding-skydiving-on-the-french-riviera");
    expect(intake.intro).toBe("Menton works well as a base for air experiences across the Riviera.");
    expect(intake.sectionHeadings).toEqual(["Helicopter flights", "Paragliding"]);
    expect(intake.placeCandidates).toEqual([
      { name: "Monaco helicopter experiences", section: "Helicopter flights" },
      { name: "Roquebrune paragliding area", section: "Paragliding" },
    ]);
  });

  it("extracts explicit slug and metadata from a service preamble without treating it as article content", () => {
    const raw = `
# **SEO**

- **SEO title:** Post Offices, Stamps & Parcel Services in Menton (Plus Monaco & Nice)
- **Meta description:** Looking for a post office in Menton? Find where to buy stamps, send postcards and parcels in Menton, Monaco and Nice, with practical tips for travellers.
- **Canonical slug:** /en/guide/post-offices-stamps-menton

# **Post Offices, Stamps & Parcel Services in Menton**

Many visitors still enjoy sending a real postcard from the French Riviera.

## **Menton**

### **Main Post Office (La Poste Menton)**
`;

    const intake = extractGuideIntake(raw);

    expect(intake.slug).toBe("post-offices-stamps-menton");
    expect(intake.seoTitle).toBe("Post Offices, Stamps & Parcel Services in Menton (Plus Monaco & Nice)");
    expect(intake.metaDescription).toContain("buy stamps");
    expect(intake.intro).toBe("Many visitors still enjoy sending a real postcard from the French Riviera.");
    expect(intake.placeCandidates).toEqual([{ name: "Main Post Office (La Poste Menton)", section: "Menton" }]);
  });

  it("extracts cover path hints from a normal user preamble when --cover is not passed", () => {
    const raw = `
Вот материал для нового гайда - размести его на сайте в формате проекта, а обложка вот тут: /Users/antonbiletskiy-volokh/Desktop/cover.png.

# **Water sports in Menton**

Short intro.

## **Paddleboarding**

### **Plage des Sablettes**
`;

    const intake = extractGuideIntake(raw);

    expect(intake.coverPathHint).toBe("/Users/antonbiletskiy-volokh/Desktop/cover.png");
    expect(intake.title).toBe("Water sports in Menton");
  });

  it("extracts metadata whose labels and values are on separate lines", () => {
    const raw = `
# SEO

**Title**

Laundry, Laundromats & Dry Cleaning in Menton (Victoria Beach & Garavan)

**Slug**

\`laundry-laundromats-menton\`

**Meta description**

Looking for a laundromat or dry cleaner in Menton?

## **Laundry near Victoria Beach Apartments**

Guests staying at Victoria Beach can walk to practical laundry options.

### **Laverie des Jardins**
`;

    const intake = extractGuideIntake(raw);

    expect(intake.title).toBe("Laundry, Laundromats & Dry Cleaning in Menton (Victoria Beach & Garavan)");
    expect(intake.slug).toBe("laundry-laundromats-menton");
    expect(intake.seoTitle).toBe("Laundry, Laundromats & Dry Cleaning in Menton (Victoria Beach & Garavan)");
    expect(intake.metaDescription).toBe("Looking for a laundromat or dry cleaner in Menton?");
  });

  it("treats widget/provider sections as utility hints instead of place candidates", () => {
    const raw = `
Вот материал для нового гайда - а обложка вот тут: /Users/antonbiletskiy-volokh/Desktop/cover.png.

# **Water sports in Menton: paddleboard, kayak, sailing and snorkelling**

**Meta title:** Water sports in Menton: paddleboard, kayak, sailing and snorkelling
**Meta description:** Discover the best water sports in Menton and nearby.

# **Water sports in Menton: paddleboard, kayak, sailing and snorkelling**

Menton sits between the mountains and the Mediterranean.

# **Scuba diving**

## **Menton**

Ideal for introductory dives.

## **Monaco**

Suitable for certified divers.

## **Nice**

Offers numerous dive schools.

# **Useful weather and sea widgets for this guide**

## **Option 1 (Recommended): Windy.com Embed**

## **Option 2: Windfinder Widget**

## **Option 3: OpenWeather + Open-Meteo (Custom)**
`;

    const intake = extractGuideIntake(raw);

    expect(intake.intro).toBe("Menton sits between the mountains and the Mediterranean.");
    expect(intake.coverPathHint).toBe("/Users/antonbiletskiy-volokh/Desktop/cover.png");
    expect(intake.placeCandidates).toEqual([]);
    expect(intake.sectionHeadings).not.toContain("Useful weather and sea widgets for this guide");
    expect(intake.utilityBlockHints).toEqual([
      expect.objectContaining({
        type: "marineConditions",
        section: "Useful weather and sea widgets for this guide",
        providerHints: expect.arrayContaining(["Windy", "Windfinder", "OpenWeather", "Open-Meteo"]),
      }),
    ]);
  });
});
