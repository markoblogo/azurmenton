# Local TokenEconomizer Setup

TokenEconomizer is an optional local Codex plugin, not a website dependency.
It does not change Next.js, booking behaviour, CI or public content.

## Installed Baseline

- Upstream: <https://github.com/microsoft/TokenEconomizer>
- Source commit: `ced014b468083139f4c1baf193cc0b176c1cc652`.
- Plugin version: `0.1.0`, Apache-2.0, Python standard library only.
- A self-contained marketplace bundle lives in
  `.local-tools/token-economizer/marketplace`, excluded from Git.
- Codex installs its own copy in its user plugin cache. No npm dependency added.
- Local bundles are excluded from Git, ESLint and TypeScript site checks.
- Local check: Codex `0.166.0-alpha.5.1`, Python `3.14.5`.
  Upstream documents tested Codex versions through `0.164.0`; this newer alpha
  still needs a real-session compatibility check.

## Scope And Cost Controls

The plugin is registered in this Codex installation, but its runtime is disabled
globally and enabled only for the Azur Menton repository identity. Settings live
in private `~/.tokeneconomizer` state, not in Git or the website.

Azur Menton settings:

- `enabled=on`: this repository only, including its other clones/worktrees.
- `microskills=envfacts`: learn only from repeated technical failures; no model proposer.
- `toolprune=propose`: propose unused capability removals; never apply automatically.
- `loopguard=off`: no background model judge or redirect calls.
- `repomap=off`: no additional map generation.

This setup adds no TokenEconomizer model calls. Normal Codex work still uses its
usual plan. Savings have not been measured and are not promised.
Do not run `probe`, enable model-backed mechanisms or apply tool pruning without
review. Do not edit Codex security/trust approvals to bypass a prompt.

## Activate And Inspect

Start a new Codex session in this repository. If Codex requests hook approval,
review the TokenEconomizer hooks; the upstream CLI instructions use `/hooks`.
Hooks do not retroactively attach to the session that installed/approved them.
Desktop activation and actual cross-session learning remain unverified until
a fresh session reports that the plugin loaded.

In Codex, use `$tokeneconomizer:status`. The installed local CLI can also inspect
state without an extra agent turn:

```bash
~/.codex/plugins/cache/tokeneconomizer/tokeneconomizer/0.1.0/scripts/te --host codex status
~/.codex/plugins/cache/tokeneconomizer/tokeneconomizer/0.1.0/scripts/te --host codex config show
~/.codex/plugins/cache/tokeneconomizer/tokeneconomizer/0.1.0/scripts/te --host codex doctor
```

Run these inside the repository. To disable only here, use the same CLI with
`config set enabled=off`. Do not remove shared plugin/state files used elsewhere.

## Maintenance

The installed bundle is self-contained. Keep the local marketplace for updates;
review upstream changes, rebuild with `scripts/build_plugin.py`, then reinstall
with `codex plugin add tokeneconomizer@tokeneconomizer`. Do not update blindly.
Never commit plugin caches, learned facts, session traces or user config.

Setup checks: local installed-plugin listing, CLI diagnostics, scoped settings,
and 22 upstream configuration/CLI tests passed; two CLI-specific tests skipped.
These are installation checks, not proof of hook activation or lower usage.
