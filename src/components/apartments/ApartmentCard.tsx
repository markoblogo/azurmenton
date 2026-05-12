import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { Apartment } from "@/content/apartments";
import { t } from "@/content/translations";
import type { Locale } from "@/i18n/locales";
import { getCardImage, imageObjectPosition } from "@/lib/apartment-images";

export function ApartmentCard({
  apartment,
  locale,
}: {
  apartment: Apartment;
  locale: Locale;
}) {
  const copy = t[locale];
  const image = getCardImage(apartment);

  return (
    <Card className="group overflow-hidden bg-[#fbf7ef]">
      <div className="relative aspect-[4/5] overflow-hidden border-b border-[#dfd4c1] bg-[#efe4d1]">
        <Image
          src={image.src}
          alt={image.alt[locale]}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className={`object-cover transition duration-500 group-hover:scale-[1.025] ${imageObjectPosition(apartment, image)}`}
        />
      </div>
      <div className="p-5 sm:p-6">
        <p className="editorial-label">{apartment.shortName[locale]}</p>
        <h2 className="serif-heading mt-3 text-3xl leading-none text-[#173f36]">
          {apartment.name[locale]}
        </h2>
        <p className="mt-4 line-clamp-3 text-sm leading-6 text-[#5f574c]">{apartment.bestFor[locale]}</p>
        <dl className="mt-6 grid grid-cols-2 gap-x-5 gap-y-3 border-y border-[#dfd4c1] py-4 text-sm">
          <div>
            <dt className="text-[#6b5f50]">{copy.guests}</dt>
            <dd className="font-semibold text-[#173f36]">{copy.upTo} {apartment.maxGuests}</dd>
          </div>
          <div>
            <dt className="text-[#6b5f50]">{copy.size}</dt>
            <dd className="font-semibold text-[#173f36]">{apartment.sizeSqm} m²</dd>
          </div>
        </dl>
        <div className="mt-5">
          <Button href={`/${locale}/apartments/${apartment.slug}`} variant="secondary">
            {copy.viewApartment}
          </Button>
        </div>
      </div>
    </Card>
  );
}
