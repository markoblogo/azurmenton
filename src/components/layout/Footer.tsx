import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { routeLabels } from "@/content/navigation";
import type { Locale } from "@/i18n/locales";

export function Footer({ locale }: { locale: Locale }) {
  const labels = routeLabels[locale];

  return (
    <footer className="border-t border-[#eadfce] bg-[#17313a] text-white">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-10 sm:px-6 md:grid-cols-[1.2fr_1fr] lg:px-8">
        <div>
          <Image
            src="/images/brand/azurmenton.png"
            alt="Azur Menton"
            width={748}
            height={437}
            className="h-16 w-auto rounded-md bg-white/95 p-2"
          />
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
