import {
  Injectable,
  Inject
} from '@angular/core';

import { ITranslationEvents } from './ITranslationEvents';
import { I18NextEvents } from './I18NextEvents';

export interface ITranslationService {

  language: string;
  languages: string[];
  events: ITranslationEvents;

  options: any;

  use(plugin: Function);

  init(options?: any): Promise<any>;

  t(key: string | string[], options?: any): string;

  format(value: string, format: string, lng: string): string;

  changeLanguage(lng: string): Promise<any>;

  loadNamespaces(namespaces: string[]): Promise<any>;
}
