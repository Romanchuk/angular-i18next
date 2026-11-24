# PROJECT_CONTEXT

Quick context for humans and AI agents. Workflow traps and command caveats: `AGENTS.md`.

## What this is

`angular-i18next` — Angular integration library for i18next: translation pipes, a service
wrapper, configurable error-handling strategies, namespace/scope providers, a lazy-namespace
route guard, document-title localization, SSR support, `@angular/forms` validation messages
and test mocks. MIT. Docs: `README.md` (single source of truth).
Demo: https://angular-i18next.onrender.com.

## Structure (brief)

Nx workspace (npm, default base `master`), two projects:

```
libs/angular-i18next/          # THE npm package "angular-i18next"
  src/lib/                     # implementation: module.ts + provider.ts (provideI18Next / with*()),
                               #   pipes/ (i18next, i18nextCap, i18nextFormat, i18nextEager),
                               #   services/ (I18NextService, ITranslationService, I18NextTitle),
                               #   tokens.ts, namespaces.guard.ts, namespace.resolver.ts,
                               #   I18NextErrorHandlingStrategies.ts, interpolation.ts
  forms/  ssr/  testing/       # secondary entry points (ng-packagr sub-packages)
  src/tests/                   # unit tests + projectTests (consumer examples)
apps/angular-i18next-demo/     # demo app (CSR + SSR)
```

## Non-obvious facts about the structure

- **Two `package.json` files play different roles.** The root one (`angular-i18next-rep`,
  version `0.0.1`) is workspace-only. The published package is
  `libs/angular-i18next/package.json` — version, dependencies and `postinstall.js` live there.
- **Secondary entry points are not separate Nx projects.** `forms/`, `ssr/`, `testing/` have no
  `project.json` or tests of their own; they are ng-packagr sub-packages built by the single
  `angular-i18next` build and routed via `paths` in `tsconfig.base.json`.
- **Tests don't need a build.** They import the lib by relative paths (`../../lib`,
  `../../testing/src/public_api`), not by package name — running tests never requires `dist/`.
- **Two different `dist/` folders.** Root `dist/` = demo app build
  (`dist/angular-i18next-demo/browser`, deployed to GitHub Pages). `libs/angular-i18next/dist/`
  = the publishable package (what `np` publishes).
- **`nx run angular-i18next:release` resolves although `project.json` has no `release` target**:
  Nx exposes the lib's `package.json` scripts as targets. Release = `np` from the lib, and the
  `npm version` hook regenerates `CHANGELOG.md` (`conventional-changelog -p angular`) and commits it.
- **`src/tests/projectTests`** is consumer-facing example code ("In-project testing" in README) —
  part of the test suite, must stay compiling.
- **The demo app doubles as the documentation site**: GitHub Pages, redeployed on every push to `master`.
- `README_DEPRECATED.md` is archived v2 documentation, kept for history only.
- `postinstall.js` ships inside the npm package (prints a banner) — don't delete it casually.

## Compatibility

- Library major = Angular major (21.x now); i18next >= 25.4; Node >= 22.13.
- AOT- and zoneless-compatible; SSR via `angular-i18next/ssr` (`i18next-http-middleware` in demo `server.ts`).
