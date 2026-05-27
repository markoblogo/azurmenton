import type { Locale } from "@/i18n/locales";

export type LegalPageKey = "legal" | "privacy" | "cookies" | "booking-terms";

type LegalSection = {
  title: string;
  body: string[];
};

export type LegalPageContent = {
  title: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  sections: LegalSection[];
};

const legalTodos = [
  "Hosting provider details should be reviewed before production changes.",
  "Consumer mediator details should be reviewed if legally required.",
  "Payment, cancellation, tourist tax and retention periods should be reviewed as operations evolve.",
];

export const legalTodoFields = legalTodos;

export const legalPages: Record<LegalPageKey, Record<Locale, LegalPageContent>> = {
  legal: {
    fr: {
      title: "Mentions legales",
      description:
        "Mentions legales d'Azur Menton, site exploite par SCI Petra et Paul.",
      seoTitle: "Mentions legales",
      seoDescription: "Mentions legales d'Azur Menton: editeur, immatriculation, hebergement, propriete intellectuelle et contact.",
      sections: [
        {
          title: "Editeur du site",
          body: [
            "Site: Azur Menton, azurmenton.com.",
            "Editeur: SCI Petra et Paul.",
            "Forme juridique: societe civile immobiliere.",
            "Immatriculation: 983 423 898 R.C.S. Nice.",
            "EUID: FR0605.983423898.",
            "Capital social: 1 000,00 euros. Capital variable minimum: 100,00 euros.",
            "Siege social: 13 Avenue Porte de France, 06500 Menton, France.",
            "Gerant et directeur de la publication: Ruslan Volokh.",
            "Email de contact: petraetpaul@gmail.com. Telephone / WhatsApp: +33 6 24 71 65 65.",
          ],
        },
        {
          title: "Hebergement",
          body: [
            "Le site est heberge sur une infrastructure web geree. Les informations de l'hebergeur peuvent etre precisees ou mises a jour si necessaire.",
          ],
        },
        {
          title: "Propriete intellectuelle",
          body: [
            "Les textes, photographies, logos, elements graphiques et contenus du site sont proteges par le droit applicable. Toute reproduction ou reutilisation non autorisee est interdite, sauf accord ecrit prealable.",
            "Les photographies des appartements doivent provenir de sources autorisees par Azur Menton.",
          ],
        },
        {
          title: "Responsabilite",
          body: [
            "Azur Menton s'efforce de publier des informations exactes et a jour, mais ne peut garantir l'absence totale d'erreur ou d'indisponibilite temporaire du site.",
            "Les demandes de reservation envoyees depuis le site ne constituent pas une confirmation instantanee. La disponibilite, le prix et les conditions sont confirmes par ecrit par l'hote.",
          ],
        },
        {
          title: "Contact",
          body: [
            "Pour toute question relative au site ou aux contenus: petraetpaul@gmail.com ou WhatsApp: +33 6 24 71 65 65.",
          ],
        },
      ],
    },
    en: {
      title: "Legal Notice",
      description:
        "Legal notice for Azur Menton, operated by SCI Petra et Paul.",
      seoTitle: "Legal Notice",
      seoDescription: "Legal notice for Azur Menton covering publisher, registration, hosting, intellectual property and contact details.",
      sections: [
        {
          title: "Website publisher",
          body: [
            "Website: Azur Menton, azurmenton.com.",
            "Publisher: SCI Petra et Paul.",
            "Legal form: societe civile immobiliere, a French civil real-estate company.",
            "Registration: 983 423 898 R.C.S. Nice.",
            "EUID: FR0605.983423898.",
            "Share capital: EUR 1,000.00. Minimum variable capital: EUR 100.00.",
            "Registered office: 13 Avenue Porte de France, 06500 Menton, France.",
            "Manager and publication director: Ruslan Volokh.",
            "Contact email: petraetpaul@gmail.com. Phone / WhatsApp: +33 6 24 71 65 65.",
          ],
        },
        {
          title: "Hosting",
          body: [
            "The website is hosted on managed web infrastructure. Hosting provider details may be clarified or updated where required.",
          ],
        },
        {
          title: "Intellectual property and liability",
          body: [
            "Texts, photos, logos and design elements are protected. Reuse requires prior written permission.",
            "Booking requests are not instant confirmations. Availability, prices and conditions are confirmed manually in writing by the host.",
          ],
        },
      ],
    },
    it: {
      title: "Note legali",
      description: "Note legali di Azur Menton, sito gestito da SCI Petra et Paul.",
      seoTitle: "Note legali",
      seoDescription: "Note legali di Azur Menton con editore, registrazione, hosting, proprieta intellettuale e contatti.",
      sections: [
        {
          title: "Editore del sito",
          body: [
            "Sito: Azur Menton, azurmenton.com.",
            "Editore: SCI Petra et Paul.",
            "Forma giuridica: societe civile immobiliere, societa civile immobiliare francese.",
            "Registrazione: 983 423 898 R.C.S. Nice.",
            "EUID: FR0605.983423898.",
            "Capitale sociale: 1.000,00 EUR. Capitale variabile minimo: 100,00 EUR.",
            "Sede legale: 13 Avenue Porte de France, 06500 Menton, Francia.",
            "Amministratore e direttore della pubblicazione: Ruslan Volokh.",
            "Email: petraetpaul@gmail.com. Telefono / WhatsApp: +33 6 24 71 65 65.",
          ],
        },
        {
          title: "Hosting, proprieta intellettuale e responsabilita",
          body: [
            "Il sito e ospitato su infrastruttura web gestita. I dettagli del provider di hosting possono essere precisati o aggiornati se necessario.",
            "Testi, foto, logo e design sono protetti. Le richieste di prenotazione non sono conferme istantanee.",
          ],
        },
      ],
    },
    uk: {
      title: "Юридична інформація",
      description: "Юридична інформація Azur Menton, сайту, яким керує SCI Petra et Paul.",
      seoTitle: "Юридична інформація",
      seoDescription: "Юридична інформація Azur Menton: видавець сайту, реєстрація, хостинг і контакти.",
      sections: [
        {
          title: "Видавець сайту",
          body: [
            "Сайт: Azur Menton, azurmenton.com.",
            "Видавець: SCI Petra et Paul.",
            "Юридична форма: societe civile immobiliere, французьке цивільне товариство з нерухомості.",
            "Реєстрація: 983 423 898 R.C.S. Nice.",
            "EUID: FR0605.983423898.",
            "Статутний капітал: 1 000,00 EUR. Мінімальний змінний капітал: 100,00 EUR.",
            "Юридична адреса: 13 Avenue Porte de France, 06500 Menton, France.",
            "Керівник і директор публікації: Ruslan Volokh.",
            "Email: petraetpaul@gmail.com. Телефон / WhatsApp: +33 6 24 71 65 65.",
          ],
        },
        {
          title: "Хостинг і відповідальність",
          body: [
            "Сайт розміщено на керованій веб-інфраструктурі. Дані провайдера хостингу можуть бути уточнені або оновлені за потреби.",
            "Запити на бронювання не є миттєвим підтвердженням. Доступність, ціни та умови підтверджуються вручну в письмовому вигляді.",
          ],
        },
      ],
    },
  },
  privacy: {
    fr: {
      title: "Politique de confidentialite",
      description:
        "Informations sur les donnees collectees par Azur Menton pour repondre aux demandes de reservation.",
      seoTitle: "Politique de confidentialite",
      seoDescription: "Politique de confidentialite Azur Menton: donnees du formulaire, finalites, base legale, droits RGPD et contact.",
      sections: [
        {
          title: "Responsable du traitement",
          body: [
            "Le responsable du traitement est SCI Petra et Paul, societe civile immobiliere immatriculee 983 423 898 R.C.S. Nice, siege social: 13 Avenue Porte de France, 06500 Menton, France.",
            "Contact pour les demandes relatives aux donnees personnelles: petraetpaul@gmail.com.",
          ],
        },
        {
          title: "Donnees collectees",
          body: [
            "Le formulaire de demande de reservation peut collecter: nom, email, telephone ou WhatsApp, langue preferee, appartement demande, dates d'arrivee et de depart, nombre de voyageurs, demande de parking et message libre.",
            "Aucune donnee de paiement n'est collectee par le site actuellement.",
          ],
        },
        {
          title: "Finalites et bases legales",
          body: [
            "Les donnees servent a repondre aux demandes de reservation, gerer les echanges precontractuels, gerer une reservation confirmee le cas echeant et assurer le support client.",
            "Les bases legales peuvent inclure les mesures precontractuelles demandees par l'utilisateur, l'execution d'un contrat le cas echeant, l'interet legitime pour la communication operationnelle et le consentement lorsque celui-ci est requis.",
          ],
        },
        {
          title: "Destinataires, conservation et transferts",
          body: [
            "Les donnees sont destinees a Azur Menton / l'equipe hote et aux prestataires techniques strictement necessaires, le cas echeant.",
            "Les donnees sont conservees uniquement pendant la duree necessaire aux echanges, aux reservations confirmees, aux obligations comptables et au support.",
            "Si de nouveaux outils email, notification, CRM ou equivalents sont ajoutes, les informations relatives aux prestataires et transferts seront mises a jour.",
          ],
        },
        {
          title: "Droits RGPD",
          body: [
            "Vous pouvez demander l'acces, la rectification, l'effacement, la limitation du traitement, l'opposition et la portabilite lorsque ces droits s'appliquent.",
            "Vous pouvez egalement introduire une reclamation aupres de la CNIL: cnil.fr.",
            "Azur Menton ne vend pas les donnees personnelles.",
          ],
        },
      ],
    },
    en: {
      title: "Privacy Policy",
      description: "How Azur Menton uses booking request details to reply to guests.",
      seoTitle: "Privacy Policy",
      seoDescription: "Azur Menton privacy policy covering booking request data, purposes, GDPR rights and contact.",
      sections: [
        {
          title: "Controller and contact",
          body: [
            "The data controller is SCI Petra et Paul, a French societe civile immobiliere registered as 983 423 898 R.C.S. Nice, registered office: 13 Avenue Porte de France, 06500 Menton, France.",
            "Privacy contact: petraetpaul@gmail.com.",
          ],
        },
        {
          title: "Data, purpose and legal basis",
          body: [
            "The booking request form may collect name, email, phone/WhatsApp, preferred language, requested apartment, check-in/check-out dates, guest numbers, parking request and message.",
            "This data is used to respond to booking requests, manage pre-contractual communication, manage confirmed reservations where applicable and provide customer support.",
            "Legal bases may include pre-contractual steps requested by the user, contract where applicable, legitimate interest for operational communication and consent where required.",
          ],
        },
        {
          title: "Recipients, retention and rights",
          body: [
            "Data may be accessed by Azur Menton / the host team and necessary technical providers. It is kept only as long as needed for enquiries, confirmed stays, accounting duties and guest support.",
            "Users may request access, rectification, deletion, restriction, objection and portability where applicable, and may complain to CNIL.",
            "Azur Menton does not sell personal data. If additional non-EU tools are added later, the privacy information will be updated.",
          ],
        },
      ],
    },
    it: {
      title: "Informativa privacy",
      description: "Come Azur Menton usa i dati delle richieste di prenotazione per rispondere agli ospiti.",
      seoTitle: "Informativa privacy",
      seoDescription: "Informativa privacy Azur Menton su dati del modulo, finalita, diritti GDPR e contatti.",
      sections: [
        {
          title: "Titolare, dati e finalita",
          body: [
            "Il titolare del trattamento e SCI Petra et Paul, societe civile immobiliere registrata 983 423 898 R.C.S. Nice, sede legale: 13 Avenue Porte de France, 06500 Menton, Francia.",
            "Il modulo puo raccogliere nome, email, telefono/WhatsApp, lingua, appartamento, date, numero ospiti, richiesta parcheggio e messaggio.",
            "I dati servono per rispondere alla richiesta, gestire comunicazioni precontrattuali, eventuali prenotazioni confermate e supporto.",
          ],
        },
        {
          title: "Diritti e conservazione",
          body: [
            "Le basi giuridiche possono includere misure precontrattuali, contratto, interesse legittimo e consenso dove richiesto.",
            "I dati sono accessibili solo al team host e ai fornitori tecnici necessari, e vengono conservati per il tempo necessario a richieste, prenotazioni confermate, obblighi contabili e supporto.",
            "Gli utenti hanno diritti GDPR applicabili e possono presentare reclamo alla CNIL. Azur Menton non vende dati personali.",
          ],
        },
      ],
    },
    uk: {
      title: "Політика конфіденційності",
      description: "Як Azur Menton використовує дані з запитів на бронювання, щоб відповісти гостям.",
      seoTitle: "Політика конфіденційності",
      seoDescription: "Політика конфіденційності Azur Menton щодо даних запиту, цілей обробки, прав GDPR і контактів.",
      sections: [
        {
          title: "Контролер, дані та цілі",
          body: [
            "Контролер даних: SCI Petra et Paul, societe civile immobiliere, зареєстрована як 983 423 898 R.C.S. Nice, юридична адреса: 13 Avenue Porte de France, 06500 Menton, France.",
            "Форма може збирати ім'я, email, телефон/WhatsApp, бажану мову, апартаменти, дати, кількість гостей, запит щодо паркування та повідомлення.",
            "Дані використовуються для відповіді на запити бронювання, переддоговірної комунікації, підтверджених бронювань, якщо застосовно, та підтримки гостей.",
          ],
        },
        {
          title: "Права та зберігання",
          body: [
            "Правові підстави можуть включати переддоговірні заходи, договір, законний інтерес і згоду, якщо вона потрібна.",
            "Дані доступні лише команді хоста та необхідним технічним провайдерам і зберігаються стільки, скільки потрібно для запитів, підтверджених бронювань, бухгалтерських обов'язків і підтримки гостей.",
            "Користувачі мають застосовні права GDPR і можуть подати скаргу до CNIL. Azur Menton не продає персональні дані.",
          ],
        },
      ],
    },
  },
  cookies: {
    fr: {
      title: "Politique cookies",
      description: "Informations sur les cookies, mesures d'audience et contenus tiers du site Azur Menton.",
      seoTitle: "Politique cookies",
      seoDescription: "Politique cookies Azur Menton: cookies strictement necessaires, analytics, meteo et consentement.",
      sections: [
        {
          title: "Cookies actuellement utilises",
          body: [
            "A ce stade, le site n'utilise pas de cookies non essentiels connus pour l'analyse marketing ou publicitaire.",
            "Des cookies strictement necessaires peuvent etre utilises par l'hebergement ou le fonctionnement technique du site.",
          ],
        },
        {
          title: "Services qui pourraient etre ajoutes",
          body: [
            "Si des outils d'analytics sont ajoutes plus tard, ils devront etre documentes ici et, si necessaire, soumis au consentement.",
            "Le widget meteo ne charge pas de scripts tiers cote navigateur par defaut. Les contenus tiers visibles par l'utilisateur devront etre documentes ici s'ils sont ajoutes plus tard.",
          ],
        },
        {
          title: "Consentement",
          body: [
            "Si des cookies non essentiels, outils d'analytics ou embeds tiers sont actives, un mecanisme de consentement et de retrait sera mis en place.",
          ],
        },
      ],
    },
    en: {
      title: "Cookie Policy",
      description: "Cookie information for the Azur Menton website.",
      seoTitle: "Cookie Policy",
      seoDescription: "Azur Menton cookie policy covering essential cookies, future analytics and third-party embeds.",
      sections: [
        {
          title: "Current use",
          body: [
            "The website does not currently use known non-essential marketing or analytics cookies.",
            "Strictly necessary cookies may be used by hosting or core technical services.",
          ],
        },
        {
          title: "Future services and consent",
          body: [
            "Analytics cookies, third-party embeds or additional providers must be documented here if added later.",
            "The weather widget does not load third-party browser scripts by default. User-facing third-party embeds must be documented here if added later.",
            "If non-essential cookies are introduced, a consent and withdrawal mechanism will be provided.",
          ],
        },
      ],
    },
    it: {
      title: "Politica cookie",
      description: "Informazioni sui cookie del sito Azur Menton.",
      seoTitle: "Politica cookie",
      seoDescription: "Politica cookie Azur Menton su cookie essenziali, analytics futuri e contenuti terzi.",
      sections: [
        {
          title: "Uso attuale",
          body: [
            "Il sito non usa attualmente cookie non essenziali noti per marketing o analytics.",
            "Cookie strettamente necessari possono essere usati dall'hosting o da servizi tecnici.",
            "Eventuali embed terzi visibili agli utenti dovranno essere documentati qui se aggiunti in futuro.",
            "Se in futuro saranno attivati cookie non essenziali o embed terzi, verra fornito un meccanismo di consenso e revoca.",
          ],
        },
      ],
    },
    uk: {
      title: "Політика cookies",
      description: "Інформація про cookies на сайті Azur Menton.",
      seoTitle: "Політика cookies",
      seoDescription: "Політика Azur Menton щодо технічно необхідних cookies, майбутньої аналітики і сторонніх вбудованих елементів.",
      sections: [
        {
          title: "Поточне використання",
          body: [
            "Сайт наразі не використовує відомі необов'язкові маркетингові або аналітичні cookies.",
            "Технічно необхідні cookies можуть використовуватися хостингом або базовими технічними сервісами.",
            "Якщо пізніше буде додано сторонні вбудовані елементи або необов'язкові cookies, ця сторінка буде оновлена, а механізм згоди буде наданий там, де це потрібно.",
          ],
        },
      ],
    },
  },
  "booking-terms": {
    fr: {
      title: "Conditions de reservation",
      description: "Conditions applicables aux demandes de reservation directe Azur Menton.",
      seoTitle: "Conditions de reservation",
      seoDescription: "Conditions de reservation Azur Menton: demande non instantanee, confirmation, paiement, annulation, taxe de sejour et regles.",
      sections: [
        {
          title: "Demande et confirmation",
          body: [
            "Le formulaire envoie une demande de reservation directe. Il ne s'agit pas d'une confirmation instantanee.",
            "La reservation est confirmee uniquement apres confirmation ecrite de l'hote. Les prix, disponibilites et conditions sont confirmes manuellement jusqu'a l'integration eventuelle d'un channel manager.",
          ],
        },
        {
          title: "Paiement, annulation et taxe",
          body: [
            "Les conditions de paiement, acompte ou solde sont indiquees dans l'offre ecrite avant confirmation.",
            "Les conditions d'annulation et de remboursement sont precisees dans l'echange de reservation.",
            "La taxe de sejour, si applicable, est indiquee avec les conditions confirmees.",
            "Un depot de garantie ou une caution dommage peut etre demande selon le sejour et l'appartement.",
          ],
        },
        {
          title: "Arrivee, depart et regles de maison",
          body: [
            "Les horaires d'arrivee et de depart sont confirmes avec l'hote avant le sejour.",
            "Regles prevues: logement non-fumeur, pas de fetes ni evenements, respect de l'occupation maximale de chaque appartement.",
            "Les demandes concernant animaux, enfants ou lit bebe doivent etre confirmees avant reservation.",
          ],
        },
        {
          title: "Parking, responsabilites et reclamations",
          body: [
            "Le parking depend de l'appartement, de la disponibilite et peut necessiter une reservation. Des frais peuvent s'appliquer lorsque cela est indique.",
            "Les voyageurs sont responsables de l'utilisation normale du logement, du respect du voisinage et du signalement rapide de tout probleme.",
            "Pour une reclamation, contacter petraetpaul@gmail.com ou WhatsApp: +33 6 24 71 65 65.",
            "Les coordonnees du mediateur de la consommation seront communiquees si elles sont legalement requises.",
            "La loi applicable et la juridiction competente sont celles prevues par le droit applicable aux locations concernees.",
          ],
        },
      ],
    },
    en: {
      title: "Booking Terms",
      description: "Terms for direct booking requests with Azur Menton.",
      seoTitle: "Booking Terms",
      seoDescription: "Azur Menton booking terms for manual requests, written confirmation, payments, cancellation and house rules.",
      sections: [
        {
          title: "Request and confirmation",
          body: [
            "Submitting the form sends a direct booking request only. It is not instant confirmation.",
            "A booking is confirmed only after written confirmation from the host. Availability, prices and conditions are confirmed manually until a channel manager is connected.",
          ],
        },
        {
          title: "Payments, cancellation and tax",
          body: [
            "Payment, deposit and balance terms are provided in the written offer before confirmation.",
            "Cancellation and refund terms are confirmed in the booking exchange.",
            "Tourist tax, where applicable, is included in the confirmed terms.",
            "A damage or security deposit may be requested depending on the stay and apartment.",
          ],
        },
        {
          title: "House rules and guest responsibilities",
          body: [
            "Expected house rules: no smoking, no parties/events and respect for each apartment's maximum occupancy.",
            "Pets, children, cot requests and check-in/check-out times should be confirmed before booking.",
            "For complaints, contact petraetpaul@gmail.com or WhatsApp: +33 6 24 71 65 65. Consumer mediator details will be provided if legally required.",
            "Parking depends on the apartment and availability. Reservation may be required and charges may apply where relevant.",
          ],
        },
      ],
    },
    it: {
      title: "Condizioni di prenotazione",
      description: "Condizioni per le richieste dirette di prenotazione Azur Menton.",
      seoTitle: "Condizioni di prenotazione",
      seoDescription: "Condizioni Azur Menton per richieste manuali, conferma scritta, pagamenti, cancellazione e regole.",
      sections: [
        {
          title: "Richiesta, conferma e condizioni principali",
          body: [
            "Il modulo invia solo una richiesta diretta. Non e una conferma immediata.",
            "La prenotazione e confermata solo dopo conferma scritta dell'host. Prezzi, disponibilita e condizioni sono confermati manualmente.",
            "Pagamento, deposito, cancellazione, tassa di soggiorno, cauzione e orari sono indicati nell'offerta scritta o nello scambio di prenotazione.",
            "Animali, bambini, letto bebe e richieste particolari devono essere confermati prima della prenotazione.",
            "Regole previste: non fumare, niente feste/eventi e rispetto dell'occupazione massima. Il parcheggio dipende dall'appartamento e dalla disponibilita.",
          ],
        },
      ],
    },
    uk: {
      title: "Умови бронювання",
      description: "Умови для прямих запитів на бронювання Azur Menton.",
      seoTitle: "Умови бронювання",
      seoDescription: "Умови Azur Menton для ручних запитів, письмового підтвердження, оплат, скасування та правил проживання.",
      sections: [
        {
          title: "Запит, підтвердження та основні умови",
          body: [
            "Форма надсилає лише прямий запит на бронювання. Це не є миттєвим підтвердженням.",
            "Бронювання підтверджується лише після письмового підтвердження від хоста. Ціни, доступність і умови перевіряються вручну.",
            "Оплата, депозит, скасування, туристичний збір, застава й час заїзду/виїзду вказуються в письмовій пропозиції або під час підтвердження.",
            "Очікувані правила: не палити, не проводити вечірки/події та дотримуватися максимальної кількості гостей. Паркінг залежить від апартаментів і доступності.",
          ],
        },
      ],
    },
  },
};
