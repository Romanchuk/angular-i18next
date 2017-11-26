import { I18NextService } from './../../src/I18NextService';
import { I18NextPipe } from './../../src/I18NextPipe';

// Be descriptive with titles here. The describe and it titles combined read like a sentence.
describe('I18nService', function() {

    it('should init', function(done) {
        let service = new I18NextService();
        service.init().then(result => {
           done();
        });
    });

    it('should trigger initialize event', function(done) {
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

    it('should load namespace', function(done) {
        let service = new I18NextService();
        service.loadNamespaces(['somens']).then(() => {
            done();
        });
    });
});
