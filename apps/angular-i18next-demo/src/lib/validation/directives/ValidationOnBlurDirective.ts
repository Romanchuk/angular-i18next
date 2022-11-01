/* eslint-disable @angular-eslint/no-host-metadata-property */
import { Directive } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[validate-onblur]',
    host: {
        '(focus)': 'onFocus($event)',
        '(blur)': 'onBlur($event)',
        '(keyup)': 'onKeyup($event)',
        '(change)': 'onChange($event)'
    }
})
// cache and remove validation on focus, and restore on blur
export class ValidationOnBlurDirective {
    private validators: any;
    private asyncValidators: any;
    private wasChanged: any;
    constructor(public formControl: NgControl) {
    }
    onFocus() {
        this.wasChanged = false;
        if (!this.formControl.control) {
          return;
        }
        this.validators = this.formControl.control.validator;
        this.asyncValidators = this.formControl.control.asyncValidator;
        this.formControl.control.clearAsyncValidators();
        this.formControl.control.clearValidators();
    }
    onKeyup() {
        this.wasChanged = true; // keyboard change
    }
    onChange() {
        this.wasChanged = true; // ng-value change
    }
    onBlur() {
        if (!this.formControl.control) {
          return;
        }
        this.formControl.control.setAsyncValidators(this.asyncValidators);
        this.formControl.control.setValidators(this.validators);
        if (this.wasChanged)
            this.formControl.control.updateValueAndValidity();
    }
}
