import { BehaviorSubject, Subject } from 'rxjs';

import {
  ITranslationEvents,
  MissingKeyEvent,
  ResourceEvent,
} from './ITranslationEvents';
import * as i18n from 'i18next';

export class I18NextEvents implements ITranslationEvents {
  initialized = new BehaviorSubject<i18n.InitOptions | undefined>(undefined);
  loaded = new BehaviorSubject(false);
  failedLoading = new Subject();
  missingKey = new Subject<MissingKeyEvent>();
  added = new Subject<ResourceEvent>();
  removed = new Subject<ResourceEvent>();
  languageChanged = new BehaviorSubject<string | null>(null);
}
