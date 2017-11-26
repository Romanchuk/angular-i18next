export * from './I18NEXT_TOKENS';
export * from './I18NextPipe';
export * from './I18NextCapPipe';
export * from './I18NextService';
export * from './I18NextTitle';
export * from './I18nextNamespaceResolver';

export * from './ITranslationService';
export * from './ITranslationEvents';

import { NgModule, ModuleWithProviders, FactoryProvider } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { I18NEXT_NAMESPACE, I18NEXT_SCOPE, I18NEXT_SERVICE, I18NEXT_NAMESPACE_RESOLVER } from './I18NEXT_TOKENS';
import { I18NextTitle } from './I18NextTitle';
import { I18NextPipe } from './I18NextPipe';
import { I18NextCapPipe } from './I18NextCapPipe';
import { I18NextService } from './I18NextService';
import { ITranslationService } from './ITranslationService';
import { I18nextNamespaceResolver } from './I18nextNamespaceResolver';


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
    I18NextTitle,
    {
      provide: Title,
      useClass: I18NextTitle
    }
  ],
  declarations: [
    I18NextPipe,
    I18NextCapPipe
  ],
  exports: [
    I18NextPipe,
    I18NextCapPipe
  ]
})
export class I18NextModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: I18NextModule,
      providers: [
        {
          provide: I18NEXT_SERVICE,
          useClass: I18NextService
        },
        I18NextService,
        I18NextPipe,
        I18NextCapPipe,
        I18nextNamespaceResolver
      ]
    };
  }
}
