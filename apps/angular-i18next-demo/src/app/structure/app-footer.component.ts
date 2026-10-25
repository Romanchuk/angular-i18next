
import { Component, VERSION, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-footer',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app-footer.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: true
})
export class AppFooterComponent {
  angularVersion = '0.0.0';
  i18nextVersion = '0.0.0';
  constructor(){
    this.angularVersion = VERSION.full;
    this.i18nextVersion = '24.2.1';
  }

}
