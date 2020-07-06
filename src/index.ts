import { ModuleWithProviders, NgModule, FactoryProvider } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { I18NEXT_ERROR_HANDLING_STRATEGY, I18NEXT_NAMESPACE, I18NEXT_SCOPE, I18NEXT_SERVICE, I18NEXT_NAMESPACE_RESOLVER } from './I18NEXT_TOKENS';
import { I18NextCapPipe } from './I18NextCapPipe';
import { NativeErrorHandlingStrategy } from './I18NextErrorHandlingStrategies';
import { I18NextFormatPipe } from './I18NextFormatPipe';
import { I18NextModuleParams } from './I18NextModuleParams';
import { I18NextPipe } from './I18NextPipe';
import { I18NextService } from './I18NextService';
import { I18NextTitle } from './I18NextTitle';
import { ITranslationService } from './ITranslationService';
import { I18NextEagerPipe } from './I18NextEagerPipe';
import { FormatFunction } from 'i18next';

export * from './I18NEXT_TOKENS';
export * from './I18NextPipe';
export * from './I18NextEagerPipe';
export * from './I18NextCapPipe';
export * from './I18NextFormatPipe';
export * from './I18NextService';
export * from './I18NextTitle';
export * from './I18NextErrorHandlingStrategies';
export * from './I18NextModuleParams';
export * from './I18NextLoadResult';

export * from './ITranslationService';
export * from './ITranslationEvents';
export * from './models';


export function resolver(activatedRouteSnapshot, routerStateSnapshot): Promise<void> {
  let namespaces: string[] = [];
  namespaces = activatedRouteSnapshot.data && activatedRouteSnapshot.data.i18nextNamespaces || namespaces;
  return this.loadNamespaces(namespaces.filter(n => n));
}
export function i18nextNamespaceResolverFactory(i18next: ITranslationService) {
  return resolver.bind(i18next);
}

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
    I18NextTitle,
    I18NextEagerPipe
  ],
  declarations: [
    I18NextPipe,
    I18NextCapPipe,
    I18NextFormatPipe,
    I18NextEagerPipe
  ],
  exports: [
    I18NextPipe,
    I18NextCapPipe,
    I18NextFormatPipe,
    I18NextEagerPipe
  ]
})
export class I18NextModule {
  static forRoot(params: I18NextModuleParams = {}): ModuleWithProviders<I18NextModule> {
    return {
      ngModule: I18NextModule,
      providers: [
        {
          provide: I18NEXT_SERVICE,
          useClass: I18NextService
        },
        {
          provide: I18NEXT_ERROR_HANDLING_STRATEGY,
          useClass: params.errorHandlingStrategy || NativeErrorHandlingStrategy
        },
        I18NextService,
        I18NextPipe,
        I18NextCapPipe,
        I18NextFormatPipe,
        I18NextTitle,
        I18NextEagerPipe,
        {
          provide: I18NEXT_NAMESPACE_RESOLVER,
          useFactory: i18nextNamespaceResolverFactory,
          deps: [I18NEXT_SERVICE]
        }
      ]
    };
  }

  static interpolationFormat(customFormat: Function = null): FormatFunction {
    function formatDelegate(value: any, format: string, lng: string): string {
      let formatedValue: string = defaultInterpolationFormat(value, format, lng);
      if (customFormat === null)
        return formatedValue;
      return customFormat(formatedValue, format, lng);
    }
    return formatDelegate;
  }
}

export function defaultInterpolationFormat(value: any, format: string, lng: string = undefined): string {
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
