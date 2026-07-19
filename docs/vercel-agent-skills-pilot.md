# Vercel Agent Skills Pilot

Date: 2026-07-19

## Scope

Read-only production-metric and source review using pinned local copies of:

- `vercel-optimize`;
- `vercel-react-best-practices`;
- `vercel-composition-patterns`.

The pilot used the linked Vercel project and a 14-day observability window. Raw metrics, project IDs, deployment IDs, costs, and generated investigation packets remain outside Git.

## Result

- The bounded six-candidate run produced one proposed code recommendation and six no-change or needs-more-evidence outcomes.
- `/[locale]/check-availability` looked cache-safe from source because its output depends on the locale path and module-owned content, while every supported locale is enumerated by the parent layout.
- Root verification rejected the proposed `revalidate = 86400`: `next build` still classified the route as `ƒ Dynamic`, so the one-line change did not establish prerendering and was removed before commit.
- Existing guide, event, and apartment pages showed cache/source evidence mismatches. No cache directives were added without deployed manifest and response-header proof.
- Bot/WAF changes were withheld because the available evidence did not support a staged, low-false-positive rule.
- React and composition review found no justified refactor. `GuideVisual` booleans represent independent image behavior rather than mutually exclusive component variants.

## Verification contract

1. `npm run typecheck` passed.
2. `npm run build` passed and generated 630 pages, but classified `/[locale]/check-availability` as dynamic.
3. Do not reopen the cache change until the dynamic boundary is explained by build manifests or deployed response-header evidence.
4. Treat build, deployment, and production cache proof as separate states.

## Provenance

Pilot source: `vercel-labs/agent-skills` at commit `f8a72b9603728bb92a217a879b7e62e43ad76c81`.
