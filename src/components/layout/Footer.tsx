import Link from "next/link";
import type { Route } from "next";
import { routeLabels, siteConfig } from "@/config/site";
import type { Locale } from "@/i18n/locales";

export function Footer({ locale }: { locale: Locale }) {
  const labels = routeLabels[locale];

  return (
    <footer className="border-t border-[#eadfce] bg-[#17313a] text-white">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-10 sm:px-6 md:grid-cols-[1.2fr_1fr] lg:px-8">
        <div>
          <p className="text-lg font-semibold">{siteConfig.name}</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-white/75">
            Family-run short-term rentals in central Menton. Direct bookings are handled by manual request and confirmation.
          </p>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-3 text-sm text-white/75 sm:grid-cols-3">
          {[
            ["apartments", "/apartments"],
            ["availability", "/check-availability"],
            ["guide", "/guide"],
            ["contact", "/contact"],
            ["privacy", "/privacy"],
            ["legal", "/legal"],
          ].map(([key, href]) => (
            <Link key={key} href={`/${locale}${href}` as Route} className="hover:text-white">
              {labels[key]}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
