import { inject, provideAppInitializer } from '@angular/core';
import { I18NextLoadResult } from '../../I18NextLoadResult';
import { interpolationFormat } from '../../interpolation';
import { MockI18NextService } from '../../testing/src/mock.service';
import { I18NextFeature, I18NextFeatureKind, makeI18NextFeature } from '../../provider.utils';
import { I18NEXT_SERVICE } from '../../tokens';

/**
 * Initializes i18next with mock settings for testing
 */
export function mockAppInit() {
  const i18next = inject(I18NEXT_SERVICE);
  let promise: Promise<I18NextLoadResult> = i18next.init({
    lng: 'cimode',
    interpolation: {
      format: interpolationFormat(),
    },
  });
  return promise;
}

export const provideI18NextMockAppInitializer = () =>
  provideAppInitializer(mockAppInit);

/**
 * Provides a mock implementation of I18NEXT_SERVICE for testing purposes.
 * Also initializes i18next with mock settings.
 *
 * @returns An I18NextFeature that configures the service to use MockI18NextService
 *
 * Example:
 * ```typescript
 * providers: [
 *   provideI18Next(withMock())
 * ]
 * ```
 */
export function withMock(): I18NextFeature<I18NextFeatureKind.Mock> {
  return makeI18NextFeature(I18NextFeatureKind.Mock, [
    {
      provide: I18NEXT_SERVICE,
      useClass: MockI18NextService,
    },
  ]);
}
