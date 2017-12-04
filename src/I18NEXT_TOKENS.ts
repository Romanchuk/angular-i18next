import { InjectionToken } from '@angular/core';

import { I18NextResolveStrategy } from './I18NextResolveStrategies';
import { ITranslationService } from './ITranslationService';

export const I18NEXT_SCOPE = new InjectionToken<string>('I18NEXT_SCOPE');
export const I18NEXT_NAMESPACE = new InjectionToken<string>('I18NEXT_NAMESPACE');
export const I18NEXT_SERVICE = new InjectionToken<ITranslationService>('I18NEXT_SERVICE');
export const I18NEXT_NAMESPACE_RESOLVER = new InjectionToken<Promise<void>>('I18NEXT_NAMESPACE_RESOLVER');
export const I18NEXT_RESOLVE_STRATEGY = new InjectionToken<I18NextResolveStrategy>('I18NEXT_RESOLVE_STRATEGY');
