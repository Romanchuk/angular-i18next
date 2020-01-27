import { ChangeDetectorRef, Inject, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { I18NextPipe } from './I18NextPipe';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { I18NEXT_NAMESPACE, I18NEXT_SCOPE, I18NEXT_SERVICE } from './I18NEXT_TOKENS';
import { ITranslationService } from './ITranslationService';

@Pipe({
  name: 'i18nextEager',
  pure: false
})
export class I18NextEagerPipe extends I18NextPipe implements PipeTransform, OnDestroy {

private lastKey: string;
private lastValue: string;

private ngUnsubscribe: Subject<any> = new Subject();

constructor(
    @Inject(I18NEXT_SERVICE) protected translateI18Next: ITranslationService,
    @Inject(I18NEXT_NAMESPACE) protected ns: string | string[],
    @Inject(I18NEXT_SCOPE) protected scope: string | string[],
    private cd: ChangeDetectorRef
) {
    super(translateI18Next, ns, scope);
    translateI18Next.events.languageChanged
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(() => {
          this.cd.markForCheck();
      });
  }

  public transform(key: string | string[], options?: any): string {
    const newKey = this.translateI18Next.language + '|' + JSON.stringify(key);
    if (!this.lastKey || this.lastKey !== newKey) {
      this.lastKey = newKey;
      this.lastValue = super.transform(key, options);
    }
    return this.lastValue;
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
