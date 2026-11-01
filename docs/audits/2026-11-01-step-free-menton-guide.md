# Step-Free Menton Guide: Source And Publication Review

Reviewed: 2026-11-01. Canonical slug: `menton-accessible-step-free-walks`.

## Scope And Claim Boundaries

The supplied Word draft was imported with the existing manual guide workflow.
Its roughly 4,000-word English article is retained, with complete French,
Italian and Ukrainian versions and aligned route/toilet tables. This is an
editorial review of published evidence, **not** an on-site accessibility audit.
No gradients, clear widths, continuous paths or toilet interiors were measured.
The guide does not certify the accessibility of any apartment.

## Evidence

- Tourist-office [seafront](https://www.menton-riviera-merveilles.fr/offres/promenade-en-poussette-bord-de-mer-menton-fr-4269929/)
  and [town-centre](https://www.menton-riviera-merveilles.fr/offres/promenade-en-poussette-centre-ville-menton-fr-4274237/)
  descriptions classify their itineraries for independent wheelchair access.
  They do not provide a measured continuous-route gradient profile.
- [Biovès](https://www.menton-riviera-merveilles.fr/offres/jardin-public-bioves-menton-fr-3051515/)
  and [Sablettes esplanade](https://www.menton-riviera-merveilles.fr/offres/esplanade-des-sablettes-menton-fr-3834108/)
  listings support the route descriptions; festival layouts and connections
  between street, esplanade and beach levels need separate checks.
- [Handiplage](https://www.menton-riviera-merveilles.fr/offres/handiplage-de-menton-menton-fr-3234475/)
  lists assisted bathing by reservation, 1 July–31 August 2026, 09:00–13:00.
  That season has ended; no 2027 programme or year-round service is asserted.
- [Palais de l'Europe](https://www.menton-riviera-merveilles.co.uk/offers/the-palais-de-leurope-menton-en-3051207/)
  supplies operator toilet/equipment information, not unrestricted all-day access.
  [Acceslibre](https://acceslibre.beta.gouv.fr/app/06-menton/a/office-du-tourisme/erp/office-de-tourisme-de-menton/)
  is a government-hosted collaborative record, not a municipal field certificate.
  Community toilet markers remain leads, not new verified place cards.
- [SNCF](https://www.garesetconnexions.sncf/fr/gares-services/menton/accessibilite)
  is the station/assistance reference. No current live lift status was established.
  [Mobizest](https://www.zestbus.fr/service-mobizest) requires an accepted application;
  it is not a guaranteed on-demand tourist transfer.
- [Val Rahmeh access](https://www.jardinbotaniquevalrahmehmenton.fr/fr/visiteurs-en-situation-de-handicap)
  explicitly limits wheelchair visiting. The [detailed works notice](https://www.jardinbotaniquevalrahmehmenton.fr/fr/actualites/le-jardin-val-rahmeh-menton-ferme-pour-travaux-en-novembre)
  says 2–27 November inclusive, whereas the homepage also displayed 28 November.
  Both this guide and the existing Janet Frame guide now preserve that discrepancy
  and ask visitors to confirm reopening, rather than promise a specific date.

## Content And Imagery

Four distinct new cards: Esplanade des Sablettes, Promenade de la Mer,
Handiplage de Menton and Plage du Marché. No coordinates were invented;
map exclusions record the outstanding entrance/coordinate checks.
The owner supplied all four illustrations during preparation. The existing
safe post-publication asset command matched/applied them with explicit place IDs,
without overwriting already-covered places. The persisted receipt is
`reports/guide-assets-postpublish/menton-accessible-step-free-walks.json`.
These are illustrations, not photographic evidence of ramps or equipment.

The guide links existing transport, toilets, beaches, family and accommodation
materials. Existing relevant place cards link back. The beach guide now separates
esplanade access, pebble-beach access and seasonal assisted bathing, using the
three corresponding new cards. No new duplicate beaches or toilet points were added.

The intake parser still proposes generic subheadings such as "Toilets" and
"Surface and gradients" as places. They were not inserted. Canonical plan sync
and `guide:review` validate the actual 14 rendered place cards with zero issues;
the older intake asset report can still repeat those discarded candidates.
Use the canonical post-publication asset receipt, not that stale draft warning,
to establish whether the published cards have images. Parser/report cleanup is
a separate automation follow-up, not an outstanding illustration request.

## Checks And Follow-Up

Regression tests cover four-language completeness, aligned tables, illustration
wiring, reciprocal links, claim limits and latest-guide eligibility. Retain local
workflow receipts and verify CI/deployment/public pages separately before declaring
publication complete. A future field inspection, not another online inference,
is needed for measured slopes, exact toilet layouts and continuous route guarantees.
The shared content audit also caught yesterday's Halloween in Èze still marked
featured. Only that flag was removed; its page, sources and uncertainty are retained.
