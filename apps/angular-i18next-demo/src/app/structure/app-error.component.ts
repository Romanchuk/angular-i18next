
import { Component, ViewEncapsulation } from '@angular/core';
import { I18NextPipe } from 'angular-i18next';

@Component({
  selector: 'app-error',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app-error.component.html',
  standalone: true,
  imports: [I18NextPipe]
})
export class AppErrorComponent {
  public showed = false;
  public toggle(){
    this.showed = !this.showed;
  }
  public close(){
    this.showed = false;
  }
  public reload(){
    document.location.href = document.location.protocol + '//' + document.location.host;
  }
}
