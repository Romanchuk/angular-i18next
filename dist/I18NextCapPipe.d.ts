import { PipeTransform } from '@angular/core';
import { I18NextService } from './I18NextService';
import { I18NextPipe } from './I18NextPipe';
export declare class I18NextCapPipe extends I18NextPipe implements PipeTransform {
    constructor(translateI18Next: I18NextService, ns: string, scope: string);
    transform(key: string | string[], options: any): string;
}
