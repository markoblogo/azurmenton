import type { Locale } from "@/i18n/locales";

type LocalizedString = Record<Locale, string>;

export type WebcamCard = {
  title: LocalizedString;
  description: LocalizedString;
  sourceName: string;
  externalUrl: string;
  locationLabel: LocalizedString;
};

export const webcamSectionCopy: Record<
  Locale,
  {
    title: string;
    intro: string;
    note: string;
    cta: string;
  }
> = {
  en: {
    title: "Live webcam links",
    intro: "Useful public webcam links for checking Menton's seafront before you travel.",
    note: "Webcams are provided by third-party public sources. Availability may change.",
    cta: "Open live webcam",
  },
  fr: {
    title: "Liens webcams en direct",
    intro: "Des liens publics utiles pour regarder le front de mer de Menton avant votre voyage.",
    note: "Les webcams sont fournies par des sources publiques tierces. Leur disponibilite peut changer.",
    cta: "Ouvrir la webcam",
  },
  it: {
    title: "Link alle webcam live",
    intro: "Link pubblici utili per controllare il lungomare di Mentone prima del viaggio.",
    note: "Le webcam sono fornite da fonti pubbliche di terze parti. La disponibilita puo cambiare.",
    cta: "Apri webcam live",
  },
  uk: {
    title: "Посилання на вебкамери",
    intro: "Корисні публічні посилання, щоб подивитися на набережну Ментона перед поїздкою.",
    note: "Вебкамери надаються сторонніми публічними джерелами. Доступність може змінюватися.",
    cta: "Відкрити вебкамеру",
  },
};

export const mentonWebcams: WebcamCard[] = [
  {
    title: {
      en: "Plage des Sablettes",
      fr: "Plage des Sablettes",
      it: "Plage des Sablettes",
      uk: "Plage des Sablettes",
    },
    description: {
      en: "Public live views of one of Menton's most recognisable seafront areas.",
      fr: "Vues publiques en direct de l'un des lieux les plus reconnaissables du front de mer de Menton.",
      it: "Viste pubbliche in diretta di una delle zone piu riconoscibili del lungomare di Mentone.",
      uk: "Публічні прямі види однієї з найвідоміших ділянок набережної Ментона.",
    },
    sourceName: "Ville de Menton",
    externalUrl: "https://www.menton.fr/-Webcam",
    locationLabel: {
      en: "Sablettes seafront",
      fr: "Front de mer des Sablettes",
      it: "Lungomare Sablettes",
      uk: "Набережна Sablettes",
    },
  },
  {
    title: {
      en: "Vieux Port de Menton",
      fr: "Vieux Port de Menton",
      it: "Vieux Port de Menton",
      uk: "Vieux Port de Menton",
    },
    description: {
      en: "A public live-view resource for the old port and marina area.",
      fr: "Une ressource publique de vue en direct sur le vieux port et la zone de marina.",
      it: "Una risorsa pubblica con vista live sul vecchio porto e sull'area marina.",
      uk: "Публічний ресурс з прямим видом на старий порт і марину.",
    },
    sourceName: "Webcam Galore",
    externalUrl: "https://www.webcamgalore.com/webcam/France/Menton/32681.html",
    locationLabel: {
      en: "Old port and marina",
      fr: "Vieux port et marina",
      it: "Vecchio porto e marina",
      uk: "Старий порт і марина",
    },
  },
  {
    title: {
      en: "Sablettes panoramic view",
      fr: "Vue panoramique des Sablettes",
      it: "Vista panoramica Sablettes",
      uk: "Панорамний вид Sablettes",
    },
    description: {
      en: "A wider look at the beach and seafront, depending on source availability.",
      fr: "Une vue plus large sur la plage et le front de mer, selon la disponibilite de la source.",
      it: "Uno sguardo piu ampio su spiaggia e lungomare, secondo disponibilita della fonte.",
      uk: "Ширший вид на пляж і набережну, залежно від доступності джерела.",
    },
    sourceName: "Skaping",
    externalUrl: "https://www.skaping.com/menton/plage-des-sablettes/panoramique",
    locationLabel: {
      en: "Beach and seafront",
      fr: "Plage et front de mer",
      it: "Spiaggia e lungomare",
      uk: "Пляж і набережна",
    },
  },
];
