import { Inject, Injectable, Pipe, PipeTransform, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { I18NEXT_SERVICE } from './I18NEXT_TOKENS';
import { ITranslationService } from './ITranslationService';

@Injectable()
@Pipe({
    name: 'i18nextFormat', pure: false
})
export class I18NextFormatPipe implements PipeTransform, OnDestroy {
  private _latestValue: string;
  private _subscription: Subscription = null;

  private _value;
  private _options;

  constructor(
      @Inject(I18NEXT_SERVICE) private translateI18Next: ITranslationService,
      private cd: ChangeDetectorRef
  ) {
    this._subscription = this.translateI18Next.events.languageChanged.subscribe(() => {
      if (this._value) {
        this._latestValue = this.format(this._value, this._options);
        this.cd.markForCheck();
      }
    });
  }

  public transform(value: string, options: Object | string): string {
    this._latestValue = this.format(value, options);

    this._value = value;
    this._options = options;

    return this._latestValue;
  }

  ngOnDestroy() {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }

  private format(value: string, options: Object | string): string {
    let opts: any = typeof(options) === 'string' ? { format: options } : options;
    return this.translateI18Next.format(value, opts.format, opts.lng);
  }
}
