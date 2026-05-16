import { ApartmentCard } from "@/components/apartments/ApartmentCard";
import { apartments } from "@/content/apartments";
import type { Locale } from "@/i18n/locales";

export function RelatedApartmentsBlock({
  apartmentKeys,
  locale,
  title = "Related apartments",
  compact = false,
}: {
  apartmentKeys?: string[];
  locale: Locale;
  title?: string;
  compact?: boolean;
}) {
  const related = apartments.filter((apartment) => apartmentKeys?.includes(apartment.slug));

  if (!related.length) {
    return null;
  }

  return (
    <section aria-labelledby="related-apartments">
      <h2 id="related-apartments" className={compact ? "serif-heading text-3xl leading-none text-[#17313a]" : "text-2xl font-semibold tracking-tight text-[#17313a]"}>
        {title}
      </h2>
      <div className={`${compact ? "mt-4 gap-4" : "mt-5 gap-5"} grid lg:grid-cols-3`}>
        {related.map((apartment) => (
          <ApartmentCard key={apartment.slug} apartment={apartment} locale={locale} compact={compact} />
        ))}
      </div>
    </section>
  );
}
