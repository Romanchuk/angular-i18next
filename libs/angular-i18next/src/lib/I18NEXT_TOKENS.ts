import * as i18n from 'i18next'
import { InjectionToken } from '@angular/core';
import { I18NextErrorHandlingStrategy } from './I18NextErrorHandlingStrategies';
import { ITranslationService } from './ITranslationService';

export type NamespaceResolver = (
  activatedRouteSnapshot: any,
  routerStateSnapshot?: any
) => Promise<void>

export const I18NEXT_SCOPE = new InjectionToken<string | string[]>(
  'I18NEXT_SCOPE'
);
export const I18NEXT_NAMESPACE = new InjectionToken<string | string[]>(
  'I18NEXT_NAMESPACE'
);
export const I18NEXT_SERVICE = new InjectionToken<ITranslationService>(
  'I18NEXT_SERVICE'
);
export const I18NEXT_NAMESPACE_RESOLVER = new InjectionToken<NamespaceResolver>(
  'I18NEXT_NAMESPACE_RESOLVER'
);
export const I18NEXT_ERROR_HANDLING_STRATEGY =
  new InjectionToken<I18NextErrorHandlingStrategy>(
    'I18NEXT_ERROR_HANDLING_STRATEGY'
  );

export const I18NEXT_INSTANCE = new InjectionToken<i18n.i18n>('I18NEXT_INSTANCE');
