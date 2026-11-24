import { TestBed } from '@angular/core/testing';
import {
  defaultInterpolationFormat,
  I18NEXT_NAMESPACE,
  I18NEXT_NAMESPACE_RESOLVER,
  I18NEXT_SCOPE,
  I18NEXT_SERVICE,
  I18NextCapPipe,
  I18NextFormatPipe,
  I18NextModule,
  I18NextPipe,
  I18NextService,
  I18NextTitle,
} from '../../lib/index';

describe('I18NextModule', () => {
  const DEFAULT_NAMESPACE = '';
  const DEFAULT_SCOPE = '';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18NextModule.forRoot()],
    });
  });

  it('should provide tokens with default values', () =>  {
    const tokenNs = TestBed.inject(I18NEXT_NAMESPACE);
    expect(tokenNs).toEqual(DEFAULT_NAMESPACE);
    const tokenScope = TestBed.inject(I18NEXT_SCOPE);
    expect(tokenScope).toEqual(DEFAULT_SCOPE);
  });

  it('should provide I18NextService', () => {
    const i18nextService = TestBed.inject(I18NEXT_SERVICE);
    expect(i18nextService).not.toBeNull();
    const i18nextService2 = TestBed.inject(I18NextService);
    expect(i18nextService2).not.toBeNull();
  });

  it('should provide pipes',  () =>  {
    const i18nextPipe = TestBed.inject(I18NextPipe);
    expect(i18nextPipe).not.toBeNull();
    const i18nextCapPipe = TestBed.inject(I18NextCapPipe);
    expect(i18nextCapPipe).not.toBeNull();
    const i18nextFormatPipe = TestBed.inject(I18NextFormatPipe);
    expect(i18nextFormatPipe).not.toBeNull();
  });

  it('should provide title',  () => {
    const title: I18NextTitle = TestBed.inject(I18NextTitle);
    expect(title).toBeTruthy();
    expect(title instanceof I18NextTitle).toBeTruthy();
  });

  it('should have default formatters',  () =>  {
    const capitalizedTest = defaultInterpolationFormat('test', 'cap');
    const capitalized2Test = defaultInterpolationFormat('test', 'capitalize');
    expect(capitalizedTest).toEqual('Test');
    expect(capitalizedTest).toEqual(capitalized2Test);

    const uppercaseTest = defaultInterpolationFormat('test', 'upper');
    const uppercase2Test = defaultInterpolationFormat('test', 'uppercase');
    expect(uppercaseTest).toEqual('TEST');
    expect(uppercaseTest).toEqual(uppercase2Test);

    const lowercaseTest = defaultInterpolationFormat('TEST', 'lower');
    const lowercase2Test = defaultInterpolationFormat('TEST', 'lowercase');
    expect(lowercaseTest).toEqual('test');
    expect(lowercaseTest).toEqual(lowercase2Test);

    const noFormat = defaultInterpolationFormat('test', undefined);
    const noFormat2 = defaultInterpolationFormat('test', 'none');
    expect(noFormat).toEqual('test');
    expect(noFormat).toEqual(noFormat2);
  });

  it('should support interpolation custom formatters', () =>  {
    const valueParam = 'test';
    const formatParam = 'cap';
    const lngParam = 'en';
    const customFormat = function (value: any, format: any, lng: any) {
      expect(value).toEqual('Test');
      expect(format).toEqual(formatParam);
      expect(lng).toEqual(lngParam);

      return `$${value}$`;
    };
    const formatFunc = I18NextModule.interpolationFormat(customFormat);
    const result = formatFunc(valueParam, formatParam, lngParam);
    expect(result).toBe('$Test$');
  });

  it('should provide resolver', (done) => {
    const resolver =  TestBed.inject(I18NEXT_NAMESPACE_RESOLVER);
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
});
