import { NgModule, ModuleWithProviders } from "@angular/core";
import { FormatFunction, InterpolationOptions } from "i18next";
import { I18NEXT_NAMESPACE, I18NEXT_SCOPE, I18NEXT_INSTANCE, I18NEXT_SERVICE, I18NEXT_ERROR_HANDLING_STRATEGY, I18NEXT_NAMESPACE_RESOLVER } from "./I18NEXT_TOKENS";
import { I18NextCapPipe } from "./I18NextCapPipe";
import { I18NextEagerPipe } from "./I18NextEagerPipe";
import { I18NextErrorHandlingStrategy, NativeErrorHandlingStrategy } from "./I18NextErrorHandlingStrategies";
import { I18NextFormatPipe } from "./I18NextFormatPipe";
import { I18NextModuleParams } from "./I18NextModuleParams";
import { I18NextPipe } from "./I18NextPipe";
import { I18NextService } from "./I18NextService";
import { I18NextTitle } from "./I18NextTitle";
import { defaultInterpolationFormat } from "./interpolation";
import * as i18n from 'i18next';
import { i18nextNamespaceResolverFactory } from "./namespace.resolver";

const i18nextGlobal: i18n.i18n = i18n.default;

/**
 * @deprecated Use provideI18Next() instead. This module-based approach will be removed in a future version.
 * Example:
 * ```typescript
 * // Instead of
 * imports: [I18NextModule.forRoot()]
 *
 * // Use
 * providers: [provideI18Next()]
 * ```
 */
@NgModule({
  imports: [I18NextPipe, I18NextEagerPipe, I18NextCapPipe, I18NextFormatPipe],
  exports: [I18NextPipe, I18NextEagerPipe, I18NextCapPipe, I18NextFormatPipe],
  providers: [
    {
      provide: I18NEXT_NAMESPACE,
      useValue: '',
    },
    {
      provide: I18NEXT_SCOPE,
      useValue: '',
    },
    I18NextTitle,
    I18NextFormatPipe
  ],
})
export class I18NextModule {
  /**
   * @deprecated Use provideI18Next() instead. This module-based approach will be removed in a future version.
   * Example:
   * ```typescript
   * // Instead of
   * imports: [I18NextModule.forRoot()]
   *
   * // Use
   * providers: [provideI18Next()]
   * ```
   */
  static forRoot(
    params: I18NextModuleParams = {}
  ): ModuleWithProviders<I18NextModule> {
    return {
      ngModule: I18NextModule,
      providers: [{
        provide: I18NEXT_INSTANCE,
        useValue: i18nextGlobal,
      },
        {
          provide: I18NEXT_SERVICE,
          useFactory: (errHandle: I18NextErrorHandlingStrategy, i18nextInstance: i18n.i18n) => new I18NextService(errHandle, i18nextInstance),
          deps: [
            I18NEXT_ERROR_HANDLING_STRATEGY,
            I18NEXT_INSTANCE
          ]
        },
        {
          provide: I18NEXT_ERROR_HANDLING_STRATEGY,
          useClass: params.errorHandlingStrategy || NativeErrorHandlingStrategy,
        },
        I18NextService,
        I18NextFormatPipe,
        I18NextTitle,
        {
          provide: I18NEXT_NAMESPACE_RESOLVER,
          useFactory: i18nextNamespaceResolverFactory,
          deps: [I18NEXT_SERVICE],
        },
      ],
    };
  }

  static interpolationFormat(customFormat: Function | null = null): FormatFunction {
    function formatDelegate(value: any,
                            format?: string,
                            lng?: string,
                            options?: InterpolationOptions & { [key: string]: any }
    ): string {
      let formatedValue: string = defaultInterpolationFormat(
        value,
        format,
        lng
      );
      if (customFormat === null) return formatedValue;
      return customFormat(formatedValue, format, lng);
    }
    return formatDelegate;
  }
}
