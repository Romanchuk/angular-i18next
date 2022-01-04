import { I18NextCapPipe } from './../../lib/I18NextCapPipe';
import { I18NextPipe } from './../../lib/I18NextPipe';
import { MockI18NextService } from '../mocks/MockTranslationService';

// TODO: use TestBed

describe('I18NextPipe tests', function () {
  let service = new MockI18NextService();
  const DEFAULT_NAMESPACE = '';
  const DEFAULT_SCOPE = '';

  it('transform', function () {
    const pipe = new I18NextPipe(service, DEFAULT_NAMESPACE, DEFAULT_SCOPE);
    const key = 'test';
    const transResult = pipe.transform(key, null);
    expect(transResult).toEqual(key);
  });

  it('format options', function () {
    const pipe = new I18NextPipe(service, DEFAULT_NAMESPACE, DEFAULT_SCOPE);
    const capPipe = new I18NextCapPipe(
      service,
      DEFAULT_NAMESPACE,
      DEFAULT_SCOPE
    );
    const key = 'test';
    const transResult = pipe.transform(key, { format: 'cap' });
    const transCapResult = capPipe.transform(key);
    expect(transResult).toEqual(transCapResult);
    expect(transResult).toEqual('Test');
  });

  it('namespace prefix', function () {
    const namespace = 'error';
    const pipe = new I18NextPipe(service, namespace, DEFAULT_SCOPE);
    const key = 'test';
    const transResult = pipe.transform(key);
    expect(transResult).toEqual(namespace + service.options.nsSeparator + key);
    // for array key
    const arrayKey = ['test_1', 'test_2'];
    const arrResult = pipe.transform(arrayKey);
    expect(arrResult).toEqual(
      namespace + service.options.nsSeparator + arrayKey[0]
    );
  });

  it('ignore namespace param if key already contains it', function () {
    const namespace = 'error';
    const pipe = new I18NextPipe(service, namespace, DEFAULT_SCOPE);
    const realns = 'realns';
    const keyWithNamespace = [realns, 'test'].join(service.options.nsSeparator);
    const transResult = pipe.transform(keyWithNamespace);
    expect(transResult).toEqual(keyWithNamespace);
  });

  it('scope prefix', function () {
    const scope = 'scope';
    const pipe = new I18NextPipe(service, DEFAULT_NAMESPACE, scope);
    const key = 'test';
    const transResult = pipe.transform(key);
    expect(transResult).toEqual(scope + service.options.keySeparator + key);
    // for array key
    const arrayKey = ['test_1', 'test_2'];
    const arrResult = pipe.transform(arrayKey);
    expect(arrResult).toEqual(
      scope + service.options.keySeparator + arrayKey[0]
    );
  });

  it('ns and scope prefix', function () {
    const scope = 'scope';
    const ns = 'ns';
    const pipe = new I18NextPipe(service, ns, scope);
    const key = 'test';
    const transResult = pipe.transform(key);
    expect(transResult).toEqual(
      [ns, [scope, key].join(service.options.keySeparator)].join(
        service.options.nsSeparator
      )
    );
  });

  it('ns and scope prefix (arrays)', function () {
    const scope = ['scope1', 'scope2'];
    const ns = ['ns1', 'ns2'];
    const pipe = new I18NextPipe(service, ns, scope);
    const key = 'test';
    const transResult = pipe.transform(key);
    expect(transResult).toEqual(
      [ns[0], [scope[0], key].join(service.options.keySeparator)].join(
        service.options.nsSeparator
      )
    );
  });

  it('ns and scope no prefix (prependScope = false and prependNamespace = false)', function () {
    const scope = 'scope';
    const ns = 'ns';
    const pipe = new I18NextPipe(service, ns, scope);
    const key = 'test';
    const transResult = pipe.transform(key, {
      prependScope: false,
      prependNamespace: false,
    });
    expect(transResult).toEqual(transResult);
  });
});
