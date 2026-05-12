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
    title: "Live views from Menton",
    intro: "See the seafront, old port and beaches before planning your stay.",
    note: "Webcams are provided by third-party public sources. Availability may change.",
    cta: "Open live webcam",
  },
  fr: {
    title: "Vues en direct de Menton",
    intro: "Regardez le front de mer, le vieux port et les plages avant de preparer votre sejour.",
    note: "Les webcams sont fournies par des sources publiques tierces. Leur disponibilite peut changer.",
    cta: "Ouvrir la webcam",
  },
  it: {
    title: "Viste live da Mentone",
    intro: "Guarda lungomare, vecchio porto e spiagge prima di pianificare il soggiorno.",
    note: "Le webcam sono fornite da fonti pubbliche di terze parti. La disponibilita puo cambiare.",
    cta: "Apri webcam live",
  },
  uk: {
    title: "Live views from Menton",
    intro: "See the seafront, old port and beaches before planning your stay.",
    note: "Webcams are provided by third-party public sources. Availability may change.",
    cta: "Open live webcam",
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
      uk: "Public live views of one of Menton's most recognisable seafront areas.",
    },
    sourceName: "Ville de Menton",
    externalUrl: "https://www.menton.fr/-Webcam",
    locationLabel: {
      en: "Sablettes seafront",
      fr: "Front de mer des Sablettes",
      it: "Lungomare Sablettes",
      uk: "Sablettes seafront",
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
      uk: "A public live-view resource for the old port and marina area.",
    },
    sourceName: "Webcam Galore",
    externalUrl: "https://www.webcamgalore.com/webcam/France/Menton/32681.html",
    locationLabel: {
      en: "Old port and marina",
      fr: "Vieux port et marina",
      it: "Vecchio porto e marina",
      uk: "Old port and marina",
    },
  },
  {
    title: {
      en: "Sablettes panoramic view",
      fr: "Vue panoramique des Sablettes",
      it: "Vista panoramica Sablettes",
      uk: "Sablettes panoramic view",
    },
    description: {
      en: "A wider look at the beach and seafront, depending on source availability.",
      fr: "Une vue plus large sur la plage et le front de mer, selon la disponibilite de la source.",
      it: "Uno sguardo piu ampio su spiaggia e lungomare, secondo disponibilita della fonte.",
      uk: "A wider look at the beach and seafront, depending on source availability.",
    },
    sourceName: "Skaping",
    externalUrl: "https://www.skaping.com/menton/plage-des-sablettes/panoramique",
    locationLabel: {
      en: "Beach and seafront",
      fr: "Plage et front de mer",
      it: "Spiaggia e lungomare",
      uk: "Beach and seafront",
    },
  },
];
