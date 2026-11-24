
import { Component, VERSION, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-footer',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app-footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class AppFooterComponent {
  angularVersion = VERSION.full;
  i18nextVersion = '25.10.10';
}
