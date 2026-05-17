import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { siteConfig } from "@/config/site";
import { routeLabels } from "@/content/navigation";
import type { Locale } from "@/i18n/locales";
import { FooterLanguageSwitcher } from "@/components/layout/FooterLanguageSwitcher";

const footerCopy: Record<Locale, { intro: string; directContact: string; languages: string; siteBy: string }> = {
  en: {
    intro: "Family-run short-term rentals in central Menton. Direct bookings are handled by manual request and confirmation.",
    directContact: "Direct contact",
    languages: "Languages",
    siteBy: "Site by",
  },
  fr: {
    intro: "Locations familiales de courte duree dans le centre de Menton. Les demandes directes sont traitees manuellement.",
    directContact: "Contact direct",
    languages: "Langues",
    siteBy: "Site par",
  },
  it: {
    intro: "Affitti brevi a gestione familiare nel centro di Mentone. Le richieste dirette sono confermate manualmente.",
    directContact: "Contatto diretto",
    languages: "Lingue",
    siteBy: "Sito di",
  },
  uk: {
    intro: "Сімейні короткострокові апартаменти в центрі Ментона. Прямі запити обробляються вручну.",
    directContact: "Прямий контакт",
    languages: "Мови",
    siteBy: "Сайт зроблено",
  },
};

export function Footer({ locale }: { locale: Locale }) {
  const labels = routeLabels[locale];
  const copy = footerCopy[locale];

  return (
    <footer className="border-t border-[#243c35] bg-[#111615] text-white">
      <div className="mx-auto grid w-full max-w-6xl gap-5 px-5 py-6 sm:px-6 sm:py-7 md:grid-cols-[1.1fr_1fr_0.75fr] lg:px-8">
        <div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Image
              src={siteConfig.iconPath}
              alt=""
              width={36}
              height={36}
              className="h-9 w-9 border border-white/15 bg-[#fbf7ef]"
            />
            <p className="font-serif-display text-2xl font-semibold tracking-[-0.02em]">Azur Menton</p>
            <FooterLanguageSwitcher locale={locale} label={copy.languages} />
          </div>
          <p className="mt-3 max-w-md text-sm leading-6 text-white/70">
            {copy.intro}{" "}
            <span className="text-white/35">{copy.siteBy}</span>{" "}
            <a
              href="https://abvx.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-white/15 underline-offset-4 transition hover:text-white/70 hover:decoration-white/40"
            >
              abvx.xyz
            </a>
          </p>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-1 self-start text-sm leading-5 text-white/70">
          {[
            ["apartments", "/apartments"],
            ["availability", "/check-availability"],
            ["guide", "/guide"],
            ["contact", "/contact"],
            ["legal", "/legal"],
            ["privacy", "/privacy"],
            ["cookies", "/cookies"],
            ["bookingTerms", "/booking-terms"],
          ].map(([key, href]) => (
            <Link key={key} href={`/${locale}${href}` as Route} className="hover:text-white">
              {labels[key]}
            </Link>
          ))}
        </nav>
        <div className="self-start text-sm leading-6 text-white/70">
          <p className="editorial-label">{copy.directContact}</p>
          <p className="mt-2">
            <a className="hover:text-white" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </p>
          <p className="mt-1">
            <a className="hover:text-white" href={siteConfig.whatsappHref} rel="noopener noreferrer" target="_blank">
              WhatsApp {siteConfig.whatsappDisplay}
            </a>
          </p>
          <Link
            href={`/${locale}/check-availability` as Route}
            className="mt-4 inline-flex text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#d4b474] underline decoration-[#d4b474]/35 underline-offset-4 hover:text-white"
          >
            {labels.availability}
          </Link>
        </div>
      </div>
    </footer>
  );
}
