import { NgModule } from '@angular/core';

import { ValidationOnBlurDirective } from './directives/ValidationOnBlurDirective';
import { ValidationDirtyChecker } from './services/ValidationDirtyChecker';


export const imports = [
  ValidationOnBlurDirective
];

@NgModule({
  imports,
  exports: imports,
  providers: [
    ValidationDirtyChecker
  ]
})
export class ValidationModule {
}
