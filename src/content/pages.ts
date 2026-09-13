import type { Locale } from "@/i18n/locales";

export const homeCopy: Record<
  Locale,
  {
    title: string;
    intro: string;
    proof: string[];
    primaryCta: string;
    secondaryCta: string;
    seoTitle: string;
    seoDescription: string;
  }
> = {
  en: {
    title: "Beachfront apartments in central Menton",
    intro:
      "Family-run seaside apartments just steps from the beach, old town, cafes and the Mediterranean promenade. Choose a sea-view studio with balcony or a spacious beachside apartment with terrace and parking.",
    proof: ["3 apartments", "Central Menton", "Sea view / terrace options", "Direct request"],
    primaryCta: "View apartments",
    secondaryCta: "Check availability",
    seoTitle: "Beachfront Apartments in Menton | Azur Menton",
    seoDescription:
      "Family-run beachfront and beachside apartments in central Menton, close to the beach, old town, cafes and seafront promenade. Request a direct booking with Azur Menton.",
  },
  fr: {
    title: "Appartements en bord de mer au centre de Menton",
    intro:
      "Appartements familiaux pres de la plage, de la vieille ville, des cafes et de la promenade mediterraneenne. Choisissez un studio avec balcon vue mer ou un appartement plus spacieux avec terrasse et parking.",
    proof: ["3 appartements", "Centre de Menton", "Vue mer ou terrasse", "Demande directe"],
    primaryCta: "Voir les appartements",
    secondaryCta: "Verifier la disponibilite",
    seoTitle: "Appartements en bord de mer a Menton | Azur Menton",
    seoDescription:
      "Appartements familiaux en bord de mer au centre de Menton, pres de la plage, de la vieille ville et de la promenade. Demandez une reservation directe avec Azur Menton.",
  },
  it: {
    title: "Appartamenti fronte mare nel centro di Mentone",
    intro:
      "Appartamenti familiari vicino alla spiaggia, al centro storico, ai caffe e alla passeggiata mediterranea. Scegli uno studio vista mare con balcone o un appartamento piu spazioso con terrazza e parcheggio.",
    proof: ["3 appartamenti", "Centro di Mentone", "Vista mare o terrazza", "Richiesta diretta"],
    primaryCta: "Vedi appartamenti",
    secondaryCta: "Controlla disponibilita",
    seoTitle: "Appartamenti sul mare a Mentone | Azur Menton",
    seoDescription:
      "Appartamenti familiari fronte mare e vicino alla spiaggia nel centro di Mentone, vicino al centro storico e alla promenade. Richiedi una prenotazione diretta con Azur Menton.",
  },
  uk: {
    title: "Апартаменти біля моря в центрі Ментона",
    intro:
      "Сімейні апартаменти поряд із пляжем, старим містом, кафе та середземноморською набережною. Оберіть студію з балконом і видом на море або просторі апартаменти з терасою та паркінгом.",
    proof: ["3 апартаменти", "Центр Ментона", "Вид на море або тераса", "Прямий запит"],
    primaryCta: "Переглянути апартаменти",
    secondaryCta: "Перевірити доступність",
    seoTitle: "Апартаменти біля моря в Ментоні | Azur Menton",
    seoDescription:
      "Сімейні апартаменти на першій лінії та біля пляжу в центрі Ментона, поруч зі старим містом і набережною. Надішліть прямий запит на бронювання в Azur Menton.",
  },
};

export const guidePages = [
  {
    slug: "beaches-and-seafront",
    title: "Beaches and seafront walks",
    description:
      "A practical starter guide to Menton's beaches, promenades, and easy coastal walks near the apartments.",
  },
  {
    slug: "old-town-and-markets",
    title: "Old town, markets, and everyday Menton",
    description:
      "Notes for guests who want a relaxed local base: food shopping, old town lanes, and simple day planning.",
  },
  {
    slug: "day-trips",
    title: "Easy day trips",
    description:
      "Ideas for Monaco, Italy, and nearby Riviera stops, to be expanded with verified transport notes.",
  },
];

export const events = [
  {
    title: "Menton seasonal events",
    description:
      "A future editorial page for confirmed seasonal events. Dates will only be added when verified.",
  },
  {
    title: "Nearby Riviera events",
    description:
      "A place for Monaco, Italian Riviera, and Cote d'Azur events that are useful for guests.",
  },
];

const homepageFaqItems = [
  {
    question: {
      en: "Is this instant booking?",
      fr: "Est-ce une réservation instantanée ?",
      it: "È una prenotazione istantanea?",
      uk: "Це миттєве бронювання?",
    },
    answer: {
      en: "No. The website sends a booking request only. Azur Menton confirms availability and the best direct offer manually.",
      fr: "Non. Le site envoie uniquement une demande de réservation. Azur Menton confirme ensuite manuellement la disponibilité et la meilleure offre directe.",
      it: "No. Il sito invia solo una richiesta di prenotazione. Azur Menton conferma poi manualmente la disponibilità e la migliore offerta diretta.",
      uk: "Ні. Сайт лише надсилає запит на бронювання. Azur Menton вручну підтверджує доступність і найкращу пряму пропозицію.",
    },
  },
  {
    question: {
      en: "Are prices shown on the website?",
      fr: "Les prix sont-ils affichés sur le site ?",
      it: "I prezzi sono mostrati sul sito?",
      uk: "Чи показані ціни на сайті?",
    },
    answer: {
      en: "Prices are confirmed for your dates, apartment and length of stay. Send a request to receive a clear direct offer.",
      fr: "Les prix sont confirmés selon vos dates, l’appartement et la durée du séjour. Envoyez une demande pour recevoir une offre directe claire.",
      it: "I prezzi vengono confermati in base alle date, all’appartamento e alla durata del soggiorno. Invia una richiesta per ricevere un’offerta diretta chiara.",
      uk: "Ціна підтверджується з урахуванням дат, апартаментів і тривалості перебування. Надішліть запит, щоб отримати чітку пряму пропозицію.",
    },
  },
  {
    question: {
      en: "Can I see availability before requesting?",
      fr: "Puis-je voir les disponibilités avant d’envoyer une demande ?",
      it: "Posso vedere la disponibilità prima di inviare una richiesta?",
      uk: "Чи можна побачити доступність до надсилання запиту?",
    },
    answer: {
      en: "Yes. Apartment pages and the availability page can show read-only planning windows from external calendar feeds. They are guidance only; we confirm availability manually.",
      fr: "Oui. Les pages des appartements et la page de disponibilité peuvent afficher des périodes indicatives en lecture seule issues de calendriers externes. Elles servent à planifier ; nous confirmons toujours la disponibilité manuellement.",
      it: "Sì. Le pagine degli appartamenti e la pagina disponibilità possono mostrare periodi indicativi in sola lettura da calendari esterni. Servono per pianificare; confermiamo sempre la disponibilità manualmente.",
      uk: "Так. На сторінках апартаментів і доступності можуть відображатися орієнтовні вікна з зовнішніх календарів у режимі лише для читання. Вони допомагають планувати; доступність ми завжди підтверджуємо вручну.",
    },
  },
  {
    question: {
      en: "Which apartment is best for families?",
      fr: "Quel appartement convient le mieux aux familles ?",
      it: "Quale appartamento è più adatto alle famiglie?",
      uk: "Які апартаменти найкраще підходять для сімей?",
    },
    answer: {
      en: "The Beachside Apartment with Terrace & Parking is usually the most practical choice for families or longer stays, with a full kitchen, terrace and parking.",
      fr: "L’appartement près de la plage avec terrasse et parking est généralement le choix le plus pratique pour les familles ou les séjours plus longs, avec cuisine complète, terrasse et parking.",
      it: "L’appartamento vicino alla spiaggia con terrazza e parcheggio è di solito la scelta più pratica per famiglie o soggiorni più lunghi, con cucina completa, terrazza e parcheggio.",
      uk: "Апартаменти біля пляжу з терасою та паркінгом зазвичай найзручніші для сімей або тривалішого перебування: є повноцінна кухня, тераса й паркінг.",
    },
  },
];

export function getHomepageFaqItems(locale: Locale) {
  return homepageFaqItems.map((item) => ({
    question: item.question[locale],
    answer: item.answer[locale],
  }));
}

export const faqItems = getHomepageFaqItems("en");

export const pageCopy: Record<
  string,
  Record<Locale, { title: string; description: string; note: string; seoTitle?: string; seoDescription?: string }>
> = {
  guide: {
    en: {
      title: "Menton guide",
      description: "Practical travel notes for beach days, food, local walks, and easy Riviera trips.",
      note: "Guide articles are structured now and can be expanded with verified local recommendations.",
      seoTitle: "Menton Guide for Beach Apartment Guests",
      seoDescription: "A practical Menton travel guide for Azur Menton guests, including beaches, local walks, markets, and day trips.",
    },
    fr: {
      title: "Guide de Menton",
      description: "Notes pratiques pour les plages, les balades, la vieille ville et les excursions sur la Riviera.",
      note: "Les guides aident a preparer un sejour simple et bien situe a Menton.",
    },
    it: {
      title: "Guida di Mentone",
      description: "Note pratiche per spiagge, passeggiate, centro storico e gite in Riviera.",
      note: "Le guide aiutano a preparare un soggiorno semplice e ben posizionato a Mentone.",
    },
    uk: {
      title: "Гід Ментона",
      description: "Практичні нотатки про пляжі, прогулянки, старе місто та поїздки Рив'єрою.",
      note: "Гід допомагає спланувати просте й зручне перебування в Ментоні.",
    },
  },
  events: {
    en: {
      title: "Events in Menton & nearby",
      description: "A careful events page prepared for verified Menton and Riviera dates.",
      note: "No dates are listed until confirmed, so this page will not invent or preserve stale event information.",
      seoTitle: "Events in Menton and Nearby Riviera Destinations",
      seoDescription: "Verified event content for Menton and nearby Riviera destinations, prepared for Azur Menton guests.",
    },
    fr: {
      title: "Evenements a Menton et aux alentours",
      description: "Une page prudente pour les periodes animees de Menton et de la Riviera.",
      note: "Les dates exactes ne sont ajoutees que lorsqu'elles sont confirmees par une source fiable.",
    },
    it: {
      title: "Eventi a Mentone e dintorni",
      description: "Una pagina prudente per i periodi vivaci di Mentone e della Riviera.",
      note: "Le date esatte vengono aggiunte solo quando confermate da una fonte affidabile.",
    },
    uk: {
      title: "Події в Ментоні та поруч",
      description: "Обережна сторінка про жваві періоди в Ментоні та на Рив'єрі.",
      note: "Точні дати додаються лише після підтвердження з надійного джерела.",
    },
  },
  faq: {
    en: {
      title: "FAQ",
      description: "Answers about manual booking requests, availability, prices, apartments, and future booking integration.",
      note: "The FAQ is intentionally practical and avoids unconfirmed booking claims.",
      seoTitle: "FAQ | Azur Menton Apartments",
      seoDescription: "Questions about Azur Menton apartments, direct booking requests, check-in, parking, children, amenities and staying by the sea in Menton.",
    },
    fr: {
      title: "FAQ",
      description: "Reponses sur les demandes de reservation, disponibilites, prix, appartements et future integration de reservation.",
      note: "Cette FAQ reste pratique et evite les promesses non confirmees.",
    },
    it: {
      title: "FAQ",
      description: "Risposte su richieste di prenotazione, disponibilita, prezzi, appartamenti e futura integrazione.",
      note: "La FAQ e pratica e non contiene promesse non confermate.",
    },
    uk: {
      title: "FAQ",
      description: "Відповіді про запити на бронювання, доступність, ціни, апартаменти та майбутню інтеграцію.",
      note: "FAQ практичний і не містить непідтверджених обіцянок.",
    },
  },
  contact: {
    en: {
      title: "Contact Azur Menton",
      description: "Contact the family behind Azur Menton or send a direct request for your dates.",
      note: "For direct booking requests, apartment questions or arrival details, contact Azur Menton by email or WhatsApp. The booking request form remains the clearest way to send dates and guest details.",
      seoTitle: "Contact Azur Menton | Direct Booking Requests",
      seoDescription: "Contact Azur Menton for direct booking requests, apartment questions and practical information about staying in central Menton.",
    },
    fr: {
      title: "Contact Azur Menton",
      description: "Contactez la famille derriere Azur Menton ou envoyez une demande directe pour vos dates.",
      note: "Pour une demande de reservation, une question sur un appartement ou une arrivee, contactez Azur Menton par email ou WhatsApp.",
    },
    it: {
      title: "Contatti Azur Menton",
      description: "Contatta la famiglia dietro Azur Menton o invia una richiesta diretta per le tue date.",
      note: "Per richieste di prenotazione, domande sugli appartamenti o arrivi, contatta Azur Menton via email o WhatsApp.",
    },
    uk: {
      title: "Контакти Azur Menton",
      description: "Зв'яжіться з родиною Azur Menton або надішліть прямий запит на ваші дати.",
      note: "Для запиту на бронювання, питань про апартаменти або прибуття зв'яжіться з Azur Menton email або WhatsApp.",
    },
  },
  privacy: {
    en: {
      title: "Privacy policy",
      description: "How Azur Menton uses booking request details to reply to guests.",
      note: "The privacy page explains how direct booking request details are used and identifies SCI Petra et Paul as the data controller.",
    },
    fr: {
      title: "Politique de confidentialite",
      description: "Informations sur l'utilisation des donnees de demande de reservation par Azur Menton.",
      note: "Les informations juridiques detaillees doivent etre completees avec les donnees definitives du responsable.",
    },
    it: {
      title: "Informativa privacy",
      description: "Informazioni sull'uso dei dati delle richieste di prenotazione da parte di Azur Menton.",
      note: "I dettagli legali devono essere completati con i dati definitivi del responsabile.",
    },
    uk: {
      title: "Політика конфіденційності",
      description: "Інформація про використання даних із запитів на бронювання Azur Menton.",
      note: "Юридичні деталі потрібно доповнити остаточними даними відповідальної особи.",
    },
  },
  legal: {
    en: {
      title: "Legal notice",
      description: "Legal notice for Azur Menton.",
      note: "Owner, publisher and registration details are listed from the SCI Petra et Paul Kbis extract; hosting and booking terms still need final confirmation.",
    },
    fr: {
      title: "Mentions legales",
      description: "Mentions legales d'Azur Menton.",
      note: "Les coordonnees legales verifiees doivent etre completees avant le lancement definitif.",
    },
    it: {
      title: "Note legali",
      description: "Note legali di Azur Menton.",
      note: "I dati legali verificati devono essere completati prima del lancio definitivo.",
    },
    uk: {
      title: "Юридична інформація",
      description: "Юридична інформація Azur Menton.",
      note: "Перевірені юридичні дані потрібно додати перед фінальним запуском.",
    },
  },
};
