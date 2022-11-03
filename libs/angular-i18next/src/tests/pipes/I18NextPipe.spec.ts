import { ApplicationInitStatus } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { I18NextCapPipe, I18NextModule, I18NextPipe, I18NEXT_NAMESPACE, I18NEXT_SCOPE, I18NEXT_SERVICE, ITranslationService } from '../../lib';
import { I18N_PROVIDERS } from '../setup';


describe('I18NextPipe tests', function () {

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [I18NextModule.forRoot()],
      providers: [...I18N_PROVIDERS],
    });

  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('transform', async () => {
    // until https://github.com/angular/angular/issues/24218 is fixed
    await TestBed.inject(ApplicationInitStatus).donePromise;

    const pipe = TestBed.inject(I18NextPipe);
    const key = 'test';
    const transResult = pipe.transform(key);
    expect(transResult).toEqual(key);
  });

  it('format options', async () => {
    // until https://github.com/angular/angular/issues/24218 is fixed
    await TestBed.inject(ApplicationInitStatus).donePromise;

    const pipe = TestBed.inject(I18NextPipe);
    const capPipe = TestBed.inject(I18NextCapPipe);
    const key = 'test';
    const pipeResult = pipe.transform(key, { format: 'cap' });
    const capPipeResult = capPipe.transform(key);
    expect(pipeResult).toEqual(capPipeResult);
    const keyCap = key.charAt(0).toUpperCase() + key.slice(1);
    expect(pipeResult).toEqual(keyCap);
  });


  it('namespace prefix', async () => {
    const namespace = 'error';
    TestBed.overrideProvider(I18NEXT_NAMESPACE, {
      useValue: namespace
    });

    // until https://github.com/angular/angular/issues/24218 is fixed
    await TestBed.inject(ApplicationInitStatus).donePromise;

    await TestBed.compileComponents();

    const pipe = TestBed.inject(I18NextPipe);
    const service = TestBed.inject(I18NEXT_SERVICE)
    const key = 'test';

    const transResult = pipe.transform(key);
    expect(transResult).toEqual(buildKeyWithNs(service, namespace, key));
    // for array key
    const arrayKey = ['test_1', 'test_2'];
    const arrResult = pipe.transform(arrayKey);
    expect(arrResult).toEqual(buildKeyWithNs(service, namespace, arrayKey[0]));
  });



  it('ignore namespace param if key already contains it', async () => {
    const namespace = 'error';
    TestBed.overrideProvider(I18NEXT_NAMESPACE, {
      useValue: namespace
    });

    // until https://github.com/angular/angular/issues/24218 is fixed
    await TestBed.inject(ApplicationInitStatus).donePromise;

    const pipe = TestBed.inject(I18NextPipe);
    const realns = 'realns';
    const service = TestBed.inject(I18NEXT_SERVICE);
    const key = [realns, 'test'].join(service.options.keySeparator || '.');
    const transResult = pipe.transform(key);
    expect(transResult).toEqual(buildKeyWithNs(service, namespace, key));
  });



  it('scope prefix', async () => {
    const scope = 'scope';
    TestBed.overrideProvider(I18NEXT_SCOPE, {
      useValue: scope
    });

    // until https://github.com/angular/angular/issues/24218 is fixed
    await TestBed.inject(ApplicationInitStatus).donePromise;

    const pipe = TestBed.inject(I18NextPipe);
    const service = TestBed.inject(I18NEXT_SERVICE);
    const key = 'test';
    // for primitive key
    const transResult = pipe.transform(key);
    expect(transResult).toEqual([scope, key].join(service.options.keySeparator || '.'));
    // for array key
    const arrayKey = ['test_1', 'test_2'];
    const arrResult = pipe.transform(arrayKey);
    expect(arrResult).toEqual([scope, arrayKey[0]].join(service.options.keySeparator || '.'));
  });

  it('ns and scope prefix', async () => {
    const scope = 'scope';
    const ns = 'ns';
    TestBed.overrideProvider(I18NEXT_SCOPE, {
      useValue: scope
    });
    TestBed.overrideProvider(I18NEXT_NAMESPACE, {
      useValue: ns
    });

    // until https://github.com/angular/angular/issues/24218 is fixed
    await TestBed.inject(ApplicationInitStatus).donePromise;

    const pipe = TestBed.inject(I18NextPipe);
    const service = TestBed.inject(I18NEXT_SERVICE);
    const key = 'test';
    const transResult = pipe.transform(key);
    expect(transResult).toEqual(buildKeyWithNs(service, ns, [scope, key].join(service.options.keySeparator || '.')));
  });

  it('ns and scope prefix (arrays)', async () => {
    const scope = ['scope1', 'scope2'];
    const ns = ['ns1', 'ns2'];
    TestBed.overrideProvider(I18NEXT_SCOPE, {
      useValue: scope
    });
    TestBed.overrideProvider(I18NEXT_NAMESPACE, {
      useValue: ns
    });

    // until https://github.com/angular/angular/issues/24218 is fixed
    await TestBed.inject(ApplicationInitStatus).donePromise;

    const pipe = TestBed.inject(I18NextPipe);
    const service = TestBed.inject(I18NEXT_SERVICE);
    const key = 'test';
    const transResult = pipe.transform(key);
    expect(transResult).toEqual(buildKeyWithNs(service, ns[0], [scope[0], key].join(service.options.keySeparator || '.')));
  });

  it('ns and scope no prefix (prependScope = false and prependNamespace = false)', async () => {
    const scope = 'scope';
    const ns = 'ns';
    TestBed.overrideProvider(I18NEXT_SCOPE, {
      useValue: scope
    });
    TestBed.overrideProvider(I18NEXT_NAMESPACE, {
      useValue: ns
    });

    // until https://github.com/angular/angular/issues/24218 is fixed
    await TestBed.inject(ApplicationInitStatus).donePromise;

    const pipe = TestBed.inject(I18NextPipe);
    const service = TestBed.inject(I18NEXT_SERVICE);
    const key = 'test';
    const transResult = pipe.transform(key, {
      prependScope: false,
      prependNamespace: false,
    });
    expect(transResult).toEqual(key);
  });

});

function buildKeyWithNs(service: ITranslationService, ns: string, key: string): string {
  return `${ns}${service.options.nsSeparator}${key}`;
}

