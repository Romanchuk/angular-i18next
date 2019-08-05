import { FactoryProvider } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';

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
} from '../../src/index';
import { MockI18NextService } from './../mocks/MockTranslationService';

xdescribe('I18NextModule', function() {
  const DEFAULT_NAMESPACE = '';
  const DEFAULT_SCOPE = '';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18NextModule.forRoot()]
    });
  });

  it('should provide tokens with default values', function(){
    let tokenNs = TestBed.get(I18NEXT_NAMESPACE);
    expect(tokenNs).toEqual(DEFAULT_NAMESPACE);
    let tokenScope = TestBed.get(I18NEXT_SCOPE);
    expect(tokenScope).toEqual(DEFAULT_SCOPE);
  });

  it('should provide I18NextService', function() {
    let i18nextService = TestBed.get(I18NEXT_SERVICE);
    expect(i18nextService).not.toBeNull();
    let i18nextService2 = TestBed.get(I18NextService);
    expect(i18nextService2).not.toBeNull();
  });

  it('should provide pipes', function() {
    let i18nextPipe = TestBed.get(I18NextPipe);
    expect(i18nextPipe).not.toBeNull();
    let i18nextCapPipe = TestBed.get(I18NextCapPipe);
    expect(i18nextCapPipe).not.toBeNull();
    let i18nextFormatPipe = TestBed.get(I18NextFormatPipe);
    expect(i18nextFormatPipe).not.toBeNull();
  });

  it('should provide title', function() {
    let title: I18NextTitle = TestBed.get(I18NextTitle);
    expect(title).toBeTruthy();
    expect(title instanceof I18NextTitle).toBeTruthy();
  });

  it('should have default formatters', function() {
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
    let noFormat2 = defaultInterpolationFormat('test', null);
    let noFormat3 = defaultInterpolationFormat('test', 'none');
    expect(noFormat).toEqual('test');
    expect(noFormat).toEqual(noFormat2);
    expect(noFormat).toEqual(noFormat3);
  });

  it('should support interpolation custom formatters', function() {
    const valueParam = 'test';
    const formatParam = 'cap';
    const lngParam = 'en';
    let customFormat = function (value, format, lng) {
        expect(value).toEqual('Test');
        expect(format).toEqual(formatParam);
        expect(lng).toEqual(lngParam);

        return `$${value}$`;
    };
    let formatFunc = I18NextModule.interpolationFormat(customFormat);
    let result = formatFunc(valueParam, formatParam, lngParam);
    expect(result).toBe('$Test$');
  });

  it('should provide resolver', function(done) {
    let resolver: Function = TestBed.get(I18NEXT_NAMESPACE_RESOLVER);
    expect(resolver).toBeTruthy();
    resolver({
      data: {
        i18nextNamespaces: []
      }
    }).then(() => {
      done();
    });
  });
});
