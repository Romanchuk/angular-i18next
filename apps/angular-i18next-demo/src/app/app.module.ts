import { isPlatformBrowser } from '@angular/common';
import { APP_INITIALIZER, LOCALE_ID, NgModule, PLATFORM_ID, Provider } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule, Title } from '@angular/platform-browser';

import { I18NextValidationMessageModule } from '@protoarch.angular/validation-message/provider-i18next';
import { I18NextLoadResult, I18NextModule, I18NextTitle, I18NEXT_SERVICE, ITranslationService } from 'angular-i18next';

import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

import { AppComponent } from './app.component';
import { AccessDeniedComponent } from './content/access-denied/access-denied.component';
import { SimpleDemoComponent } from './content/simple-demo.component';
import { i18nextOptions } from './i18next.options';
import { AppRouterModule } from './routing/AppRouterModule';
import { AppErrorComponent } from './structure/app-error.component';
import { AppFooterComponent } from './structure/app-footer.component';
import { AppHeaderComponent } from './structure/app-header.component';
import { HeaderLanguageComponent } from './structure/header-controls/header.language.component';

export function appInit(i18next: ITranslationService, platformId: any) {
  return () => {
    if (!isPlatformBrowser(platformId)) {
      return Promise.resolve();
    }
    const promise: Promise<I18NextLoadResult> = i18next
      .use(HttpApi)
      .use(LanguageDetector)
      .init(i18nextOptions);
    return promise;
  };
}

export function localeIdFactory(i18next: ITranslationService)  {
  return i18next.language;
}

export const I18N_PROVIDERS: Provider[] = [
  {
    provide: APP_INITIALIZER,
    useFactory: appInit,
    deps: [I18NEXT_SERVICE, PLATFORM_ID],
    multi: true
  },
  {
    provide: LOCALE_ID,
    deps: [I18NEXT_SERVICE],
    useFactory: localeIdFactory
  },
  {
    provide: Title,
    useExisting: I18NextTitle
  }
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
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    FormsModule,
    //lib
    I18NextModule.forRoot({
      // errorHandlingStrategy: StrictErrorHandlingStrategy
    }),
    //app
    AppRouterModule,
    I18NextValidationMessageModule
  ],
  providers: [
    I18N_PROVIDERS
  ]
})
export class AppModule {}

