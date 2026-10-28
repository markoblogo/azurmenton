import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SearchExperience } from "@/components/search/SearchExperience";
import { isLocale, locales } from "@/i18n/locales";

const titles = { en: "Search Azur Menton", fr: "Rechercher sur Azur Menton", it: "Cerca su Azur Menton", uk: "Пошук на Azur Menton" };
type Props = { params: Promise<{ locale: string }> };
export function generateStaticParams() { return locales.map((locale) => ({ locale })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return { title: isLocale(locale) ? titles[locale] : titles.en, robots: { index: false, follow: true } };
}
export default async function SearchPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <SearchExperience locale={locale} />;
}
