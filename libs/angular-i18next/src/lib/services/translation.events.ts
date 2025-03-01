import { BehaviorSubject, Subject } from 'rxjs';
import * as i18n from 'i18next';

export type ResourceEvent = { lng: any; ns: any };
export type MissingKeyEvent = { lngs: any; namespace: any; key: any; res: any };

export interface ITranslationEvents {
  initialized: BehaviorSubject<i18n.InitOptions | undefined>;
  loaded: BehaviorSubject<boolean>;
  failedLoading: Subject<any>;
  missingKey: Subject<MissingKeyEvent>;
  added: Subject<ResourceEvent>;
  removed: Subject<ResourceEvent>;
  languageChanged: BehaviorSubject<string | null>;
}
