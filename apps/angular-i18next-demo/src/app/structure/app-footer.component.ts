import { Component, VERSION, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-footer',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app-footer.component.html'
})
export class AppFooterComponent {
  angularVersion = '0.0.0';
  i18nextVersion = '0.0.0';
  constructor(){
    this.angularVersion = VERSION.full;
    this.i18nextVersion = '22.5.1';
  }

}
