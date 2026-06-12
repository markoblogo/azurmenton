import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { Card } from "@/components/ui/Card";
import type { Apartment } from "@/content/apartments";
import { t } from "@/content/translations";
import type { Locale } from "@/i18n/locales";
import { getCardImage, imageObjectPosition } from "@/lib/apartment-images";

export function ApartmentCard({
  apartment,
  locale,
  imageOverride,
  compact = false,
}: {
  apartment: Apartment;
  locale: Locale;
  imageOverride?: {
    src: string;
    alt: string;
  };
  compact?: boolean;
}) {
  const copy = t[locale];
  const contentImage = getCardImage(apartment);
  const imageSrc = imageOverride?.src ?? contentImage.src;
  const imageAlt = imageOverride?.alt ?? contentImage.alt[locale];
  const href = `/${locale}/apartments/${apartment.slug}` as Route;

  return (
    <Link
      href={href}
      className="group block h-full cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#173f36]"
    >
      <Card className="h-full overflow-hidden bg-[#fbf7ef] transition duration-300 group-hover:border-[#c6a66a]">
        <div className={`relative overflow-hidden border-b border-[#dfd4c1] bg-[#efe4d1] ${compact ? "aspect-[4/3]" : "aspect-[4/5]"}`}>
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            quality={90}
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className={`next-fill-cover object-cover transition duration-500 group-hover:scale-[1.025] ${imageOverride ? "" : imageObjectPosition(apartment, contentImage)}`}
          />
        </div>
        <div className={compact ? "p-4" : "p-5 sm:p-6"}>
          <p className="editorial-label">{apartment.shortName[locale]}</p>
          <h2 className={`serif-heading mt-3 leading-none text-[#173f36] ${compact ? "text-2xl" : "text-3xl"}`}>
            {apartment.name[locale]}
          </h2>
          <p className={`mt-3 text-sm leading-6 text-[#5f574c] ${compact ? "line-clamp-2" : "line-clamp-3"}`}>{apartment.bestFor[locale]}</p>
          <dl className={`${compact ? "mt-4 py-3" : "mt-6 py-4"} grid grid-cols-2 gap-x-5 gap-y-3 border-y border-[#dfd4c1] text-sm`}>
            <div>
              <dt className="text-[#6b5f50]">{copy.guests}</dt>
              <dd className="font-semibold text-[#173f36]">{copy.upTo} {apartment.maxGuests}</dd>
            </div>
            <div>
              <dt className="text-[#6b5f50]">{copy.size}</dt>
              <dd className="font-semibold text-[#173f36]">{apartment.sizeSqm} m²</dd>
            </div>
          </dl>
          <span
            aria-hidden="true"
            className={`${compact ? "mt-4" : "mt-5"} inline-flex min-h-11 items-center justify-center border border-[#c6a66a] bg-transparent px-5 py-2.5 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-[#173f36] transition group-hover:bg-[#f3ead7]`}
          >
            {copy.viewApartment}
          </span>
        </div>
      </Card>
    </Link>
  );
}
