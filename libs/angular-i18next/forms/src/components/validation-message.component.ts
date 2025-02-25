import { Component, ViewEncapsulation, computed, effect, inject, input, signal } from "@angular/core";
import { AbstractControl, NgControl } from "@angular/forms";
import { I18NEXT_NAMESPACE, I18NextCapPipe } from "angular-i18next";
import { ValidationMessage } from "../models";
import { combineLatest, startWith, Subscription, tap } from "rxjs";

@Component({
  selector: 'i18next-validation-message',
  template: `
    <div class="error-container">{{ i18nextKey() | i18nextCap: firstMessage().params }}</div>
    <i class="error-icon"></i>
  `,
  styles: [`
    .i18next-validation-message {
      display: none;
      width: 100%;
      position: relative;
    }
    .i18next-validation-message.standalone,
    .ng-dirty.ng-invalid + .i18next-validation-message {
      display: block;
    }
  `],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [I18NextCapPipe],
  host: {
    'class': 'i18next-validation-message'
  }
})
export class I18NextValidationMessageComponent {
  private readonly i18nextNamespace = inject<string | string[]>(I18NEXT_NAMESPACE);
  private readonly validationString = 'validation';
  private readonly manualSettedFor = signal<NgControl | null>(null);
  private readonly messages = signal<ValidationMessage[]>([]);
  private controlChangesSub: Subscription | null = null;

  for = input<NgControl | null>(null);

  setFor(control: NgControl) {
    this.manualSettedFor.set(control);
  }

  constructor() {
    effect(() => {
        this.controlChangesSub?.unsubscribe();
        this.messages.set([]);
        const control = this.control();
        if (!control?.valueChanges) {
          return;
        }
        control.statusChanges?.pipe(tap((s) => console.log(s))).subscribe();
        this.controlChangesSub = combineLatest([control.valueChanges, control.statusChanges]).pipe(
          startWith([control.value, control.status]),
          tap(() => {
             this.messages.set(this.getErrorMessages(control))
          })
        ).subscribe();
    });
  }

  protected readonly control = computed(() => this.for() ?? this.manualSettedFor());

  protected readonly firstMessage = computed(() =>
    this.messages()[0] ?? new ValidationMessage()
  );

  protected readonly controlPath = computed(() =>
    this.control()?.path?.join('.') ?? ''
  );

  protected readonly i18nextKey = computed(() => {
    if (!this.firstMessage().key) return '';

    const specificKey = [
      this.validationString,
      ['control_specific', this.controlPath(), this.firstMessage().key].join('.')
    ].join(':');

    const commonKey = [this.validationString, this.firstMessage().key].join(':');
    const i18nextKeys: string[] = [];

    if (this.i18nextNamespace && this.i18nextNamespace !== this.validationString) {
      i18nextKeys.push([this.i18nextNamespace, specificKey].join('.'));
      i18nextKeys.push([this.i18nextNamespace, commonKey].join('.'));
    }

    i18nextKeys.push(specificKey);
    i18nextKeys.push(commonKey);

    return i18nextKeys;
  });

  private getErrorMessages(control: NgControl) {
    const errors = control.errors;
    if (!errors) return [];

    return Object.entries(errors ?? {}).map(([key, value]) => {
      let params = null;
      if (value instanceof Object) {
        params = value;
      } else if (value !== true) {
        params = { [key]: value };
      }
      return new ValidationMessage(key, params);
    });
  }
}
