import { I18NextEvents } from './I18NextEvents';
export declare class I18NextService {
    events: I18NextEvents;
    language: string;
    languages: string[];
    readonly options: any;
    private i18nextPromise;
    use(plugin: Function): this;
    init(options?: any): Promise<void>;
    t(key: string | string[], options?: any): string;
    changeLanguage(lng: string): Promise<void>;
    private subscribeEvents();
}
