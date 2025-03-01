[![npm version](https://badge.fury.io/js/angular-i18next.svg)](https://badge.fury.io/js/angular-i18next)
[![Downloads](http://img.shields.io/npm/dm/angular-i18next.svg)](https://npmjs.org/package/angular-i18next)
[![Build Status](https://travis-ci.com/Romanchuk/angular-i18next.svg?branch=master)](https://travis-ci.com/Romanchuk/angular-i18next)
[![Coverage Status](https://coveralls.io/repos/github/Romanchuk/angular-i18next/badge.svg?branch=master)](https://coveralls.io/github/Romanchuk/angular-i18next?branch=master)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![paypal](https://img.shields.io/badge/say_thanks-%2410-green)](https://www.paypal.com/paypalme2/sergeyromanchuk/10USD)
[![GitHub stars](https://img.shields.io/github/stars/romanchuk/angular-i18next?label=Please%20star%20repo%21&style=social)](https://github.com/romanchuk/angular-i18next)

# angular-i18next

!!! NEW beta release `19.1.0-beta` with angular 19 codestyle

Best [i18next](http://i18next.com/) integration with [angular](https://angular.io/)

[Live DEMO](https://romanchuk.github.io/angular-i18next/)

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Cookbook](#cookbook)
- [In-project testing](#in-project-testing)
- [Demo](#demo)
- [Articles](#articles)
- [Support project](#cheers)
- [DEPRECATED DOCS](./README_DEPRECATED.md)

# Features

- Native i18next [options](https://www.i18next.com/configuration-options.html)
- Promise initialization
- [i18next plugin](https://www.i18next.com/plugins-and-utils.html#plugins) support
- Events support
- Namespaces lazy load
- i18next native [format](https://www.i18next.com/api.html#format) support
- document.title localization
- Error handling strategies
- i18next namespaces and scopes (prefixes) for angular modules and components
- AOT support
- SSR support
- Providers for unit testing
- Angular Package Format support
- Zoneless compatible

# Cheers

Star this project

Hey dude! Help me out for a couple of :beers:!

Поддержи проект - угости автора кружечкой пива!

[![paypal](https://img.shields.io/badge/paypal-%2410-green)](https://www.paypal.com/paypalme2/sergeyromanchuk/10USD)

## Available Submodules (optional)

- **`angular-i18next/ssr`**: Adds Server Side Rendering support.
- **`angular-i18next/forms`**: Provides localization for `@angular/forms`.
- **`angular-i18next/testing`**: Offers features for testing.

# Installation

**1.** Install package

   ```bash
    npm install i18next --save
    npm install angular-i18next --save
  ```

**2.** Initialize i18next before angular application and provide

Angular would not load until i18next initialize event fired

```typescript
export function appInit(i18next: ITranslationService) {
    return () => i18next.init();
}
```

```typescript
  providers: [
    provideAppInitializer(appInit()),
    provideI18Next(
      withCustomErrorHandlingStrategy(StrictErrorHandlingStrategy)
    )
  ] 
```

# Usage

## Pipes

Use "i18next" pipe to translate key:

```html
  <div>{{ 'test' | i18next }}</div>
```

Passing ["t options"](https://www.i18next.com/api.html#t):

```html
    <div>{{ 'test' | i18next: { count: 5, nsSeparator: '#' } }}</div>
```

Trigger native i18next [format method](https://www.i18next.com/formatting.html) by using I18NextFormatPipe or I18NextPipe with option 'format':

`{{ 'any_key' | i18next | i18nextFormat }}`

`{{ 'any_key' | i18next: { format: 'cap' } }}`

`{{ 'any_key' | i18nextCap }}`

**Note:** Using "i18nextCap" you will get the same result as  `i18next: { format: 'cap' }`

**REMEMBER** that format will not work until you set "interpolation.format" function in i18next options.

`angular-i81next` has static method `static interpolationFormat(customFormat: Function = null): Function` that can be used as default interpolation format function (it provides 'upper', 'cap' and 'lower' formatters). You also can pass your custom function to be called after library formatters:

```typescript
import { defaultInterpolationFormat, interpolationFormat } from "angular-i18next";


const i18nextOptions = {
  supportedLngs: ['en', 'ru'],
  ns: [
    'translation',
    'validation',
    'error',
  ],
  interpolation: {
    format: interpolationFormat((value, format, lng) => {
      // extend interpolation format
      if(value instanceof Date)
        return moment(value).format(format);
      return value;
    });
    // format: interpolationFormat(defaultInterpolationFormat)
  }
};

```

**i18nextEager pipe**

This is the impure analog of *i18next pipe* that is subscribed to language change, it will change string right away to choosen language (without reloading page).

**Warning!**: Use i18nextEager only in combine with [OnPush change detection strategy](https://netbasal.com/a-comprehensive-guide-to-angular-onpush-change-detection-strategy-5bac493074a4), or else (default change detection) each pipe will retrigger more than one time (cause of performance issues).

Subscribing to event observables:

```typescript
this.i18NextService.events.languageChanged.subscribe(lang => {
  // do something
})
```

Add a provider to module/component if you want to prefix child i18next keys:

```typescript
{
  provide: I18NEXT_NAMESPACE,
  useValue: 'feature' // set 'feature:' prefix 
}
```

```typescript
{
  provide: I18NEXT_SCOPE,
  useValue: 'person' // set 'person.' prefix 
}
```

Since v3.1.0+ it is possible to pass array of namespaces (or scopes). [Key would fallback](https://www.i18next.com/api.html#t) to next namespace in array if the previous failed to resolve.

`[feature_validators:key, validators:key]`

```typescript
{
  provide: I18NEXT_NAMESPACE,
  useValue: ['feature_validators', 'validators']
}
```

_NOTE:* **Do NOT** use default (or custom) i18next delimiters in namespace names.

### Document title

If you want to turn on document title localization resolve Title as `I18NextTitle` imported from 'angular-i18next':

```typescript
  providers: [provideI18Next(withTitle())]
```

Routes example:

```typescript
const appRoutes: Routes = [
  { 
    path: 'error',
    component: AppErrorComponent,
    data: { title: 'error:error_occured' }
  },
  { 
    path: 'denied',
    component: AccessDeniedComponent,
    data: { title: 'error:access_denied' }
  }
];
```

Ways to use I18NextService in your code:
> **Warning:** Injection of **I18NextService** is possible, but it would not consider I18NEXT_NAMESPACE and I18NEXT_SCOPE providers. There are 2 possible reasons to inject **I18NextService**: initialization and subscription to its events. In all other cases inject **I18NextPipe**.

1) **Recommended way:** Inject via **I18NEXT_SERVICE** token. By default it will inject instance of **I18NextService**.

```typescript
export class AppComponent implements OnInit  {
  constructor(private router: Router,
              private title: Title,
              @Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService) 
```

2) Legacy way: Inject via type

```typescript
export class AppComponent implements OnInit  {
  constructor(private router: Router,
              private title: Title,
              private i18NextService: I18NextService) 
```

### Error handling

Error handling is now configurable:

  1) By default i18next promise will use NativeErrorHandlingStrategy. I18Next would be always resolve successfully. Error could be get from 'then' handler parameter.
  2) Set StrictErrorHandlingStrategy to reject load promises (init, languageChange, loadNamespaces) on first load fail (this was default in v2 but changed to fit [native i18next behavior](https://github.com/Romanchuk/angular-i18next/issues/9):

```typescript
  providers: [
    provideI18Next(
      withCustomErrorHandlingStrategy(StrictErrorHandlingStrategy)
    )
  ]    
```

### Lazy loading

Use `i18NextNamespacesGuard` in your routes to to load i18next namespace.

Note: It is not necessary to register lazy loading namespaces in global i18next options.

```
{
    path: 'rich_form',
    loadComponent: () => RichFormComponent,
    providers: [
      {
          provide: I18NEXT_NAMESPACE, // namespace to start in component
          useValue: 'feature.rich_form',
      },
    ],
    canActivate: [i18NextNamespacesGuard('feature.rich_form')]
 }
```

Use I18NextService.loadNamespaces() method to load namespaces in code.

# Cookbook

### i18next plugin support

```typescript
import { I18NextModule, ITranslationService, I18NEXT_SERVICE } from 'angular-i18next';
//  import Backend from 'i18next-xhr-backend'; //for i18next < 20.0.0
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

...

i18next.use(HttpApi)
       .use(LanguageDetector)
       .init(i18nextOptions)
```

### Server side rendereng (SSR)

1. Provide for server:

```typescript
import { provideI18Next, withTitle } from 'angular-i18next';
import { withSSR } from 'angular-i18next/ssr';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideServerRouting(serverRoutes),
    provideI18Next(withTitle(), withSSR()),
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
```

2. Configure i18next in `server.ts` ([Example](./apps/angular-i18next-demo/src/server.ts)):

### Auto error message for `@angular/forms`

Use `i18nextValidationMessage` directive with formControlName

```typescript
import { I18NextValidationMessageDirective } from 'angular-i18next/forms'

@Component({
  imports: [I18NextValidationMessageDirective]
})

<input i18nextValidationMessage class="form-control" type="text" formControlName="lastName"/>
```

There is priority order for validation messages:

1. namespace + `control_specific` with form hierarchy
2. namespace +  Common validation key(like `required`)
3. `control_specific` with form hierarchy
4. Common validation key like `required`

Also you can interpolate `control.error` values. For example: For validator `Validators.min(1)`

```json
"min": "Minimal {{min}}. Actual: {{actual}}."
```

`en.validation.json`

```json
{
    "required": "Field is required.",
    "pattern": "$t(validation:_fill) valid value.",
    "_fill": "Please fill in",
    "control_specific": {
        "technicalContact": {
            "firstName": {
                "required": "$t(validation:_fill) technical specialist's first name."
            },
            "lastName": {
                "required": "$t(validation:_fill) technical specialist's last name."
            },
            "middleName": {
                "required": "$t(validation:_fill) technical specialist's patronymic."
            }
        }
    }
}
```

### Testing

```typescript
  import { withSSR } from 'angular-i18next/testing';

  TestBed.configureTestingModule({
      imports: [ProjectComponent],
      providers: [
        provideI18NextMockAppInitializer(),
        provideI18Next(withMock())
      ]
  });
```

# What to do if... ?

## New angular version released, but angular-i18next is not released YET

Angular releases mostly don't break angular-i18next, but we cannot tell ahead that current version of `angular-i18next` will work correctly with latest angular version.

You can override an angular-i18next `peerDependencies` in your `package.json` on your **own risk**:

```json
"overrides": {
  "angular-i18next": {
    "@angular/common": "*",
    "@angular/core": "*",
    "@angular/platform-browser": "*"
  }
}
```

# In-project testing

You might want to unit-test project components that are using i18next pipes

Example tests setup:
[libs/angular-i18next/src/tests/projectTests](https://github.com/Romanchuk/angular-i18next/tree/master/libs/angular-i18next/src/tests/projectTests)

# Demo

[Live DEMO](https://romanchuk.github.io/angular-i18next-demo/)
Demo app source code available here: <https://github.com/Romanchuk/angular-i18next-demo>

# Articles

- [Angular L10n with I18next](https://phrase.com/blog/posts/angular-l10n-with-i18next/)
- [Best Libraries for Angular I18n](https://phrase.com/blog/posts/best-libraries-for-angular-i18n/)
