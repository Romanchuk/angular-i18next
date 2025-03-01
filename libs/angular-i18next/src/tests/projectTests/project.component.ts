import { Component, ViewEncapsulation } from '@angular/core';
import { I18NextPipe } from '../../lib';

@Component({
  selector: 'project-component',
  encapsulation: ViewEncapsulation.None,
  template: '<div>{{ "privet" | i18next }}</div>',
  standalone: true,
  imports: [I18NextPipe]
})
export class ProjectComponent {}
