import { Inject, Injectable, Pipe, PipeTransform } from '@angular/core';

import {
  I18NEXT_NAMESPACE,
  I18NEXT_SCOPE,
  I18NEXT_SERVICE,
} from './I18NEXT_TOKENS';
import { I18NextPipe } from './I18NextPipe';
import { ITranslationService } from './ITranslationService';
import { PipeOptions } from './models';

@Injectable()
@Pipe({
  name: 'i18nextCap',
})
export class I18NextCapPipe extends I18NextPipe implements PipeTransform {
  constructor(
    @Inject(I18NEXT_SERVICE) translateI18Next: ITranslationService,
    @Inject(I18NEXT_NAMESPACE) ns: string | string[],
    @Inject(I18NEXT_SCOPE) scope: string | string[]
  ) {
    super(translateI18Next, ns, scope);
  }

  public override transform(key: string | string[], options?: PipeOptions): string {
    options = options || {};
    options.format = 'cap';
    return super.transform(key, options);
  }
}
