import { ITranslationEvents } from './ITranslationEvents';

export interface ITranslationService {

  language: string;
  languages: string[];
  events: ITranslationEvents;

  options: any;

  use(plugin: any);

  init(options?: any): Promise<any>;

  t(key: string | string[], options?: any): string;

  format(value: string, format: string, lng: string): string;

  changeLanguage(lng: string): Promise<any>;

  loadNamespaces(namespaces: string[]): Promise<any>;
}
