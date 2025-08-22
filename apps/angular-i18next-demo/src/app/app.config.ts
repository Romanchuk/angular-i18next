import { isPlatformBrowser } from '@angular/common';
import {
  ApplicationConfig,
  importProvidersFrom,
  inject,
  PLATFORM_ID,
  provideAppInitializer,
  provideZonelessChangeDetection,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  BrowserModule,
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { I18NEXT_SERVICE, I18NextLoadResult, provideI18Next, withTitle } from 'angular-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import i18nextOptions from './i18next.options';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';

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

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(withEventReplay()),
    provideZonelessChangeDetection(),
    provideRouter(appRoutes),
    importProvidersFrom(BrowserModule, FormsModule),
    provideAppInitializer(appInit()),
    provideI18Next(withTitle()),
  ],
};
