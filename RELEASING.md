# Releasing

`formzk` uses [Nx Release](https://nx.dev/features/manage-releases) with **independent per-package lanes**. `@formzk/core` and `@formzk/mui` version, tag, and publish separately.

## TL;DR

- Merge a `fix(...)` commit → the matching package gets a **patch** bump.
- Merge a `feat(...)` commit → the matching package gets a **minor** bump.
- Merge a commit with `BREAKING CHANGE:` in the body → **major** bump.
- Release workflows run on `push` to `main` and publish automatically if the path filter matches.

## Commit scopes

Conventional Commit scope controls which package picks up the change:

| Scope      | Affects                |
| ---------- | ---------------------- |
| `core`     | `@formzk/core`         |
| `mui`      | `@formzk/mui`          |
| (no scope) | counted against both   |

Examples:

```
feat(core): add useFormzkController hook
fix(mui): correct GridRenderView spacing
chore(deps): bump lodash
```

## Automatic release (recommended)

Pushing to `main` triggers the matching workflow:

- `.github/workflows/release-core.yml` — path filter: `libs/core/**`
- `.github/workflows/release-mui.yml` — path filter: `libs/mui/**` _or_ `libs/core/**` (since `@formzk/mui` depends on core)

Each workflow:

1. Installs dependencies.
2. Runs `nx release --projects=<pkg> --skip-publish` — bumps version in the lib's `package.json`, generates `libs/<pkg>/CHANGELOG.md`, creates a commit, creates a `<pkg>@<version>` git tag.
3. Pushes the commit + tag back to `main`.
4. Builds the lib into `dist/libs/<pkg>`.
5. Runs `nx release publish --projects=<pkg>` to publish to npm.

### Required secrets

- `NPM_TOKEN` — npm automation token with **publish** permission on `@formzk` scope.
- `CODECOV_TOKEN` — optional, used by `ci.yml`.

## Manual release

### Dry-run locally

```sh
yarn release:dry
```

Previews what `nx release` would bump, write to changelogs, and tag — no files are modified.

### Release from local

```sh
# version + changelog + commit + tag (all packages that have changes)
yarn release

# build + publish
yarn build:libs
yarn release:publish
```

### Release a single package

```sh
npx nx release --projects=core
npx nx release publish --projects=core
```

## First release of a new package

Set up `@jscutlery/semver` is no longer used — the first release of a brand-new adapter (e.g. `@formzk/tamagui`) needs the `--first-release` flag so Nx doesn't look for a prior tag:

```sh
npx nx release --projects=tamagui --first-release
```

Subsequent releases drop the flag.

## How versions are resolved

`nx.json > release` is configured with:

- `projectsRelationship: "independent"` — each package versions separately.
- `releaseTagPattern: "{projectName}@{version}"` — tags look like `core@1.0.4`.
- `version.conventionalCommits: true` — commit types map to semver bumps.
- `version.generatorOptions.fallbackCurrentVersionResolver: "disk"` — falls back to the `version` field in `package.json` when no matching tag exists.
- `changelog.projectChangelogs: true` — every lib gets its own `CHANGELOG.md`.
- `changelog.workspaceChangelog: false` — no root changelog is generated.
- `changelog.automaticFromRef: true` — on the first run in a fresh clone, the changelog is built from the first commit.

## Rolling back a bad release

`nx release` does not unpublish. If a release is broken:

1. **Within 72h of publish**: `npm unpublish @formzk/<pkg>@<version>` (npm policy).
2. **After 72h**: `npm deprecate @formzk/<pkg>@<version> "reason"`.
3. Cut a new patch release with the fix.
4. Delete the local + remote tag: `git tag -d core@<version> && git push origin :refs/tags/core@<version>`.
