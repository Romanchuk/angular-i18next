import { ChangeDetectorRef, Component, DebugElement } from '@angular/core';
import { TestBed, ComponentFixture, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { I18NextPipe } from '../../src/I18NextPipe';
import { I18NextCapPipe } from '../../src/I18NextCapPipe';
import { I18NextFormatPipe } from '../../src/I18NextFormatPipe';
import { I18NextService } from '../../src/I18NextService';
import { ITranslationService } from '../../src/ITranslationService';
import { I18NEXT_SERVICE, I18NEXT_NAMESPACE, I18NEXT_SCOPE } from '../../src/I18NEXT_TOKENS';
import { MockI18NextService } from '../mocks/MockTranslationService';
import { MockChangeDetectorRef } from '../mocks/MockChangeDetectorRef';


@Component({template: `<p>{{ 'test' | i18next }}</p>`})
class TestPipeCompontent {}

@Component({template: `<p>{{ 'test' | i18nextFormat:'cap' }}</p>`})
class TestFormatPipeCompontent {}

function before(namespace: string | string[] = '', scope: string | string[] = '') {
  return beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [I18NextPipe, I18NextCapPipe, I18NextFormatPipe, TestPipeCompontent, TestFormatPipeCompontent],
      providers: [
        I18NextPipe, I18NextCapPipe, I18NextFormatPipe,
        {provide: I18NextService, useClass: MockI18NextService},
        {provide: I18NEXT_SERVICE, useClass: MockI18NextService},
        {provide: I18NEXT_NAMESPACE, useValue: namespace},
        {provide: I18NEXT_SCOPE, useValue: scope},
        {provide: ChangeDetectorRef, useClass: MockChangeDetectorRef}
      ]
    });
  });
}

describe('I18NextPipe tests', () => {
  before();

  it('transform', inject([I18NextPipe], (pipe: I18NextPipe) => {
      const key = 'test';
      const transResult = pipe.transform(key, null);
      expect(transResult).toEqual(key);
  }));

  it('format options', inject([I18NextPipe, I18NextCapPipe], (pipe: I18NextPipe, capPipe: I18NextCapPipe) => {
      const key = 'test';
      const transResult = pipe.transform(key, { format: 'cap' });
      const transCapResult = capPipe.transform(key);
      expect(transResult).toEqual(transCapResult);
      expect(transResult).toEqual('Test');
  }));
});


describe('I18NextPipe tests', () => {
  const namespace = 'error';
  before(namespace);

  it('namespace prefix', inject([I18NextPipe, I18NextService], (pipe: I18NextPipe, service: I18NextService) => {
      const key = 'test';
      const transResult = pipe.transform(key);
      expect(transResult).toEqual(namespace + service.options.nsSeparator + key);
      // for array key
      const arrayKey = ['test_1', 'test_2'];
      const arrResult = pipe.transform(arrayKey);
      expect(arrResult).toEqual(namespace + service.options.nsSeparator + arrayKey[0]);
  }));

  it('ignore namespace param if key already contains it', inject([I18NextPipe, I18NextService],
    (pipe: I18NextPipe, service: I18NextService) => {
      const realns = 'realns';
      const keyWithNamespace = [realns, 'test'].join(service.options.nsSeparator);
      const transResult = pipe.transform(keyWithNamespace);
      expect(transResult).toEqual(keyWithNamespace);
  }));
});

describe('I18NextPipe tests', () => {
  const scope = 'scope';
  before('', scope);

  it('scope prefix', inject([I18NextPipe, I18NextService], (pipe: I18NextPipe, service: I18NextService) => {
      const key = 'test';
      const transResult = pipe.transform(key);
      expect(transResult).toEqual(scope + service.options.keySeparator + key);
      // for array key
      const arrayKey = ['test_1', 'test_2'];
      const arrResult = pipe.transform(arrayKey);
      expect(arrResult).toEqual(scope + service.options.keySeparator + arrayKey[0]);
  }));
});

describe('I18NextPipe tests', () => {
  const namespace = 'ns';
  const scope = 'scope';
  before(namespace, scope);

  it('ns and scope prefix', inject([I18NextPipe, I18NextService], (pipe: I18NextPipe, service: I18NextService) => {
      const key = 'test';
      const transResult = pipe.transform(key);
      expect(transResult).toEqual([namespace, [scope, key].join(service.options.keySeparator)].join(service.options.nsSeparator));
  }));

  it('ns and scope no prefix (prependScope = false and prependNamespace = false)', inject([I18NextPipe], (pipe: I18NextPipe) => {
      const key = 'test';
      const transResult = pipe.transform(key, {
        prependScope: false,
        prependNamespace: false
      });
      expect(transResult).toEqual(transResult);
  }));
});

describe('I18NextPipe tests', () => {
  const namespace = ['ns1', 'ns2'];
  const scope = ['scope1', 'scope2'];
  before(namespace, scope);

  it('ns and scope prefix (arrays)', inject([I18NextPipe, I18NextService], (pipe: I18NextPipe, service: I18NextService) => {
    const key = 'test';
    const transResult = pipe.transform(key);
    expect(transResult).toEqual([namespace[0], [scope[0], key].join(service.options.keySeparator)].join(service.options.nsSeparator));
  }));
});

describe('I18NextPipe tests', () => {
  let component: TestPipeCompontent;
  let fixture: ComponentFixture<TestPipeCompontent>;
  let el: DebugElement;
  let service: ITranslationService;

  before();
  beforeEach(() => {
    fixture = TestBed.createComponent(TestPipeCompontent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(I18NEXT_SERVICE);
    el = fixture.debugElement.query(By.css('p'));
  });

  it('detect changes', () => {
    expect(el.nativeElement.textContent).toBe('');
    fixture.detectChanges();
    expect(el.nativeElement.textContent).toBe('test');
    service.changeLanguage('lang').then(() => {
      fixture.detectChanges();
      expect(el.nativeElement.textContent).toBe('lang');
    });
  });
});

describe('I18NextPipe tests', () => {
  let component: TestFormatPipeCompontent;
  let fixture: ComponentFixture<TestFormatPipeCompontent>;
  let el: DebugElement;
  let service: ITranslationService;

  before();
  beforeEach(() => {
    fixture = TestBed.createComponent(TestFormatPipeCompontent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(I18NEXT_SERVICE);
    el = fixture.debugElement.query(By.css('p'));
  });

  it('detect changes', () => {
    expect(el.nativeElement.textContent).toBe('');
    fixture.detectChanges();
    expect(el.nativeElement.textContent).toBe('Test');
    service.changeLanguage('lang').then(() => {
      fixture.detectChanges();
      expect(el.nativeElement.textContent).toBe('Lang');
    });
  });
});
