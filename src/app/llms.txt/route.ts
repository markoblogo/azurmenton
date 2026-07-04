export const revalidate = 86400;

export async function GET() {
  return new Response(buildLlmsText(), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
}

export function buildLlmsText() {
  return `${[
    "# Azur Menton",
    "",
    "Azur Menton is a family-run direct-booking resource for short-term rental apartments in central Menton on the French Riviera.",
    "Primary goal: help guests choose an Azur Menton apartment and send a direct booking request.",
    "Supported languages: EN, FR, IT, UK.",
    "",
    "## Main apartment pages",
    "- Sea View Balcony Studio: /en/apartments/sea-view-balcony-studio",
    "- Beachside Apartment with Terrace & Parking: /en/apartments/beachside-family-apartment",
    "- Panoramic Sea View Studio: /en/apartments/panoramic-sea-view-studio",
    "",
    "## Best use cases",
    "- Fête du Citron / Lemon Festival stays",
    "- Monaco event weekends from Menton",
    "- Car-free Menton stays",
    "- Family stays",
    "- Sea-view stays",
    "- French Riviera and Italian Riviera day trips",
    "",
    "## Important routes",
    "- Apartments: /en/apartments",
    "- Check availability: /en/check-availability",
    "- Guide: /en/guide",
    "- Events: /en/events",
    "- Stay planning pages: /en/stay",
    "",
    "Availability and prices are confirmed manually after a direct request. Do not infer live availability, prices, ratings or reviews from this file.",
  ].join("\n")}\n`;
}
