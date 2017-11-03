[![npm version](https://badge.fury.io/js/angular-i18next.svg)](https://badge.fury.io/js/angular-i18next)
[![Downloads](http://img.shields.io/npm/dm/angular-i18next.svg)](https://npmjs.org/package/angular-i18next)
[![Build Status](https://travis-ci.org/Romanchuk/angular-i18next.svg?branch=master)](https://travis-ci.org/Romanchuk/angular-i18next)
[![Coverage Status](https://coveralls.io/repos/github/Romanchuk/angular-i18next/badge.svg?branch=master)](https://coveralls.io/github/Romanchuk/angular-i18next?branch=master)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Dependency Status](https://david-dm.org/Romanchuk/angular-i18next.svg)](https://david-dm.org/Romanchuk/angular-i18next)
[![devDependency Status](https://david-dm.org/Romanchuk/angular-i18next/dev-status.svg)](https://david-dm.org/Romanchuk/angular-i18next?type=dev)

# angular-i18next
[i18next](http://i18next.com/) integration with angular 2.0+

 - [Features](#features)
 - [Installation](#installation)
 - [Usage](#usage)
 - [Cookbook](#cookbook)
 - [Demo](#demo)


# Features

- Native i18next [options](https://www.i18next.com/configuration-options.html)
- Promise initialization
- [i18next plugin](https://www.i18next.com/plugins-and-utils.html#plugins) support 
- Events support
- Document Title translation
- i18next namespaces and scopes (prefixes) for angular modules and components
- AOT support

# Installation

**1.** Install package
    npm install angular-i18next --save

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
**3.** Inject I18NextService to AppComponent and call "init" method (with prefered [options](https://www.i18next.com/configuration-options.html)). **We recommend** to use more [advanced and prefered initialization](#initialize-i18next-before-angular-application).
```typescript

import { I18NextService } from 'angular-i18next';

export class AppComponent {

  constructor(@Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService) {
      i18NextService.init({
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
```

# Usage

Use "i18next" pipe (or "i18nextCap" to capitalize translated text) to translate key:

    <div>{{ 'test' | i18next }}</div>

Passing ["t options"](https://www.i18next.com/api.html#t):

    <div>{{ 'test' | i18next: { count: 5, nsSeparator: '#' } }}</div>


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

Translating strings in code. Inject I18NextPipe (or I18NextService) to service/component:
```typescript
import { Injectable, Inject } from '@angular/core';
import { Title, DOCUMENT } from '@angular/platform-browser';
import { I18NextPipe } from './I18NextPipe';

@Injectable()
export class I18NextTitle extends Title {
   constructor(private i18nextPipe: I18NextPipe, @Inject(DOCUMENT) doc) {
    super(doc);
   }

   setTitle(value: string) {
    return super.setTitle(this.translate(value));
   }

   private translate(text: string) {
     return this.i18nextPipe.transform(text, { case: 'cap'});
   }
}

```

Ways to use I18NextService in your code:
> **Warning:** Injection of **I18NextService** is possible, but it would not consider I18NEXT_NAMESPACE and I18NEXT_SCOPE providers. There are 2 possible reasons to inject **I18NextService**: initialization and subscribtion to its events. In all other cases inject **I18NextPipe**.
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
const PROVIDERS = [
  {
    provide: APP_INITIALIZER,
    useFactory: (i18next: ITranslationService) => () => {
      return i18next.init();
    },
    deps: [I18NEXT_SERVICE],
    multi: true
  }];
   
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [   
    AppComponent
  ],
  providers: [
    PROVIDERS
  ]
})
export class AppModule {}
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
npm update
npm start
```

