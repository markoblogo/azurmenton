import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TravelToolDetailPage } from "@/components/tools/TravelToolDetailPage";
import { getTravelTool, isTravelToolSlug, localizeText, travelTools } from "@/content/travel-tools";
import { isLocale, locales, type Locale } from "@/i18n/locales";
import { createMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((locale) => travelTools.map((tool) => ({ locale, slug: tool.slug })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "en";
  const tool = isTravelToolSlug(slug) ? getTravelTool(slug) : null;
  if (!tool) return {};

  return createMetadata({ locale: safeLocale, path: `tools/${tool.slug}`, title: localizeText(tool.seoTitle, safeLocale), description: localizeText(tool.metaDescription, safeLocale) });
}

export default async function TravelToolDetailRoute({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const tool = isTravelToolSlug(slug) ? getTravelTool(slug) : null;
  if (!tool) notFound();
  return <TravelToolDetailPage locale={locale} slug={tool.slug} />;
}
