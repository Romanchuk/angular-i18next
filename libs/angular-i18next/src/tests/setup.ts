import { LOCALE_ID, inject, provideAppInitializer } from '@angular/core';
import {
  I18NEXT_SERVICE,
  I18NextLoadResult,
  interpolationFormat,
  provideI18Next,
  provideI18NextMockAppInitializer,
  withMock
} from '../lib';

export const I18N_PROVIDERS = [
  provideI18Next(withMock()),
  provideI18NextMockAppInitializer()
];
