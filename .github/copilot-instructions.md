# AI assistant guide for this repo

This repo is an Angular 20 standalone component library published as `@patter/ngx-components`. It is built with ng-packagr and depends on the external style package `@patter/patter-core-styles` for visuals.

## Architecture and patterns
- Library-only workspace. Source lives under `projects/patter/ngx-components/src/lib/**`; the entrypoint is `src/public-api.ts` which re-exports all public symbols.
- Standalone components and OnPush by default. The Angular schematics enforce `style: scss` and `changeDetection: OnPush` (see `angular.json`). No NgModules.
- Signals-first state. Components and services use Angular Signals (`signal`, `computed`) instead of RxJS for internal state. Example: `PtrButtonComponent` computes classes and link/disabled state via signals; `PtrLoadingService` exposes `isLoading()` and `isAnyLoading()` as Signals.
- Service-driven overlays. UI services create components dynamically and attach to `document.body` using `createComponent` and `ApplicationRef.attachView()` (see `PtrToasterService`). Dialogs follow a similar pattern under `src/lib/dialog/*`.
- CSS conventions. Selectors are prefixed `ptr-` and HostBinding commonly sets classes. Many classes align with WordPress block styles (e.g. `wp-block-button__link`, `is-style-outline`, etc.). Visuals assume `@patter/patter-core-styles` is installed in consumer apps.

## Key files
- `projects/patter/ngx-components/src/public-api.ts` — single entrypoint; export new symbols here.
- `projects/patter/ngx-components/src/lib/ptr-button/ptr-button.component.ts` — example standalone component using Signals + HostBinding.
- `projects/patter/ngx-components/src/lib/services/loading.service.ts` — global/named loading via Signals.
- `projects/patter/ngx-components/src/lib/ptr-toaster/ptr-toaster.service.ts` — dynamic overlay creation pattern.
- `projects/patter/ngx-components/ng-package.json` — ng-packagr config (dest and entry).
- `angular.json` — library target is `@patter/ngx-components` with build/test/lint configs.

## Build, test, lint, publish
- Build library:
  - Dev watch: `npm run watch` (maps to `ng build --watch --configuration development`).
  - Prod: `ng build @patter/ngx-components --configuration production`.
- Tests: `npm test` or `ng test @patter/ngx-components` (Karma, ChromeHeadless).
- Lint: `npm run lint` (Angular ESLint with project config at `projects/.../eslint.config.js`).
- Local consume: after a build, `npm link` from `dist/patter/ngx-components` (script: `npm run npm-link`). Alternatively `npm pack` and install the tarball in a sample app.
- Publish: build prod, then from `dist/patter/ngx-components` run `npm publish --access public` (see root `README.md`).

## Adding or modifying components/services
- Place components under `src/lib/<area>/<name>/<name>.component.{ts,html,scss}` with selector `ptr-...`. Use `ChangeDetectionStrategy.OnPush`, `standalone: true` with explicit `imports`.
- Prefer Angular Signals for component state: `signal(...)`, `computed(...)`. Emit outputs with `EventEmitter` only for external events (e.g., `clicked`).
- Use HostBinding for host classes. Example from `PtrButtonComponent`:
  - a HostBinding getter builds classes from signals (style, size, disabled).
  - link detection uses computed signals: `computed(() => !!href() || !!routerLink())`.
- Overlays/services: follow `PtrToasterService` pattern — lazy import component, `createComponent`, append to `document.body`, and `ApplicationRef.attachView()`; expose a signal store for component rendering.
- Public API: export any new public symbols from `src/public-api.ts`. If it’s not exported here, it won’t be in the package.

## Conventions to follow
- Naming: prefix selectors with `ptr-`; keep file/folder names kebab-case matching selector; service names prefixed `Ptr` in PascalCase (e.g., `PtrLoadingService`).
- Styling: rely on classes expected by `@patter/patter-core-styles`; expose inputs like `extraClasses` to allow composition when helpful.
- No inline styles: do not use inline CSS in templates. Prefer the component `.scss` file; use class-based styling, `:host`/`:host-context`, and HostBinding of classes when needed.
- Inputs/Outputs naming: boolean inputs commonly use `is*` (`isDisabled`, `isSmallSize`); string inputs use explicit names (`hrefLink`, `routerLinkValue`).
- Keep dependencies minimal; library peers are Angular `^20`. Avoid hard dependencies on app-only modules.
 - Accessibility: write HTML to be as accessible as possible. Prefer semantic elements; label form controls; use available inputs like `ariaLabel` on `PtrButtonComponent`. For overlays (dialogs, toasts, tooltips) that attach to `document.body`, ensure appropriate roles/ARIA and keyboard focus management following existing dialog/tooltip patterns.

## Integration expectations for consumers
- Consumer apps must install `@patter/patter-core-styles` and include its styles for correct visuals.
- All components are standalone; import them directly in routes/components. Services are `providedIn: 'root'` unless intentionally component-scoped.

Questions or gaps? If you need clarity on a workflow or a pattern isn’t obvious, list the file you’re looking at and what’s unclear, and we’ll iterate on this guide.
