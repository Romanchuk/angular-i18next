export * from './I18NEXT_TOKENS';
export * from './I18NextPipe';
export * from './I18NextCapPipe';
export * from './I18NextFormatPipe';
export * from './I18NextService';
export * from './I18NextTitle';
export * from './I18nextNamespaceResolver';
export * from './I18NextErrorHandlingStrategies';
export * from './I18NextModuleParams';
export * from './I18NextLoadResult';

export * from './ITranslationService';
export * from './ITranslationEvents';

import { NgModule, ModuleWithProviders, FactoryProvider, Type } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { I18NEXT_NAMESPACE, I18NEXT_SCOPE, I18NEXT_SERVICE, I18NEXT_NAMESPACE_RESOLVER, I18NEXT_ERROR_HANDLING_STRATEGY } from './I18NEXT_TOKENS';
import { I18NextTitle } from './I18NextTitle';
import { I18NextPipe } from './I18NextPipe';
import { I18NextCapPipe } from './I18NextCapPipe';
import { I18NextFormatPipe } from './I18NextFormatPipe';
import { I18NextService } from './I18NextService';
import { ITranslationService } from './ITranslationService';
import { I18nextNamespaceResolver } from './I18nextNamespaceResolver';
import { I18NextErrorHandlingStrategy, NativeErrorHandlingStrategy, StrictErrorHandlingStrategy } from './I18NextErrorHandlingStrategies';
import { I18NextModuleParams } from './I18NextModuleParams';


@NgModule({
  providers: [
    {
      provide: I18NEXT_NAMESPACE,
      useValue: ''
    },
    {
      provide: I18NEXT_SCOPE,
      useValue: ''
    },
    I18NextPipe,
    I18NextCapPipe,
    I18NextFormatPipe,
    I18NextTitle
  ],
  declarations: [
    I18NextPipe,
    I18NextCapPipe,
    I18NextFormatPipe
  ],
  exports: [
    I18NextPipe,
    I18NextCapPipe,
    I18NextFormatPipe
  ]
})
export class I18NextModule {
  static forRoot(params: I18NextModuleParams = undefined): ModuleWithProviders {
    params = params || {};
    params.errorHandlingStrategy = params.errorHandlingStrategy || NativeErrorHandlingStrategy;
    let providers: any = [
      {
        provide: I18NEXT_SERVICE,
        useClass: I18NextService
      },
      {
        provide: I18NEXT_ERROR_HANDLING_STRATEGY,
        useClass: params.errorHandlingStrategy
      },
      I18NextService,
      I18NextPipe,
      I18NextCapPipe,
      I18NextFormatPipe,
      I18nextNamespaceResolver
    ];

    if (params.localizeTitle) {
      providers.push({
        provide: Title,
        useClass: I18NextTitle
      });
    }

    return {
      ngModule: I18NextModule,
      providers: providers
    };
  }

  static interpolationFormat(customFormat: Function = null): Function {
    function formatDelegate(value: string, format: string, lng: string): string {
      let formatedValue: string = defaultInterpolationFormat(value, format, lng);
      if (customFormat === null)
        return formatedValue;
      return customFormat(formatedValue, format, lng);
    }
    return formatDelegate;
  }
}

export function defaultInterpolationFormat(value: string, format: string, lng: string = undefined): string {
  if (!value)
    return value;
  switch (format) {
    case 'upper':
    case 'uppercase':
      return value.toUpperCase();
    case 'lower':
    case 'lowercase':
      return value.toLowerCase();
    case 'cap':
    case 'capitalize':
      return value.charAt(0).toUpperCase() + value.slice(1);
    case null:
    case undefined:
    case 'none':
    default:
      return value;
  }
}
