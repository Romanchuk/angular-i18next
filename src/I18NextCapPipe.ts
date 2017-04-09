import {
    Injectable,
    Inject,
    Pipe,
    PipeTransform
} from '@angular/core';

import { I18NextService } from './I18NextService';
import { I18NEXT_NAMESPACE, I18NEXT_SCOPE } from './I18NEXT_TOKENS';
import { I18NextPipe } from './I18NextPipe';

@Injectable()
@Pipe({
    name: 'i18nextCap'
})
export class I18NextCapPipe extends I18NextPipe implements PipeTransform {
  constructor(translateI18Next: I18NextService, @Inject(I18NEXT_NAMESPACE) ns: string, @Inject(I18NEXT_SCOPE) scope: string) {
    super(translateI18Next, ns, scope);
  }

  public transform(key: string | string[], options: any): string {
    options = options || {};
    options.case = 'cap';
    return super.transform(key, options);
  }
}
