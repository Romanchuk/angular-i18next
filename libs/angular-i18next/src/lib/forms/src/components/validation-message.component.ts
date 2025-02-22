import { Component, ViewEncapsulation, Input, computed, inject, input, signal } from "@angular/core";
import { NgControl } from "@angular/forms";
import { I18NEXT_NAMESPACE } from "src/lib/tokens";
import { I18NextCapPipe } from "src/lib/pipes/i18next-cap.pipe";
import { ValidationMessage } from "../models";

@Component({
  selector: 'i18next-validation-message',
  template: `
    <div class="error-container">{{ i18nextKey() | i18nextCap: firstMessage().params }}</div>
    <i class="error-icon"></i>
  `,
  styles: [`
    :host {
      display: none;
      width: 100%;
      position: relative;
    }
    :host.standalone,
    .ng-dirty.ng-invalid + :host {
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

  for = input<NgControl | null>(null);

  setFor(control: NgControl | null) {
    this.manualSettedFor.set(control);
  }

  protected readonly control = computed(() => this.for() ?? this.manualSettedFor());
  protected readonly messages = computed(() => this.getValidationMessages());

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

  private getValidationMessages(): ValidationMessage[] {
    if (!this.control()?.errors) return [];

    return Object.entries(this.control()?.errors ?? {}).map(([key, value]) => {
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
