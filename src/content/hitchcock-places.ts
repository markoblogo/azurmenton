import type { Place } from "./places";

const t = (en: string, fr: string, it: string, uk: string) => ({ en, fr, it, uk });
const guide = "to-catch-a-thief-hitchcock-villefranche-sur-mer";
const maps = (name: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${name}, Villefranche-sur-Mer, France`)}`;

export const hitchcockPlaces: Place[] = [
  {
    id: "villefranche-sur-mer-station", name: "Gare de Villefranche-sur-Mer", type: "station",
    image: "/images/guide/villefranche-sur-mer-station.png",
    imageAlt: t("Project illustration of Villefranche-sur-Mer station and coastal railway; not a verified current platform photograph or step-free access assessment", "Illustration de la gare de Villefranche et du chemin de fer côtier ; ni photo actuelle vérifiée du quai ni évaluation sans marches", "Illustrazione della stazione di Villefranche e della ferrovia costiera; non foto attuale verificata del binario o valutazione senza gradini", "Ілюстрація станції Вільфранша й прибережної залізниці; не перевірене фото чинної платформи чи оцінка доступу без сходів"),
    address: "Avenue Georges Clemenceau, 06230 Villefranche-sur-Mer",
    googleMapsUrl: maps("Gare de Villefranche-sur-Mer"),
    programmeUrl: "https://www.ter.sncf.com/sud-provence-alpes-cote-d-azur/se-deplacer/gares/villefranche-sur-mer-87756361",
    sourceStatus: "editorial", requiresMapReview: true,
    shortNote: t("Practical start for the Villefranche walk, not a confirmed Hitchcock scene. Check the actual train, station access and uphill return; no step-free route guarantee.", "Départ pratique de la promenade, pas une scène d'Hitchcock confirmée. Vérifiez train, accès et montée au retour ; aucun parcours sans marches garanti.", "Partenza pratica della visita, non scena di Hitchcock confermata. Controlla treno, accessi e salita al ritorno; nessuna garanzia senza gradini.", "Практичний початок прогулянки, не підтверджена сцена Гічкока. Перевірте потяг, доступ і підйом назад; шлях без сходів не гарантовано."),
    bestFor: [t("Train arrivals", "Arrivée en train", "Arrivo in treno", "Приїзд потягом")],
    relatedArticleIds: [guide],
  },
  {
    id: "rue-obscure-villefranche", name: "Rue Obscure", type: "walk",
    image: "/images/guide/rue-obscure-villefranche.png",
    imageAlt: t("Project illustration of a vaulted passage representing Rue Obscure; not an authenticated Hitchcock frame or verified current architectural survey", "Illustration d'un passage voûté représentant Rue Obscure ; ni plan d'Hitchcock authentifié ni relevé architectural actuel vérifié", "Illustrazione di un passaggio a volta che rappresenta Rue Obscure; non fotogramma autenticato o rilievo architettonico attuale verificato", "Ілюстрація склепінчастого проходу Rue Obscure; не підтверджений кадр Гічкока чи перевірена сучасна архітектурна зйомка"),
    address: "Rue Obscure, 06230 Villefranche-sur-Mer", googleMapsUrl: maps("Rue Obscure"),
    programmeUrl: "https://www.explorenicecotedazur.com/en/culture/rue-obscure/",
    sourceStatus: "editorial",
    shortNote: t("Covered historic passage beside the first rampart. Official 2026 listing gives free daily access, subject to temporary restrictions; not a confirmed To Catch a Thief scene or a step-free audit.", "Passage historique couvert du premier rempart. Fiche 2026 : accès gratuit quotidien, sous réserve ; ni scène confirmée de La Main au collet ni audit sans marches.", "Passaggio storico coperto lungo il primo bastione. Scheda 2026: accesso gratuito quotidiano, salvo restrizioni; non scena confermata né audit senza gradini.", "Критий історичний прохід біля першого муру. Картка 2026: безплатний щоденний доступ із можливими обмеженнями; не підтверджена сцена чи аудит без сходів."),
    bestFor: [t("Historic architecture", "Architecture historique", "Architettura storica", "Історична архітектура")],
    relatedArticleIds: [guide],
  },
  {
    id: "chapelle-saint-pierre-villefranche", name: "Chapelle Saint-Pierre / Jean Cocteau", type: "museum",
    image: "/images/guide/chapelle-saint-pierre-villefranche.png",
    imageAlt: t("Project illustration representing Chapelle Saint-Pierre and the waterfront; not a documentary reproduction of Cocteau's facade or proof the chapel is open", "Illustration représentant la chapelle Saint-Pierre et le quai ; ni reproduction documentaire de la façade de Cocteau ni preuve d'ouverture", "Illustrazione della Chapelle Saint-Pierre e del lungomare; non riproduzione documentaria della facciata di Cocteau né prova di apertura", "Ілюстрація Chapelle Saint-Pierre й набережної; не документальне відтворення фасаду Кокто чи доказ відкритого доступу"),
    address: "4 Quai Courbet, 06230 Villefranche-sur-Mer", googleMapsUrl: maps("Chapelle Saint-Pierre Jean Cocteau"),
    programmeUrl: "https://www.explorenicecotedazur.com/culture/la-chapelle-saint-pierre-decoree-par-jean-cocteau/",
    sourceStatus: "editorial", requiresMapReview: true,
    shortNote: t("Cocteau-decorated fishermen's chapel, a cultural stop not a confirmed Hitchcock scene. Ticketed interior; official listing states mid-November–mid-December closure and no wheelchair access. Confirm exact dates.", "Chapelle des pêcheurs décorée par Cocteau, pas une scène d'Hitchcock confirmée. Intérieur payant ; fermeture de mi-novembre à mi-décembre et non-accessibilité en fauteuil selon la fiche. Confirmez les dates.", "Cappella dei pescatori decorata da Cocteau, non scena confermata di Hitchcock. Interno a pagamento; chiusura da metà novembre a metà dicembre e non accessibile in carrozzina secondo la scheda. Conferma le date.", "Каплиця рибалок із декором Кокто, не підтверджена сцена Гічкока. Платний інтер'єр; закриття із середини листопада до середини грудня й відсутність доступу кріслами колісними за карткою. Уточнюйте дати."),
    bestFor: [t("Cocteau's art", "L'art de Cocteau", "Arte di Cocteau", "Мистецтво Кокто")],
    relatedArticleIds: [guide, "jean-cocteau-menton-walking-route"],
  },
  {
    id: "citadelle-saint-elme-villefranche", name: "Citadelle Saint-Elme", type: "museum",
    image: "/images/guide/citadelle-saint-elme-villefranche.png",
    imageAlt: t("Project illustration of Citadelle Saint-Elme fortifications; not a verified camera position, current entrance photograph or evidence of permanent museum access", "Illustration des fortifications de Saint-Elme ; ni point de caméra vérifié, ni photo actuelle de l'entrée, ni preuve d'accès aux musées permanents", "Illustrazione delle fortificazioni Saint-Elme; non posizione verificata, foto attuale dell'ingresso o prova di accesso ai musei permanenti", "Ілюстрація укріплень Saint-Elme; не перевірений ракурс, актуальне фото входу чи доказ доступу до постійних музеїв"),
    address: "La Citadelle, 06230 Villefranche-sur-Mer", googleMapsUrl: maps("Citadelle Saint-Elme"),
    programmeUrl: "https://lacitadellevsm.fr/", sourceStatus: "editorial", requiresMapReview: true,
    shortNote: t("Historic fortress and permitted public areas; not a confirmed Hitchcock scene. Permanent museum route closed since January 2022; temporary exhibitions continue. Check works, current exhibitions, gardens and holiday access separately.", "Forteresse et espaces publics autorisés, pas une scène d'Hitchcock confirmée. Parcours muséal permanent fermé depuis janvier 2022 ; expositions temporaires maintenues. Vérifiez travaux, jardins et jours fériés.", "Fortezza e spazi pubblici autorizzati, non scena confermata. Percorso museale permanente chiuso da gennaio 2022; continuano mostre temporanee. Controlla lavori, giardini, mostre e festivi separatamente.", "Фортеця й дозволені публічні простори, не підтверджена сцена. Постійний музейний маршрут закритий із січня 2022; тимчасові виставки тривають. Окремо перевіряйте роботи, виставки, сади й свята."),
    bestFor: [t("Fortifications and bay views", "Fortifications et rade", "Fortificazioni e rada", "Укріплення й бухта")],
    relatedArticleIds: [guide],
  },
];
