import { Inject, Injectable, Pipe, PipeTransform } from '@angular/core';

import {
  I18NEXT_NAMESPACE,
  I18NEXT_SCOPE,
  I18NEXT_SERVICE
} from './I18NEXT_TOKENS';
import { ITranslationService } from './ITranslationService';
import { PipeOptions } from './models';

@Injectable()
@Pipe({
  name: 'i18next',
  standalone: true
})
export class I18NextPipe implements PipeTransform {
  constructor(
    @Inject(I18NEXT_SERVICE) protected translateI18Next: ITranslationService,
    @Inject(I18NEXT_NAMESPACE) protected ns: string | string[],
    @Inject(I18NEXT_SCOPE) protected scope: string | string[]
  ) {}

  public transform(key: string | string[], options?: PipeOptions): string {
    options = this.prepareOptions(options);

    let i18nOpts = this.translateI18Next.options;
    if (options.prependScope === undefined || options.prependScope === true) {
      if (this.scope) {
        key = this.prependScope(
          key,
          this.scope,
          i18nOpts.keySeparator,
          i18nOpts.nsSeparator
        );
      }
    }
    if (
      options.prependNamespace === undefined ||
      options.prependNamespace === true
    ) {
      if (this.ns) {
        key = this.prependNamespace(key, this.ns, i18nOpts.nsSeparator);
      }
    }

    let result = this.translateI18Next.t(key, options);

    if (options.format) {
      if (result) {
        result = this.translateI18Next.format(
          result,
          options.format,
          this.translateI18Next.language
        );
      }
    }
    return result ?? '';
  }

  private prependScope(
    key: string | string[],
    scope: string | string[],
    keySeparator: string | false | undefined,
    nsSeparator: string | false | undefined
  ): string[] {
    const nsSep = nsSeparator || '';
    const keySep = keySeparator || '';
    if (typeof key === 'string') {
      key = [key];
    }
    if (typeof scope === 'string') {
      scope = [scope];
    }
    let keysWithScope = [];
    for (let i = 0; i < key.length; i++) {
      const k = key[i];
      if (!this.keyContainsNsSeparator(k, nsSep)) {
        // Do not set scope, if key contains a namespace
        keysWithScope.push(
          ...scope.map((sc) => this.joinStrings(keySep, sc, k))
        );
      }
      keysWithScope.push(k);
    }
    return keysWithScope;
  }

  private prependNamespace(
    key: string | string[],
    ns: string | string[],
    nsSeparator: string | false | undefined
  ): string[] {
    const nsSep = nsSeparator || '';
    if (typeof key === 'string') {
      key = [key];
    }
    if (typeof ns === 'string') {
      ns = [ns];
    }
    let keysWithNamespace = [];
    for (let i = 0; i < key.length; i++) {
      const k = key[i];
      if (!this.keyContainsNsSeparator(k, nsSep)) {
        // Do not set namespace, if key contains a namespace
        keysWithNamespace.push(...ns.map((n) => this.joinStrings(nsSep, n, k)));
      }
      keysWithNamespace.push(k);
    }
    return keysWithNamespace;
  }

  private joinStrings(separator: string, ...str: string[]) {
    return [...str].join(separator);
  }

  private keyContainsNsSeparator(key: string, nsSeparator: string) {
    return key.indexOf(nsSeparator) !== -1;
  }

  private prepareOptions(options?: PipeOptions): PipeOptions {
    options = options || {};
    if (options.context != null) options.context = options.context.toString();
    return options;
  }
}
