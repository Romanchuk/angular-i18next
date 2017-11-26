import { FactoryProvider } from '@angular/core';
import { I18NEXT_NAMESPACE_RESOLVER, I18NEXT_SERVICE } from './I18NEXT_TOKENS';
import { ITranslationService } from './ITranslationService';

// tslint:disable-next-line:variable-name
export const I18nextNamespaceResolver: FactoryProvider = {
    provide: I18NEXT_NAMESPACE_RESOLVER,
    useFactory: (i18next: ITranslationService) =>
      (activatedRouteSnapshot, routerStateSnapshot): Promise<void> => {
        let namespaces: string[] = [];
        namespaces = activatedRouteSnapshot.data && activatedRouteSnapshot.data.i18nextNamespaces || namespaces;
        return i18next.loadNamespaces(namespaces.filter(n => n));
    },
    deps: [I18NEXT_SERVICE]
  };
