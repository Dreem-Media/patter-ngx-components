# @patter/ngx-components

Angular component library for Patter applications. Consumer applications must also install `@patter/patter-core-styles`.

The package requires `@angular/common`, `@angular/core`, `@angular/forms`, and `@angular/router` v22, plus RxJS 6.5.3 or 7.4 and later.

## Development

Build the library:

```sh
ng build @patter/ngx-components
```

Run its unit tests with Vitest:

```sh
ng test @patter/ngx-components
```

Run the tests once, without watch mode:

```sh
ng test @patter/ngx-components --watch=false
```

Generate library components and directives with the library project name:

```sh
ng generate component my-component --project @patter/ngx-components
ng generate directive my-directive --project @patter/ngx-components
```

## Publishing

Build the production package and publish it from the generated package directory:

```sh
ng build @patter/ngx-components --configuration production
cd dist/patter/ngx-components
npm publish --access public
```
