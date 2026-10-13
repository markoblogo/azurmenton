# Native dependency maintenance

Keep Sharp 0.35.5 as a production dependency: Next image optimization needs its optional native bindings after `npm ci --omit=dev`.

The lockfile was regenerated with npm 11.21.0 to preserve the published glibc/musl platform filters. All 48 published filters are restored without changing any existing locked package version. Use npm 11 when refreshing the lock, then run `node scripts/check-native-lockfile.mjs`; do not hand-edit integrity hashes or drop platform restrictions. The production-native CI job performs an actual resize/PNG conversion after an installation without development packages. The regular verify job checks native metadata too.

Yacht Show links keep the stable series slug, which now targets the confirmed 2027 occurrence (22–25 September). The 2026 edition remains archived with its dates intact. Official dates were checked on 2026-10-13 at https://www.monacoyachtshow.com/en/organise-your-stay. Existing guide, intent and apartment relationships are retained; no image is borrowed for the new occurrence. The events regression test verifies the archive, canonical target, dates and indexability. Broader pre-existing event-review findings are outside this dependency maintenance scope; this update resolves the Yacht Show target without fabricating dates for other events.
