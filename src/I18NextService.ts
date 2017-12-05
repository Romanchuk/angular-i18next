import { Inject, Injectable } from '@angular/core';
import * as i18next from 'i18next/index';

import { I18NEXT_ERROR_HANDLING_STRATEGY } from './I18NEXT_TOKENS';
import { I18NextEvents } from './I18NextEvents';
import { I18NextErrorHandlingStrategy } from './I18NextErrorHandlingStrategies';
import { ITranslationEvents } from './ITranslationEvents';
import { ITranslationService } from './ITranslationService';

@Injectable()
export class I18NextService implements ITranslationService {

  events: ITranslationEvents = new I18NextEvents();
  language: string = '';
  languages: string[] = [];

  get options(): any {
    return i18next.options;
  }

  private i18nextPromise: Promise<void>;

  constructor(@Inject(I18NEXT_ERROR_HANDLING_STRATEGY) private errorHandlingStrategy: I18NextErrorHandlingStrategy) {}

  public use(plugin: Function) {
    i18next.use.call(i18next, plugin);
    return this;
  }

  public init(options?: any): Promise<void> {
    options = options || {};

    this.subscribeEvents();

    return this.i18nextPromise =
      new Promise<void>((resolve: (thenableOrResult?: void | Promise<void>) => void, reject: (error: any) => void) => {
        i18next.init.call(i18next, Object.assign({}, options), this.errorHandlingStrategy.handle(resolve, reject));
      });
  }

  public t(key: string | string[], options?: any): string {
    options = options || {};
    return i18next.t.call(i18next, <any>key, options);
  }

  public format(value: string, format: string, lng: string): string {
    return i18next.format.call(i18next, value, format, lng);
  }

  public changeLanguage(lng: string): Promise<any> {
    return new Promise<any>(
      (resolve: (thenableOrResult?: any) => void,
        reject: (error: any) => void) => {
        i18next.changeLanguage.call(i18next, lng, this.errorHandlingStrategy.handle(resolve, reject));
      });
  }

  public loadNamespaces(namespaces: string[]): Promise<any> {
    return new Promise<any>(
      (resolve: (thenableOrResult?: any) => void,
        reject: (error: any) => void) => {
          i18next.loadNamespaces.call(i18next, namespaces, this.errorHandlingStrategy.handle(resolve, reject));
      });
  }


  private subscribeEvents() {
    i18next.on.call(i18next, 'initialized', e => {
      this.language = i18next.language;
      this.languages = i18next.languages;
      this.events.initialized.next(!!e);
    });
    i18next.on.call(i18next, 'loaded', e => this.events.loaded.next(!!e));
    i18next.on.call(i18next, 'failedLoading', e => this.events.failedLoading.next(e));
    i18next.on.call(i18next, 'languageChanged', e => {
      this.language = i18next.language;
      this.languages = i18next.languages;
      this.events.languageChanged.next(e);
    });
  }
}
