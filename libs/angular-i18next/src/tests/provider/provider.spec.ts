import { ChangeDetectorRef, inject, provideAppInitializer } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { MockI18NextService, withMock } from '../../../testing/src/public_api';
import {
  I18NEXT_ERROR_HANDLING_STRATEGY,
  I18NEXT_INSTANCE,
  I18NEXT_NAMESPACE,
  I18NEXT_NAMESPACE_RESOLVER,
  I18NEXT_SCOPE,
  I18NEXT_SERVICE,
  I18NextCapPipe,
  I18NextEagerPipe,
  I18NextFormatPipe,
  I18NextLoadResult,
  I18NextPipe,
  I18NextService,
  I18NextTitle,
  interpolationFormat,
  NativeErrorHandlingStrategy,
  provideI18Next,
  withCustomErrorHandlingStrategy,
  withTitle,
} from '../../lib/index';

describe('I18Next Provider', () => {
  describe('provideI18Next', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          ChangeDetectorRef,
          provideAppInitializer(() => {
            const i18next = inject(I18NEXT_SERVICE);
            let promise: Promise<I18NextLoadResult> = i18next.init({
              lng: 'en',
              interpolation: {
                format: interpolationFormat(),
              },
            });
            return promise;
          }),
          provideI18Next(),
        ],
      });
    });

    it('should provide default tokens', () => {
      const namespace = TestBed.inject(I18NEXT_NAMESPACE);
      const scope = TestBed.inject(I18NEXT_SCOPE);

      expect(namespace).toBe('');
      expect(scope).toBe('');
    });

    it('should provide i18next instance', () => {
      const instance = TestBed.inject(I18NEXT_INSTANCE);
      expect(instance).toBeTruthy();
    });

    it('should provide I18NextService with NativeErrorHandlingStrategy', () => {
      const service = TestBed.inject(I18NEXT_SERVICE);
      const strategy = TestBed.inject(I18NEXT_ERROR_HANDLING_STRATEGY);

      expect(service).toBeInstanceOf(I18NextService);
      expect(strategy).toBeInstanceOf(NativeErrorHandlingStrategy);
    });

    it('should provide all required pipes', () => {
      const i18nextPipe = TestBed.inject(I18NextPipe);
      const eagerPipe = TestBed.inject(I18NextEagerPipe);
      const capPipe = TestBed.inject(I18NextCapPipe);
      const formatPipe = TestBed.inject(I18NextFormatPipe);

      expect(i18nextPipe).toBeInstanceOf(I18NextPipe);
      expect(eagerPipe).toBeInstanceOf(I18NextEagerPipe);
      expect(capPipe).toBeInstanceOf(I18NextCapPipe);
      expect(formatPipe).toBeInstanceOf(I18NextFormatPipe);
    });

    it('should provide namespace resolver', (done) => {
      const resolver = TestBed.inject(I18NEXT_NAMESPACE_RESOLVER);
      expect(resolver).toBeTruthy();

      TestBed.runInInjectionContext(() => {
        resolver({
          data: {
            i18nextNamespaces: [],
          },
        }).then(() => {
          done();
        });
    });
  });

  describe('withMock feature', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [provideI18Next(withMock())],
      });
    });

    it('should provide MockI18NextService', () => {
      const service = TestBed.inject(I18NEXT_SERVICE);
      expect(service).toBeInstanceOf(MockI18NextService);
    });
  });

  describe('withTitle feature', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [provideI18Next(withTitle())],
      });
    });

    it('should provide I18NextTitle service', () => {
      const title = TestBed.inject(Title);
      expect(title).toBeInstanceOf(I18NextTitle);
    });
  });

  describe('withCustomErrorHandlingStrategy feature', () => {
      class CustomErrorStrategy extends NativeErrorHandlingStrategy {}

      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            provideI18Next(withCustomErrorHandlingStrategy(CustomErrorStrategy)),
          ],
        });
      });

      it('should use the custom error handling strategy', () => {
        const strategy = TestBed.inject(I18NEXT_ERROR_HANDLING_STRATEGY);
        expect(strategy).toBeInstanceOf(CustomErrorStrategy);
      });
    });
  });
});
