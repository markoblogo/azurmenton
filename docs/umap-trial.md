# Editorial uMap Export And Route Trial

## Scope And Reproduction

Trial and owner approval: 2026-10-31. uMap is an optional editorial tool. No public iframe, saved provider map, account or paid service was created. The existing map and trip-planning system are not replaced.

```sh
npm run map:umap -- family-menton en
npm run map:umap:check -- family-menton en
```

Replace `en` with `fr`, `it` or `uk` as needed. The second command is an explicit, optional external browser check, not part of CI. It blocks every non-GET/HEAD request and all WebSocket connections. Open `build/umap-trial/family-menton/en/index.html` for the unsaved preview, source files and existing-map comparison link. Generated artifacts are ignored by git.

The documented uMap `data` query parameter preloads public GeoJSON in a new, unsaved map. The selected instance is `umap.openstreetmap.de`, linked by the official project. The French instance returned 403 in the documentation fetch; the German instance loaded successfully. This is not an availability guarantee or a permanent published map link.

## Data And Boundaries

- Three existing family-route stops: Palais de l'Europe, Salle des Mariages Jean Cocteau, Promenade du Soleil.
- Export reads the existing route, place records, canonical place-card links and reviewed map coordinates. No new place catalogue or duplicated coordinate source is maintained.
- Downloaded GeoJSON retains full stop/access notes and coordinate precision, review date and source. Popups show only a bounded 96-character summary plus localized place and full-route/access links. Compact preview URLs omit audit fields instead of repeating long notes. Summaries are not a replacement for full visit restrictions or an accessibility audit.
- Unresolved, unreviewed or invalid coordinates stop the export instead of dropping points. The old-town route currently fails this strict gate at Rampes Saint-Michel; the family route passes.
- Default preview has points only. A separate orange dashed layer illustrates stop order; it is **not street geometry, walking directions, a distance estimate or a step-free route**. Its label and popup explicitly say so.
- The external service receives public coordinates, editorial notes and public content links only after opening/running the trial. No guest details, apartment access instructions, dates of a private trip or saved favourites are exported.

## Observed Results

Browser evidence is generated in `browser-evidence.json`; screenshots include `umap-1440.png`, `umap-390.png` and `umap-editor.png`.

- Browser checks cover 1440px, 390px and 320px: three markers, rendered map tiles, two canonical links per popup and no horizontal overflow. Popup bounds and maximum height (340px) are asserted, not inferred from screenshots.
- The browser test checks all stops fit before opening a popup; zooming to an individual marker can otherwise hide another stop. The original tall mobile popup was fixed by retaining only the short summary and links, not by dropping access information from the export. This approves the editor-side workflow, not an embedded public-map design.
- The real uMap editor imported the separate schematic GeoJSON layer. No Save action was used; network writes were blocked.
- Initial automation issues were test mechanics: same-URL hash navigation can return a null navigation response; the importer action is named “Import data”; popup fade must finish before screenshots. The test handles these without changing uMap or weakening the no-write boundary.
- Visual inspection found a genuine existing data error: the Promenade du Soleil pin (`43.7775, 7.4903`) was inland despite its prior review flag. The canonical point was corrected to the regional tourist board's published GeoCoordinates (`43.768361, 7.491301`), still explicitly **area precision**, not an audited entrance. Export and the existing map now share that correction. [Official location source](https://provence-alpes-cotedazur.com/que-faire/culture-et-patrimoine/lieux/la-promenade-du-soleil-menton-fr-4206636/).

## Comparison And Recommendation

| Need | Existing Azur Menton | uMap trial |
| --- | --- | --- |
| Canonical places and updates | Already integrated | Safe when regenerated from canonical records; manually saved maps would need an update policy |
| A focused map for one walk | Ordered route cards and external navigation; general map is category-filtered | Numbered points, labels and separate editorial layers are convenient |
| Manual visual editing | Changes through project content/code | Direct editor for features, styling and layers |
| Personal plans and favourites | Already integrated | No integration demonstrated in this trial |
| Languages and hosting | Four-language site, existing deployment | Four-language compact popups and explicit per-locale browser checks. Public-instance availability and terms remain external dependencies |

The owner approved keeping uMap as an **optional editorial map tool**, not the site's main map or a second location database. This trial demonstrates authoring and layers, not a measurable gain in bookings, editing time or accessibility. Do not add an iframe to every guide. For a future public map: regenerate from canonical data after content changes, review short summaries against the full notes in the target language, check the chosen instance's terms, and obtain approval before saving/embedding. Never manually maintain a competing place database or overwrite canonical coordinates from an unreviewed edit. Existing route navigation remains authoritative for directions.

Local project checks cover unit tests, production build and browser tests for existing routes, guest guides, contextual recommendations and the booking form. The separate real-uMap check records viewport/popup bounds and layer import without a provider save in each locale's `browser-evidence.json`.

Sources: [uMap preloading documentation](https://discover.umap-project.org/support/advanced/), [project and public instances](https://umap-project.org/), [architecture](https://docs.umap-project.org/en/stable/dev/overview/).

Compact-popup visual reference: [map/place popup lookup](https://www.lazyweb.com/agentic-search/cc1fe3c7-ef5e-4315-88b5-cdac9cae496f). External examples inform the summary/link hierarchy, not a claim of measured conversion improvement.
