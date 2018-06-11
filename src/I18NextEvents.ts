import { BehaviorSubject, Subject } from 'rxjs';

import { ITranslationEvents, MissingKeyEvent, ResourceEvent } from './ITranslationEvents';

export class I18NextEvents implements ITranslationEvents {
  initialized = new BehaviorSubject(false);
  loaded = new BehaviorSubject(false);
  failedLoading = new Subject();
  missingKey = new Subject<MissingKeyEvent>();
  added = new Subject<ResourceEvent>();
  removed = new Subject<ResourceEvent>();
  languageChanged = new BehaviorSubject(null);
}
