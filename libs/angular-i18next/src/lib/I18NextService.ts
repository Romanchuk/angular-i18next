import { Inject, Injectable } from '@angular/core';
import * as i18n from 'i18next';

import { I18NEXT_ERROR_HANDLING_STRATEGY } from './I18NEXT_TOKENS';
import { I18NextErrorHandlingStrategy } from './I18NextErrorHandlingStrategies';
import { I18NextEvents } from './I18NextEvents';
import { I18NextLoadResult } from './I18NextLoadResult';
import { ITranslationEvents } from './ITranslationEvents';
import { ITranslationService } from './ITranslationService';

const i18next = require('i18next');

@Injectable()
export class I18NextService implements ITranslationService {
  events: ITranslationEvents = new I18NextEvents();

  get language() {
    return i18next.language;
  }
  get languages() {
    return i18next.languages;
  }

  get options() {
    return i18next.options;
  }

  get modules() {
    return i18next.modules;
  }
  get services() {
    return i18next.services;
  }
  get store() {
    return i18next.store;
  }

  get resolvedLanguage() {
    return i18next.resolvedLanguage;
  }

  get isInitialized() {
    return i18next.isInitialized;
  }

  constructor(
    @Inject(I18NEXT_ERROR_HANDLING_STRATEGY)
    private errorHandlingStrategy: I18NextErrorHandlingStrategy
  ) {}

  public use<T extends i18n.Module>(
    module:
    T | i18n.NewableModule<T> | i18n.Newable<T>
  ): ITranslationService {
    i18next.use.call(i18next, module);
    return this;
  }

  init(options: i18n.InitOptions): Promise<I18NextLoadResult> {
    this.subscribeEvents();

    return new Promise<I18NextLoadResult>((resolve, reject) => {
      i18next.init.call(
        i18next,
        Object.assign({}, options ?? {}),
        this.errorHandlingStrategy.handle(resolve, reject)
      );
    });
  }

  t(
    key: string | string[],
    optionsOrDefault?: string | i18n.TOptions,
    options?: i18n.TOptions
  ): i18n.TFunctionResult {
    const hasDefault = optionsOrDefault && typeof optionsOrDefault === 'string';
    if (hasDefault) {
      return i18next.t.call(i18next, key, optionsOrDefault, options);
    } else {
      return i18next.t.call(i18next, key, <string | undefined>optionsOrDefault, undefined);
    }
  }

  public format(value: any, format?: string, lng?: string): string {
    return i18next.format.call(i18next, value, format, lng, {});
  }

  public exists(key: string | string[], options: any) {
    return i18next.exists.call(i18next, key, options);
  }

  getFixedT(lng: string | readonly string[], ns?: string | readonly string[], keyPrefix?: string): i18n.TFunction;
  getFixedT(lng: null, ns: string | readonly string[] | null, keyPrefix?: string): i18n.TFunction;
  getFixedT(lng: any, ns?: any, keyPrefix?: any): i18n.TFunction {
    return i18next.getFixedT.call(i18next, lng, ns, keyPrefix);
  }

  public setDefaultNamespace(ns: string) {
    i18next.setDefaultNamespace.call(i18next, ns);
  }

  public dir(lng?: string) {
    return i18next.dir.call(i18next, lng);
  }

  public changeLanguage(lng: string): Promise<i18n.TFunction> {
    return new Promise<i18n.TFunction>(
      (
        resolve: (thenableOrResult: i18n.TFunction | PromiseLike<i18n.TFunction>) => void,
        reject: (error: any) => void
      ) => {
        return i18next.changeLanguage.call(
          i18next,
          lng,
          this.errorHandlingStrategy.handle(resolve, reject)
        );
      }
    );
  }

  public loadNamespaces(namespaces: string | string[]): Promise<any> {
    return new Promise<I18NextLoadResult>(
      (
        resolve: (thenableOrResult: I18NextLoadResult | PromiseLike<I18NextLoadResult>) => void,
        reject: (error: any) => void
      ) => {
        i18next.loadNamespaces.call(
          i18next,
          namespaces,
          this.errorHandlingStrategy.handle(resolve, reject)
        );
      }
    );
  }

  public loadLanguages(lngs: string | string[]) {
    return new Promise<void>(
      (
        resolve: (thenableOrResult: void | PromiseLike<void>) => void,
        reject: (error: any) => void
      ) => {
        i18next.loadLanguages.call(
          i18next,
          lngs,
          this.errorHandlingStrategy.handle(resolve, reject)
        );
      }
    );
  }

  //#region resource handling

  public loadResources(callback?: (err: any) => void): void {
    i18next.loadResources.call(i18next, callback);
  }
  public getDataByLanguage(lng: string): { translation: { [key: string]: string; }; } | undefined {
    return i18next.getDataByLanguage.call(i18next, lng);
  }

  public async reloadResources(...params: any) {
    await i18next.reloadResources.apply(i18next, params);
  }

  public getResource(lng: string, ns: string, key: string, options: any) {
    return i18next.getResource.call(i18next, lng, ns, key, options);
  }

  public addResource(lng: string, ns: string, key: string, value: any, options: any): i18n.i18n {
    return i18next.addResource.call(i18next, lng, ns, key, value, options);
  }

  public addResources(lng: string, ns: string, resources: any): i18n.i18n {
    return i18next.addResources.call(i18next, lng, ns, resources);
  }

  public addResourceBundle(lng: string, ns: string, resources: any, deep: any, overwrite: any): i18n.i18n {
    return i18next.addResourceBundle.call(
      i18next,
      lng,
      ns,
      resources,
      deep,
      overwrite
    );
  }

  public hasResourceBundle(lng: string, ns: string) {
    return i18next.hasResourceBundle.call(i18next, lng, ns);
  }

  public getResourceBundle(lng: string, ns: string) {
    return i18next.getResourceBundle.call(i18next, lng, ns);
  }

  public removeResourceBundle(lng: string, ns: string): i18n.i18n {
    return i18next.removeResourceBundle.call(i18next, lng, ns);
  }

  //#endregion

  private subscribeEvents() {
    i18next.on.call(i18next, 'initialized', (options: any) => {
      this.events.initialized.next(options);
    });
    i18next.on.call(i18next, 'loaded', (loaded: boolean) =>
      this.events.loaded.next(loaded)
    );
    i18next.on.call(i18next, 'failedLoading', (lng: string, ns: string, msg: string) =>
      this.events.failedLoading.next({ lng, ns, msg })
    );
    i18next.on.call(i18next, 'languageChanged', (lng: string) => {
      this.events.languageChanged.next(lng);
    });
    i18next.on.call(i18next, 'missingKey', (lngs: string, namespace: string, key: string, res: any) =>
      this.events.missingKey.next({ lngs, namespace, key, res })
    );
    i18next.on.call(i18next, 'added', (lng: string, ns: string) =>
      this.events.added.next({ lng, ns })
    );
    i18next.on.call(i18next, 'removed', (lng: string, ns: string) =>
      this.events.removed.next({ lng, ns })
    );
  }
}
