import { InjectionToken } from '@angular/core';
import { ITranslationService } from './ITranslationService';

export const I18NEXT_SCOPE = new InjectionToken<string>('I18NEXT_SCOPE');
export const I18NEXT_NAMESPACE = new InjectionToken<string>('I18NEXT_NAMESPACE');
export const I18NEXT_SERVICE = new InjectionToken<ITranslationService>('I18NEXT_SERVICE');
export const I18NEXT_NAMESPACE_RESOLVER = new InjectionToken<ITranslationService>('I18NEXT_NAMESPACE_RESOLVER');
