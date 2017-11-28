import { APP_INITIALIZER, LOCALE_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { I18NEXT_SERVICE, I18NextService, ITranslationService, I18NextModule } from '../../src/index';

// const i18nextOptions = {
//     lng: 'cimode',
//     debug: true
// };

// export function appInit(i18next: ITranslationService) {
//     return () => i18next
//         .init(i18nextOptions);
// }

// export function localeIdFactory(i18next: ITranslationService)  {
//     return i18next.language;
// }

// export const I18N_PROVIDERS: any = [
//     {
//         provide: APP_INITIALIZER,
//         useFactory: appInit,
//         deps: [I18NEXT_SERVICE],
//         multi: true
//     },
//     {
//         provide: LOCALE_ID,
//         deps: [I18NEXT_SERVICE],
//         useFactory: localeIdFactory
//     }
// ];

// Be descriptive with titles here. The describe and it titles combined read like a sentence.
describe('I18nService', function() {

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [I18NextModule.forRoot()],
            // providers: [I18N_PROVIDERS]
        });

        // create component and test fixture
        // fixture = TestBed.createComponent(LoginComponent);

        // get test component from the fixture
        // component = fixture.componentInstance;

        // UserService provided to the TestBed
        // authService = TestBed.get(AuthService);

    });

    it('should init', function(done) {
        let service: ITranslationService = TestBed.get(I18NEXT_SERVICE);
        service.init().then(result => {
           done();
        });
    });

    it('should trigger initialize event', function(done) {
        let service: ITranslationService = TestBed.get(I18NEXT_SERVICE);
        let expectedInitStatus = false;
        service.events.initialized.subscribe(isInited => {
            expect(isInited).toBe(expectedInitStatus);
            expectedInitStatus = !expectedInitStatus;
            if (isInited)
                done();
        });
        service.init({
            lng: 'cimode',
            debug: true
        });
    });

    it('should load namespace', function(done) {
        let service: ITranslationService = TestBed.get(I18NEXT_SERVICE);
        service.loadNamespaces(['somens']).then(() => {
            done();
        });
    });
});
