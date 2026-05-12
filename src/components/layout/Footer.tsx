import Link from "next/link";
import type { Route } from "next";
import { siteConfig } from "@/config/site";
import { routeLabels } from "@/content/navigation";
import type { Locale } from "@/i18n/locales";

export function Footer({ locale }: { locale: Locale }) {
  const labels = routeLabels[locale];

  return (
    <footer className="border-t border-[#243c35] bg-[#111615] text-white">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-14 sm:px-6 md:grid-cols-[1.15fr_1fr_0.8fr] lg:px-8">
        <div>
          <p className="font-serif-display text-3xl font-semibold tracking-[-0.02em]">Azur Menton</p>
          <p className="mt-4 max-w-md text-sm leading-7 text-white/70">
            Family-run short-term rentals in central Menton. Direct bookings are handled by manual request and confirmation.
          </p>
          <p className="mt-5 text-sm leading-7 text-white/70">
            <a className="hover:text-white" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            <br />
            <a className="hover:text-white" href={siteConfig.whatsappHref} rel="noopener noreferrer" target="_blank">
              WhatsApp {siteConfig.whatsappDisplay}
            </a>
          </p>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm text-white/70">
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
        <div className="border border-white/15 p-5">
          <p className="editorial-label">Direct request</p>
          <p className="mt-3 text-sm leading-6 text-white/70">
            Tell us your dates and we will confirm availability personally.
          </p>
          <Link
            href={`/${locale}/check-availability` as Route}
            className="mt-5 inline-flex border border-[#c6a66a] px-4 py-2.5 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-white hover:bg-white/10"
          >
            {labels.availability}
          </Link>
        </div>
      </div>
    </footer>
  );
}
