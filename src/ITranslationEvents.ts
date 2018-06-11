import { BehaviorSubject, Subject } from 'rxjs';

export type ResourceEvent = {lng, ns};
export type MissingKeyEvent = {lngs, namespace, key, res};

export interface ITranslationEvents {
    initialized: BehaviorSubject<any>;
    loaded: BehaviorSubject<boolean>;
    failedLoading: Subject<any>;
    missingKey: Subject<MissingKeyEvent>;
    added: Subject<ResourceEvent>;
    removed: Subject<ResourceEvent>;
    languageChanged: BehaviorSubject<string>;
}
