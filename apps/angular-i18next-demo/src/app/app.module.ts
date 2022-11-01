import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { defaultInterpolationFormat, I18NextLoadResult, I18NextModule, I18NEXT_SERVICE, ITranslationService } from '@libs/angular-i18next';
import { I18NextValidationMessageModule } from '@protoarch.angular/validation-message/provider-i18next';

import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

import { AppComponent } from './app.component';
import { AccessDeniedComponent } from './content/access-denied/access-denied.component';
import { SimpleDemoComponent } from './content/simple-demo.component';
import { AppRouterModule } from './routing/AppRouterModule';
import { AppErrorComponent } from './structure/app-error.component';
import { AppFooterComponent } from './structure/app-footer.component';
import { AppHeaderComponent } from './structure/app-header.component';
import { HeaderLanguageComponent } from './structure/header-controls/header.language.component';

/*
 * Platform and Environment providers/directives/pipes
 */
const i18nextOptions = {
  whitelist: ['en', 'ru'],
  fallbackLng: 'en',
  debug: true, // set debug?
  returnEmptyString: false,
  ns: [
    'translation',
    'validation',
    'error',

    // 'feature.rich_form'
  ],
  interpolation: {
    format: I18NextModule.interpolationFormat(defaultInterpolationFormat)
  },
  //backend plugin options
  backend: {
    loadPath: 'locales/{{lng}}.{{ns}}.json'
  },
  // lang detection plugin options
  detection: {
    // order and from where user language should be detected
    order: ['cookie'],

    // keys or params to lookup language from
    lookupCookie: 'lang',

    // cache user language on
    caches: ['cookie'],

    // optional expire and domain for set cookie
    cookieMinutes: 10080, // 7 days
    // cookieDomain: I18NEXT_LANG_COOKIE_DOMAIN
  }
};

export function appInit(i18next: ITranslationService) {
  return () => {
    const promise: Promise<I18NextLoadResult> = i18next
      .use(HttpApi)
      .use<any>(LanguageDetector)
      .init(i18nextOptions);
    return promise;
  };
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
  },
];



/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppFooterComponent,
    HeaderLanguageComponent,
    AppErrorComponent,
    SimpleDemoComponent,
    AccessDeniedComponent],
  imports: [ // import Angular's modules
    //core
    BrowserModule,
    FormsModule,
    //lib
    I18NextModule.forRoot({
      // errorHandlingStrategy: StrictErrorHandlingStrategy
    }),
    //app
    AppRouterModule,
    I18NextValidationMessageModule
  ],
  exports: [
  ],
  providers: [
    I18N_PROVIDERS
  ],
  entryComponents: [

  ]
})
export class AppModule {}

