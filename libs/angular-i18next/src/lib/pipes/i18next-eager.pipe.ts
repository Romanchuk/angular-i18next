import {
  ChangeDetectorRef,
  Inject,
  Pipe,
  PipeTransform
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PipeOptions } from '../models';
import { ITranslationService } from '../services/translation.service';
import {
  I18NEXT_NAMESPACE,
  I18NEXT_SCOPE,
  I18NEXT_SERVICE,
} from '../tokens';
import { I18NextPipe } from './i18next.pipe';

@Pipe({
  name: 'i18nextEager',
  pure: false,
  standalone: true,
})
export class I18NextEagerPipe
  extends I18NextPipe
  implements PipeTransform
{
  private lastKey: string | undefined;
  private lastOptions: PipeOptions | undefined;
  private lastValue: string = '';

  constructor(
    @Inject(I18NEXT_SERVICE) protected override translateI18Next: ITranslationService,
    @Inject(I18NEXT_NAMESPACE) protected override ns: string | string[],
    @Inject(I18NEXT_SCOPE) protected override scope: string | string[],
    private cd: ChangeDetectorRef
  ) {
    super(translateI18Next, ns, scope);
    translateI18Next.events.languageChanged
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
          this.cd.markForCheck();
      });
  }
  private hasKeyChanged(key: string | string[]): boolean {
    return !this.lastKey || this.lastKey !== key;
  }

  private hasOptionsChanged(options?: PipeOptions): boolean {
    return this.lastOptions !== options;
  }

  public override transform(key: string | string[], options?: PipeOptions): string {
    const newKey = this.translateI18Next.language + '|' + JSON.stringify(key);

    if (this.hasKeyChanged(newKey) || this.hasOptionsChanged(options)) {
      this.lastKey = newKey;
      this.lastOptions = options;
      this.lastValue = super.transform(key, options);
    }
    return this.lastValue;
  }
}
