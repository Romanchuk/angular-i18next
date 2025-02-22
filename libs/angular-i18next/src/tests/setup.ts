import { provideI18NextMockAppInitializer, withMock } from '../lib/testing/src/public_api';
import {
  provideI18Next,

} from '../lib';

export const MOCK_I18N_PROVIDERS = [
  provideI18NextMockAppInitializer(),
  provideI18Next(withMock()),
];
