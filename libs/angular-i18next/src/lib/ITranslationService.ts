import * as i18n from 'i18next';
import { I18NextLoadResult } from './I18NextLoadResult';
import { ITranslationEvents } from './ITranslationEvents';

type Modify<T, R> = Omit<T, keyof R> & R;

export type ITranslationService = Modify<Partial<i18n.i18n>, {

  events: ITranslationEvents;

  language: string;
  languages: readonly string[];
  options: i18n.InitOptions;
  modules: i18n.Modules;
  services: i18n.Services;
  store: i18n.ResourceStore;
  resolvedLanguage: string;

  use<T extends i18n.Module>(
    module:
    T | i18n.NewableModule<T> | i18n.Newable<T>
  ): ITranslationService;

  init(options: i18n.InitOptions): Promise<I18NextLoadResult>;

  t(key: string | string[],
    optionsOrDefault?: string | i18n.TOptions,
    options?: i18n.TOptions): i18n.DefaultTFuncReturn

  format: i18n.FormatFunction;

  exists: i18n.ExistsFunction;

  getFixedT(
    lng: string | readonly string[],
    ns?: string | readonly string[],
    keyPrefix?: string,
  ): i18n.TFunction;
  getFixedT(lng: null, ns: string | readonly string[] | null, keyPrefix?: string): i18n.TFunction;

  setDefaultNamespace(ns: string): void;

  dir(lng: string): string;

  changeLanguage(lng: string): Promise<any>;

  loadNamespaces(namespaces: string[]): Promise<any>;
  loadLanguages(lngs: string | readonly string[], callback?: i18n.Callback): Promise<void>;

  loadResources(callback?: (err: any) => void): void;

  getDataByLanguage(lng: string): {
    [key: string]: {
        [key: string]: string;
    };
} | undefined;

  reloadResources(
    lngs?: string | readonly string[],
    ns?: string | readonly string[],
    callback?: () => void,
  ): Promise<void>;
  reloadResources(lngs: null, ns: string | readonly string[], callback?: () => void): Promise<void>;

  getResource(
    lng: string,
    ns: string,
    key: string,
    options?: Pick<i18n.InitOptions, 'keySeparator' | 'ignoreJSONStructure'>,
  ): any;
  addResource(
    lng: string,
    ns: string,
    key: string,
    value: string,
    options?: { keySeparator?: string; silent?: boolean },
  ): i18n.i18n;
  addResources(lng: string, ns: string, resources: any): i18n.i18n;
  addResourceBundle(
    lng: string,
    ns: string,
    resources: any,
    deep?: boolean,
    overwrite?: boolean,
  ): i18n.i18n;
  hasResourceBundle(lng: string, ns: string): boolean;
  getResourceBundle(lng: string, ns: string): any;
  removeResourceBundle(lng: string, ns: string): i18n.i18n;

}>;
