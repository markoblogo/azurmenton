import { siteConfig } from "@/config/site";
import { apartments } from "@/content/apartments";
import { guideArticles, localizeGuideArticle } from "@/content/guide";
import { eventDetailSlugs, getRivieraEvent, getEventTitle } from "@/content/riviera-events";
import { locales } from "@/i18n/locales";
import { absoluteUrl, localizedPath } from "@/lib/seo";

export const revalidate = 86400;

export async function GET() {
  return new Response(buildLlmsText(), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
}

function buildLlmsText() {
  const lines = [
    "# Azur Menton",
    "",
    "Azur Menton is a family-run collection of beachfront and beachside short-term rental apartments in Menton, France. Direct booking requests are handled manually by the host; the site does not publish instant availability, fake prices, ratings, or reviews.",
    "",
    "## Core Pages",
    ...locales.flatMap((locale) => [
      `- ${locale}: ${absoluteUrl(localizedPath(locale))}`,
      `  - apartments: ${absoluteUrl(localizedPath(locale, "apartments"))}`,
      `  - direct booking request: ${absoluteUrl(localizedPath(locale, "check-availability"))}`,
      `  - Menton guide: ${absoluteUrl(localizedPath(locale, "guide"))}`,
      `  - Riviera events calendar: ${absoluteUrl(localizedPath(locale, "events"))}`,
      `  - FAQ: ${absoluteUrl(localizedPath(locale, "faq"))}`,
      `  - contact: ${absoluteUrl(localizedPath(locale, "contact"))}`,
    ]),
    "",
    "## Apartments",
    ...apartments.flatMap((apartment) => [
      `- ${apartment.name.en}: ${absoluteUrl(localizedPath("en", `apartments/${apartment.slug}`))}`,
      `  ${apartment.seoDescription.en}`,
    ]),
    "",
    "## Guide Articles",
    ...guideArticles.map((article) => {
      const localized = localizeGuideArticle(article, "en");
      return `- ${localized.title}: ${absoluteUrl(localizedPath("en", `guide/${article.slug}`))} — ${localized.excerpt}`;
    }),
    "",
    "## Event Guides",
    ...eventDetailSlugs.flatMap((slug) => {
      const event = getRivieraEvent(slug);
      if (!event) return [];
      return [`- ${getEventTitle(event, "en")}: ${absoluteUrl(localizedPath("en", `events/${event.slug}`))} — ${event.shortDescription.en}`];
    }),
    "",
    "## Contact",
    `- Email: ${siteConfig.email}`,
    `- WhatsApp: ${siteConfig.whatsappDisplay}`,
    "- Booking flow: send a direct request with dates and preferences; Azur Menton confirms availability manually.",
  ];

  return `${lines.join("\n")}\n`;
}
