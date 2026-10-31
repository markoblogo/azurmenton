# Native dependency maintenance

## Development glob matching

[GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249) affects minimatch below 11.0.1. The installed ESLint plugins still request its old callable API. A plain override to modern minimatch breaks that API, while the audit's force suggestion downgrades unrelated tooling.

`tools/minimatch-compat` is a private, development-only bridge: it exposes the upstream 11.0.3 function together with its named exports, without copying or altering the matching algorithm. The `minimatch-core` npm alias is the real, integrity-checked upstream package, not an advisory exclusion. The root override sends legacy consumers to this bridge; an explicit TypeScript ESTree override uses upstream 11.0.3 directly. Keep the local package in source control so clean installs can resolve it. No publishing/install scripts or runtime loader hooks are involved.

When upgrading ESLint and its plugins, inspect their actual import APIs, run `npm test -- tests/unit/minimatch-compat.test.ts`, lint and a clean install. Remove the bridge only when every consumer supports the patched modern API. Refresh the lock with npm 11 and check native metadata. `release:check` now enforces the full dependency audit at moderate severity; it always reruns and does not reuse an old audit receipt. A clean audit is time-specific, not proof against unpublished vulnerabilities.

The bridge supports the APIs used by the locked lint consumers, not every historical minimatch API. In particular, `makeRe()` returns a `.test()` facade backed by upstream `Minimatch.match()`, as used by `eslint-plugin-import/no-internal-modules`; it does not generate a RegExp or implement `.source`/`.exec()`. Keep this dependency out of application code. The regression test invokes the real rule to detect incompatible consumer changes.

## Production native bindings

Keep Sharp 0.35.5 as a production dependency: Next image optimization needs its optional native bindings after `npm ci --omit=dev`.

The lockfile was regenerated with npm 11.21.0 to preserve the published glibc/musl platform filters. All 48 published filters are restored without changing any existing locked package version. Use npm 11 when refreshing the lock, then run `node scripts/check-native-lockfile.mjs`; do not hand-edit integrity hashes or drop platform restrictions. The production-native CI job performs an actual resize/PNG conversion after an installation without development packages. The regular verify job checks native metadata too.

Yacht Show links keep the stable series slug, which now targets the confirmed 2027 occurrence (22–25 September). The 2026 edition remains archived with its dates intact. Official dates were checked on 2026-10-13 at https://www.monacoyachtshow.com/en/organise-your-stay. Existing guide, intent and apartment relationships are retained; no image is borrowed for the new occurrence. The events regression test verifies the archive, canonical target, dates and indexability. Broader pre-existing event-review findings are outside this dependency maintenance scope; this update resolves the Yacht Show target without fabricating dates for other events.
