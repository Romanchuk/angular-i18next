import { ITranslationEvents } from './ITranslationEvents';

export interface ITranslationService {

  language: string;
  languages: string[];
  events: ITranslationEvents;

  options: any;

  use(plugin: any);

  init(options?: any): Promise<any>;

  t(key: string | string[], options?: any): string;

  format(value: any, format: string, lng: string): string;

  exists(key, options);

  getFixedT(lng, ns);

  setDefaultNamespace(ns: string);

  dir(lng: string);

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
