/**
 * Represents a validation message with translation key and parameters
 */
export interface ValidationMessageParams {
  [key: string]: unknown;
}

export class ValidationMessage {
  constructor(
    public readonly key: string = '',
    public readonly params?: ValidationMessageParams
  ) {}
}
