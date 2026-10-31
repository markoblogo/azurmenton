import type { Metadata, Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, KeyRound, ShoppingBasket, Sunset, TrainFront, Luggage } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ShareActions } from "@/components/content/ShareActions";
import { apartments } from "@/content/apartments";
import { getGuestGuide, guestGuideCopy as copy } from "@/content/guest-guides";
import { getGuideArticle } from "@/content/guide";
import { getPlace } from "@/content/places";
import { isLocale, locales } from "@/i18n/locales";
import { placeSharePath } from "@/lib/place-share-target";
import { absoluteUrl, createMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string; slug: string }> };
const icons = { arrival: TrainFront, "check-in": KeyRound, shopping: ShoppingBasket, "first-evening": Sunset, "check-out": Luggage };

export function generateStaticParams() {
  return locales.flatMap(locale => apartments.map(apartment => ({ locale, slug: apartment.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const guide = getGuestGuide(slug);
  if (!guide) return {};
  return createMetadata({ locale, path: `apartments/${slug}/guest-guide`, title: `${copy.link[locale]}: ${guide.apartment.shortName[locale]}`, description: copy.intro[locale], image: guide.apartment.heroImage, index: false });
}

export default async function GuestGuidePage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const guide = getGuestGuide(slug);
  if (!guide) notFound();
  const { apartment, sections } = guide;
  return (
    <>
      <section className="border-b border-[#dfd4c1] py-8 sm:py-12">
        <Container>
          <Link href={`/${locale}/apartments/${slug}` as Route} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#155b6c] underline"><ArrowLeft size={16} aria-hidden="true" />{copy.apartment[locale]}</Link>
          <div className="mt-5 grid gap-6 md:grid-cols-[1fr_0.55fr] md:items-center">
            <div className="min-w-0">
              <p className="editorial-label">{apartment.shortName[locale]}</p>
              <h1 className="serif-heading mt-3 text-4xl leading-tight text-[#173f36] sm:text-5xl">{copy.title[locale]}</h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-[#5f574c]">{copy.intro[locale]}</p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image src={apartment.heroImage} alt={apartment.name[locale]} fill sizes="(min-width: 768px) 35vw, 100vw" className="object-cover" />
            </div>
          </div>
          <nav aria-label={copy.link[locale]} className="mt-6 flex flex-wrap gap-x-6 gap-y-1">
            {sections.map(section => <a key={section.id} href={`#${section.id}`} className="inline-flex min-h-11 items-center text-base font-semibold text-[#155b6c] underline">{section.title[locale]}</a>)}
          </nav>
        </Container>
      </section>
      <Container>
        <div className="max-w-4xl">
          {sections.map((section, index) => {
            const Icon = icons[section.id];
            return <section id={section.id} key={section.id} className="scroll-mt-40 border-b border-[#dfd4c1] py-8 sm:py-10">
              <div className="flex items-center gap-3 text-[#173f36]"><Icon aria-hidden="true" size={26} className="shrink-0 text-[#1585a2]" /><h2 className="serif-heading text-3xl">{index + 1}. {section.title[locale]}</h2></div>
              <p className="mt-4 text-lg leading-8 text-[#5f574c]">{section.body[locale]}</p>
              {section.id === "arrival" ? <p data-guest-parking className="mt-4 border-l-4 border-[#1585a2] pl-4 text-base leading-7 text-[#173f36]">{guide.parkingAvailable ? copy.parkingYes[locale] : copy.parkingNo[locale]}</p> : null}
              {section.guideSlugs.length ? <ul className="mt-4 space-y-2">{section.guideSlugs.map(guideSlug => {
                const article = getGuideArticle(guideSlug);
                return article ? <li key={guideSlug}><Link href={`/${locale}/guide/${article.slug}` as Route} className="inline-flex min-h-11 items-center gap-2 text-base font-semibold text-[#155b6c] underline"><span>{article.title[locale]}</span><ArrowUpRight aria-hidden="true" size={18} className="shrink-0" /></Link></li> : null;
              })}</ul> : null}
              {section.placeIds.length ? <div className="mt-6">
                <h3 className="text-lg font-semibold text-[#173f36]">{copy.places[locale]}</h3>
                <p className="mt-2 text-base leading-7 text-[#5f574c]">{copy.hours[locale]}</p>
                <ul className="mt-3 divide-y divide-[#dfd4c1]">{section.placeIds.map(id => {
                  const place = getPlace(id);
                  const href = placeSharePath(id, locale);
                  return place && href ? <li key={id} className="py-3"><Link className="inline-flex min-h-11 items-center gap-2 font-semibold text-[#155b6c] underline" href={href as Route}>{place.name}<ArrowUpRight size={18} aria-hidden="true" /></Link><p className="text-base leading-7 text-[#5f574c]">{place.address}</p></li> : null;
                })}</ul>
              </div> : null}
            </section>;
          })}
          <aside className="py-8">
            <p className="text-base leading-7 text-[#5f574c]">{copy.privacy[locale]}</p>
            <div className="mt-5"><Button href={`/${locale}/contact`} variant="secondary">{copy.contact[locale]}</Button></div>
            <div className="mt-6"><ShareActions locale={locale} title={`${copy.link[locale]}: ${apartment.shortName[locale]}`} url={absoluteUrl(`/${locale}/apartments/${slug}/guest-guide`)} /></div>
          </aside>
        </div>
      </Container>
    </>
  );
}
