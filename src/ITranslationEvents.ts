import { BehaviorSubject, Subject } from 'rxjs';

export type ResourceEvent = { lng: any, ns: any };
export type MissingKeyEvent = { lngs: any, namespace: any, key: any, res: any };

export interface ITranslationEvents {
    initialized: BehaviorSubject<any>;
    loaded: BehaviorSubject<boolean>;
    failedLoading: Subject<any>;
    missingKey: Subject<MissingKeyEvent>;
    added: Subject<ResourceEvent>;
    removed: Subject<ResourceEvent>;
    languageChanged: BehaviorSubject<string>;
}
