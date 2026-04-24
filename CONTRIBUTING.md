# Contributing to formzk

Thanks for contributing! `formzk` is an Nx monorepo of React form libraries: a headless core (`@formzk/core`) and UI adapters (`@formzk/mui`, future `@formzk/tamagui`, etc.).

## Prerequisites

- Node.js **>= 20**
- Yarn **1.x** (Classic) — the repo pins `yarn.lock` v1

## Getting started

```sh
git clone https://github.com/louiskhenghao/formzk.git
cd formzk
yarn install
```

## Dev scripts

| Script                   | What it does                                    |
| ------------------------ | ----------------------------------------------- |
| `yarn example:dev`       | Run the Next.js example app on `:3333`          |
| `yarn build:libs`        | Build `@formzk/core` + `@formzk/mui` via rollup |
| `yarn example:build`     | Production build of the Next example            |
| `yarn lint`              | Run ESLint across all projects                  |
| `yarn format`            | Run Prettier on the whole repo                  |
| `yarn release:dry`       | Preview the next `nx release` without writing   |

## Repository layout

```
apps/
  example/          Next.js 16 example app — integration playground for the libs
libs/
  core/             @formzk/core — headless react-hook-form wrapper
  mui/              @formzk/mui — Material UI adapter on top of core
```

## Commit convention

We use [Conventional Commits](https://www.conventionalcommits.org/) — the commit message drives version bumps in CI. **The scope must match a package name** for per-package releases to work:

```
<type>(<scope>): <summary>

<body (optional)>

BREAKING CHANGE: <detail> (optional — forces a major bump)
```

Types that trigger version bumps:

| Type    | Bump  |
| ------- | ----- |
| `feat`  | minor |
| `fix`   | patch |
| `perf`  | patch |

Types that do **not** bump: `chore`, `docs`, `style`, `refactor`, `test`, `build`, `ci`.

Valid scopes: `core`, `mui`. For changes that span packages use `*` or omit the scope — the release pipeline will treat it as affecting all configured projects.

Examples:

```
feat(core): add resetField helper to FormzkFormRef
fix(mui): GridRenderView crashes when items are empty
chore(deps): bump react-hook-form to 7.74
```

## Pull requests

1. Branch from `main`: `git checkout -b feat/short-description`.
2. Keep PRs small and focused — one logical change per PR makes review + bisect easy.
3. Make sure `yarn build:libs` and `yarn example:build` pass locally before pushing.
4. Use the PR template; link any related issues.
5. Don't bump versions manually — CI does this via `nx release` on merge.

## Adding a new adapter package

To add a new adapter (e.g. `@formzk/tamagui`):

1. `npx nx g @nx/js:library tamagui --directory=libs/tamagui --publishable --importPath=@formzk/tamagui`
2. Depend on `@formzk/core`: mark it as `external` in the lib's rollup config.
3. Set `libs/tamagui/package.json` → `"version": "0.1.0"`, `"license": "MIT"`, etc. (copy shape from `libs/mui/package.json`).
4. Add the project name to `nx.json` → `release.projects`:
   ```json
   "projects": ["core", "mui", "tamagui"]
   ```
5. Add a `nx-release-publish` target to `libs/tamagui/project.json` pointing at `dist/libs/tamagui`.
6. Add a `release-tamagui.yml` workflow (copy `release-mui.yml`, swap scope).
7. Open a PR titled `feat(tamagui): initial @formzk/tamagui package`. After merge, run `npx nx release --projects=tamagui --first-release` once locally or via `workflow_dispatch`.

## Code style

- TypeScript strict-lite (`noImplicitAny: false`, `strict: true`).
- Imports sorted via `eslint-plugin-simple-import-sort`.
- Prefer named exports; default export only when the module has one natural export.
- Avoid introducing new runtime dependencies to `@formzk/core` — it must stay UI-agnostic.

## Reporting issues

- Bug: open an issue with a minimal repro (CodeSandbox / StackBlitz preferred).
- Feature request: describe the use case first, API proposal second.

## Code of conduct

See [`CODE_OF_CONDUCT.md`](./CODE_OF_CONDUCT.md).
