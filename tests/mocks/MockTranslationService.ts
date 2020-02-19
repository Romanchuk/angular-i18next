import { Injectable } from '@angular/core';

import { ITranslationService } from '../../src/ITranslationService';
import { ITranslationEvents } from './../../src/ITranslationEvents';

@Injectable()
export class MockI18NextService implements ITranslationService {

  events: ITranslationEvents;
  language: string = '';
  languages: string[] = [];

  private i18nextPromise: Promise<void>;

  get options(): any {
    return {
        keySeparator: '.',
        nsSeparator: ':'
    };
  }

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
    return key;
  }

  public format(value: string, format: string, lng: string): string {
    if (!value)
      return value;
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
      });
  }

  public loadNamespaces(namespaces: string[]): Promise<any> {
    return new Promise<any>(
      (resolve: (thenableOrResult?: any) => void,
        reject: (error: any) => void) => {
            resolve();
      });
  }

  exists(key: any, options: any) {
    return true;
  }

  getFixedT(lng: any, ns: any) {
    return null;
  }

  setDefaultNamespace(ns: string) {}

  dir(lng: string) {
    return 'ltr';
  }

  reloadResources(...params: any[]) {}

  getResource(lng: any, ns: any, key: any, options: any) {
    return null;
  }

  addResource(lng: any, ns: any, key: any, value: any, options: any) {}

  addResources(lng: any, ns: any, resources: any) {}

  addResourceBundle(lng: any, ns: any, resources: any, deep: any, overwrite: any) {}

  hasResourceBundle(lng: any, ns: any) {
    return true;
  }

  getResourceBundle(lng: any, ns: any) {
    return null;
  }

  removeResourceBundle(lng: any, ns: any) {}
}
