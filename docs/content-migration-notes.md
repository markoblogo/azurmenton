# Content Migration Notes

Azur Menton content remains in typed TypeScript modules for now. This keeps the site simple while booking flow, SEO and observability are hardened first.

## Current Boundary

- `src/content/` owns apartment, page, guide, event, legal and translation content.
- Route files should read content through exported helpers and typed objects, not duplicate localized copy when a shared content module already exists.
- UI components should receive resolved localized strings or typed content objects from routes where practical.
- `npm run content:lint` is the lightweight schema layer for guide, place and event content while the repository stays TypeScript-first.

## Future JSON Migration Path

1. Move stable localized dictionaries from ad hoc route constants into focused `src/content/` modules.
2. Add JSON schemas or TypeScript validation for each content family before moving content out of `.ts` files.
3. Migrate one content family at a time, starting with low-risk common translations.
4. Keep generated TypeScript types for JSON content so route code remains typechecked.

## CMS Decision Gate

Consider Contentful, Sanity or another CMS only when non-developers need frequent content edits without deployment. Until then, typed repository content has lower operational cost.
