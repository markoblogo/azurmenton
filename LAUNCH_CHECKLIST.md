# Release Checklist

Reusable per release. Old launch checkmarks are not evidence for the current commit. Infrastructure is already deployed; do not recreate Vercel, change DNS, rotate credentials or send test bookings as routine release work.

## Prepare

- [ ] Confirm scope, branch and understood working-tree changes; preserve unrelated work and original content sources.
- [ ] Update version and lockfile, changelog and affected runbooks. Never move an existing release tag.
- [ ] Run `npm run release:check` (optional `-- --webpack` locally). Review `build/release/checks.json` and logs; failed or stale checks are not a pass.
- [ ] Review content/event reports. Separate editorial backlog and intentionally missing images from broken references or unsafe public behavior.
- [ ] Review full dependency audit as well as the production high/critical gate; document unresolved development advisories instead of using a destructive force upgrade.

## Publish

- [ ] Use a reviewed branch/PR where supported; required CI must pass on its current head. Do not bypass failed checks or use administrator merge overrides.
- [ ] Verify CI for the final production commit, not only a previous branch commit.
- [ ] Verify Vercel Production succeeded for that exact commit and that the domain serves the changed content.
- [ ] Check representative EN/FR/IT/UK routes, mobile width, images, canonical/hreflang and browser errors. Check changed interactions without sending real requests.
- [ ] Create the version tag and GitHub release at the verified production commit; include changes, checks and known limits. A GitHub release is not an npm publication.

## Keep Separate

- Real email inbox delivery, provider dashboards, analytics access and DNS authentication need independent evidence and authorization. A successful form response is not proof of inbox delivery.
- Calendar previews are read-only; no bookings or external availability are modified during release checks.
- Editorial approvals, factual verification, native-language review, media rights and owner visual acceptance are not implied by automated tests.
- Telegram remains deferred. Subscription interest is email intake only, not an enabled mailing list.
- Retain source documents until publication is verified; archive only under the owner's agreed procedure. Never delete original illustrations or evidence to make Git status look clean.
