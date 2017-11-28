import { TestBed } from '@angular/core/testing';

import {
    I18NEXT_NAMESPACE,
    I18NEXT_SCOPE,
    I18NEXT_SERVICE,
    I18NextCapPipe,
    I18NextFormatPipe,
    I18NextModule,
    I18NextPipe,
    I18NextService,
} from '../../src/index';

// Be descriptive with titles here. The describe and it titles combined read like a sentence.
describe('I18NextModule', function() {
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

  it('should support interpolation format and custom formatters', function() {
    let customFormat = function (value, format, lng) {
        return `$${value}$`;
    };
    let formatFunc = I18NextModule.interpolationFormat(customFormat);
    let result = formatFunc('test', 'cap');
    expect(result).toBe('$Test$');
  });

});
