import type { GuideArticle, LocalizedGuideSection, LocalizedText } from "./guide";
import records from "./guide-data/christmas-french-riviera-from-menton.json";

const t = (en: string, fr: string, it: string, uk: string): LocalizedText => ({ en, fr, it, uk });
const locales = ["en", "fr", "it", "uk"] as const;
function parse(text: string) {
  const lines = text.split('\n');
  const heading = lines.shift()?.replace(/^#+\s*/, '') ?? '';
  const tables: {headers: string[]; rows: string[][]}[] = [];
  const body: string[] = [];
  const clean = (value: string) => value.replace(/^#+\s*/, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/\*\*/g, '').replace(/^[-*]\s*/, '').trim();
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim().startsWith('|')) {
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        rows.push(lines[i].trim().replace(/^\||\|$/g, '').split('|').map(clean));
        i++;
      }
      i--;
      tables.push({headers: rows[0], rows: rows.slice(1).filter(row => !row.every(cell => /^:?-+:?$/.test(cell)))});
    } else if (clean(lines[i])) body.push(clean(lines[i]));
  }
  return {heading, body, tables};
}
const sections: LocalizedGuideSection[] = records.slice(1).map((record) => {
  const parsed = Object.fromEntries(locales.map(locale => [locale, parse(record[locale])])) as Record<typeof locales[number], ReturnType<typeof parse>>;
  return {
    heading: Object.fromEntries(locales.map(locale => [locale, parsed[locale].heading])) as LocalizedText,
    body: [Object.fromEntries(locales.map(locale => [locale, parsed[locale].body.join('\n\n')])) as LocalizedText],
    tables: Object.fromEntries(locales.map(locale => [locale, parsed[locale].tables])) as LocalizedGuideSection['tables'],
  };
});
const sourceLinks = [
  ['Menton', 'https://www.noel-menton.fr/'],
  ['Menton: municipal planning notice', 'https://www.menton.fr/Appels-d-Offres-et-Marches-Publics.html'],
  ['Monaco', 'https://mairie.mc/le-village-de-noel'],
  ['Monaco ice rink', 'https://mairie.mc/la-patinoire-2'],
  ['Nice', 'https://www.nice.fr/noel-a-nice/'],
  ['Nice: village dates', 'https://www.explorenicecotedazur.com/evenement/village-de-noel-a-nice/'],
  ['Carnolès', 'https://www.menton-riviera-merveilles.fr/offres/les-villages-saint-nicolas-roquebrune-cap-martin-fr-6862934/'],
  ['Sospel', 'https://cotedazurfrance.fr/offres/marche-de-noel-sospel-fr-3389256/'],
  ['Castellar', 'https://www.menton-riviera-merveilles.fr/offres/journee-de-noel-a-castellar-castellar-fr-6868786/'],
  ['Zest', 'https://www.zestbus.fr/'],
  ['Regional trains', 'https://www.ter.sncf.com/sud-provence-alpes-cote-d-azur/se-deplacer/info-trafic/travaux/travaux-entre-nice-vintimille'],
];
sections[sections.length-1].officialLinks = sourceLinks.map(([label,url]) => ({label:t(label,label,label,label),url}));
sections[2].relatedPlaceIds = ['jardins-bioves'];
sections[3].relatedPlaceIds = ['port-hercule-christmas-monaco'];
sections[4].relatedPlaceIds = ['jardin-albert-premier-christmas-nice'];
sections[5].relatedPlaceIds = ['marche-carnoles-saint-nicolas'];
sections[6].relatedPlaceIds = ['place-garibaldi-sospel'];
sections[7].relatedPlaceIds = ['place-clemenceau-castellar'];
sections[1].relatedEventIds = ['christmas-markets-riviera'];

export const christmasGuide: GuideArticle = {
  id: 'christmas-french-riviera-from-menton', slug: 'christmas-french-riviera-from-menton',
  title: t('Christmas on the French Riviera from Menton: where to go and how to plan your evening', 'Noël sur la Côte d’Azur depuis Menton : où aller et organiser sa soirée', 'Natale in Costa Azzurra da Mentone: dove andare e organizzare la serata', 'Різдво на Лазурному березі з Ментона: куди поїхати та як спланувати вечір'),
  seoTitle: t('Christmas Near Menton 2026: Nice, Monaco, Markets & Evening Trips', 'Noël près de Menton 2026 : Nice, Monaco et marchés', 'Natale vicino a Mentone 2026: Nizza, Monaco e mercatini', 'Різдво біля Ментона 2026: Ніцца, Монако та ярмарки'),
  seoDescription: t('Plan Christmas outings from Menton in 2026. Compare Nice, Monaco, Castellar and nearby festive events, with confirmed dates, family activities, transport and return-trip advice.', 'Préparez vos sorties de Noël depuis Menton : Nice, Monaco, Castellar, dates confirmées, activités familiales et conseils pour le retour.', 'Organizza le uscite natalizie da Mentone: Nizza, Monaco, Castellar, date confermate, attività per famiglie e consigli per il ritorno.', 'Сплануйте різдвяні поїздки з Ментона: Ніцца, Монако, Кастеллар, підтверджені дати, сімейні розваги та повернення додому.'),
  excerpt: t('Compare festive evenings and village markets, then plan the journey home.', 'Comparez soirées festives et marchés de village, puis préparez le retour.', 'Confronta serate festive e mercatini nei borghi, poi organizza il ritorno.', 'Порівняйте святкові вечори й сільські ярмарки та сплануйте повернення.'),
  category: 'practical', duration: 'reference', publishedOn: '2026-10-28', sourceStatus: 'verified',
  tags: [t('Christmas','Noël','Natale','Різдво'),t('winter','hiver','inverno','зима')],
  bestFor: [t('Families','Familles','Famiglie',"Сім’ї"),t('Without a car','Sans voiture','Senza auto','Без автомобіля')],
  locationTags: ['menton-centre','monaco','nice'], visualTheme: 'event', visualStatus: 'project_illustration',
  coverImage: '/images/guide/christmas-french-riviera-from-menton.png',
  coverImageAlt: t('Illustration of Christmas on the Riviera','Illustration de Noël sur la Riviera','Illustrazione del Natale sulla Riviera','Ілюстрація Різдва на Рив’єрі'),
  relatedArticles: ['menton-in-winter','menton-with-kids-family-guide','public-transport-in-menton','italian-riviera-day-trip-from-menton','day-trips-from-menton','where-to-stay-in-menton'],
  relatedEvents: ['christmas-markets-riviera'],
  relatedApartments: ['sea-view-balcony-studio','panoramic-sea-view-studio','beachside-family-apartment'],
  showTransportHelper: false,
  sections: [{heading:t('A festive evening from Menton','Une soirée festive depuis Menton','Una serata festiva da Mentone','Святковий вечір із Ментона'),body:[t(...locales.map(locale=>parse(records[0][locale]).body.join('\n\n')) as [string,string,string,string])]}, ...sections],
};
