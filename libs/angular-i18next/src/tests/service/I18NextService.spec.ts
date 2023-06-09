import { TestBed } from '@angular/core/testing';
import {
  I18NextModule, I18NEXT_SERVICE,
  ITranslationService
} from '../../lib';

const i18nextOptions: i18n.InitOptions = {
  lng: 'cimode',
  supportedLngs: ['cimode', 'en', 'ru'],
  appendNamespaceToCIMode: true
};
import * as i18n from 'i18next';


// Be descriptive with titles here. The describe and it titles combined read like a sentence.
describe('I18nService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18NextModule.forRoot()]
    });
  });

  it('should trigger initialize event', (done) => {
    const service: ITranslationService = TestBed.inject(I18NEXT_SERVICE);
    service.events.initialized.subscribe((isInited) => {
      if (isInited) done();
    });
    service.init(i18nextOptions);
  });


  it('should init', (done) => {
    const service: ITranslationService = TestBed.inject(I18NEXT_SERVICE);
    service.init(i18nextOptions).then(() => {
      expect(service.options).toBeTruthy();
      done();
    });
  });


  it('should load namespace', (done) => {
    const service: ITranslationService = TestBed.inject(I18NEXT_SERVICE);
    service.init(i18nextOptions).then(()=> {
      service.loadNamespaces(['somens']).then(() => {
        done();
      });
    });
  });


  it('should translate', (done) => {
    const service: ITranslationService = TestBed.inject(I18NEXT_SERVICE);
    const key = 'test';
    service.init(i18nextOptions).then(()=> {
        const serviceResult = service.t(key);
        expect(serviceResult).toEqual(`${service.options.defaultNS}${service.options.nsSeparator}test`);
        const serviceResult2 = service.t([key, key + '2']);
        expect(serviceResult2).toEqual(`${service.options.defaultNS}${service.options.nsSeparator}test2`);
        done();
    })
  });


  it('should dir', () => {
    const lng = 'ru';
    const service: ITranslationService = TestBed.inject(I18NEXT_SERVICE);
    expect(<any>service.dir(lng)).toEqual('ltr');
    expect(<any>service.dir(lng)).toEqual(service.dir(lng));
  });


  it('should able to pass custom params (no typechecking errors)', () => {
    const service: ITranslationService = TestBed.inject(I18NEXT_SERVICE);
    service.t('some.string', {
      hello: 'there',
    });
  });

  /*
  // does not work because language=cimode ignores default value
  // setting language to anything other than 'cimode' breaks the rest of the tests

  xit('should translate with default value', (done) => {
    const service: ITranslationService = TestBed.inject(I18NEXT_SERVICE);
    let title: Title = TestBed.inject(Title);
    let i18nextPipe: I18NextPipe = TestBed.inject(I18NextPipe);
    const key = 'test2';
    const defaultValue = 'test3';
    service.events.initialized.subscribe((value) => {
      if (value) {
        // service
        const serviceResult = service.t(key, defaultValue);
        expect(serviceResult).toEqual(defaultValue);
        // pipes
        const pipeResult = i18nextPipe.transform(key, { defaultValue });
        expect(pipeResult).toEqual(defaultValue);
        done();
      }
    });
  });
  */
});

