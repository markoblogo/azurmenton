<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Guide content linking

When adding or changing a guide article, place/location object, event, or apartment-facing local recommendation, audit the nearby content graph before finishing:

- add existing relevant places to the new article;
- add newly created places to older articles where they are genuinely useful;
- update `relatedPlaces`, section-level `relatedPlaceIds`, and place `relatedArticleIds` together when the relationship is editorially natural;
- avoid adding location cards only for volume or SEO if the place is not mentioned or useful in that section.

Use `docs/content-operations.md` as the detailed checklist for guide, place, event, image, internal linking and preflight work.

## Product context and recurring reviews

Read `docs/product-context.md` before changing public positioning, conversion copy, SEO/schema, booking analytics, or recurring content reviews. It is a claim-boundary reference, not permission to publish, change bookings, or send marketing automatically. Keep recurring work report-only or proposal-first until an explicit human approval gate exists.

## Optional design-language contract (NameThatUI)

- For guide UI blocks, component-callout sections, and frontend-facing copy, use canonical component terminology (e.g., card, pill/chip, modal, tooltip, breadcrumb, segmented control) before inventing local shorthand.
- Prefer element-level anatomy in descriptions: wrapper, heading, body, controls, actions, and support copy.
- If ambiguity remains, resolve naming via NameThatUI-style reference before standardizing new local labels.
- Optional only: apply when naming quality materially affects UX consistency, reuse, or handoff quality.
