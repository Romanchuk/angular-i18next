import { TestBed } from '@angular/core/testing';
import { I18NextModule, I18NEXT_SERVICE, I18NextLoadResult, ITranslationService } from '../../src';
import { ProjectTestModule } from './projectTests.module';
import { ProjectComponent } from './project.component';
import { APP_INITIALIZER, LOCALE_ID } from '@angular/core';

export function appInit(i18next: ITranslationService) {
    return () => {
      let promise: Promise<I18NextLoadResult> = i18next
        .init({
            lng: 'cimode'
        });
      return promise;
    };
  }

  export function localeIdFactory(i18next: ITranslationService)  {
    return i18next.language;
  }

  export const I18N_PROVIDERS = [
    {
      provide: APP_INITIALIZER,
      useFactory: appInit,
      deps: [I18NEXT_SERVICE],
      multi: true
    },
    {
      provide: LOCALE_ID,
      deps: [I18NEXT_SERVICE],
      useFactory: localeIdFactory
    },
  ];


describe('Project component tests', function() {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
            I18NextModule.forRoot(),
            ProjectTestModule
        ],
        providers: [I18N_PROVIDERS]
      });
    });

    it('should test project component', function(){
        let pc = TestBed.createComponent(ProjectComponent);
        pc.detectChanges();
        expect(pc).toBeTruthy();
    });
});
