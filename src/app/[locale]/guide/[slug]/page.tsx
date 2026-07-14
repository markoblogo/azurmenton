import type { Metadata } from "next";
import Link from "next/link";
import type { Route } from "next";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { ArrivalParkingBlock } from "@/components/content/ArrivalParkingBlock";
import { BookingCTA } from "@/components/content/BookingCTA";
import { ContextualApartmentRecommendations } from "@/components/content/ContextualApartmentRecommendations";
import { RelatedApartmentsBlock } from "@/components/content/RelatedApartmentsBlock";
import { ShareActions } from "@/components/content/ShareActions";
import { ArtworkCard } from "@/components/guide/ArtworkCard";
import { GuideAppToolCard } from "@/components/guide/GuideAppToolCard";
import { GuideVisual } from "@/components/guide/GuideVisual";
import { PlaceCard } from "@/components/guide/PlaceCard";
import { PublicTransportGuide } from "@/components/guide/PublicTransportGuide";
import { WalkingDistanceGuide } from "@/components/guide/WalkingDistanceGuide";
import { UtilityBlockRenderer } from "@/components/guide/utility/UtilityBlockRenderer";
import { JsonLdScript } from "@/components/seo/JsonLd";
import { TransportHelperBlock } from "@/components/transport/TransportHelperBlock";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getGuideArticle, getGuidePage, guideCategoryLabels, guidePages, localizeGuideArticle } from "@/content/guide";
import { guideApartmentScenarios } from "@/content/contextual-apartment-recommendations";
import { getPlaces } from "@/content/places";
import { getEventTitle, getRivieraEvent } from "@/content/riviera-events";
import { isLocale, locales, type Locale } from "@/i18n/locales";
import { bookingAttributionHref, bookingFunnelEvents, compactBookingAttributionProps } from "@/lib/analytics";
import { absoluteUrl, createMetadata, localizedPath } from "@/lib/seo";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/structured-data";

type PageProps = { params: Promise<{ locale: string; slug: string }> };

const labels = {
  en: { home: "Home", guide: "Menton Guide", category: "Category", duration: "Duration", bestFor: "Best for", usefulPlaces: "Useful places", appToolkit: "App toolkit", practicalTips: "Practical tips", relatedGuides: "Related guides", relatedEvents: "Related events", relatedApartments: "Where to stay", sourceNote: "Some opening hours, prices or venue details should be checked before visiting.", watchSource: "Watch on source", source: "Source", opensOnSource: "Video opens on the source site", check: "Check availability", apartments: "View apartments", finalTitle: "Stay close to the beach in central Menton", finalText: "Tell us your dates and we will confirm availability directly.", walkingFinalTitle: "Stay central, walk everywhere", walkingFinalText: "Tell us your dates and we’ll help you choose the apartment that best fits your plans.", transportFinalTitle: "Planning a car-free stay in Menton?", transportFinalText: "Tell us your dates and how you plan to arrive. We’ll help you choose the apartment that best fits your trip." },
  fr: { home: "Accueil", guide: "Guide de Menton", category: "Categorie", duration: "Duree", bestFor: "Ideal pour", usefulPlaces: "Adresses utiles", appToolkit: "Boite a outils", practicalTips: "Conseils pratiques", relatedGuides: "Guides lies", relatedEvents: "Evenements lies", relatedApartments: "Ou sejourner", sourceNote: "Certains horaires, tarifs ou details de lieu doivent etre verifies avant la visite.", watchSource: "Voir a la source", source: "Source", opensOnSource: "La video s'ouvre sur le site source", check: "Verifier disponibilite", apartments: "Voir les appartements", finalTitle: "Sejourner pres de la plage a Menton centre", finalText: "Envoyez vos dates et nous confirmerons la disponibilite directement.", walkingFinalTitle: "Sejourner au centre, tout faire a pied", walkingFinalText: "Envoyez vos dates et nous vous aiderons a choisir l'appartement adapte a vos plans.", transportFinalTitle: "Vous planifiez un sejour sans voiture a Menton?", transportFinalText: "Envoyez vos dates et votre mode d'arrivee. Nous vous aiderons a choisir l'appartement adapte a votre voyage." },
  it: { home: "Home", guide: "Guida di Mentone", category: "Categoria", duration: "Durata", bestFor: "Ideale per", usefulPlaces: "Luoghi utili", appToolkit: "Kit app", practicalTips: "Consigli pratici", relatedGuides: "Guide correlate", relatedEvents: "Eventi correlati", relatedApartments: "Dove soggiornare", sourceNote: "Alcuni orari, prezzi o dettagli dei luoghi vanno verificati prima della visita.", watchSource: "Guarda alla fonte", source: "Fonte", opensOnSource: "Il video si apre sul sito fonte", check: "Controlla disponibilita", apartments: "Vedi appartamenti", finalTitle: "Soggiorna vicino alla spiaggia nel centro di Mentone", finalText: "Inviaci le date e confermeremo direttamente la disponibilita.", walkingFinalTitle: "Soggiorna in centro, cammina ovunque", walkingFinalText: "Inviaci le date e ti aiuteremo a scegliere l'appartamento piu adatto ai tuoi piani.", transportFinalTitle: "Stai pianificando un soggiorno senza auto a Mentone?", transportFinalText: "Inviaci le date e come pensi di arrivare. Ti aiuteremo a scegliere l'appartamento piu adatto al viaggio." },
  uk: { home: "Головна", guide: "Гід по Ментону", category: "Категорія", duration: "Тривалість", bestFor: "Кому підійде", usefulPlaces: "Корисні місця", appToolkit: "Набір застосунків", practicalTips: "Практичні поради", relatedGuides: "Пов'язані гіди", relatedEvents: "Пов'язані події", relatedApartments: "Де зупинитися", sourceNote: "Деякі години роботи, ціни або деталі місць треба перевіряти перед візитом.", watchSource: "Дивитися на джерелі", source: "Джерело", opensOnSource: "Відео відкривається на сайті джерела", check: "Перевірити доступність", apartments: "Переглянути апартаменти", finalTitle: "Зупиніться біля пляжу в центрі Ментона", finalText: "Надішліть дати, і ми напряму підтвердимо доступність.", walkingFinalTitle: "Живіть у центрі й ходіть пішки всюди", walkingFinalText: "Надішліть дати, і ми допоможемо обрати апартаменти, які найкраще підходять вашим планам.", transportFinalTitle: "Плануєте відпочинок у Ментоні без авто?", transportFinalText: "Надішліть дати й спосіб прибуття. Ми допоможемо обрати апартаменти, які найкраще підходять вашій поїздці." },
};

type SectionVideoEmbed = {
  id: string;
  title: string;
  provider: "youtube" | "vimeo" | "external";
  embedUrl?: string;
  watchUrl: string;
  watchLabel?: string;
  secondaryLinks?: Array<{ label: string; url: string }>;
  embed?: boolean;
  caption?: string;
};

export function generateStaticParams() {
  return locales.flatMap((locale) => guidePages[locale].map((page) => ({ locale, slug: page.slug })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "en";
  const article = getGuideArticle(slug);
  if (!article) return {};
  const localized = localizeGuideArticle(article, safeLocale);

  return createMetadata({ locale: safeLocale, path: `guide/${article.slug}`, title: localized.seoTitle, description: localized.seoDescription, type: "article", image: localized.coverImage ?? localized.heroImage });
}

export default async function GuideArticlePage({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const article = getGuideArticle(slug);
  if (!article) notFound();

  const localized = localizeGuideArticle(article, locale);
  const page = getGuidePage(locale, slug);
  const copy = labels[locale];
  const isWalkingGuide = article.slug === "menton-without-a-car";
  const isTransportGuide = article.slug === "public-transport-in-menton";
  const relatedPlaceIds = Array.from(new Set([...(article.relatedPlaces ?? []), ...article.sections.flatMap((section) => section.relatedPlaceIds ?? [])]));
  const relatedPlaces = getPlaces(relatedPlaceIds);
  const relatedApartmentKeys = Array.from(new Set([...(article.relatedApartments ?? []), ...article.sections.flatMap((section) => section.relatedApartmentKeys ?? [])]));
  const apartmentScenario = guideApartmentScenarios[article.slug];
  const transportDestinationIds = transportDestinationsForGuide(article.slug, article.locationTags);
  const pageUrl = absoluteUrl(localizedPath(locale, `guide/${article.slug}`));
  const sourceAttribution = {
    sourcePageType: "guide" as const,
    sourceSlug: article.slug,
    sourceGuideSlug: article.slug,
  };
  const guideCtaProps = {
    locale,
    ...compactBookingAttributionProps(sourceAttribution),
  };
  const guideBookingHref = bookingAttributionHref(locale, sourceAttribution);
  const utilityBlocks = page?.utilityBlocks ?? [];
  const utilityBlocksAfterSectionIndex = article.utilityBlocksAfterSectionIndex;
  const showArrivalParking = new Set(["how-to-get-to-menton-from-nice-airport", "where-to-stay-in-menton"]).has(article.slug);

  const utilityBlockSection = utilityBlocks.length ? (
    <section className="border border-[#dfd2b8] bg-[#fffaf0] p-5 sm:p-7">
      <UtilityBlockRenderer locale={locale} blocks={utilityBlocks} />
    </section>
  ) : null;

  return (
    <>
      <JsonLdScript data={articleJsonLd({ title: localized.title, description: localized.seoDescription, url: pageUrl, image: localized.coverImage ? absoluteUrl(localized.coverImage) : localized.heroImage ? absoluteUrl(localized.heroImage) : undefined, locale })} />
      <JsonLdScript data={breadcrumbJsonLd([
        { name: copy.home, url: absoluteUrl(localizedPath(locale)) },
        { name: copy.guide, url: absoluteUrl(localizedPath(locale, "guide")) },
        { name: localized.title, url: pageUrl },
      ])} />

      <section className="border-b border-[#dfd2b8] bg-[#f8f3ea] pb-4 pt-10 sm:pb-6 sm:pt-14">
        <Container>
          <div>
            <div>
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#b49353]">{localized.categoryLabel}</p>
              <h1 className="mt-4 max-w-4xl serif-heading text-5xl leading-[0.96] text-[#173f36] sm:text-6xl">{localized.title}</h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[#5c5044]">{localized.excerpt}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {localized.tags.map((tag) => <span key={tag} className="border border-[#dfd2b8] bg-[#fffaf0] px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[#71665b]">{tag}</span>)}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Section className="bg-[#f8f3ea] py-6 sm:py-8">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
            <article className="space-y-5">
              {isWalkingGuide ? <WalkingDistanceGuide locale={locale} /> : null}
              {isTransportGuide ? <PublicTransportGuide locale={locale} /> : null}
              {transportDestinationIds.length && !isTransportGuide ? <TransportHelperBlock locale={locale} destinationIds={transportDestinationIds} compact /> : null}
              {showArrivalParking ? (
                <ArrivalParkingBlock
                  locale={locale}
                  sourceAttribution={sourceAttribution}
                  trackingEventName={bookingFunnelEvents.guideCtaClick}
                />
              ) : null}
              {localized.appTools?.length ? (
                <section className="border border-[#dfd2b8] bg-[#fffaf0] p-5 sm:p-7">
                  <h2 className="serif-heading text-3xl leading-none text-[#173f36]">{copy.appToolkit}</h2>
                  <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                    {localized.appTools.map((tool) => <GuideAppToolCard key={tool.id} tool={tool} locale={locale} />)}
                  </div>
                </section>
              ) : null}
              {utilityBlocksAfterSectionIndex === undefined ? utilityBlockSection : null}
              {localized.sections.map((section, sectionIndex) => {
                const sectionPlaces = getPlaces(section.relatedPlaceIds ?? []);
                return (
                  <Fragment key={section.heading}>
                    <section className="border border-[#dfd2b8] bg-[#fffaf0] p-5 sm:p-7">
                    <h2 className="serif-heading text-3xl leading-none text-[#173f36]">{section.heading}</h2>
                    {section.image ? (
                      <GuideVisual
                        image={section.image}
                        imageAlt={section.imageAlt}
                        locale={locale}
                        theme={section.visualTheme ?? localized.visualTheme ?? "sea"}
                        label={section.heading}
                        className="mt-5 aspect-[4/1.55]"
                        expandable
                      />
                    ) : null}
                    <div className="mt-4 space-y-3 text-base leading-8 text-[#5c5044]">
                      {section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    </div>
                    {section.guideLinkSlug && section.guideLinkLabel ? (
                      <Link
                        className="mt-5 inline-flex min-h-10 items-center justify-center border border-[#c6a66a] px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#173f36] hover:bg-[#f3ead7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173f36]"
                        href={`/${locale}/guide/${section.guideLinkSlug}` as Route}
                      >
                        {section.guideLinkLabel}
                      </Link>
                    ) : null}
                    {section.bullets?.length ? (
                      <ul className="mt-5 grid gap-2 text-sm leading-6 text-[#5c5044] sm:grid-cols-2">
                        {section.bullets.map((bullet) => <li key={bullet} className="border-l-2 border-[#c6a66a] pl-3">{bullet}</li>)}
                      </ul>
                    ) : null}
                    {section.officialLinks?.length ? (
                      <ul className="mt-5 space-y-2">
                        {section.officialLinks.map((link) => (
                          <li key={link.url} className="text-sm leading-6">
                            <a
                              className="underline underline-offset-4 hover:text-[#173f36]"
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {link.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    {section.videoEmbeds?.length ? (
                      <div className="mt-5 grid gap-4">
                        {section.videoEmbeds.map((video) => <VideoEmbed key={video.id} video={video} watchLabel={copy.watchSource} opensOnSourceLabel={copy.opensOnSource} />)}
                      </div>
                    ) : null}
                    {section.artworkCards?.length ? (
                      <div className="mt-5 grid gap-4">
                        {section.artworkCards.map((artwork) => <ArtworkCard key={artwork.id} artwork={artwork} sourceLabel={copy.source} locale={locale} />)}
                      </div>
                    ) : null}
                    {sectionPlaces.length ? (
                      <div className="mt-5 grid gap-3 md:grid-cols-2">
                        {sectionPlaces.map((place) => <PlaceCard key={place.id} place={place} locale={locale} currentGuideId={article.id} compact />)}
                      </div>
                    ) : null}
                    </section>
                    {utilityBlocksAfterSectionIndex === sectionIndex ? utilityBlockSection : null}
                  </Fragment>
                );
              })}
            </article>

            <aside className="h-fit space-y-4 lg:sticky lg:top-24">
              <div className="border border-[#dfd2b8] bg-[#fffaf0] p-5">
                <GuideVisual
                  image={localized.coverImage}
                  imageAlt={localized.coverImageAlt}
                  locale={locale}
                  theme={localized.visualTheme ?? "sea"}
                  label={localized.categoryLabel}
                  priority
                  className="-m-5 mb-5 aspect-[4/2.2]"
                  expandable
                />
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <Fact label={copy.category} value={guideCategoryLabels[article.category][locale]} />
                  {localized.durationLabel ? <Fact label={copy.duration} value={localized.durationLabel} /> : null}
                  <Fact label={copy.bestFor} value={localized.bestFor.slice(0, 3).join(", ")} wide />
                </div>
                {article.sourceStatus === "needs_verification" ? <p className="mt-5 border-t border-[#dfd2b8] pt-4 text-xs italic leading-5 text-[#71665b]">{copy.sourceNote}</p> : null}
                <div className="mt-5 flex flex-wrap gap-3">
                  <TrackedLink className="inline-flex min-h-10 items-center border border-[#173f36] bg-[#173f36] px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-white hover:bg-[#102f28]" eventName={bookingFunnelEvents.guideCtaClick} href={guideBookingHref} props={guideCtaProps}>{copy.check}</TrackedLink>
                  <Link className="inline-flex min-h-10 items-center border border-[#c6a66a] px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#173f36] hover:bg-[#f3ead7]" href={`/${locale}/apartments` as Route}>{copy.apartments}</Link>
                </div>
                <div className="mt-4">
                  <ShareActions locale={locale} title={localized.title} url={pageUrl} />
                </div>
              </div>
              {localized.practicalTips?.length ? (
                <div className="border border-[#dfd2b8] bg-[#fffaf0] p-5">
                  <h2 className="serif-heading text-2xl leading-none text-[#173f36]">{copy.practicalTips}</h2>
                  <ul className="mt-4 grid gap-3 text-sm leading-6 text-[#5c5044]">
                    {localized.practicalTips.map((tip) => <li key={tip} className="border-l-2 border-[#c6a66a] pl-3">{tip}</li>)}
                  </ul>
                </div>
              ) : null}
              {article.relatedArticles?.length ? (
                <div className="border border-[#dfd2b8] bg-[#fffaf0] p-5">
                  <h2 className="serif-heading text-2xl leading-none text-[#173f36]">{copy.relatedGuides}</h2>
                  <div className="mt-4 grid gap-2">
                    {article.relatedArticles.map((relatedSlug) => {
                      const related = getGuideArticle(relatedSlug);
                      return related ? <Link key={relatedSlug} className="text-sm font-semibold text-[#173f36] underline-offset-4 hover:underline" href={`/${locale}/guide/${relatedSlug}` as Route}>{related.title[locale]}</Link> : null;
                    })}
                  </div>
                </div>
              ) : null}
              {article.relatedEvents?.length ? (
                <div className="border border-[#dfd2b8] bg-[#fffaf0] p-5">
                  <h2 className="serif-heading text-2xl leading-none text-[#173f36]">{copy.relatedEvents}</h2>
                  <div className="mt-4 grid gap-2">
                    {article.relatedEvents.map((eventSlug) => {
                      const event = getRivieraEvent(eventSlug);
                      return event ? <Link key={eventSlug} className="text-sm font-semibold text-[#173f36] underline-offset-4 hover:underline" href={`/${locale}/events/${eventSlug}` as Route}>{getEventTitle(event, locale)}</Link> : null;
                    })}
                  </div>
                </div>
              ) : null}
              <div className="border border-[#173f36] bg-[#173f36] p-5 text-white">
                <h2 className="serif-heading text-2xl leading-none">{copy.finalTitle}</h2>
                <p className="mt-3 text-sm leading-6 text-[#e8dcc9]">{copy.finalText}</p>
                <TrackedLink className="mt-4 inline-flex border border-[#c6a66a] px-3 py-2 text-[0.64rem] font-bold uppercase tracking-[0.14em] text-white hover:bg-white/10" eventName={bookingFunnelEvents.guideCtaClick} href={guideBookingHref} props={guideCtaProps}>{copy.check}</TrackedLink>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      {relatedPlaces.length ? (
        <Section className="bg-[#fffaf0] py-10 sm:py-14">
          <Container>
            <h2 className="serif-heading text-3xl leading-none text-[#173f36]">{copy.usefulPlaces}</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {relatedPlaces.slice(0, 6).map((place) => <PlaceCard key={place.id} place={place} locale={locale} currentGuideId={article.id} />)}
            </div>
          </Container>
        </Section>
      ) : null}

      {relatedApartmentKeys.length ? (
        <Section className="bg-[#f8f3ea] py-10 sm:py-14">
          <Container>
            {apartmentScenario ? (
              <ContextualApartmentRecommendations
                locale={locale}
                scenario={apartmentScenario}
                sourceAttribution={sourceAttribution}
                trackingEventName={bookingFunnelEvents.guideCtaClick}
              />
            ) : (
              <RelatedApartmentsBlock apartmentKeys={relatedApartmentKeys} locale={locale} title={copy.relatedApartments} compact />
            )}
          </Container>
        </Section>
      ) : null}

      <Section className="pt-6 pb-12 sm:pt-8 sm:pb-16">
        <Container>
          <BookingCTA
            locale={locale}
            title={isTransportGuide ? copy.transportFinalTitle : isWalkingGuide ? copy.walkingFinalTitle : (page?.cta.title ?? copy.finalTitle)}
            text={isTransportGuide ? copy.transportFinalText : isWalkingGuide ? copy.walkingFinalText : (page?.cta.text ?? copy.finalText)}
            primaryLabel={copy.check}
            secondaryLabel={copy.apartments}
            sourceAttribution={sourceAttribution}
            trackingEventName={bookingFunnelEvents.guideCtaClick}
            trackingProps={guideCtaProps}
          />
        </Container>
      </Section>
    </>
  );
}

function Fact({ label, value, wide = false }: { label: string; value: string; wide?: boolean }) {
  return (
    <div className={wide ? "col-span-2" : undefined}>
      <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[#b49353]">{label}</p>
      <p className="mt-1 text-sm leading-6 text-[#173f36]">{value}</p>
    </div>
  );
}

function transportDestinationsForGuide(slug: string, locationTags: string[] = []) {
  const ids = new Set<string>();
  const joined = [slug, ...locationTags].join(" ");

  if (/monaco|grand-prix|yacht-show|eprix|masters|circus|rallye/.test(joined)) ids.add("monaco");
  if (/nice|airport|carnival|museum|day-trips/.test(joined)) ids.add("nice");
  if (/sanremo|ventimiglia|italian|riviera/.test(joined)) ids.add("ventimiglia");
  if (/without-a-car|public-transport|day-trips|two-day|three-day/.test(joined)) {
    ids.add("monaco");
    ids.add("nice");
    ids.add("ventimiglia");
  }

  return Array.from(ids).slice(0, 3);
}

function VideoEmbed({ video, watchLabel, opensOnSourceLabel }: { video: SectionVideoEmbed; watchLabel: string; opensOnSourceLabel: string }) {
  const canEmbed = video.embed !== false && isSafeVideoEmbed(video);
  const primaryLabel = video.watchLabel ?? watchLabel;

  if (!canEmbed) {
    return (
      <div className="border border-[#dfd2b8] bg-[#f8f3ea] p-5">
        <div className="max-w-3xl">
          <h3 className="serif-heading text-xl leading-tight text-[#173f36] sm:text-2xl">{video.title}</h3>
          <p className="mt-2 text-base leading-7 text-[#5c5044] sm:text-lg">{video.caption ?? opensOnSourceLabel}</p>
        </div>
        <VideoLinks video={video} primaryLabel={primaryLabel} />
      </div>
    );
  }

  return (
    <div className="overflow-hidden border border-[#dfd2b8] bg-[#f8f3ea]">
      <div className="relative aspect-video bg-[#173f36]/10">
        <iframe
          title={video.title}
          src={video.embedUrl}
          className="absolute inset-0 h-full w-full"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
      <div className="p-5">
        <h3 className="serif-heading text-xl leading-tight text-[#173f36] sm:text-2xl">{video.title}</h3>
        {video.caption ? <p className="mt-2 text-base leading-7 text-[#5c5044] sm:text-lg">{video.caption}</p> : null}
        <VideoLinks video={video} primaryLabel={primaryLabel} />
      </div>
    </div>
  );
}

function VideoLinks({ video, primaryLabel }: { video: SectionVideoEmbed; primaryLabel: string }) {
  return (
    <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3">
      <a className="inline-flex max-w-full whitespace-normal text-balance text-sm font-bold uppercase leading-6 tracking-[0.12em] text-[#173f36] underline-offset-4 hover:underline sm:text-base" href={video.watchUrl} target="_blank" rel="noopener noreferrer">
        {primaryLabel}
      </a>
      {video.secondaryLinks?.map((link) => (
        <a key={link.url} className="inline-flex max-w-full whitespace-normal text-balance text-sm font-bold uppercase leading-6 tracking-[0.12em] text-[#5c5044] underline-offset-4 hover:text-[#173f36] hover:underline sm:text-base" href={link.url} target="_blank" rel="noopener noreferrer">
          {link.label}
        </a>
      ))}
    </div>
  );
}

function isSafeVideoEmbed(video: SectionVideoEmbed) {
  if (!video.embedUrl) return false;

  try {
    const url = new URL(video.embedUrl);
    if (url.protocol !== "https:") return false;

    if (video.provider === "youtube") {
      return url.hostname === "www.youtube-nocookie.com" && /^\/embed\/[A-Za-z0-9_-]{11}$/.test(url.pathname);
    }

    return video.provider === "vimeo" && url.hostname === "player.vimeo.com" && /^\/video\/\d+$/.test(url.pathname);
  } catch {
    return false;
  }
}
