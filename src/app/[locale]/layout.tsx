import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Navigation } from "@/components/layout/Navigation";
import { StickyCta } from "@/components/layout/StickyCta";
import { siteConfig } from "@/config/site";
import { isLocale, locales, type Locale } from "@/i18n/locales";
import { createMetadata } from "@/lib/seo";

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  return createMetadata({
    locale,
    title: siteConfig.name,
    description: siteConfig.description,
  });
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <>
      <Navigation locale={locale as Locale} />
      <main className="flex-1">{children}</main>
      <Footer locale={locale as Locale} />
      <StickyCta locale={locale as Locale} />
    </>
  );
}
