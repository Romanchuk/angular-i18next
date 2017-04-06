import { Title } from '@angular/platform-browser';
import { I18NextPipe } from './I18NextPipe';
export declare class I18NextTitle extends Title {
    private i18nextPipe;
    constructor(i18nextPipe: I18NextPipe);
    setTitle(value: string): void;
    private translate(text);
}
