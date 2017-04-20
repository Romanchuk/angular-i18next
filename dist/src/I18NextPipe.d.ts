import { PipeTransform } from '@angular/core';
import { I18NextService } from './I18NextService';
export declare class I18NextPipe implements PipeTransform {
    private translateI18Next;
    private ns;
    private scope;
    constructor(translateI18Next: I18NextService, ns: string, scope: string);
    transform(key: string | string[], options: any): string;
    private postProcessCase(value, wordCase);
    private prependScope(key, scope, keySeparator, nsSeparator);
    private prependNamespace(key, ns, nsSeparator);
    private joinStrings(str1, str2, separator);
    private keyContainsNsSeparator(key, nsSeparator);
    private prepareOptions(options);
}
