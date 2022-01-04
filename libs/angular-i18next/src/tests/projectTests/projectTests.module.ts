import { NgModule } from '@angular/core';
import { ProjectComponent } from './project.component';
import { I18NextModule } from '../../lib';

@NgModule({
  bootstrap: [ProjectComponent],
  declarations: [ProjectComponent],
  imports: [I18NextModule],
})
export class ProjectTestModule {}
