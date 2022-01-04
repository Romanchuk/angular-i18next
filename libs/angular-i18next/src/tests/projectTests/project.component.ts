import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'project-component',
  encapsulation: ViewEncapsulation.None,
  template: '<div>{{ "privet" | i18next }}</div>',
})
export class ProjectComponent {}
