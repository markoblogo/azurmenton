import { ApartmentCard } from "@/components/apartments/ApartmentCard";
import { apartments } from "@/content/apartments";
import type { Locale } from "@/i18n/locales";

export function RelatedApartmentsBlock({
  apartmentKeys,
  locale,
  title = "Related apartments",
}: {
  apartmentKeys?: string[];
  locale: Locale;
  title?: string;
}) {
  const related = apartments.filter((apartment) => apartmentKeys?.includes(apartment.slug));

  if (!related.length) {
    return null;
  }

  return (
    <section aria-labelledby="related-apartments">
      <h2 id="related-apartments" className="text-2xl font-semibold tracking-tight text-[#17313a]">
        {title}
      </h2>
      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        {related.map((apartment) => (
          <ApartmentCard key={apartment.slug} apartment={apartment} locale={locale} />
        ))}
      </div>
    </section>
  );
}
