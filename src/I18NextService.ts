import {
  Injectable,
  Inject
} from '@angular/core';

import { I18NextEvents } from './I18NextEvents';

import * as i18next from 'i18next/index';

@Injectable()
export class I18NextService {

  events: I18NextEvents = new I18NextEvents();
  language: string = '';
  languages: string[] = [];

  get options(): any {
    return i18next.options;
  }

  private i18nextPromise: Promise<void>;

  public use(plugin: Function) {
    i18next.use(plugin);
    return this;
  }

  public init(options?: any): Promise<void> {
    options = options || {};

    this.subscribeEvents();

    return this.i18nextPromise =
      new Promise<void>((resolve: (thenableOrResult?: void | Promise<void>) => void, reject: (error: any) => void) => {
        i18next.init(Object.assign({}, options),
          (err: any) => {
            if (err) {
              console.error(err);
              reject(err);
            } else {
              console.log('[$I18NextService] The translations has been loaded for the current language', i18next.language);
              resolve(null);
            }
          });
      });
  }

  public t(key: string | string[], options?: any): string {
    options = options || {};
    return i18next.t(<any>key, options);
  }

  public changeLanguage(lng: string): Promise<i18next.TranslationFunction> {
    return new Promise<i18next.TranslationFunction>(
      (resolve: (thenableOrResult?: i18next.TranslationFunction) => void,
        reject: (error: any) => void) => {
        i18next.changeLanguage(lng, (err, t) => {
          if (!err)
            resolve(t);
          else
            reject(err);
        });
        resolve(null);
      });
  }

  private subscribeEvents() {
    i18next.on('initialized', e => {
      this.language = i18next.language;
      this.languages = i18next.languages;
      this.events.initialized.next(!!e);
    });
    i18next.on('loaded', e => this.events.loaded.next(!!e));
    i18next.on('failedLoading', e => this.events.failedLoading.next(e));
    i18next.on('languageChanged', e => {
      this.language = i18next.language;
      this.languages = i18next.languages;
      this.events.languageChanged.next(e);
    });
  }
}
