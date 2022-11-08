import { APP_INITIALIZER, LOCALE_ID } from '@angular/core';
import {
  I18NextLoadResult, I18NextModule, I18NEXT_SERVICE, ITranslationService
} from '../lib';
import { MockI18NextService } from './mocks/MockTranslationService';

export function appInit(i18next: ITranslationService) {
  return () => {
    let promise: Promise<I18NextLoadResult> = i18next.init({
      lng: 'cimode',
      // debug: true,
      // appendNamespaceToCIMode: true,
      // appendNamespaceToMissingKey: true,
      interpolation: {
        format: I18NextModule.interpolationFormat()
      }
    });
    return promise;
  };
}

export function localeIdFactory(i18next: ITranslationService) {
  return i18next.language;
}

export const I18N_PROVIDERS = [
  {
    provide: I18NEXT_SERVICE,
    useClass: MockI18NextService
  },
  {
    provide: APP_INITIALIZER,
    useFactory: appInit,
    deps: [I18NEXT_SERVICE],
    multi: true,
  },
  {
    provide: LOCALE_ID,
    deps: [I18NEXT_SERVICE],
    useFactory: localeIdFactory,
  },
];
