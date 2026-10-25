
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { I18NextPipe } from "angular-i18next";

@Component({
  selector: 'access-denied',
  templateUrl: './access-denied.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [I18NextPipe]
})
export class AccessDeniedComponent {

}
