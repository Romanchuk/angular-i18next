import { Injectable } from '@angular/core';
import { FormGroup, FormArray, AbstractControl } from '@angular/forms';

@Injectable()
export class ValidationDirtyChecker {
  markControlsDirty(group: FormGroup | FormArray) {
    const controls = group.controls;
    for (const ck in controls) {
      // eslint-disable-next-line no-prototype-builtins
      if (controls.hasOwnProperty(ck)) {
        const c = (<any>controls)[ck];
        c.markAsDirty({ onlySelf: true });
        if (c instanceof FormGroup || c instanceof FormArray)
          this.markControlsDirty(c);
      }
    }
  }
}
