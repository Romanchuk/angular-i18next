import { ChangeDetectorRef } from '@angular/core';
import { ITranslationEvents, PipeOptions } from '../../lib/index';
import { I18NextEagerPipe } from '../../lib/I18NextEagerPipe';
import { BehaviorSubject } from 'rxjs';
import { MockI18NextService } from '../mocks/MockTranslationService';

describe('I18NextEagerPipe', () => {
  let pipe: I18NextEagerPipe,
    languageChangedSubject: BehaviorSubject<string>,
    changeDetector: ChangeDetectorRef,
    service: MockI18NextService;

  beforeEach(() => {
    service = new MockI18NextService();
    service.language = 'en';
    languageChangedSubject = new BehaviorSubject<string>('en');

    const scope: string = 'scope';
    const ns: string = 'ns';
    service.events = {
      languageChanged: languageChangedSubject,
    } as ITranslationEvents;

    // changeDetector = jasmine.createSpyObj<ChangeDetectorRef>(['markForCheck']);
    //pipe = new I18NextEagerPipe(service, ns, scope, changeDetector);
  });

  it('should create the pipe', () => {
    expect(pipe).toBeTruthy();
  });

  describe('when called with key and options', () => {
    let result: string;
    let myOptions: PipeOptions;

    beforeEach(() => {
      myOptions = { myValue: 'value1' };

      result = pipe.transform('myKey', myOptions);
    });

    it('should call the translate service', () => {
      expect(service.t).toHaveBeenCalledWith(
        ['ns:scope.myKey', 'scope.myKey', 'ns:myKey', 'myKey'],
        { myValue: 'value1' }
      );
    });

    it('should return the correct result', () => {
      expect(result).toBe('ns:scope.myKey');
    });

    describe('when the language changes', () => {
      beforeEach(() => {
        languageChangedSubject.next('es');
        service.language = 'es';
      });

      it('should mark for check so it triggers the pipe transform', () => {
        expect(changeDetector.markForCheck).toHaveBeenCalled();
      });

      describe('when the pipe gets triggered by change detection', () => {
        beforeEach(() => {
          service.t.calls.reset();
          result = pipe.transform('myKey', myOptions);
        });

        it('should call the translate service', () => {
          expect(service.t).toHaveBeenCalledWith(
            ['ns:scope.myKey', 'scope.myKey', 'ns:myKey', 'myKey'],
            { myValue: 'value1' }
          );
        });

        it('should return the new result', () => {
          expect(result).toBe('ns:scope.myKey');
        });
      });
    });

    describe('when called with same key and options', () => {
      beforeEach(() => {
        service.t.calls.reset();
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
        service.t.calls.reset();
        result = pipe.transform('myKey', { myValue: 'value2' });
      });

      it('should call the translate service', () => {
        expect(service.t).toHaveBeenCalledWith(
          ['ns:scope.myKey', 'scope.myKey', 'ns:myKey', 'myKey'],
          { myValue: 'value2' }
        );
      });

      it('should return the new result', () => {
        expect(result).toBe('ns:scope.myKey');
      });
    });

    describe('when called with different key but same options', () => {
      beforeEach(() => {
        service.t.calls.reset();
        result = pipe.transform('myKey2', myOptions);
      });

      it('should call the translate service', () => {
        expect(service.t).toHaveBeenCalledWith(
          ['ns:scope.myKey2', 'scope.myKey2', 'ns:myKey2', 'myKey2'],
          { myValue: 'value1' }
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
        service.t.calls.reset();
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
        service.t.calls.reset();
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
