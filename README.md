# angular-i18next
[i18next](http://i18next.com/) integration with angular 2.0+

 - [Features](#features)
 - [Instalation](#instalation)
 - [Usage](#usage)
 - [Cookbook](#cookbook)


# Features

- Native i18next [options](http://i18next.com/docs/options/#init-options)
- Promise initialization
- [i18next plugin](http://i18next.com/docs/ownplugin/) support 
- Events support
- Document Title translation
- i18next namespaces and scopes (prefixes) for angular modules and components

# Instalation

**1.** Install package
    npm install angular-i18next --save

**2.** Import I18NextModule to AppModule

```typescript

import { I18NextModule } from 'i18next';

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
**3.** Inject I18NextService to AppComponent and call "init" method (with prefered [options]( http://i18next.com/docs/options/#init-options)). Or use more [advanced initialization](#initialize-i18next-before-angular-application).
```typescript

export class AppComponent {

  constructor(private i18NextService: I18NextService) {
      return i18next.init({
        whitelist: ['en', 'ru'],
        fallbackLng: 'enu',
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

Passing ["t options"](http://i18next.com/docs/options/#t-options):

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

> **Warning:** Injection of I18NextService is possible, but it would not consider I18NEXT_NAMESPACE and I18NEXT_SCOPE providers


# Cookbook

### i18next plugin support

```typescript
import { I18NextService } from 'i18next';
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
    useFactory: (i18next: I18NextService) => () => {
      return i18next.init();
    },
    deps: [I18NextService],
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
              private i18NextService: I18NextService) {
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
