import Link from "next/link";
import { GuideVisual, type GuideVisualTheme } from "@/components/guide/GuideVisual";
import type { ContentCollectionId } from "@/content/content-map";
import type { Locale } from "@/i18n/locales";

export type GuideCollectionCard = {
  id: ContentCollectionId;
  title: string;
  description: string;
  guideCount: number;
  leadGuide?: {
    coverImage?: string;
    coverImageAlt?: string;
    visualTheme?: GuideVisualTheme;
  };
};

const labels = {
  en: { browse: "Browse collection", guides: "guides" },
  fr: { browse: "Voir la collection", guides: "guides" },
  it: { browse: "Apri la raccolta", guides: "guide" },
  uk: { browse: "Відкрити добірку", guides: "гідів" },
};

export function GuideCollections({ locale, collections }: { locale: Locale; collections: GuideCollectionCard[] }) {
  const copy = labels[locale];

  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {collections.map((collection) => (
        <Link
          key={collection.id}
          href={{
            pathname: `/${locale}/guide`,
            query: { collection: collection.id },
            hash: "guide-finder",
          }}
          className="group grid min-h-32 grid-cols-[7.5rem_1fr] overflow-hidden border border-[#dfd2b8] bg-[#f8f3ea] transition hover:-translate-y-0.5 hover:border-[#173f36] hover:bg-[#f3ead7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c6a66a]"
        >
          <GuideVisual
            image={collection.leadGuide?.coverImage}
            imageAlt={collection.leadGuide?.coverImageAlt}
            locale={locale}
            theme={collection.leadGuide?.visualTheme ?? "itinerary"}
            className="h-full border-b-0 border-r border-[#dfd2b8]"
            showLabel={false}
          />
          <article className="flex min-w-0 flex-col p-3">
            <div>
              <h3 className="serif-heading text-xl leading-[1.02] text-[#173f36] transition-colors group-hover:text-[#0b6f8f]">{collection.title}</h3>
              <p className="mt-1.5 overflow-hidden text-xs leading-5 text-[#5c5044] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">{collection.description}</p>
            </div>
            <div className="mt-auto flex items-end justify-between gap-3 pt-2 text-[0.56rem] font-bold uppercase tracking-[0.12em]">
              <span className="text-[#b49353]">{collection.guideCount} {copy.guides}</span>
              <span className="text-[#173f36]">{copy.browse}</span>
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
}
