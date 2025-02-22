
import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { I18NextCapPipe, I18NextFormatPipe, I18NextPipe } from "angular-i18next";

@Component({
  selector: 'simple-demo',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './simple-demo.component.html',
  standalone: true,
  imports: [I18NextCapPipe, I18NextPipe, I18NextFormatPipe, FormsModule]
})
export class SimpleDemoComponent {
  value = 15;
  str = 'Hello';
}
