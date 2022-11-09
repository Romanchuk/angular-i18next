import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { I18NextModule, I18NEXT_NAMESPACE } from 'angular-i18next';
import { I18NextValidationMessageModule } from '@protoarch.angular/validation-message/provider-i18next';
import { ValidationModule } from '../../../lib/validation/ValidationModule';
// import { I18NextValidationMessageModule } from '../../provider-i18next';
import { RichFormComponent } from './rich-form.component';
import { RichFormFeatureRouterModule } from './RichFormFeatureRouterModule';


export const declarations = [
  RichFormComponent
];

export const providers = [
  FormBuilder,
  {
    provide: I18NEXT_NAMESPACE,
    useValue: ['feature.rich_form']
  }
];

@NgModule({
  bootstrap: declarations,
  declarations: declarations,
  providers: providers,
  imports: [
    //core
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    //feature
    RichFormFeatureRouterModule,

    //lib
    I18NextModule,
    ValidationModule,
    // ValidationMessageModule
    I18NextValidationMessageModule,
  ]
})
export class RichFormFeatureModule {}
