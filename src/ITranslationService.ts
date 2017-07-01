import {
  Injectable,
  Inject
} from '@angular/core';

import { I18NextEvents } from './I18NextEvents';

export interface ITranslationService {

  language: string;
  languages: string[];

  options: any;

  use(plugin: Function);

  init(options?: any): Promise<void>;

  t(key: string | string[], options?: any): string;

  changeLanguage(lng: string): Promise<any>;
}
