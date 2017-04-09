import {
    Injectable,
    Inject,
    Pipe,
    PipeTransform
} from '@angular/core';

import { I18NextService } from './I18NextService';
import { I18NEXT_NAMESPACE, I18NEXT_SCOPE } from './I18NEXT_TOKENS';

@Injectable()
@Pipe({
    name: 'i18next'
})
export class I18NextPipe implements PipeTransform {

    constructor(private translateI18Next: I18NextService, @Inject(I18NEXT_NAMESPACE) private ns: string, @Inject(I18NEXT_SCOPE) private scope: string) {}

    public transform(key: string | string[], options: any): string {
      options = this.prepareOptions(options);

      let i18nOpts = this.translateI18Next.options;
      if (options.prependScope === undefined || options.prependScope === true) {
        if (this.scope) {
          key = this.prependScope(key, this.scope, i18nOpts.keySeparator, i18nOpts.nsSeparator);
        }
      }
      if (options.prependNamespace === undefined || options.prependNamespace === true) {
        if (this.ns) {
          key = this.prependNamespace(key, this.ns, i18nOpts.nsSeparator);
        }
      }
      let result = this.translateI18Next.t(key, options);
      if (options.case) {
        if (result) {
          result = this.postProcessCase(result, options.case);
        }
      }
      return result;
    }

    private postProcessCase(value: string, wordCase: string): string {
      if (!value) return value;
      switch (wordCase) {
        case null:
        case 'none':
          return value;
        case 'upper':
        case 'uppercase':
          return value.toUpperCase();
        case 'lower':
        case 'lowercase':
          return value.toLowerCase();
        case 'cap':
        case 'capitalize':
          return value.charAt(0).toUpperCase() + value.slice(1);
        default:
          return value;
    }
  }

  private prependScope(key: string | string[], scope: string, keySeparator: string,  nsSeparator: string): string | string[] {
    if (key instanceof Array) {
      for (let i = 0; i < key.length; i++) {
        if (!this.keyContainsNsSeparator(key[i], nsSeparator)) // Не подставлять scope, если в ключе указан namespace
          key[i] = this.joinStrings(scope, key[i], keySeparator);
      }
    } else {
      if (!this.keyContainsNsSeparator(key, nsSeparator))
        key = this.joinStrings(scope, key, keySeparator);
    }
    return key;
  }

  private prependNamespace(key: string | string[], ns: string, nsSeparator: string): string | string[] {
    if (key instanceof Array) {
      let keysWithNamespace = [];
      for (let i = 0; i < key.length; i++) {
        if (!this.keyContainsNsSeparator(key[i], nsSeparator)) // Не подставлять namespace, если он уже указан в ключе
        {
          keysWithNamespace.push(this.joinStrings(ns, key[i], nsSeparator));
        }
      }
      return keysWithNamespace.concat(key); // fallback to key
    } else {
      let keyWithNamespace;
      if (!this.keyContainsNsSeparator(key, nsSeparator)) {
        keyWithNamespace = this.joinStrings(ns, key, nsSeparator);
      }
      if (keyWithNamespace)
        return [keyWithNamespace, key]; // fallback to key
      return key;
    }
  }

  private joinStrings(str1: string, str2: string, separator: string) {
    return [str1, str2].join(separator);
  }

  private keyContainsNsSeparator(key: string, nsSeparator: string) {
    return key.indexOf(nsSeparator) !== -1;
  }

  private prepareOptions(options: any) {
    options = options || {};
    if (options.context != null)
      options.context = options.context.toString();
    return options;
  }
}
