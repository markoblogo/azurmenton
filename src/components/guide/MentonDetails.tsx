import Link from "next/link";
import type { Route } from "next";
import { mentonDetails } from "@/content/menton-details";
import { getPlaces } from "@/content/places";
import type { Locale } from "@/i18n/locales";
import { placeSharePath } from "@/lib/place-share-target";
import { GuideVisual } from "./GuideVisual";
import { Container } from "@/components/ui/Container";

const copy={en:{title:"Menton in detail",walk:"Follow the Cocteau walk",place:"See the place",source:"Heritage source",checked:"Sources checked"},fr:{title:"Menton en détail",walk:"Suivre la promenade Cocteau",place:"Voir le lieu",source:"Source patrimoniale",checked:"Sources vérifiées"},it:{title:"Mentone nei dettagli",walk:"Segui la passeggiata Cocteau",place:"Vedi il luogo",source:"Fonte sul patrimonio",checked:"Fonti verificate"},uk:{title:"Ментон у деталях",walk:"Пройти маршрутом Кокто",place:"Переглянути місце",source:"Джерело про спадщину",checked:"Перевірка джерел"}};

export function MentonDetails({locale}:{locale:Locale}){
  const c=copy[locale];
  return <section id="menton-in-detail" className="border-y border-[#dfd4c1] bg-[#fbf7ef] py-10 scroll-mt-40"><Container><h2 className="serif-heading text-3xl text-[#173f36]">{c.title}</h2>{mentonDetails.map(detail=>{
    const place=getPlaces([detail.placeId])[0];
    const href=placeSharePath(detail.placeId,locale);
    return <article key={detail.id} id={detail.id} className="mt-6 grid gap-6 md:grid-cols-[0.38fr_0.62fr]">
      <GuideVisual image={place?.image} imageAlt={place?.imageAlt?.[locale]} locale={locale} theme="walk" label={place?.name??"Menton"} className="aspect-[4/3] self-start" expandable />
      <div className="min-w-0"><h3 className="serif-heading text-2xl text-[#173f36]">{detail.title[locale]}</h3>{detail.paragraphs.map((paragraph,index)=><p key={index} className="mt-4 text-base leading-7 text-[#5c5044]">{paragraph[locale]}</p>)}<div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-[#155b6c]">{href?<Link href={href as Route} className="inline-flex min-h-11 items-center underline">{c.place}</Link>:null}<Link href={`/${locale}/guide/${detail.guideSlug}` as Route} className="inline-flex min-h-11 items-center underline">{c.walk}</Link><a href={detail.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center underline">{c.source}</a></div><p className="mt-2 text-sm text-[#586660]">{c.checked}: <time dateTime={detail.checkedOn}>{detail.checkedOn}</time></p></div>
    </article>;
  })}</Container></section>;
}
