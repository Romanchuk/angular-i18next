import { APP_INITIALIZER, LOCALE_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DOCUMENT, Title } from '@angular/platform-browser';

import { I18NEXT_SERVICE, I18NextModule, ITranslationService, I18NextPipe } from '../../src';

const i18nextOptions = {
    lng: 'cimode',
    debug: true
};
export function appInit(i18next: ITranslationService) {
    return () => i18next
        .init(i18nextOptions);
}
export function localeIdFactory(i18next: ITranslationService)  {
    return i18next.language;
}
export const I18N_PROVIDERS: any = [
    {
        provide: APP_INITIALIZER,
        useFactory: appInit,
        deps: [I18NEXT_SERVICE],
        multi: true
    },
    {
        provide: LOCALE_ID,
        deps: [I18NEXT_SERVICE],
        useFactory: localeIdFactory
    }
];

// Be descriptive with titles here. The describe and it titles combined read like a sentence.
describe('I18nService', function() {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [I18NextModule.forRoot()],
            providers: [I18N_PROVIDERS]
        });
    });

    it('should trigger initialize event', function(done) {
        let service: ITranslationService = TestBed.get(I18NEXT_SERVICE);
        service.events.initialized.subscribe(isInited => {
            if (isInited)
                done();
        });
        service.init(i18nextOptions);
    });

    it('should init', function(done) {
        let service: ITranslationService = TestBed.get(I18NEXT_SERVICE);
        service.init().then(result => {
            expect(service.options).toBeTruthy();
            done();
        });
    });

    it('should load namespace', function(done) {
        let service: ITranslationService = TestBed.get(I18NEXT_SERVICE);
        service.events.initialized.subscribe((value) => {
            if (value) {
                service.loadNamespaces(['somens']).then(() => {
                    done();
                });
            }
        });
    });

    it('should translate', function(done) {
        let service: ITranslationService = TestBed.get(I18NEXT_SERVICE);
        let title: Title = TestBed.get(Title);
        let i18nextPipe: I18NextPipe = TestBed.get(I18NextPipe);
        const key = 'test';
        service.events.initialized.subscribe((value) => {
            if (value) {
                // service
                const serviceResult = service.t(key);
                expect(serviceResult).toEqual('test');
                const serviceResult2 = service.t([key, key + '2']);
                expect(serviceResult2).toEqual('test2');
                // pipes
                const pipeResult = i18nextPipe.transform(key);
                expect(pipeResult).toEqual('test');
                // title
                title.setTitle('test');
                let document: Document = TestBed.get(DOCUMENT);
                expect(document.title).toEqual('test');
                done();
            }
        });
    });
});
