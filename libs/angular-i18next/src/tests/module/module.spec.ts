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
    let tokenNs = TestBed.inject(I18NEXT_NAMESPACE);
    expect(tokenNs).toEqual(DEFAULT_NAMESPACE);
    let tokenScope = TestBed.inject(I18NEXT_SCOPE);
    expect(tokenScope).toEqual(DEFAULT_SCOPE);
  });

  it('should provide I18NextService', () => {
    let i18nextService = TestBed.inject(I18NEXT_SERVICE);
    expect(i18nextService).not.toBeNull();
    let i18nextService2 = TestBed.inject(I18NextService);
    expect(i18nextService2).not.toBeNull();
  });

  it('should provide pipes',  () =>  {
    let i18nextPipe = TestBed.inject(I18NextPipe);
    expect(i18nextPipe).not.toBeNull();
    let i18nextCapPipe = TestBed.inject(I18NextCapPipe);
    expect(i18nextCapPipe).not.toBeNull();
    let i18nextFormatPipe = TestBed.inject(I18NextFormatPipe);
    expect(i18nextFormatPipe).not.toBeNull();
  });

  it('should provide title',  () => {
    let title: I18NextTitle = TestBed.inject(I18NextTitle);
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

    let lowercaseTest = defaultInterpolationFormat('TEST', 'lower');
    let lowercase2Test = defaultInterpolationFormat('TEST', 'lowercase');
    expect(lowercaseTest).toEqual('test');
    expect(lowercaseTest).toEqual(lowercase2Test);

    let noFormat = defaultInterpolationFormat('test', undefined);
    let noFormat2 = defaultInterpolationFormat('test', 'none');
    expect(noFormat).toEqual('test');
    expect(noFormat).toEqual(noFormat2);
  });

  it('should support interpolation custom formatters', () =>  {
    const valueParam = 'test';
    const formatParam = 'cap';
    const lngParam = 'en';
    let customFormat = function (value: any, format: any, lng: any) {
      expect(value).toEqual('Test');
      expect(format).toEqual(formatParam);
      expect(lng).toEqual(lngParam);

      return `$${value}$`;
    };
    let formatFunc = I18NextModule.interpolationFormat(customFormat);
    let result = formatFunc(valueParam, formatParam, lngParam);
    expect(result).toBe('$Test$');
  });

  it('should provide resolver', (done) => {
    let resolver =  TestBed.inject(I18NEXT_NAMESPACE_RESOLVER);
    expect(resolver).toBeTruthy();
    resolver({
      data: {
        i18nextNamespaces: [],
      },
    }).then(() => {
      done();
    });
  });
});
