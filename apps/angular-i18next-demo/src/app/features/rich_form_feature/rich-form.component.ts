
import { Component, ViewEncapsulation, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { I18NextCapPipe, I18NextEagerPipe, I18NextPipe } from "angular-i18next";
import { I18NextValidationMessageDirective } from 'angular-i18next/forms';
import { ValidationDirtyChecker } from '../../../lib/validation/services/ValidationDirtyChecker';
import { RichFormModel } from './rich-form.model';

@Component({
  selector: 'rich-form',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './rich-form.component.html',
  standalone: true,
  imports: [I18NextCapPipe, I18NextPipe, I18NextEagerPipe, ReactiveFormsModule, I18NextValidationMessageDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ValidationDirtyChecker]
})
export class RichFormComponent {

  model: RichFormModel = new RichFormModel();

  private fb = inject(FormBuilder);
  private validationDirtyChecker = inject(ValidationDirtyChecker);

  form: FormGroup = this.fb.group({
    'count': [this.model.count, [Validators.min(1), Validators.max(3)]],
    'email': [this.model.email, [Validators.email]],
    'technicalContact': this.fb.group({
      'firstName': [this.model.technicalContact.firstName, [Validators.required]],
      'lastName': [this.model.technicalContact.lastName, [Validators.required]],
      'middleName': [this.model.technicalContact.middleName, [Validators.required]],
    })
  });


  onSubmit(e: Event) {
    if (!this.form.valid) {
        this.validationDirtyChecker.markControlsDirty(this.form);
         return;
    }
  }
}
