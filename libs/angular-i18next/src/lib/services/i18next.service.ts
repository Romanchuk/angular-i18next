import { Inject, Injectable, Optional } from '@angular/core';
import * as i18n from 'i18next';
import { I18NEXT_ERROR_HANDLING_STRATEGY, I18NEXT_INSTANCE } from '../tokens';
import { I18NextErrorHandlingStrategy } from '../I18NextErrorHandlingStrategies';
import { I18NextEvents } from '../I18NextEvents';
import { I18NextLoadResult } from '../I18NextLoadResult';
import { ITranslationEvents } from './translation.events';
import { ITranslationOptions, ITranslationService } from './translation.service';


const i18nextGlobal: i18n.i18n = i18n.default;

@Injectable()
export class I18NextService implements ITranslationService {

  private readonly i18next: i18n.i18n;

  events: ITranslationEvents = new I18NextEvents();

  get language() {
    return this.i18next.language;
  }
  get languages() {
    return this.i18next.languages;
  }

  get options() {
    return this.i18next.options;
  }

  get modules() {
    return this.i18next.modules;
  }
  get services() {
    return this.i18next.services;
  }
  get store() {
    return this.i18next.store;
  }

  get resolvedLanguage() {
    return this.i18next.resolvedLanguage;
  }

  get isInitialized() {
    return this.i18next.isInitialized;
  }

  constructor(
    @Inject(I18NEXT_ERROR_HANDLING_STRATEGY)
    private errorHandlingStrategy: I18NextErrorHandlingStrategy,
    @Optional() @Inject(I18NEXT_INSTANCE) i18nextInstance?: i18n.i18n
  ) {
    this.i18next = i18nextInstance ?? i18nextGlobal;
  }

  t(key: string | string[], options?: ITranslationOptions | undefined): i18n.TFunctionReturn<i18n.Namespace, string | string[], ITranslationOptions>;
  t(key: string | string[] | (string | TemplateStringsArray)[], defaultValue: string, options?: ITranslationOptions | undefined): i18n.TFunctionReturn<i18n.Namespace, string | string[], ITranslationOptions>;
  t(key: unknown, defaultValueOrOptions?: unknown, options?: unknown): i18n.TFunctionReturn<i18n.Namespace, unknown, ITranslationOptions> {
    const hasDefault = !!defaultValueOrOptions && typeof defaultValueOrOptions === 'string';

    this.i18next.t.bind(this.i18next);
    if (hasDefault) {
      return this.i18next.t(key as (string | string[]), defaultValueOrOptions as string, options as ITranslationOptions);
    } else {
      return this.i18next.t(key as (string | string[]), defaultValueOrOptions as ITranslationOptions);
    }
  }

  public use<T extends i18n.Module>(
    module:
    T | i18n.NewableModule<T> | i18n.Newable<T>
  ): ITranslationService {
    this.i18next.use.call(this.i18next, module);
    return this;
  }

  init(options: i18n.InitOptions): Promise<I18NextLoadResult> {
    this.subscribeEvents();

    return new Promise<I18NextLoadResult>((resolve, reject) => {
      this.i18next.init.call(
        this.i18next,
        Object.assign({}, options ?? {}),
        this.errorHandlingStrategy.handle(resolve, reject)
      );
    });
  }

  public format(value: any, format?: string, lng?: string): string {
    return this.i18next.format.call(this.i18next, value, format, lng, {});
  }

  public exists(key: string | string[], options: any) {
    return this.i18next.exists.call(this.i18next, key, options);
  }

  getFixedT(lng: string | readonly string[], ns?: string | readonly string[], keyPrefix?: string): i18n.TFunction;
  getFixedT(lng: null, ns: string | readonly string[] | null, keyPrefix?: string): i18n.TFunction;
  getFixedT(lng: any, ns?: any, keyPrefix?: any): i18n.TFunction {
    return this.i18next.getFixedT.call(this.i18next, lng, ns, keyPrefix);
  }

  public setDefaultNamespace(ns: string) {
    this.i18next.setDefaultNamespace.call(this.i18next, ns);
  }

  public dir(lng?: string) {
    return this.i18next.dir.call(this.i18next, lng);
  }

  public changeLanguage(lng: string): Promise<i18n.TFunction> {
    return new Promise<i18n.TFunction>(
      (
        resolve: (thenableOrResult: i18n.TFunction | PromiseLike<i18n.TFunction>) => void,
        reject: (error: any) => void
      ) => {
        return this.i18next.changeLanguage.call(
          this.i18next,
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
        this.i18next.loadNamespaces.call(
          this.i18next,
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
        this.i18next.loadLanguages.call(
          this.i18next,
          lngs,
          this.errorHandlingStrategy.handle(resolve, reject)
        );
      }
    );
  }

  //#region resource handling

  public loadResources(callback?: (err: any) => void): void {
    this.i18next.loadResources.call(this.i18next, callback);
  }
  public getDataByLanguage(lng: string) {
    return this.i18next.getDataByLanguage.call(this.i18next, lng);
  }

  public async reloadResources(...params: any) {
    await this.i18next.reloadResources.apply(this.i18next, params);
  }

  public getResource(lng: string, ns: string, key: string, options: any) {
    return this.i18next.getResource.call(this.i18next, lng, ns, key, options);
  }

  public addResource(lng: string, ns: string, key: string, value: any, options: any): i18n.i18n {
    return this.i18next.addResource.call(this.i18next, lng, ns, key, value, options);
  }

  public addResources(lng: string, ns: string, resources: any): i18n.i18n {
    return this.i18next.addResources.call(this.i18next, lng, ns, resources);
  }

  public addResourceBundle(lng: string, ns: string, resources: any, deep: any, overwrite: any): i18n.i18n {
    return this.i18next.addResourceBundle.call(
      this.i18next,
      lng,
      ns,
      resources,
      deep,
      overwrite
    );
  }

  public hasResourceBundle(lng: string, ns: string) {
    return this.i18next.hasResourceBundle.call(this.i18next, lng, ns);
  }

  public getResourceBundle(lng: string, ns: string) {
    return this.i18next.getResourceBundle.call(this.i18next, lng, ns);
  }

  public removeResourceBundle(lng: string, ns: string): i18n.i18n {
    return this.i18next.removeResourceBundle.call(this.i18next, lng, ns);
  }

  //#endregion

  private subscribeEvents() {
    this.i18next.on.call(this.i18next, 'initialized', (options: i18n.InitOptions) => {
      this.events.initialized.next(options);
    });
    this.i18next.on.call(this.i18next, 'loaded', (loaded: boolean) =>
      this.events.loaded.next(loaded)
    );
    this.i18next.on.call(this.i18next, 'failedLoading', (lng: string, ns: string, msg: string) =>
      this.events.failedLoading.next({ lng, ns, msg })
    );
    this.i18next.on.call(this.i18next, 'languageChanged', (lng: string) => {
      this.events.languageChanged.next(lng);
    });
    this.i18next.on.call(this.i18next, 'missingKey', (lngs: string, namespace: string, key: string, res: any) =>
      this.events.missingKey.next({ lngs, namespace, key, res })
    );
    this.i18next.on.call(this.i18next, 'added', (lng: string, ns: string) =>
      this.events.added.next({ lng, ns })
    );
    this.i18next.on.call(this.i18next, 'removed', (lng: string, ns: string) =>
      this.events.removed.next({ lng, ns })
    );
  }
}
