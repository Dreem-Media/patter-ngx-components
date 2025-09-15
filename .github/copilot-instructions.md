You are an expert in TypeScript, Angular, and scalable web application development. You write maintainable, performant, and accessible code following Angular and TypeScript best practices.

## Architecture and patterns
- Library-only workspace. Source lives under `projects/patter/ngx-components/src/lib/**`; the entrypoint is `src/public-api.ts` which re-exports all public symbols.
- Standalone components and OnPush by default. The Angular schematics enforce `style: scss` and `changeDetection: OnPush` (see `angular.json`). No NgModules.
- Signals-first state. Components and services use Angular Signals (`signal`, `computed`) instead of RxJS for internal state. Example: `PtrButtonComponent` computes classes and link/disabled state via signals; `PtrLoadingService` exposes `isLoading()` and `isAnyLoading()` as Signals.
- Service-driven overlays. UI services create components dynamically and attach to `document.body` using `createComponent` and `ApplicationRef.attachView()` (see `PtrToasterService`). Dialogs follow a similar pattern under `src/lib/dialog/*`.
- CSS conventions. Selectors are prefixed `ptr-`. Many classes align with WordPress block styles (e.g. `wp-block-button__link`, `is-style-outline`, etc.). Visuals assume `@patter/patter-core-styles` is installed in consumer apps.

## Conventions to follow
- Naming: prefix selectors with `ptr-`; keep file/folder names kebab-case matching selector; service names prefixed `Ptr` in PascalCase (e.g., `PtrLoadingService`).
- Styling: rely on classes expected by `@patter/patter-core-styles`; expose inputs like `extraClasses` to allow composition when helpful.
- No inline styles: do not use inline CSS in templates. Prefer the component `.scss` file; use class-based styling, `:host`/`:host-context`, and HostBinding of classes when needed.
- Inputs/Outputs naming: boolean inputs commonly use `is*` (`isDisabled`, `isSmallSize`); string inputs use explicit names (`hrefLink`, `routerLinkValue`).
- Keep dependencies minimal; library peers are Angular `^20`. Avoid hard dependencies on app-only modules.
 - Accessibility: write HTML to be as accessible as possible. Prefer semantic elements; label form controls; use available inputs like `ariaLabel` on `PtrButtonComponent`. For overlays (dialogs, toasts, tooltips) that attach to `document.body`, ensure appropriate roles/ARIA and keyboard focus management following existing dialog/tooltip patterns.

Questions or gaps? If you need clarity on a workflow or a pattern isn’t obvious, list the file you’re looking at and what’s unclear, and we’ll iterate on this guide.

## TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

## Angular Best Practices

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

## Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
- Prefer inline templates for small components
- Do NOT generate a component stylesheet file; all components must use `inlineStyle` with styles consolidated in the global `src/styles.scss`
- Any component-specific styling should use BEM-ish naming or host/contextual classes defined in the global stylesheet
- Prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead

## State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead

## Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables

## Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Use the `inject()` function instead of constructor injection
