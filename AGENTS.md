# AGENTS.md

Notes for AI coding agents. Project structure and its non-obvious facts: `PROJECT_CONTEXT.md` — here only workflow traps.

## Commands that don't do what they seem

- `npm run build` builds the **demo app**, not the library. Build the publishable package
  with `npx nx build angular-i18next` (output: `libs/angular-i18next/dist`).
- `npm test` runs **library tests only** (`nx test angular-i18next`); tests need no prior build.
- The root `package.json` is workspace-only. Version and dependencies of the published package
  live in `libs/angular-i18next/package.json`.

## Standards & approaches (Angular & architecture)

How the maintainer actually writes this library — follow for new code:

- **Standalone-first, feature-function API.** New library capability is exposed as a `with*()`
  feature built with `makeI18NextFeature` + a new `I18NextFeatureKind` member (mirrors Angular's
  own `ɵkind`/`ɵproviders` pattern) — never by growing `I18NextModule`, which stays a deprecated
  back-compat shim: don't extend it, don't delete it.
- **Token-first DI.** Everything is provided through typed `InjectionToken`s in
  `src/lib/tokens.ts` (SCREAMING_SNAKE_CASE, `I18NEXT_` prefix); consumers depend on tokens, not
  classes — mock/SSR implementations are swapped purely via providers (`withMock`, `withSSR`).
- **Injection style split**: functions (guards, factories, initializers) use `inject()`;
  injectable classes use constructor `@Inject(TOKEN)` decorators (`@Optional()` where the global
  i18next instance fallback applies). Newest UI code (the `forms` entry point) uses
  field-initializer `inject()`/`input()` instead.
- **Class-based pipes — intentionally.** `@Injectable() @Pipe({ name, standalone: true })`,
  registered as providers in `provideI18Next` so they are injectable; variants are subclasses
  with `override` (e.g. `I18NextCapPipe extends I18NextPipe`). Don't convert to functional pipes.
- **Service layer.** `I18NextService` is a thin delegating facade over the i18next instance
  (`.call(this.i18next, …)` on every call); the contract `ITranslationService` narrows i18next's
  own type (`Modify<Partial<i18n.i18n>, …>`), not a hand-written interface. Events stay RxJS:
  `BehaviorSubject` for stateful, `Subject` for transient — don't replace the public event API with signals.
- **Signals in new UI code only** (`signal`, `computed`, `effect`, `input()` — template:
  `forms/src/components/validation-message.component.ts`), with `takeUntilDestroyed`/`DestroyRef`
  when bridging RxJS in pipes/components.
- **Functional guards/resolvers**: arrow factories that `inject()` inside the returned closure
  (`namespaces.guard.ts` is the template); per-route scoping by overriding
  `I18NEXT_NAMESPACE`/`I18NEXT_SCOPE` in route `providers` + `i18NextNamespacesGuard('ns')`.
- **Bootstrap**: `provideAppInitializer(() => { const i18next = inject(I18NEXT_SERVICE); … })` —
  never the legacy `APP_INITIALIZER`.
- **Zoneless + AOT compatibility**: no NgZone usage; `provideZonelessChangeDetection()` in the
  demo, `setupZonelessTestEnv()` in tests; `compilationMode: "partial"` and `strictTemplates`/
  `strictInjectionParameters` must not be weakened.
- **Naming**: public symbols prefixed `I18Next`; tokens `I18NEXT_*`; files kebab-case with
  Angular suffixes inside folders (`pipes/i18next-cap.pipe.ts`, `services/translation.service.ts`),
  PascalCase type-grouping files at lib root (`I18NextEvents.ts`); secondary entry points keep
  `src/public_api.ts`; write `standalone: true` explicitly in decorators.
- **TypeScript strict**: `override` keyword always (`noImplicitOverride`); `private readonly` for
  held deps; `type`-only imports for i18next types; `any` acceptable only at i18next/Express
  integration boundaries.
- **Testing**: specs live in `src/tests/<area>/*.spec.ts` and import the lib by **relative path**;
  use `MOCK_I18N_PROVIDERS` from `src/tests/setup.ts`, `TestBed.overrideProvider` for token
  variants, and await `TestBed.inject(ApplicationInitStatus).donePromise` before init-dependent
  assertions; mocks are `@Injectable()` classes implementing `ITranslationService` with `jest.fn()`
  members (see `MockI18NextService`), not partial spies.
- **Formatting is deliberately light**: Prettier `singleQuote` + `.editorconfig` 2-space indent is
  all there is; don't reformat unrelated files, don't add lint rules — compilers carry correctness.

## Landmines

- Library major version tracks the **Angular major** (22.x → Angular 22). Prereleases end with
  `-0` (e.g. `21.0.1-0`). When upgrading Angular: bump root `devDependencies` and lib
  `peerDependencies`/`optionalDependencies` **together** (and check root `optionalDependencies`
  for stale `@nx/nx-*` platform pins).
- The lib `CHANGELOG.md` is generated from commit messages (`conventional-changelog -p angular`)
  and releases go through `np` → library commits must follow **Conventional Commits** (`feat:`,
  `fix:` …). Demo-app commits are exempt.
- `package-lock.json` is generated with **npm 11**: `npm ci` is strict about lock sync and the
  npm 10 bundled with Node 22 rejects an npm 11 lock. After changing dependencies (or pulling an
  updated lockfile) run `npm install` first to refresh the lock, then `npm ci`. CI pins npm 11 in
  `.github/workflows/static.yml`.
- Every push to `master` runs CI that runs tests + demo build and **deploys the demo to GitHub
  Pages** (`.github/workflows/static.yml`). Keep master green.
- New public exports go into the matching entry point: `libs/angular-i18next/src/lib/index.ts`
  (main) or `<submodule>/src/public_api.ts` for `forms/`, `ssr/`, `testing/`.
- `README.md` is the only current documentation (`README_DEPRECATED.md` is legacy v2 docs).
  Changes to public API/usage must be reflected in README.
- Keep new code AOT-compatible and zoneless-compatible (the library advertises both).

## Environment

- Windows dev machine: `npm.ps1`/`npx.ps1` may be blocked by the PowerShell execution policy —
  use `npm.cmd ...` / `npx.cmd ...`, or run nx directly:
  `node node_modules/nx/dist/bin/nx.js ...` (Nx 23+; before Nx 23 it was `node_modules/nx/bin/nx.js`).
