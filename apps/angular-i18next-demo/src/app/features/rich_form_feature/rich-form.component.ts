
import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidationDirtyChecker } from '../../../lib/validation/services/ValidationDirtyChecker';
import { RichFormModel } from './rich-form.model';
import { I18NextCapPipe } from "angular-i18next";
import { I18NextPipe } from "angular-i18next";
import { I18NextEagerPipe } from "angular-i18next";

@Component({
  selector: 'rich-form',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './rich-form.component.html',
  standalone: true,
  imports: [I18NextCapPipe, I18NextPipe, I18NextEagerPipe, ReactiveFormsModule]
})
export class RichFormComponent {

  form: FormGroup;
  model: RichFormModel = new RichFormModel();

  constructor(private fb: FormBuilder, private vdc: ValidationDirtyChecker){
    this.form = this.fb.group({
      'count': [this.model.count, [Validators.min(1), Validators.max(3)]],
      'email': [this.model.email, [Validators.email]],
      'technicalContact': this.fb.group({
        'firstName': [this.model.technicalContact.firstName, [Validators.required]],
        'lastName': [this.model.technicalContact.lastName, [Validators.required]],
        'middleName': [this.model.technicalContact.middleName, [Validators.required]],
      })
    });
  }


  onSubmit(e: Event) {
    this.form.controls['technicalContact'].updateValueAndValidity();

    if (!this.form.valid) {
      this.vdc.markControlsDirty(this.form);
    }
  }
}
