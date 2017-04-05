import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class I18NextEvents {
  initialized: BehaviorSubject<boolean> = new BehaviorSubject(false);
  loaded: BehaviorSubject<boolean> = new BehaviorSubject(false);
  failedLoading: BehaviorSubject<any> = new BehaviorSubject(null);
  languageChanged: BehaviorSubject<string> = new BehaviorSubject(null);
}
