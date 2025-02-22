import {
  ɵDEFAULT_LOCALE_ID as DEFAULT_LOCALE_ID,
  EnvironmentProviders,
  inject,
  LOCALE_ID,
  makeEnvironmentProviders,
  Provider,
  Type
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import * as i18n from 'i18next';
import {
  I18NextErrorHandlingStrategy,
  NativeErrorHandlingStrategy,
} from './I18NextErrorHandlingStrategies';
import { i18nextNamespaceResolverFactory } from './namespace.resolver';
import { I18NextCapPipe } from './pipes/i18next-cap.pipe';
import { I18NextEagerPipe } from './pipes/i18next-eager.pipe';
import { I18NextFormatPipe } from './pipes/i18next-format.pipe';
import { I18NextPipe } from './pipes/i18next.pipe';
import { I18NextFeature, I18NextFeatureKind, makeI18NextFeature } from './provider.utils';
import { I18NextTitle } from './services/i18next-title';
import { I18NextService } from './services/i18next.service';
import {
  I18NEXT_ERROR_HANDLING_STRATEGY,
  I18NEXT_INSTANCE,
  I18NEXT_NAMESPACE,
  I18NEXT_NAMESPACE_RESOLVER,
  I18NEXT_SCOPE,
  I18NEXT_SERVICE,
} from './tokens';

const i18nextGlobal: i18n.i18n = i18n.default;

export function localeIdFactory() {
  const i18next = inject(I18NEXT_SERVICE);
  return i18next.language ?? DEFAULT_LOCALE_ID;
}

  /**
   * Provides the necessary dependencies for using i18next with Angular.
   *
   * @param features An array of features to enable. See {@link I18NextFeature} for available features.
   * @returns An array of providers that can be added to the root providers.
   *
   * @example
   * import { provideI18Next } from '@angular-i18next/core';
   *
   *   providers: [
   *     provideI18Next(),
   *   ],
   *
   */
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
      provide: I18NEXT_NAMESPACE,
      useValue: '',
    },
    {
      provide: I18NEXT_SCOPE,
      useValue: '',
    },
    {
      provide: I18NEXT_ERROR_HANDLING_STRATEGY,
      useClass: NativeErrorHandlingStrategy,
    },
    {
      provide: I18NEXT_NAMESPACE_RESOLVER,
      useFactory: i18nextNamespaceResolverFactory,
      deps: [I18NEXT_SERVICE],
    },
    {
      provide: LOCALE_ID,
      useFactory: localeIdFactory,
    },
    I18NextService,
    I18NextPipe,
    I18NextEagerPipe,
    I18NextCapPipe,
    I18NextFormatPipe,
  ];

  for (const feature of features) {
    providers.push(...feature.ɵproviders);
  }

  return makeEnvironmentProviders(providers);
}

/**
 * Configures a custom error handling strategy for i18next.
 *
 * @param errorHandlingStrategy - A class implementing the I18NextErrorHandlingStrategy interface.
 * @returns An I18NextFeature for the specified custom error handling strategy.
 *
 * This feature allows the integration of a custom error handling mechanism
 * into the i18next setup, replacing the default error handling strategy.
 *
 *  * Example:
 * ```typescript
 *    providers: [
 *       provideI18Next(withCustomErrorHandlingStrategy(StrictErrorHandlingStrategy)())
 *    ]
 * ```
 */
export function withCustomErrorHandlingStrategy(
  errorHandlingStrategy: Type<I18NextErrorHandlingStrategy>,
): I18NextFeature<I18NextFeatureKind.CustomErrorHandlingStrategy> {
  return makeI18NextFeature(I18NextFeatureKind.CustomErrorHandlingStrategy, [
    {
      provide: I18NEXT_ERROR_HANDLING_STRATEGY,
      useClass: errorHandlingStrategy,
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
  return makeI18NextFeature(I18NextFeatureKind.Title, [
    {
        provide: Title,
        useClass: I18NextTitle
    }
  ]);
}
