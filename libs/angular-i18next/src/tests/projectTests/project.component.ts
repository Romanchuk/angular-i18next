import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'project-component',
  encapsulation: ViewEncapsulation.None,
  template: '<div>{{ "privet" | i18next }}</div>',
  standalone: false
})
export class ProjectComponent {}
