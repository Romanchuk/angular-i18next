import { Directive, AfterViewInit, OnDestroy, ComponentRef, ViewContainerRef, inject, Type } from "@angular/core";
import { FormControlName, NgControl } from "@angular/forms";
import { I18NextValidationMessageComponent } from "../components/validation-message.component";

@Directive({
  selector: '[formControlName][i18nextValidationMessage],[formGroupName][i18nextValidationMessage],[formArrayName][i18nextValidationMessage]',
  standalone: true
})
export class I18NextValidationMessageDirective implements AfterViewInit, OnDestroy {
  private readonly viewContainer = inject(ViewContainerRef);
  private readonly formControlName = inject(FormControlName, { optional: true });
  
  private validationMessageComponent: ComponentRef<I18NextValidationMessageComponent> | null = null;

  ngAfterViewInit(): void {
    this.detach();
    this.validationMessageComponent = this.viewContainer.createComponent(I18NextValidationMessageComponent);

    const control: NgControl = this.formControlName!;
    this.validationMessageComponent.instance.setFor(control);
    this.validationMessageComponent.changeDetectorRef.detectChanges();
  }

  ngOnDestroy(): void {
    this.detach();
  }

  private detach(): void {
    if (this.validationMessageComponent?.changeDetectorRef) {
      this.validationMessageComponent.changeDetectorRef.detach();
      this.validationMessageComponent = null;
    }
  }
}
