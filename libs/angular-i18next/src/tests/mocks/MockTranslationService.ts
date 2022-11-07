import { Injectable } from '@angular/core';
import { Callback, FormatFunction, i18n, InterpolationOptions, Modules, ResourceStore, Services, TFunction } from 'i18next';
import { defaultInterpolationFormat } from '../../lib';
import { I18NextEvents } from '../../lib/I18NextEvents';
import { I18NextLoadResult } from '../../lib/I18NextLoadResult';
import { ITranslationEvents } from '../../lib/ITranslationEvents';
import { ITranslationService } from '../../lib/ITranslationService';
import { jest } from '@jest/globals';


@Injectable()
export class MockI18NextService implements ITranslationService {
  isInitialized?: boolean | undefined;
  modules: Modules;
  services: Services;
  store: ResourceStore;
  resolvedLanguage: string;
  /*
  t: TFunction = (key: string | string[], options?: any): string => {
        if (key instanceof Array) {
          return key.length > 0 ? key[0] : '';
        }
        return key;
    };

  */

  t: TFunction = jest.fn((key: string | string[], options?: any): string => {
    if (key instanceof Array) {
      return key.length > 0 ? key[0] : '';
    }
    return key;
})

  format: FormatFunction = jest.fn((
    value: any,
    format?: string,
    lng?: string,
    options?: InterpolationOptions & { [key: string]: any },
  ) => defaultInterpolationFormat(value, format, lng));


  getFixedT(lng: string | readonly string[], ns?: string | readonly string[], keyPrefix?: string): TFunction;
  getFixedT(lng: null, ns: string | readonly string[] | null, keyPrefix?: string): TFunction;
  getFixedT(lng: any, ns?: any, keyPrefix?: any): import("i18next").TFunction {
    throw new Error('Method not implemented.');
  }
  loadLanguages(lngs: string | readonly string[], callback?: Callback): Promise<void> {
    throw new Error('Method not implemented.');
  }
  loadResources(callback?: (err: any) => void): void {
    throw new Error('Method not implemented.');
  }
  getDataByLanguage(lng: string): { translation: { [key: string]: string; }; } | undefined {
    throw new Error('Method not implemented.');
  }
  reloadResources(lngs?: string | readonly string[], ns?: string | readonly string[], callback?: () => void): Promise<void>;
  reloadResources(lngs: null, ns: string | readonly string[], callback?: () => void): Promise<void>;
  reloadResources(lngs?: any, ns?: any, callback?: any): Promise<void> {
    throw new Error('Method not implemented.');
  }
  addResource(lng: string, ns: string, key: string, value: string, options?: { keySeparator?: string | undefined; silent?: boolean | undefined; }): i18n {
    throw new Error('Method not implemented.');
  }
  addResources(lng: string, ns: string, resources: any): i18n {
    throw new Error('Method not implemented.');
  }
  addResourceBundle(lng: string, ns: string, resources: any, deep?: boolean, overwrite?: boolean): i18n {
    throw new Error('Method not implemented.');
  }
  removeResourceBundle(lng: string, ns: string): i18n {
    throw new Error('Method not implemented.');
  }
  events: ITranslationEvents = new I18NextEvents();
  language: string = '';
  languages: string[] = [];

  private i18nextPromise: Promise<void>;

  get options(): any {
    return {
      keySeparator: '.',
      nsSeparator: ':',
    };
  }

  public use(plugin: any): ITranslationService {
    return this;
  }

  public init(options?: any): Promise<I18NextLoadResult> {
    options = options || {};
    return new Promise<any>(
      (
        resolve: (thenableOrResult?: any) => void,
        reject: (error: any) => void
      ) => {
        resolve(null);
      }
    );
  }


  public changeLanguage(lng: string): Promise<any> {
    return new Promise<any>(
      (
        resolve: (thenableOrResult?: any) => void,
        reject: (error: any) => void
      ) => {
        this.language = lng;
        resolve(this.language);
      }
    );
  }

  public loadNamespaces(namespaces: string[]): Promise<any> {
    return new Promise<any>(
      (
        resolve: (thenableOrResult?: any) => void,
        reject: (error: any) => void
      ) => {
        resolve();
      }
    );
  }

  exists(key: any, options: any) {
    return true;
  }



  setDefaultNamespace(ns: string) {}

  dir(lng: string) {
    return 'ltr';
  }



  getResource(lng: any, ns: any, key: any, options: any) {
    return null;
  }



  hasResourceBundle(lng: any, ns: any) {
    return true;
  }

  getResourceBundle(lng: any, ns: any) {
    return null;
  }


}
