import { I18NextFeature, I18NextFeatureKind, makeI18NextFeature } from '../../provider.utils';

/**
 * Provides the necessary dependencies for using i18next with Angular forms.
 * This includes validation message components and directives.
 *
 * @returns An I18NextFeature that configures form validation support
 *
 * Example:
 * ```typescript
 * providers: [
 *   provideI18Next(withForms())
 * ]
 * ```
 */
export function withForms(): I18NextFeature<I18NextFeatureKind.Forms> {
  return makeI18NextFeature(I18NextFeatureKind.Forms, []);
}
