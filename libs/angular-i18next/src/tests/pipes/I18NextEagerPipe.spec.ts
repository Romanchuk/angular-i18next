import { ApplicationInitStatus, ChangeDetectorRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { I18NextEagerPipe, I18NextModule, I18NEXT_NAMESPACE, I18NEXT_SCOPE, I18NEXT_SERVICE, ITranslationService, PipeOptions } from '../../lib';
import { I18N_PROVIDERS } from '../setup';


describe('I18NextEagerPipe', () => {
  let pipe: I18NextEagerPipe,
    service: ITranslationService,
    markForCheckSpy: jest.SpyInstance<any, unknown[]>;

  beforeEach(async () => {
      TestBed.configureTestingModule({
        imports: [I18NextModule.forRoot()],
        providers: [...I18N_PROVIDERS,
          { provide: ChangeDetectorRef, useValue: { detectChanges: () => { }, markForCheck: () => { } } }, {
            provide: I18NEXT_SCOPE,
            useValue: 'scope'
          },
          {
            provide: I18NEXT_NAMESPACE,
            useValue: 'ns'
          }],
      });

      // until https://github.com/angular/angular/issues/24218 is fixed
      await TestBed.inject(ApplicationInitStatus).donePromise;

      service = TestBed.inject(I18NEXT_SERVICE);
      pipe = TestBed.inject(I18NextEagerPipe);
      const changeDetector = TestBed.inject(ChangeDetectorRef);

      // So, I am spying directly on the prototype.
      markForCheckSpy = jest.spyOn(changeDetector, 'markForCheck');
  });

  it('should create the pipe', () => {
    expect(pipe).toBeTruthy();
  });

  describe('when called with key and options', () => {
    let result: string;
    let myOptions: PipeOptions;

    beforeEach(() => {
      myOptions = { defaultValue: 'value1' };

      result = pipe.transform('myKey', myOptions);
    });

    it('should call the translate service', () => {
      expect(service.t).toHaveBeenCalledWith(
        ['ns:scope.myKey', 'scope.myKey', 'ns:myKey', 'myKey'],
        myOptions
      );
    });

    it('should return the correct result', () => {
      expect(result).toBe('ns:scope.myKey');
    });

    describe('when the language changes', () => {
      beforeEach(() => {
        service.events.languageChanged.next('es');
        service.language = 'es';
      });

      it('should mark for check so it triggers the pipe transform', () => {
        expect(markForCheckSpy).toHaveBeenCalled();
      });

      describe('when the pipe gets triggered by change detection', () => {
        beforeEach(() => {
          jest.clearAllMocks();
          result = pipe.transform('myKey', myOptions);
        });

        it('should call the translate service', () => {
          expect(service.t).toHaveBeenCalledWith(
            ['ns:scope.myKey', 'scope.myKey', 'ns:myKey', 'myKey'],
            { defaultValue: 'value1' }
          );
        });

        it('should return the new result', () => {
          expect(result).toBe('ns:scope.myKey');
        });
      });
    });

    describe('when called with same key and options', () => {
      beforeEach(() => {
        jest.clearAllMocks();
        result = pipe.transform('myKey', myOptions);
      });

      it('should not call the translate service', () => {
        expect(service.t).not.toHaveBeenCalled();
      });

      it('should return the previously cached result', () => {
        expect(result).toBe('ns:scope.myKey');
      });
    });

    describe('when called with same key but different options', () => {
      beforeEach(() => {
        jest.clearAllMocks();
        result = pipe.transform('myKey', { defaultValue: 'value2' });
      });

      it('should call the translate service', () => {
        expect(service.t).toHaveBeenCalledWith(
          ['ns:scope.myKey', 'scope.myKey', 'ns:myKey', 'myKey'],
          { defaultValue: 'value2' }
        );
      });

      it('should return the new result', () => {
        expect(result).toBe('ns:scope.myKey');
      });
    });

    describe('when called with different key but same options', () => {
      beforeEach(() => {
        jest.clearAllMocks();
        result = pipe.transform('myKey2', myOptions);
      });

      it('should call the translate service', () => {
        expect(service.t).toHaveBeenCalledWith(
          ['ns:scope.myKey2', 'scope.myKey2', 'ns:myKey2', 'myKey2'],
          { defaultValue: 'value1' }
        );
      });

      it('should return the new result', () => {
        expect(result).toBe('ns:scope.myKey2');
      });
    });
  });

  describe('when called with only with key', () => {
    let result: string;

    beforeEach(() => {
      result = pipe.transform('myKey');
    });

    it('should call the translate service', () => {
      expect(service.t).toHaveBeenCalledWith(
        ['ns:scope.myKey', 'scope.myKey', 'ns:myKey', 'myKey'],
        {}
      );
    });

    it('should return the correct result', () => {
      expect(result).toBe('ns:scope.myKey');
    });

    describe('when called with same key', () => {
      beforeEach(() => {
        jest.clearAllMocks();
        result = pipe.transform('myKey');
      });

      it('should not call the translate service', () => {
        expect(service.t).not.toHaveBeenCalled();
      });

      it('should return the previously cached result', () => {
        expect(result).toBe('ns:scope.myKey');
      });
    });

    describe('when called with different key', () => {
      beforeEach(() => {
        jest.clearAllMocks();
        result = pipe.transform('myKey2');
      });

      it('should call the translate service', () => {
        expect(service.t).toHaveBeenCalledWith(
          ['ns:scope.myKey2', 'scope.myKey2', 'ns:myKey2', 'myKey2'],
          {}
        );
      });

      it('should return the new result', () => {
        expect(result).toBe('ns:scope.myKey2');
      });
    });
  });
});

