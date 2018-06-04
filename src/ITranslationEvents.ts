import { BehaviorSubject } from 'rxjs';

export interface ITranslationEvents {
    initialized: BehaviorSubject<boolean>;
    loaded: BehaviorSubject<boolean>;
    failedLoading: BehaviorSubject<any>;
    languageChanged: BehaviorSubject<string>;
}
