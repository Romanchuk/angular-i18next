import * as i18n from 'i18next';
import { ITranslationEvents } from './ITranslationEvents';

export interface ITranslationService {

  language: string;
  languages: string[];
  events: ITranslationEvents;

  options: any;

  use<T extends i18n.Module>(module: T | i18n.Newable<T> | i18n.ThirdPartyModule[] | i18n.Newable<i18n.ThirdPartyModule>[]);

  init(options?: i18n.InitOptions): Promise<any>;

  t(key: string | string[], optionsOrDefault?: string | i18n.TOptions, options?: i18n.TOptions): string;

  format: i18n.FormatFunction;

  exists(key, options);

  getFixedT(lng, ns);

  setDefaultNamespace(ns: string);

  dir(lng: string): string;

  changeLanguage(lng: string): Promise<any>;

  loadNamespaces(namespaces: string[]): Promise<any>;

  reloadResources(...params);

  getResource(lng, ns, key, options);

  addResource(lng, ns, key, value, options);

  addResources(lng, ns, resources);

  addResourceBundle(lng, ns, resources, deep, overwrite);

  hasResourceBundle(lng, ns);

  getResourceBundle(lng, ns);

  removeResourceBundle(lng, ns);
}
