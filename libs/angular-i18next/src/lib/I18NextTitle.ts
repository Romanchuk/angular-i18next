import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { I18NextPipe } from './I18NextPipe';

@Injectable()
export class I18NextTitle extends Title {
  constructor(private i18nextPipe: I18NextPipe, @Inject(DOCUMENT) doc: any) {
    super(doc);
  }

  override setTitle(value: string) {
    return super.setTitle(this.translate(value));
  }

  private translate(text: string) {
    return this.i18nextPipe.transform(text, { format: 'cap' });
  }
}
