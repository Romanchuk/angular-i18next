import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ITranslationService } from '../../src/ITranslationService';
import { ITranslationEvents } from './../../src/ITranslationEvents';

@Injectable()
export class MockI18NextService implements ITranslationService {

  events: ITranslationEvents = {
    initialized: new BehaviorSubject<boolean>(false),
    loaded: new BehaviorSubject<boolean>(false),
    failedLoading: new BehaviorSubject<any>({}),
    languageChanged: new BehaviorSubject<string>(''),
  };
  language: string = '';
  languages: string[] = [];

  get options(): any {
    return {
        keySeparator: '.',
        nsSeparator: ':'
    };
  }

  private i18nextPromise: Promise<void>;

  public use(plugin: any) {
    return this;
  }

  public init(options?: any): Promise<void> {
    options = options || {};
    return new Promise<any>(
      (resolve: (thenableOrResult?: any) => void,
        reject: (error: any) => void) => {
            resolve(null);
      });
  }

  public t(key: string | string[], options?: any): string {
    if (key instanceof Array)
        return key.length > 0 ? key[0] : '';
    return this.language === 'lang' ? 'lang' : key;
  }

  public format(value: string, format: string, lng: string): string {
    if (!value)
      return value;
    value = this.t(value);
    if (format === 'cap') {
      return value[0].toUpperCase() + value.substring(1);
    }
    return value;
  }

  public changeLanguage(lng: string): Promise<any> {
    return new Promise<any>(
      (resolve: (thenableOrResult?: any) => void,
        reject: (error: any) => void) => {
            this.language = lng;
            resolve(this.language);
            this.events.languageChanged.next(this.language);
      });
  }

  public loadNamespaces(namespaces: string[]): Promise<any> {
    return new Promise<any>(
      (resolve: (thenableOrResult?: any) => void,
        reject: (error: any) => void) => {
            resolve();
      });
  }
}
