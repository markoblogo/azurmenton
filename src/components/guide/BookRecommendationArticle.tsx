import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { BookOpen, ChevronDown, ExternalLink } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { formattedGuideText } from "./FormattedGuideText";
import { guideArticles, localizeGuideArticle } from "@/content/guide";
import type { Locale } from "@/i18n/locales";

const labels = {
  en: { kind: "Holiday reading", language: "French", puzzles: "40 puzzles", paperback: "Amazon Paperback", kindle: "Amazon Kindle", related: "Between puzzles", reveal: "Reveal solution", illustration: "Illustration from the book. Fictional characters and places." },
  fr: { kind: "À lire en vacances", language: "Français", puzzles: "40 énigmes", paperback: "Amazon Broché", kindle: "Amazon Kindle", related: "Entre deux énigmes", reveal: "Voir la solution", illustration: "Illustration du livre. Personnages et lieux fictifs." },
  it: { kind: "Letture in vacanza", language: "Francese", puzzles: "40 enigmi", paperback: "Amazon Cartaceo", kindle: "Amazon Kindle", related: "Tra un enigma e l'altro", reveal: "Mostra la soluzione", illustration: "Illustrazione dal libro. Personaggi e luoghi immaginari." },
  uk: { kind: "Читання у відпустці", language: "Французька", puzzles: "40 головоломок", paperback: "Amazon: паперова книга", kindle: "Amazon Kindle", related: "Між головоломками", reveal: "Показати рішення", illustration: "Ілюстрація з книжки. Персонажі та місця вигадані." },
};

type Article = ReturnType<typeof localizeGuideArticle>;

function Paragraphs({ body, locale, formatted = true }: { body: string[]; locale: Locale; formatted?: boolean }) {
  return <div className="space-y-4 text-base leading-8 text-[#5c5044]">{(formatted ? body.flatMap(paragraph => paragraph.split("\n").filter(Boolean)) : body).map((paragraph, index) => <p key={index}>{formatted ? formattedGuideText(paragraph, locale) : paragraph}</p>)}</div>;
}

export function BookRecommendationArticle({ article, locale }: { article: Article; locale: Locale }) {
  const book = article.bookRecommendation;
  if (!book) return null;
  const copy = labels[locale];
  const related = guideArticles.filter(item => article.relatedArticles?.includes(item.slug));
  return (
    <div className="bg-[#f8f3ea] pb-14 pt-5 sm:pt-8">
      <Container>
        <article data-book-recommendation={article.slug}>
          <div data-book-promo className="relative mx-auto aspect-[1672/941] w-full max-w-4xl overflow-hidden">
            <Image src={article.coverImage!} alt={article.coverImageAlt ?? book.title} fill preload sizes="(min-width: 1024px) 896px, 100vw" className="object-contain" />
          </div>
          <header className="mx-auto max-w-3xl pb-7 pt-7 sm:pt-9">
            <p className="text-xs font-semibold uppercase text-[#71665b]">{copy.kind}</p>
            <h1 className="serif-heading mt-3 text-4xl leading-tight text-[#173f36] sm:text-5xl">{book.title}</h1>
            <p className="mt-4 text-lg leading-8 text-[#5c5044]">{article.excerpt}</p>
          </header>
          <section data-book-card aria-label={book.title} className="mx-auto mb-10 grid max-w-3xl grid-cols-[6rem_minmax(0,1fr)] gap-4 border-y border-[#c6a66a] py-6 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-7">
            <Image src={book.coverImage} alt={book.coverImageAlt} width={1024} height={1536} sizes="(min-width: 640px) 160px, 96px" className="h-auto w-full self-start object-contain" />
            <div className="min-w-0">
              <h2 className="serif-heading text-2xl leading-tight text-[#173f36]">{book.title}</h2>
              <p lang="fr" className="mt-2 text-base italic leading-6 text-[#5c5044]">{book.subtitle}</p>
              <p className="mt-3 text-sm leading-6 text-[#5c5044]">{book.author} · {book.year} · {copy.language}</p>
              <p className="text-sm leading-6 text-[#5c5044]">{copy.puzzles} · Kindle &amp; Paperback</p>
              <p className="mt-3 text-sm font-semibold leading-6 text-[#173f36]">{book.languageNote}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a href={book.paperbackUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 border border-[#173f36] bg-[#173f36] px-3 py-2 text-sm font-semibold text-white hover:bg-[#235246] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#173f36]"><BookOpen size={16} aria-hidden="true" className="shrink-0" /><span>{copy.paperback}</span><ExternalLink size={14} aria-hidden="true" className="shrink-0" /></a>
                <a href={book.kindleUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 border border-[#173f36] px-3 py-2 text-sm font-semibold text-[#173f36] hover:bg-[#e5ede8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#173f36]"><BookOpen size={16} aria-hidden="true" className="shrink-0" /><span>{copy.kindle}</span><ExternalLink size={14} aria-hidden="true" className="shrink-0" /></a>
              </div>
            </div>
            <p className="col-span-2 text-sm leading-6 text-[#71665b]">{book.disclosure}</p>
          </section>
          <div className="mx-auto max-w-3xl">
            {article.sections.map((section, index) => (
              <section key={section.heading} data-book-section={index} className="flow-root border-b border-[#dfd2b8] py-7 last:border-0 sm:py-9">
                <h2 className="serif-heading mb-5 text-3xl leading-tight text-[#173f36]">{section.heading}</h2>
                {section.image ? <figure className="mx-auto mb-6 w-full max-w-56 sm:float-right sm:mb-4 sm:ml-7"><Image src={section.image} alt={section.imageAlt ?? copy.illustration} width={1086} height={1448} sizes="224px" className="h-auto w-full object-contain" /><figcaption className="mt-2 text-xs leading-5 text-[#71665b]">{copy.illustration}</figcaption></figure> : null}
                <Paragraphs body={section.body} locale={locale} formatted={section.formattedBody} />
                {section.tables?.map((table, tableIndex) => <div key={tableIndex} className="mt-6 overflow-x-auto" role="region" aria-label={section.heading} tabIndex={0}><table className="w-full min-w-[30rem] border-collapse text-left text-sm leading-7"><caption className="sr-only">{section.heading}</caption><thead><tr>{table.headers.map((header, cell) => <th key={cell} scope="col" className="border-b border-[#c6a66a] px-3 py-2 font-semibold text-[#173f36]">{header}</th>)}</tr></thead><tbody>{table.rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex} className="border-b border-[#dfd2b8] px-3 py-2 align-top text-[#5c5044]">{cell}</td>)}</tr>)}</tbody></table></div>)}
                {index === article.sections.length - 2 && related.length ? <nav aria-label={copy.related} className="mt-7"><h3 className="text-base font-semibold text-[#173f36]">{copy.related}</h3><ul className="mt-3 space-y-2">{related.map(item => <li key={item.slug}><Link href={`/${locale}/guide/${item.slug}` as Route} className="text-sm leading-6 text-[#173f36] underline underline-offset-4">{item.title[locale]}</Link></li>)}</ul></nav> : null}
                {section.disclosures?.map(item => <details key={item.id} id={item.id} className="group mt-5 border-y border-[#dfd2b8] py-1"><summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 text-base font-semibold leading-7 text-[#173f36] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#173f36] [&::-webkit-details-marker]:hidden"><span>{item.heading}<span className="block text-sm font-normal text-[#71665b]">{copy.reveal}</span></span><ChevronDown size={20} aria-hidden="true" className="shrink-0 transition-transform group-open:rotate-180" /></summary><div className="pb-5 pt-2"><Paragraphs body={item.body} locale={locale} /></div></details>)}
              </section>
            ))}
          </div>
        </article>
      </Container>
    </div>
  );
}
