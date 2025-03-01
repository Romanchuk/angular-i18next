/**
 * Represents a validation message with translation key and parameters
 */
export interface ValidationMessageParams {
  [key: string]: unknown;
}

export class ValidationMessage {
  constructor(
    public readonly key = '',
    public readonly params?: ValidationMessageParams
  ) {}
}
