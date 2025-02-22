import { isPlatformBrowser } from '@angular/common';
import { APP_ID, enableProdMode, importProvidersFrom, inject, PLATFORM_ID, provideAppInitializer } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { I18NEXT_SERVICE, I18NextLoadResult, provideI18Next, withTitle } from 'angular-i18next';
import HttpApi from 'i18next-http-backend';
import { LanguageDetector } from 'i18next-http-middleware';
import { AppComponent } from './app/app.component';
import i18nextOptions from './app/i18next.options';
import { AppRouterModule } from './app/routing/AppRouterModule';
import { environment } from './environments/environment';

export function appInit() {
  return () => {
    const i18next = inject(I18NEXT_SERVICE);
    const platformId = inject(PLATFORM_ID);

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


if (environment.production) {
  enableProdMode();
}

function bootstrap() {
  bootstrapApplication(AppComponent, {
    providers: [
      importProvidersFrom(
        BrowserModule,
        FormsModule,
        AppRouterModule,
      ),
      { provide: APP_ID,  useValue: 'serverApp' },
        provideAppInitializer(appInit()),
        provideI18Next(
          withTitle()
      )
  ]
  }).catch((err) => console.error(err));
};

 if (document.readyState === 'complete') {
   bootstrap();
 } else {
   document.addEventListener('DOMContentLoaded', bootstrap);
 }

