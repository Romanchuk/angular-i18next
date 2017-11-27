import { I18NextCapPipe } from './../../src/I18NextCapPipe';
import { I18NextPipe } from './../../src/I18NextPipe';
import { MockI18NextService } from '../mocks/MockTranslationService';


// Be descriptive with titles here. The describe and it titles combined read like a sentence.
describe('I18NextPipe tests', function() {
  let service = new MockI18NextService();
  const DEFAULT_NAMESPACE = '';
  const DEFAULT_SCOPE = '';

  it('transform', function(){
      let pipe = new I18NextPipe(service, DEFAULT_NAMESPACE, DEFAULT_SCOPE);
      let key = 'test';
      let transResult = pipe.transform(key, null);
      expect(transResult).toEqual(key);
  });

  it('case options', function(){
      let pipe = new I18NextPipe(service, DEFAULT_NAMESPACE, DEFAULT_SCOPE);
      let capPipe = new I18NextCapPipe(service, DEFAULT_NAMESPACE, DEFAULT_SCOPE);
      let key = 'test';
      let transResult = pipe.transform(key, { format: 'cap' });
      let transCapResult = capPipe.transform(key);
      expect(transResult[0]).toEqual(key[0].toUpperCase());
      expect(transResult).toEqual(transCapResult);
  });

  it('namespace prefix', function(){
      let namespace = 'error';
      let pipe = new I18NextPipe(service, namespace, DEFAULT_SCOPE);
      let key = 'test';
      let transResult = pipe.transform(key);
      expect(transResult.startsWith(namespace + service.options.nsSeparator)).toBeTruthy();
      // for array key
      let arrayKey = ['test_1', 'test_2'];
      let arrResult = pipe.transform(key);
      expect(arrResult.startsWith(namespace + service.options.nsSeparator)).toBeTruthy();
  });


  it('ignore namespace param if key already contains it', function(){
      let namespace = 'error';
      let pipe = new I18NextPipe(service, namespace, DEFAULT_SCOPE);
      let realns = 'realns';
      let key = [realns, 'test'].join(service.options.nsSeparator);
      let transResult = pipe.transform(key);
      expect(transResult.startsWith(realns + service.options.nsSeparator)).toBeTruthy();
  });

  it('scope prefix', function(){
      let scope = 'scope';
      let pipe = new I18NextPipe(service, DEFAULT_NAMESPACE, scope);
      let key = 'test';
      let transResult = pipe.transform(key);
      expect(transResult.startsWith(scope + service.options.keySeparator)).toBeTruthy();
      // for array key
      let arrayKey = ['test_1', 'test_2'];
      let arrResult = pipe.transform(arrayKey);
      expect(arrResult.startsWith(scope + service.options.keySeparator)).toBeTruthy();
  });

  it('ns and scope prefix', function(){
      let scope = 'scope';
      let ns = 'ns';
      let pipe = new I18NextPipe(service, ns, scope);
      let key = 'test';
      let transResult = pipe.transform(key);
      expect(transResult).toEqual([ns, [scope, key].join(service.options.keySeparator)].join(service.options.nsSeparator));
  });

  it('ns and scope no prefix (prependScope = false and prependNamespace = false)', function(){
      let scope = 'scope';
      let ns = 'ns';
      let pipe = new I18NextPipe(service, ns, scope);
      let key = 'test';
      let transResult = pipe.transform(key, {
        prependScope: false,
        prependNamespace: false
      });
      expect(transResult).toEqual(transResult);
  });
});
