import { I18NextService } from './../../src/I18NextService';
import { I18NextPipe } from './../../src/I18NextPipe';

// Be descriptive with titles here. The describe and it titles combined read like a sentence.
describe('I18nService tests', function() {

    it('success init', function(done) {
        let service = new I18NextService();
        service.init().then(result => {
           done();
        });
    });

    it('success event trigger', function(done) {
        let service = new I18NextService();
        let options = {};
        let expectedInitStatus = false;
        service.events.initialized.subscribe(isInited => {
            expect(isInited).toBe(expectedInitStatus);
            expectedInitStatus = !expectedInitStatus;
            if (isInited)
                done();
        });
        service.init(options);
    });
});
