import { I18NextEvents } from './I18NextEvents';
import * as i18next from 'i18next/index';
export declare class I18NextService {
    events: I18NextEvents;
    language: string;
    languages: string[];
    readonly options: any;
    private i18nextPromise;
    use(plugin: Function): this;
    init(options?: any): Promise<void>;
    t(key: string | string[], options?: any): string;
    changeLanguage(lng: string): Promise<i18next.TranslationFunction>;
    private subscribeEvents();
}
