import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { Apartment } from "@/content/apartments";
import { t } from "@/content/translations";
import type { Locale } from "@/i18n/locales";

export function ApartmentCard({
  apartment,
  locale,
}: {
  apartment: Apartment;
  locale: Locale;
}) {
  const copy = t[locale];
  const image =
    apartment.gallery.find((galleryImage) => galleryImage.src === apartment.cardImage) ??
    apartment.gallery[0];

  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={image.src}
          alt={image.alt[locale]}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover object-center"
        />
      </div>
      <div className="p-5">
        <p className="text-sm font-semibold text-[#0b6f8f]">{apartment.shortName[locale]}</p>
        <h2 className="mt-2 text-xl font-semibold tracking-tight text-[#17313a]">
          {apartment.name[locale]}
        </h2>
        <p className="mt-3 text-sm leading-6 text-[#5c5044]">{apartment.description[locale]}</p>
        <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
          <div>
            <dt className="text-[#6b5f50]">{copy.guests}</dt>
            <dd className="font-semibold text-[#17313a]">Up to {apartment.maxGuests}</dd>
          </div>
          <div>
            <dt className="text-[#6b5f50]">{copy.size}</dt>
            <dd className="font-semibold text-[#17313a]">{apartment.sizeSqm} sqm</dd>
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
