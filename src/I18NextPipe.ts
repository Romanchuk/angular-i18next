import { Inject, Injectable, Pipe, PipeTransform, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { I18NEXT_NAMESPACE, I18NEXT_SCOPE, I18NEXT_SERVICE } from './I18NEXT_TOKENS';
import { ITranslationService } from './ITranslationService';
@Injectable()
@Pipe({
    name: 'i18next', pure: false
})
export class I18NextPipe implements PipeTransform, OnDestroy {
  private _latestValue: string;
  private _subscription: Subscription = null;

  private _key;
  private _options;

  constructor(
      @Inject(I18NEXT_SERVICE) private translateI18Next: ITranslationService,
      @Inject(I18NEXT_NAMESPACE) private ns: string | string[],
      @Inject(I18NEXT_SCOPE) private scope: string | string[],
      private cd: ChangeDetectorRef
    ) {
    this._subscription = this.translateI18Next.events.languageChanged.subscribe(() => {
      if (this._key) {
        this._latestValue = this.translate(this._key, this._options);
        this.cd.markForCheck();
      }
    });
  }

  public transform(key: string | string[], options?: any): string {
    this._latestValue = this.translate(key, options);

    this._key = key;
    this._options = options;

    return this._latestValue;
  }

  ngOnDestroy() {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }

  private translate(key: string | string[], options?: any): string {
    options = this.prepareOptions(options);

    const i18nOpts = this.translateI18Next.options;
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
    if (options.format) {
      if (result) {
        result = this.translateI18Next
          .format(result, options.format, this.translateI18Next.language);
      }
    }
    return result;
  }

  private prependScope(key: string | string[], scope: string | string[], keySeparator: string,  nsSeparator: string): string[] {
    if (typeof(key) === 'string') {
      key = [key];
    }
    if (typeof(scope) === 'string') {
      scope = [scope];
    }
    const keysWithScope = [];
    for (let i = 0; i < key.length; i++) {
      const k = key[i];
      if (!this.keyContainsNsSeparator(k, nsSeparator)) {// Не подставлять scope, если в ключе указан namespace
        keysWithScope.push(...scope.map(sc => this.joinStrings(keySeparator, sc, k)));
      }
      keysWithScope.push(k);
    }
    return keysWithScope;
  }

  private prependNamespace(key: string | string[], ns: string | string[], nsSeparator: string): string[] {
    if (typeof(key) === 'string') {
      key = [key];
    }
    if (typeof(ns) === 'string') {
      ns = [ns];
    }
    const keysWithNamespace = [];
    for (let i = 0; i < key.length; i++) {
      const k = key[i];
      if (!this.keyContainsNsSeparator(k, nsSeparator)) { // Не подставлять namespace, если он уже указан в ключе
        keysWithNamespace.push(...ns.map(n => this.joinStrings(nsSeparator, n, k)));
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

  private prepareOptions(options: any) {
    options = options || {};
    if (options.context != null) {
      options.context = options.context.toString();
    }
    return options;
  }
}
