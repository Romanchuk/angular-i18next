import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ITranslationEvents } from 'ITranslationEvents';

export class I18NextEvents implements ITranslationEvents {
  initialized: BehaviorSubject<boolean> = new BehaviorSubject(false);
  loaded: BehaviorSubject<boolean> = new BehaviorSubject(false);
  failedLoading: BehaviorSubject<any> = new BehaviorSubject(null);
  languageChanged: BehaviorSubject<string> = new BehaviorSubject(null);
}
