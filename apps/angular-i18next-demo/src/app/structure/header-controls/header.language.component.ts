
import { Component, Inject, ViewEncapsulation, OnInit } from '@angular/core';
import { I18NEXT_SERVICE, I18NextCapPipe, ITranslationService } from 'angular-i18next';

@Component({
  selector: 'header-language',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './header.language.component.html',
  standalone: true,
  imports: [I18NextCapPipe]
})
export class HeaderLanguageComponent implements OnInit {

  language = 'ru';
  languages: string[] = ['ru', 'en'];

  constructor(
    @Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService
  )
  {}

  ngOnInit() {
    this.i18NextService.events.initialized.subscribe((e) => {
      if (e) {
        this.updateState(this.i18NextService.language);
      }
    });
  }

  changeLanguage(lang: string){
    if (lang !== this.i18NextService.language) {
      this.i18NextService.changeLanguage(lang).then(() => {
        this.updateState(lang);
        document.location.reload();
      });
    }
  }

  private updateState(lang: string) {
    this.language = lang;
  }

}
