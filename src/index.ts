import { NgModule, ModuleWithProviders } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { I18NEXT_NAMESPACE, I18NEXT_SCOPE } from './I18NEXT_TOKENS';
import { I18NextTitle } from './I18NextTitle';
import { I18NextPipe } from './I18NextPipe';
import { I18NextCapPipe } from './I18NextCapPipe';
import { I18NextService } from './I18NextService';

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
        I18NextService,
        I18NextPipe,
        I18NextCapPipe
      ]
    };
  }
}
