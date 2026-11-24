import type { TFunction } from 'i18next';

export interface I18NextLoadResult {
  err: any;
  t?: TFunction;
}
