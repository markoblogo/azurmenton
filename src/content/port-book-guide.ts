import type { GuideArticle, LocalizedText } from "./guide";
import { formattedMarkdownGuideBody, markdownGuideSections, parseGuideMarkdownBlock } from "@/lib/guide-markdown";
import records from "./guide-data/les-petites-affaires-du-port-french-puzzle-book.json";

const t = (en: string, fr: string, it: string, uk: string): LocalizedText => ({ en, fr, it, uk });
const locales = ["en", "fr", "it", "uk"] as const;
const local = (value: (locale: typeof locales[number]) => string): LocalizedText => Object.fromEntries(locales.map(locale => [locale, value(locale)])) as LocalizedText;
const sections = markdownGuideSections(records, t("Forty mysteries and a train journey", "Un café, un carnet et quarante raisons de réfléchir", "Quaranta misteri e un viaggio in treno", "Сорок загадок і подорож потягом"));
sections.forEach((section, index) => {
  section.body = [local(locale => formattedMarkdownGuideBody(index === 9 ? records[index][locale].split(/^### /m)[0] : records[index][locale]))];
  section.formattedBody = true;
  section.officialLinks = undefined;
});
sections[0].heading = t("Forty mysteries and a train journey", "Un café, un carnet et quarante raisons de réfléchir", "Quaranta misteri e un viaggio in treno", "Сорок загадок і подорож потягом");
sections[1].image = "/images/guide/les-petites-affaires-du-port-train.png";
sections[1].imageAlt = t("Interior book illustration: Lucien and Milo studying a paper in a fictional train compartment", "Illustration intérieure : Lucien et Milo examinent un papier dans un compartiment fictif", "Illustrazione interna: Lucien e Milo esaminano un foglio in uno scompartimento immaginario", "Ілюстрація з книжки: Люсьєн і Міло вивчають аркуш у вигаданому купе");
sections[5].image = "/images/guide/les-petites-affaires-du-port-companions.png";
sections[5].imageAlt = t("Interior book illustration of the fictional travelling companions discussing a problem at a table", "Illustration intérieure des compagnons fictifs discutant d'un problème autour d'une table", "Illustrazione interna dei compagni immaginari che discutono un problema a tavola", "Ілюстрація з книжки: вигадані попутники обговорюють задачу за столом");
const answers = Object.fromEntries(locales.map(locale => [locale, records[9][locale].split(/(?=^### )/m).slice(1)])) as Record<typeof locales[number], string[]>;
sections[9].disclosures = [0, 1, 2].map(index => ({
  id: `port-book-solution-${index + 1}`,
  heading: local(locale => parseGuideMarkdownBlock(answers[locale][index]).heading),
  body: [local(locale => formattedMarkdownGuideBody(answers[locale][index]))],
}));

export const portBookGuide: GuideArticle = {
  id: "les-petites-affaires-du-port-french-puzzle-book", slug: "les-petites-affaires-du-port-french-puzzle-book",
  title: t("Les petites affaires du port: 40 French Puzzles for a Relaxing Holiday", "Les petites affaires du port : 40 énigmes à emporter en vacances", "Les petites affaires du port: 40 enigmi in francese per le vacanze", "Les petites affaires du port: 40 французьких головоломок для відпустки"),
  seoTitle: t("Les petites affaires du port: A French Puzzle Book", "Les petites affaires du port : 40 énigmes pour les vacances", "Les petites affaires du port: enigmi in francese in vacanza", "Les petites affaires du port: французькі головоломки"),
  seoDescription: t("Discover Anton BV's illustrated French-language book with 40 logic puzzles and a light travel story. Try three original puzzles with separately hidden solutions.", "Un livre-jeu illustré en français : 40 énigmes, un ancien commissaire et un voyage. Trois défis originaux avec solutions à ouvrir séparément.", "Un libro illustrato in francese con 40 enigmi e un viaggio leggero. Prova tre sfide originali con soluzioni nascoste separatamente.", "Ілюстрована французькомовна книжка Антона BV: 40 логічних задач і легка подорож. Три оригінальні приклади з прихованими рішеннями."),
  excerpt: t("Forty puzzles, a retired detective and a train journey. Holiday reading in French, with three original challenges to try here in English.", "Un ancien commissaire, son petit-fils et quarante énigmes pour les moments tranquilles des vacances. Trois défis originaux à essayer ici.", "Quaranta enigmi, un ex commissario e un viaggio in treno. Una lettura in francese, con tre sfide originali da provare qui in italiano.", "Сорок задач, відставний комісар і подорож потягом. Читання французькою та три оригінальні приклади тут українською."),
  category: "walks-views", duration: "flexible", locationTags: ["menton"], publishedOn: "2026-11-04", sourceStatus: "editorial", showTransportHelper: false,
  coverImage: "/images/guide/les-petites-affaires-du-port-french-puzzle-book.png",
  coverImageAlt: t("Author-supplied promotional illustration of Les petites affaires du port beside a sunny imagined Mediterranean harbour", "Illustration promotionnelle fournie par l'auteur : Les petites affaires du port devant un port méditerranéen imaginé", "Illustrazione promozionale dell'autore con Les petites affaires du port accanto a un porto mediterraneo immaginario", "Надана автором промоілюстрація Les petites affaires du port біля уявного сонячного середземноморського порту"),
  visualTheme: "itinerary", visualStatus: "project_illustration",
  tags: [t("Holiday reading", "Lecture de vacances", "Letture in vacanza", "Читання у відпустці"), t("French-language book", "Livre en français", "Libro in francese", "Книжка французькою"), t("Logic puzzles", "Énigmes logiques", "Enigmi logici", "Логічні головоломки")],
  bestFor: [t("French-language readers", "Lecteurs francophones", "Lettori in francese", "Читачі французькою"), t("Puzzle lovers", "Amateurs d'énigmes", "Appassionati di enigmi", "Шанувальники головоломок")],
  relatedPlaces: [],
  relatedArticles: ["quiet-evening-in-menton", "bookshops-libraries-menton", "best-coffee-menton", "public-transport-in-menton", "a-week-in-menton-book-walking-route"],
  bookRecommendation: {
    title: "Les petites affaires du port", subtitle: "Quarante énigmes au fil d’un voyage", author: "Anton BV", year: 2026, language: "fr",
    coverImage: "/images/guide/les-petites-affaires-du-port-book-cover.jpeg",
    coverImageAlt: t("Actual front cover of Les petites affaires du port by Anton BV, supplied by the author", "Véritable couverture de Les petites affaires du port d'Anton BV, fournie par l'auteur", "Vera copertina di Les petites affaires du port di Anton BV, fornita dall'autore", "Справжня обкладинка Les petites affaires du port Антона BV, надана автором"),
    languageNote: t("French-language editions only. Not an English translation or a bilingual book.", "Livre en français, non bilingue.", "Edizioni soltanto in francese. Non una traduzione italiana né un libro bilingue.", "Видання лише французькою. Не український переклад і не двомовна книжка."),
    disclosure: t("Author's book recommendation. The description is based on the 2026 edition supplied by Anton BV, not an independent review.", "Présentation du livre de l'auteur, fondée sur l'édition 2026 fournie par Anton BV ; il ne s'agit pas d'une critique indépendante.", "Presentazione del libro dell'autore, basata sull'edizione 2026 fornita da Anton BV; non una recensione indipendente.", "Авторська рекомендація книжки за виданням 2026 року, наданим Антоном BV; не незалежна рецензія."),
    paperbackUrl: "https://www.amazon.fr/dp/B0HQ9MX1M9", kindleUrl: "https://www.amazon.fr/dp/B0HQ7GMWJF",
  },
  sections,
};
