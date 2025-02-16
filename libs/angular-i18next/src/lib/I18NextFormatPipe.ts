import { Inject, Injectable, Pipe, PipeTransform } from '@angular/core';

import { I18NEXT_SERVICE } from './I18NEXT_TOKENS';
import { ITranslationService } from './ITranslationService';
import { FormatPipeOptions } from './models';

@Injectable()
@Pipe({
  name: 'i18nextFormat',
  standalone: true
})
export class I18NextFormatPipe implements PipeTransform {
  constructor(
    @Inject(I18NEXT_SERVICE) private translateI18Next: ITranslationService
  ) {}

  public transform(value: any, options: FormatPipeOptions | string): string {
    let opts: FormatPipeOptions =
      typeof options === 'string' ? { format: options } : options;
    return this.translateI18Next.format(value, opts.format, opts.lng);
  }
}
