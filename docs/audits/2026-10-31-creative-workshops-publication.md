# Creative workshops: manual publication trial

## Scope

Public slug: `creative-workshops-menton-french-riviera`. Supplied Word article and cover, full English article plus French, Italian and Ukrainian versions. Eighteen aligned sections and two comparison tables per locale. Nine new venue cards intentionally await owner illustrations; the existing Pasta Piemonte image is retained. This trial does not enable scheduled or runtime publication.

The local packet freezes the original files under ignored `build/guide-intake/<slug>/workflow/originals/`. Editorial checks and translations remain human-reviewed steps; readiness is not publication approval. Original external files are retained until verified release.

## Confirmed editorial corrections

- Kairòs Lab: current group €55 plus €5 firing per piece; private couple €170. Children's formats from five do not establish eligibility for every group theme. [Operator](https://kairoslab.it/fr/pages/cour-de-ceramique), [address](https://kairoslab.it/fr/pages/contatti).
- Pasta Piemonte: operator shop closure 2–16 November inclusive, reopening 17 November. Private-class availability must be confirmed separately. No universal class price or extra takeaway parcel inferred. [Programme](https://www.pastapiemonte.com/ateliers-pates-fraiches).
- Saïd Berkane: lessons by appointment; minimum age, price, materials and drying time remain questions for the artist. [Tourist office](https://www.menton-riviera-merveilles.fr/offres/artiste-peintre-said-berkane-menton-fr-4674757/).
- Atelier Cuisine Niçoise: current classic format about 2.5 hours, €60 individual / €100 duo, duo from twelve with adult and private youth groups from fourteen. Older summer programmes are not advertised as current availability. [Tourist office](https://www.explorenicecotedazur.com/sortir/activites-loisirs/atelier-cuisine-nicoise/).
- Cuisine sur Cours: selected children's formats from three, not a universal venue minimum; language and takeaway depend on class. [Tourist office](https://www.explorenicecotedazur.com/en/service-provider/cuisine-sur-cours-atelier-gastronomique/).
- Les Petits Farcis: children from six for the published format; opening on class days only. [Tourist office](https://www.explorenicecotedazur.com/prestataire/atelier-de-cuisine-les-petits-farcis/).
- Fragonard: separate Èze and Grasse factory cards, not a boutique address used as a workshop meeting point; mini from eight, apprentice from twelve. No universal price asserted across different programmes and language pages. [Workshops](https://usines-parfum.fragonard.com/en/workshop/), [FAQ](https://usines-parfum.fragonard.com/contact/), [Grasse factory](https://usines-parfum.fragonard.com/en/factories/la-fabrique-des-fleurs/).
- Galimard: 1 h 45, 100 ml, €65 adult / €55 under fifteen, minimum eight with adult presence recommended for children. [Operator](https://www.galimard.com/produit/atelier-de-creation-de-parfum-a-grasse-particuliers-2).
- Molinard: one hour, 50 ml, €84; minimum age remains unconfirmed. [Tourist office](https://www.paysdegrassetourisme.fr/l-atelier-des-parfums-parfumerie-molinard-5724624/).

Sources reviewed 31 October 2026; calendar availability is not guaranteed. Exact venue coordinates remain explicitly unverified, with map exclusions and address-based external searches rather than invented pins.

## Workflow findings and corrections

1. Nested “Practical details”, language and takeaway headings were mistaken for places. Address-bearing operator sections now yield the venue while nested editorial headings are suppressed; a regression test covers this source structure.
2. Re-running matching discarded manually split chain venues. `sourceDraftName` preserves one source operator's multiple explicit venue decisions, with distinct IDs; resolved editorial additions are retained and manual new IDs do not acquire conflicting existing IDs.
3. Content generation, insertion and fact review remain separate from packet preparation. Four-locale compilation verifies section numbering and table shape before integration. The final check command persists actual check outcomes; CI, deployed SHA and live browser verification remain separate release gates.

Follow-up: link-plan can remove manually chosen related-guide hints absent from its current suggestion set, while adding broader recommended links. Canonical editorial links were checked independently in this trial. A future bounded pass should distinguish explicitly approved links from automatic suggestions instead of treating the generated plan as the editorial authority.

## Owner image handoff

Nine new images are requested using the corresponding place IDs as filenames. Existing Pasta Piemonte imagery must not be replaced. The next supplied image package should use `guide:workflow assets` with this same intake slug, followed by `guide:workflow check`. No additional cover is needed.
