import { TestBed } from '@angular/core/testing';
import { i18NextNamespacesGuard, I18NEXT_SERVICE } from '../../lib';
import { MockI18NextService } from '../mocks/MockTranslationService';

describe('i18NextNamespacesGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: I18NEXT_SERVICE, useClass: MockI18NextService }],
    });
  });

  it('should return true and load namespaces', (done) => {
    const guard = i18NextNamespacesGuard('test_ns');
    const i18NextService = TestBed.inject(I18NEXT_SERVICE);

    TestBed.runInInjectionContext(() => guard()).then((response: unknown) => {
      expect(i18NextService.loadNamespaces).toHaveBeenCalledWith(['test_ns']);
      expect(response).toBe(true);
      done();
    });
  });

  it('should filter out falsy namespaces', (done) => {
    const guard = i18NextNamespacesGuard('test_ns_1', '', 'test_ns_2');
    const i18NextService = TestBed.inject(I18NEXT_SERVICE);

    TestBed.runInInjectionContext(() => guard()).then(() => {
      expect(i18NextService.loadNamespaces).toHaveBeenCalledWith([
        'test_ns_1',
        'test_ns_2',
      ]);
      done();
    });
  });

  it('should return false when namespaces fail to load', (done) => {
    const guard = i18NextNamespacesGuard('test_ns_1', '', 'test_ns_2');
    const i18NextService = TestBed.inject(I18NEXT_SERVICE);
    i18NextService.loadNamespaces = jest.fn(() => Promise.reject());

    TestBed.runInInjectionContext(() => guard()).then((response) => {
      expect(response).toBe(false);

      done();
    });
  });
});
