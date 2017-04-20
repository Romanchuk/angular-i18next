import { I18NextPipe } from './../../src/I18NextPipe';

// Be descriptive with titles here. The describe and it titles combined read like a sentence.
describe('Users factory', function() {
  it('has a dummy spec to test 2 + 2', function() {
    // An intentionally failing test. No code within expect() will never equal 4.
    expect(4).toEqual(4);
  });

  it('fff', function(){
      let a = new I18NextPipe(null, '', '');
      expect(a).toBeDefined();
  });
});
