import { BehaviorSubject } from 'rxjs/BehaviorSubject';
export declare class I18NextEvents {
    initialized: BehaviorSubject<boolean>;
    loaded: BehaviorSubject<boolean>;
    failedLoading: BehaviorSubject<any>;
    languageChanged: BehaviorSubject<string>;
}
