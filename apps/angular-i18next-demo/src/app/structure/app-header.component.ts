import { Component, ViewEncapsulation } from '@angular/core';
import { I18NextCapPipe, I18NextPipe } from 'angular-i18next';
import { HeaderLanguageComponent } from "./header-controls/header.language.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app-header.component.html',
  standalone: true,
  imports: [I18NextPipe, I18NextCapPipe, HeaderLanguageComponent, RouterLink],
})
export class AppHeaderComponent {}
