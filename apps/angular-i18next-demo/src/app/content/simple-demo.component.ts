/* eslint-disable @angular-eslint/prefer-standalone */
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'simple-demo',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './simple-demo.component.html',
  standalone: false
})
export class SimpleDemoComponent {
  value: Number = 15;
  str: string = 'Hello';
}
