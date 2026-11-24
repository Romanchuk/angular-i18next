import { OnChanges, SimpleChanges, Component, Directive, forwardRef } from '@angular/core';
import { Validator, AsyncValidatorFn, ValidatorFn, FormControl, FormGroup, FormArray, AbstractControl, NG_VALIDATORS } from '@angular/forms';

export class ArrayValidators {
  static minLength(minLength: number, ignoreNullAndUndefined = false): ValidatorFn {
    return (control: FormControl) => {
      if (control) {
        const isArray = control.value instanceof Array;
        if (!isArray)
          throw new Error('Control value must be array!');
        const val: Array<any> = control.value;
        let isValid = false;
        if (!ignoreNullAndUndefined)
          isValid = val.length >= minLength;
        else
          isValid = val.filter(v => v != null).length >= minLength;
        if (isValid)
          return null;
        return { 'arrayMinLength': minLength };
      }
    };
  }
  static maxLength(maxLength: number, ignoreNullAndUndefined = false): ValidatorFn {
    return (control: FormControl) => {
      if (control) {
        const isArray = control.value instanceof Array;
        if (!isArray)
          throw new Error('Control value must be array!');
        const val: Array<any> = control.value;
        let isValid = false;
        if (!ignoreNullAndUndefined)
          isValid = val.length <= maxLength;
        else
          isValid = val.filter(v => v != null).length <= maxLength;
        if (isValid)
          return null;
        return { 'arrayMaxLength': maxLength };
      }
    };
  }

  static eqLength(length: number, ignoreNullAndUndefined = false): ValidatorFn {
    return (control: FormControl) => {
      if (control) {
        const isArray = control.value instanceof Array;
        if (!isArray)
          throw new Error('Control value must be array!');
        const val: Array<any> = control.value;
        let isValid = false;
        if (!ignoreNullAndUndefined)
          isValid = val.length === length;
        else
          isValid = val.filter(v => v != null).length === length;
        if (isValid)
          return null;
        return { 'arrayMaxLength': length };
      }
    };
  }
}
