import { Injectable, Inject } from '@angular/core';
import { Title, DOCUMENT } from '@angular/platform-browser';
import { I18NextPipe } from './I18NextPipe';

@Injectable()
export class I18NextTitle extends Title {
   constructor(private i18nextPipe: I18NextPipe, @Inject(DOCUMENT) doc) {
    super(doc);
   }

   setTitle(value: string) {
    return super.setTitle(this.translate(value));
   }

   private translate(text: string) {
     return this.i18nextPipe.transform(text, { case: 'cap'});
   }
}
