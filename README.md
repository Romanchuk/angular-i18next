[![npm version](https://badge.fury.io/js/angular-i18next.svg)](https://badge.fury.io/js/angular-i18next)
[![Downloads](http://img.shields.io/npm/dm/angular-i18next.svg)](https://npmjs.org/package/angular-i18next)
[![Build Status](https://travis-ci.org/Romanchuk/angular-i18next.svg?branch=master)](https://travis-ci.org/Romanchuk/angular-i18next)
[![Coverage Status](https://coveralls.io/repos/github/Romanchuk/angular-i18next/badge.svg?branch=master)](https://coveralls.io/github/Romanchuk/angular-i18next?branch=master)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Dependency Status](https://david-dm.org/Romanchuk/angular-i18next.svg)](https://david-dm.org/Romanchuk/angular-i18next)
[![devDependency Status](https://david-dm.org/Romanchuk/angular-i18next/dev-status.svg)](https://david-dm.org/Romanchuk/angular-i18next?type=dev)

# angular-i18next
[i18next](http://i18next.com/) v8.4+ integration with [angular](https://angular.io/) v2.0+


 - [Features](#features)
 - [Installation](#installation)
 - [Usage](#usage)
 - [Cookbook](#cookbook)
 - [Demo](#demo)
 - [Migration to v3](#migration-to-v3)

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
- [Angular Package Format v6](https://docs.google.com/document/d/1CZC2rcpxffTDfRDs6p1cfbmKNLA6x5O-NtkJglDaBVs/preview) support

# Installation

**1.** Install package

   ```
    npm install i18next --save
    npm install angular-i18next --save
  ```

**2.** Import I18NextModule to AppModule

```typescript

import { I18NextModule } from 'angular-i18next';

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [   
    AppComponent
  ],
  import: [
    I18NextModule.forRoot()
  ]
})
export class AppModule {}

```
**3.** Import I18NextModule.forRoot() to AppModule and setup provider with "init" method (use native [options](https://www.i18next.com/configuration-options.html)). Angular would not load until i18next initialize event fired
```typescript
export function appInit(i18next: ITranslationService) {
    return () => i18next.init({
        whitelist: ['en', 'ru'],
        fallbackLng: 'en',
        debug: true,
        returnEmptyString: false,
        ns: [
          'translation',
          'validation',
          'error'          
        ],
      });
}

export function localeIdFactory(i18next: ITranslationService)  {
    return i18next.language;
}

export const I18N_PROVIDERS = [
{
    provide: APP_INITIALIZER,
    useFactory: appInit,
    deps: [I18NEXT_SERVICE],
    multi: true
},
{
    provide: LOCALE_ID,
    deps: [I18NEXT_SERVICE],
    useFactory: localeIdFactory
}];
```

```typescript
@NgModule({
    imports: [
        ...
        I18NextModule.forRoot()
    ],
    providers: [
        ...
        I18N_PROVIDERS, 
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
```

# Usage

### Pipes

Use "i18next" pipe to translate key:

    <div>{{ 'test' | i18next }}</div>

Passing ["t options"](https://www.i18next.com/api.html#t):

    <div>{{ 'test' | i18next: { count: 5, nsSeparator: '#' } }}</div>


Trigger native i18next [format method](https://www.i18next.com/formatting.html) by using I18NextFormatPipe or I18NextPipe with option 'format':

`{{ 'any_key' | i18next | i18nextFormat }}`

`{{ 'any_key' | i18next: { format: 'cap' } }}`

`{{ 'any_key' | i18nextCap }}`

**Note:** Using "i18nextCap" you will get the same result as  `i18next: { format: 'cap' }`

**REMEMBER** that format will not work until you set "interpolation.format" function in i18next options.

I18NextModule has static method `static interpolationFormat(customFormat: Function = null): Function` that can be used as default interpolation format function (it provides 'upper', 'cap' and 'lower' formatters). You also can pass your custom function to be called after I18NextModule formatters:

```typescript
const i18nextOptions = {
  whitelist: ['en', 'ru'],
  ns: [
    'translation',
    'validation',
    'error',
  ],
  interpolation: {
    format: I18NextModule.interpolationFormat((value, format, lng) => {
      if(value instanceof Date)
        return moment(value).format(format);
      return value;
    });
    // format: I18NextModule.interpolationFormat()
  }
};

```

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
_NOTE:_ **Do NOT** use default (or custom) i18next delimiters in namespace names.

If you want to turn on document title localization resolve Title as `I18NextTitle` imported from 'angular-i18next':

```typescript
{
  provide: Title,
  useClass: I18NextTitle
}
```

Also you can implement your own Title service with specific behavior. Inject `I18NextPipe` (or `I18NextService`) to service/component:
```typescript
import { Injectable, Inject } from '@angular/core';
import { Title, DOCUMENT } from '@angular/platform-browser';
import { I18NextPipe } from 'angular-i18next';

@Injectable()
export class I18NextTitle extends Title {
   constructor(private i18nextPipe: I18NextPipe, @Inject(DOCUMENT) doc) {
    super(doc);
   }

   setTitle(value: string) {
    return super.setTitle(this.translate(value));
   }

   private translate(text: string) {
     return this.i18nextPipe.transform(text, { format: 'cap'});
   }
}

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
  1) By default i18next promise will use NativeErrorHandlingStrategy. I18Next would be always resolve succesfully. Error could be get from 'then' handler parameter.
  2) Set StrictErrorHandlingStrategy to reject load promises (init, languageChange, loadNamespaces) on first load fail (this was default in v2 but changed to fit [native i18next behavior](https://github.com/Romanchuk/angular-i18next/issues/9):

    `I18NextModule.forRoot({ errorHandlingStrategy: StrictErrorHandlingStrategy })`

    

### Lazy loading

Use I18NEXT_NAMESPACE_RESOLVER in your routes to to load i18next namespace.

Note: It is not neccesary to register lazy loading namespaces in global i18next options.

```
{
    path: 'rich_form',
    loadChildren: 'app/features/rich_form_feature/RichFormFeatureModule#RichFormFeatureModule',
    data: {
      i18nextNamespaces: ['feature.rich_form']
    },
    resolve: {
      i18next: I18NEXT_NAMESPACE_RESOLVER
    }
 },

```
Use I18NextService.loadNamespaces() method to load namespaces in code.


# Cookbook

### i18next plugin support

```typescript
import { I18NextModule, ITranslationService, I18NEXT_SERVICE } from 'angular-i18next';
import * as i18nextXHRBackend from 'i18next-xhr-backend';
import * as i18nextLanguageDetector from 'i18next-browser-languagedetector';

...

i18next.use(i18nextXHRBackend)
       .use(i18nextLanguageDetector)
       .init(i18nextOptions)
```




### Initialize i18next before angular application
Angular would not load until i18next initialize event fired
```typescript
export function appInit(i18next: ITranslationService) {
    return () => i18next.init();
}

export function localeIdFactory(i18next: ITranslationService)  {
    return i18next.language;
}

export const I18N_PROVIDERS = [
{
    provide: APP_INITIALIZER,
    useFactory: appInit,
    deps: [I18NEXT_SERVICE],
    multi: true
},
{
    provide: LOCALE_ID,
    deps: [I18NEXT_SERVICE],
    useFactory: localeIdFactory
}];
```



### Document title update on language or route change


```typescript
export class AppComponent implements OnInit  {
  constructor(private router: Router,
              private title: Title,
              @Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService) {
      // page title subscription
      // https://toddmotto.com/dynamic-page-titles-angular-2-router-events#final-code
      this.router.events
        .filter(event => event instanceof NavigationEnd)
        .map(() => this.router.routerState.root)
        .map(route => {
          while (route.firstChild) route = route.firstChild;
          return route;
        })
        .filter(route => route.outlet === 'primary')
        .mergeMap(route => route.data)
        .subscribe((event) => this.updatePageTitle(event['title']));
  }

  ngOnInit() {
    this.i18NextService.events.languageChanged.subscribe(lang => {
      let root = this.router.routerState.root;
      if (root != null && root.firstChild != null) {
        let data: any = root.firstChild.data;
        this.updatePageTitle(data && data.value && data.value.title);
      }
    });
  }

  updatePageTitle(title: string): void {
    let newTitle = title || 'application_title';
    this.title.setTitle(newTitle);
  }
}
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



# Demo

Demo app source code now awailable: https://github.com/Romanchuk/angular-i18next-demo

It's not yet deployed as public web site.

To run:
```
npm install
npm start
```

# Migration to v4
1. Update angular to v6+
2. Update rxjs to v6.2.0+

In v4 passed through most of i18next api methods


# Migration to v3

To keep same behavior you should:
1. update i18next version to >= 8.4.0
2. set options.interpolation.format: I18NextModule.interpolationFormat()
3. set I18NextModule.forRoot params to:

  `I18NextModule.forRoot({ localizeTitle: true, errorHandlingStrategy: StrictErrorHandlingStrategy })`

# Migration to v3.2.0
- 'localizeTitle' option was removed. You need to resolve Title service manually.



**v2** docs available [here](https://github.com/Romanchuk/angular-i18next/blob/master/README_v2.md)

### Breaking changes list

- Added i18NextFormat pipe to support i18next
- BREAKING: Reserved option 'case' in I18NextPipe changed to 'format'
- BREAKING: I18NextCapPipe has no own formaters
- I18NextModule has static method `static interpolationFormat(customFormat: Function = null): Function` that can be used as default interpolation format (it provides 'upper', 'cap' and 'lower' formatters) . You also can pass your custom function to be called after I18NextModule formatters .

- i18next version support >= 8.4.0

- Title provider does not resolving as I18NextTitle by default anymore

- Fix [#9](https://github.com/Romanchuk/angular-i18next/issues/9)
