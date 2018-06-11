import { Inject, Injectable } from '@angular/core';
import * as i18next from 'i18next/index';

import { I18NEXT_ERROR_HANDLING_STRATEGY } from './I18NEXT_TOKENS';
import { I18NextErrorHandlingStrategy } from './I18NextErrorHandlingStrategies';
import { I18NextEvents } from './I18NextEvents';
import { I18NextLoadResult } from './I18NextLoadResult';
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

  private i18nextPromise: Promise<I18NextLoadResult>;

  constructor(@Inject(I18NEXT_ERROR_HANDLING_STRATEGY) private errorHandlingStrategy: I18NextErrorHandlingStrategy) {}

  public use(plugin: any) {
    i18next.use.call(i18next, plugin);
    return this;
  }

  public init(options?: any): Promise<I18NextLoadResult> {
    options = options || {};

    this.subscribeEvents();

    return this.i18nextPromise =
      new Promise<I18NextLoadResult>(
        (
          resolve: (thenableOrResult?: I18NextLoadResult) => void,
          reject: (error: any) => void
        ) => {
          i18next.init.call(i18next, Object.assign({}, options), this.errorHandlingStrategy.handle(resolve, reject));
        }
      );
  }

  public t(key: string | string[], options?: any): string {
    options = options || {};
    return i18next.t.call(i18next, <any>key, options);
  }

  public format(value: any, format: string, lng: string): string {
    return i18next.format.call(i18next, value, format, lng);
  }

  public exists(key, options) {
    return i18next.exists.call(i18next, key, options);
  }

  public getFixedT(lng, ns) {
    return i18next.getFixedT.call(i18next, lng, ns);
  }

  public setDefaultNamespace(ns: string) {
    i18next.setDefaultNamespace.call(i18next, ns);
  }

  public dir(lng: string = undefined) {
      return i18next.dir.call(i18next, lng);
  }

  public changeLanguage(lng: string): Promise<I18NextLoadResult> {
    return new Promise<I18NextLoadResult>(
      (
        resolve: (thenableOrResult?: I18NextLoadResult) => void,
        reject: (error: any) => void
      ) => {
          i18next.changeLanguage.call(i18next, lng, this.errorHandlingStrategy.handle(resolve, reject));
      }
    );
  }

  public loadNamespaces(namespaces: string | string[]): Promise<any> {
    return new Promise<I18NextLoadResult>(
      (
        resolve: (thenableOrResult?: I18NextLoadResult) => void,
        reject: (error: any) => void
      ) => {
          i18next.loadNamespaces.call(i18next, namespaces, this.errorHandlingStrategy.handle(resolve, reject));
      }
    );
  }

  public loadLanguages(lngs: string | string[], callback: Function) {
    return new Promise<I18NextLoadResult>(
      (
        resolve: (thenableOrResult?: I18NextLoadResult) => void,
        reject: (error: any) => void
      ) => {
          i18next.loadNamespaces.call(i18next, lngs, this.errorHandlingStrategy.handle(resolve, reject));
      }
    );
  }

  //#region resource handling

  public reloadResources(...params) {
    i18next.reloadResources.apply(i18next, params);
  }

  public getResource(lng, ns, key, options) {
      return i18next.getResource.call(i18next, lng, ns, key, options);
  }

  public addResource(lng, ns, key, value, options) {
      i18next.addResource.call(i18next, lng, ns, key, value, options);
  }

  public addResources(lng, ns, resources) {
      i18next.addResources.call(i18next, lng, ns, resources);
  }

  public addResourceBundle(lng, ns, resources, deep, overwrite) {
      i18next.addResourceBundle.call(i18next, lng, ns, resources, deep, overwrite);
  }

  public hasResourceBundle(lng, ns) {
      return i18next.hasResourceBundle.call(i18next, lng, ns);
  }

  public getResourceBundle(lng, ns) {
      return i18next.getResourceBundle.call(i18next, lng, ns);
  }

  public removeResourceBundle(lng, ns) {
      i18next.removeResourceBundle.call(i18next, lng, ns);
  }

  //#endregion

  private subscribeEvents() {
    i18next.on.call(i18next, 'initialized', options => {
      this.language = i18next.language;
      this.languages = i18next.languages;
      this.events.initialized.next(options);
    });
    i18next.on.call(i18next, 'loaded', loaded => this.events.loaded.next(loaded));
    i18next.on.call(i18next, 'failedLoading', (lng, ns, msg) => this.events.failedLoading.next({lng, ns, msg}));
    i18next.on.call(i18next, 'languageChanged', lng => {
      this.language = i18next.language;
      this.languages = i18next.languages;
      this.events.languageChanged.next(lng);
    });
    i18next.on.call(i18next, 'missingKey', (lngs, namespace, key, res) => this.events.missingKey.next({lngs, namespace, key, res}));
    i18next.on.call(i18next, 'added', (lng, ns) => this.events.added.next({lng, ns}));
    i18next.on.call(i18next, 'removed', (lng, ns) => this.events.removed.next({lng, ns}));

  }
}
