import {
  EnvironmentProviders,
  inject,
  LOCALE_ID,
  makeEnvironmentProviders,
  provideAppInitializer,
  Provider,
  Type,
} from '@angular/core';
import * as i18n from 'i18next';
import {
  I18NEXT_ERROR_HANDLING_STRATEGY,
  I18NEXT_INSTANCE,
  I18NEXT_NAMESPACE_RESOLVER,
  I18NEXT_SERVICE,
} from './I18NEXT_TOKENS';
import { I18NextCapPipe } from './I18NextCapPipe';
import { I18NextEagerPipe } from './I18NextEagerPipe';
import {
  I18NextErrorHandlingStrategy,
  NativeErrorHandlingStrategy,
} from './I18NextErrorHandlingStrategies';
import { I18NextFormatPipe } from './I18NextFormatPipe';
import { I18NextLoadResult } from './I18NextLoadResult';
import { I18NextPipe } from './I18NextPipe';
import { I18NextService } from './I18NextService';
import { I18NextTitle } from './I18NextTitle';
import { interpolationFormat } from './interpolation';
import { MockI18NextService } from './mock';
import { i18nextNamespaceResolverFactory } from './namespace.resolver';

const i18nextGlobal: i18n.i18n = i18n.default;

export function localeIdFactory() {
  const i18next = inject(I18NEXT_SERVICE);
  return i18next.language;
}

export function provideI18Next(
  ...features: I18NextFeature<I18NextFeatureKind>[]
): EnvironmentProviders {
  const providers: Provider[] = [
    {
      provide: I18NEXT_INSTANCE,
      useValue: i18nextGlobal,
    },
    {
      provide: I18NEXT_SERVICE,
      useFactory: (
        errHandle: I18NextErrorHandlingStrategy,
        i18nextInstance: i18n.i18n,
      ) => new I18NextService(errHandle, i18nextInstance),
      deps: [I18NEXT_ERROR_HANDLING_STRATEGY, I18NEXT_INSTANCE],
    },
    {
      provide: I18NEXT_ERROR_HANDLING_STRATEGY,
      useClass: NativeErrorHandlingStrategy,
    },
    I18NextService,
    {
      provide: I18NEXT_NAMESPACE_RESOLVER,
      useFactory: i18nextNamespaceResolverFactory,
      deps: [I18NEXT_SERVICE],
    },
    I18NextPipe,
    I18NextEagerPipe,
    I18NextCapPipe,
    I18NextFormatPipe,
    {
      provide: LOCALE_ID,
      useFactory: localeIdFactory,
    },
  ];

  for (const feature of features) {
    providers.push(...feature.ɵproviders);
  }

  return makeEnvironmentProviders(providers);
}

/**
 * A feature for use when configuring `provideI18Next`.
 *
 * @publicApi
 */
export interface I18NextFeature<KindT extends I18NextFeatureKind> {
  ɵkind: KindT;
  ɵproviders: Provider[];
}

function makeHttpFeature<KindT extends I18NextFeatureKind>(
  kind: KindT,
  providers: Provider[],
): I18NextFeature<KindT> {
  return {
    ɵkind: kind,
    ɵproviders: providers,
  };
}

/**
 * Identifies a particular kind of `HttpFeature`.
 *
 * @publicApi
 */
export enum I18NextFeatureKind {
  CustomErrorHandlingStrategy,
  Mock,
  Title,
}

export function withCustomErrorHandlingStrategy(
  errorHandlingStrategy: Type<I18NextErrorHandlingStrategy>,
): I18NextFeature<I18NextFeatureKind.CustomErrorHandlingStrategy> {
  return makeHttpFeature(I18NextFeatureKind.CustomErrorHandlingStrategy, [
    {
      provide: I18NEXT_ERROR_HANDLING_STRATEGY,
      useClass: errorHandlingStrategy,
    },
  ]);
}

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
  return makeHttpFeature(I18NextFeatureKind.Mock, [
    {
      provide: I18NEXT_SERVICE,
      useClass: MockI18NextService,
    },
  ]);
}

/**
 * Provides I18NextTitle service for document title translation support.
 * 
 * @returns An I18NextFeature that configures the I18NextTitle service
 * 
 * Example:
 * ```typescript
 * providers: [
 *   provideI18Next(withTitle())
 * ]
 * ```
 */
export function withTitle(): I18NextFeature<I18NextFeatureKind.Title> {
  return makeHttpFeature(I18NextFeatureKind.Title, [
    I18NextTitle
  ]);
}
