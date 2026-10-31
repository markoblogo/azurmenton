# Deployment Runbook

Production: [azurmenton.com](https://azurmenton.com), Vercel project `azurmenton`, repository [markoblogo/azurmenton](https://github.com/markoblogo/azurmenton). DNS is managed in Cloudflare. Existing infrastructure does not need to be recreated for a release.

## Normal Release

1. Follow the [release checklist](LAUNCH_CHECKLIST.md) and run `npm run release:check`.
2. Commit reviewed source and generated image derivatives; keep local packets, build output, secrets and browser evidence untracked.
3. Prefer a branch/PR and green required CI. After the approved merge, record the exact final commit.
4. Vercel builds `npm run build` using the Next.js preset and default output. Pagefind is generated during the build; there is no separate production content store.
5. Confirm the Production deployment and domain behavior match the final commit. Check changed routes on desktop/mobile and all affected locales.
6. Only then create the release tag/notes. If deployment fails, do not call the release live.

Local fallback: `npm run release:check -- --webpack`. Browser tests start the production server on port 3100 and never reuse an unrelated existing server.

## Configuration

[.env.example](.env.example) is the key inventory; [email operations](docs/booking-email-operations.md) documents delivery and alerts. Production values belong in closed Vercel variables, never in public reports, screenshots or Git.

- `NEXT_PUBLIC_SITE_URL` is the canonical public origin. `NEXT_PUBLIC_*` values are public, never secret.
- Booking mail needs `RESEND_API_KEY`, a valid `BOOKING_REQUEST_TO_EMAIL` and a verified `BOOKING_REQUEST_FROM_EMAIL` sender.
- `BOOKING_REQUEST_BCC_EMAIL` overrides the owner-approved operational copy. **Unset or blank retains the application default; it does not disable the copy.** See `src/lib/resend.ts` and its regression tests.
- `EDITORIAL_TO_EMAIL` optionally selects the editorial inbox; otherwise it uses the booking recipient. This handles manually moderated submissions, not automatic content publication.
- Calendar feed variables are server-only; never expose feed URLs, guest names or booking notes. Missing provider configuration must not imply free dates.
- Plausible public script configuration is distinct from local-only read-only Stats API credentials. Reports are not proof of revenue attribution.
- Weather has Menton defaults; provider failures remain unavailable/stale states, not fabricated current readings.
- Telegram configuration and delivery verification remain a separate deferred task. Do not send messages as part of a routine release.

Saving environment variables does not update an existing deployment. Verify a newly built deployment after an approved configuration change.

## Infrastructure Changes Are Separate

Domain connection, DNS, mail authentication, credentials and provider integrations need explicit authorization. If needed, follow the values currently shown by the provider, preserve MX/email records and test apex/`www` redirects and TLS. Do not copy old DNS values from a historical report or change Cloudflare proxy settings as routine cleanup.

## Post-Deployment Evidence

Record Git SHA, CI run, Vercel deployment and public route checks separately. Test homepage, apartments, guide/event entrypoints, `/sitemap.xml`, `/robots.txt`, `/llms.txt` and changed localizations. Do not submit real bookings or contact forms without a separately approved delivery test. A rollback must also be owner-authorized and verified; never move an existing release tag to conceal a failed deployment.
