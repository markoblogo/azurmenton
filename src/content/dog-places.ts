import type { Place, LocalizedText } from "./places";

const t = (en: string, fr: string, it: string, uk: string): LocalizedText => ({ en, fr, it, uk });
const beachSource = "https://www.menton.fr/chiens-sur-les-plages-de-menton-rappel-des-regles-en-vigueur.html";
const parkSource = "https://www.menton.fr/Installations-pour-les-proprietaires-de-chiens";
const beachUse = t("Designated dog beach sector only", "Secteur de plage canin uniquement", "Solo settore di spiaggia per cani", "Лише визначена собача пляжна ділянка");
const parkUse = t("Supervised exercise under posted rules", "Exercice surveillé selon le règlement affiché", "Attività sorvegliata secondo i cartelli", "Активність під наглядом за правилами на знаках");

export const dogPlaces: Place[] = [
  {
    id: "plage-du-gorbio-menton", name: "Plage du Gorbio, Menton", type: "beach",
    image: "/images/guide/plage-du-gorbio-menton.png",
    imageAlt: t("Project illustration for the Gorbio dog beach sector, not a verified boundary, current beach layout or bathing permission", "Illustration du secteur canin du Gorbio, pas une limite vérifiée, un état actuel de la plage ou une autorisation de baignade", "Illustrazione del settore canino del Gorbio, non un confine verificato, assetto attuale della spiaggia o permesso di balneazione", "Ілюстрація собачої ділянки Gorbio, не перевірені межі, поточний вигляд пляжу чи дозвіл на купання"),
    address: "Western Menton waterfront, Roquebrune-Cap-Martin boundary",
    programmeUrl: beachSource, requiresMapReview: true, sourceStatus: "verified",
    shortNote: t("The city lists a designated dog area here in its 29 April 2026 notice. Stay inside the signed/flagged boundaries; this does not permit dogs on the whole western beach or guarantee supervised bathing.", "La ville y désigne un secteur canin le 29 avril 2026. Respectez panneaux et fanions ; pas d'autorisation sur toute la plage occidentale ni de baignade surveillée garantie.", "Il Comune indica un settore canino nell'avviso del 29 aprile 2026. Rispetta cartelli e bandierine: non tutta la spiaggia occidentale è autorizzata e la sorveglianza non è garantita.", "Мерія визначає тут собачу ділянку в повідомленні 29 квітня 2026. Дотримуйтеся знаків і прапорців: не весь західний пляж дозволений, рятувальний нагляд не гарантований."),
    bestFor: [beachUse], relatedArticleIds: ["menton-with-a-dog", "best-beaches-in-menton"],
  },
  {
    id: "plage-hawai-menton", name: "Plage Hawaï, Menton", type: "beach",
    image: "/images/guide/plage-hawai-menton.png",
    imageAlt: t("Project illustration for the Hawaï dog beach sector in Garavan, not proof of exact boundaries, current access or lifeguard supervision", "Illustration du secteur canin Hawaï à Garavan, pas une preuve des limites exactes, de l'accès actuel ou d'une surveillance de baignade", "Illustrazione del settore canino Hawaï a Garavan, non prova di confini esatti, accesso attuale o presenza di bagnini", "Ілюстрація собачої ділянки Hawaï у Garavan, не доказ точних меж, поточного доступу чи нагляду рятувальників"),
    address: "Garavan waterfront, Menton", programmeUrl: beachSource, requiresMapReview: true, sourceStatus: "verified",
    shortNote: t("The city's April 2026 list includes this eastern dog beach sector. Follow the exact signs and current sea conditions; permission does not extend to neighbouring beaches or establish a lifeguard service.", "La liste municipale d'avril 2026 inclut ce secteur canin oriental. Suivez limites et état de la mer ; ni plages voisines ni présence de sauveteurs ne sont garanties.", "L'elenco comunale di aprile 2026 include questo settore canino orientale. Segui limiti e condizioni del mare: né spiagge vicine né bagnini sono garantiti.", "У міському переліку квітня 2026 є ця східна собача ділянка. Виконуйте точні знаки й оцінюйте море: дозвіл не охоплює сусідніх пляжів і не гарантує рятувальників."),
    bestFor: [beachUse], relatedArticleIds: ["menton-with-a-dog", "best-beaches-in-menton"],
  },
  {
    id: "dog-park-garavan-menton", name: "Garavan Dog Park, Menton", type: "garden",
    image: "/images/guide/dog-park-garavan-menton.png",
    imageAlt: t("Project illustration of dogs in an imagined Garavan canine enclosure; not a current inspection of fences, water or opening", "Illustration de chiens dans un enclos imaginé à Garavan ; pas une inspection actuelle des clôtures, de l'eau ou de l'ouverture", "Illustrazione di cani in un recinto immaginato a Garavan; non un'ispezione attuale di recinzioni, acqua o apertura", "Ілюстрація собак в уявному майданчику Garavan; не поточна перевірка огорож, води чи відкриття"),
    address: "10 avenue Blasco Ibáñez, 06500 Menton", programmeUrl: parkSource, requiresMapReview: true, sourceStatus: "verified",
    shortNote: t("Municipal canine enclosure with a water point, not a children's playground. Confirm current gate access, water and posted dog rules; the published facilities list is not a same-day inspection.", "Enclos canin municipal avec point d'eau, pas une aire pour enfants. Confirmez portail, eau et règlement ; la liste publiée n'est pas une inspection du jour.", "Recinto canino comunale con acqua, non parco giochi per bambini. Controlla cancello, acqua e regole: l'elenco pubblicato non è un'ispezione odierna.", "Міський собачий майданчик із водою, не дитячий. Перевірте ворота, воду й правила: опублікований перелік не є сьогоднішнім оглядом."),
    bestFor: [parkUse], relatedArticleIds: ["menton-with-a-dog"],
  },
  {
    id: "dog-park-serres-madone-menton", name: "Serres de la Madone Dog Park, Menton", type: "garden",
    image: "/images/guide/dog-park-serres-madone-menton.png",
    imageAlt: t("Stylized project illustration for the separate Serres de la Madone dog enclosure, not a verified layout or permission to enter the botanical garden with a dog", "Illustration stylisée de l'enclos canin distinct des Serres de la Madone, pas un plan vérifié ni une autorisation d'entrer avec un chien au jardin botanique", "Illustrazione stilizzata del recinto canino separato Serres de la Madone, non un assetto verificato o permesso d'ingresso con cani nel giardino botanico", "Стилізована ілюстрація окремого собачого майданчика Serres de la Madone, не перевірений план чи дозвіл із собакою до ботанічного саду"),
    address: "115 corniche des Serres de la Madone, 06500 Menton", programmeUrl: parkSource, requiresMapReview: true, sourceStatus: "verified",
    shortNote: t("Separate municipal dog enclosure with a water point, not admission to the Serre de la Madone botanical garden. Check current access and rules; the hillside approach may involve gradients.", "Enclos canin municipal distinct avec eau, pas une autorisation d'accès au jardin botanique Serre de la Madone. Vérifiez accès et règlement ; approche en pente possible.", "Recinto canino comunale distinto con acqua, non accesso al giardino botanico Serre de la Madone. Controlla apertura e regole; l'approccio può essere in pendenza.", "Окремий міський собачий майданчик із водою, не дозвіл до ботанічного саду Serre de la Madone. Уточнюйте доступ і правила; підхід може мати ухили."),
    bestFor: [parkUse], relatedArticleIds: ["menton-with-a-dog"],
  },
  {
    id: "dog-park-pian-menton", name: "Pian Small-Dog Park, Menton", type: "garden",
    image: "/images/guide/dog-park-pian-menton.png",
    imageAlt: t("Project illustration of small dogs at an imagined Pian enclosure; depicted sign and equipment are not a current rules or facility inspection", "Illustration de petits chiens dans un enclos imaginé au Pian ; panneau et équipements représentés ne sont pas une inspection actuelle du règlement ou des installations", "Illustrazione di cani piccoli in un recinto immaginato al Pian; cartello e attrezzature raffigurati non sono un'ispezione attuale di regole o impianti", "Ілюстрація малих собак на уявному майданчику Pian; зображені знак та обладнання не є поточною перевіркою правил чи зручностей"),
    address: "Main entrance to Parc du Pian, Menton", programmeUrl: "https://www.menton.fr/inauguration-d-un-3e-parc-a-chiens.html", requiresMapReview: true, sourceStatus: "verified",
    shortNote: t("The 30 November 2023 inauguration announces a 220 m² enclosure for dogs under 10 kg. Historic hours: winter 08:00–18:00, summer 08:00–20:00; confirm current gates, water and size rules. This is not the whole Parc du Pian.", "L'inauguration du 30 novembre 2023 annonce 220 m² pour chiens de moins de 10 kg. Horaires historiques : hiver 8–18 h, été 8–20 h ; confirmez portail, eau et tailles. Ce n'est pas tout le Parc du Pian.", "L'inaugurazione del 30 novembre 2023 annuncia 220 m² per cani sotto 10 kg. Orari storici: inverno 8–18, estate 8–20; conferma cancelli, acqua e taglie. Non è l'intero Parc du Pian.", "Повідомлення 30 листопада 2023 оголошує 220 м² для собак вагою менш як 10 кг. Історичні години: зима 8–18, літо 8–20; уточнюйте ворота, воду й вагові правила. Це не весь Parc du Pian."),
    bestFor: [t("Dogs under 10 kg only", "Chiens de moins de 10 kg uniquement", "Solo cani sotto 10 kg", "Лише собаки вагою менш як 10 кг")], relatedArticleIds: ["menton-with-a-dog"],
  },
];
