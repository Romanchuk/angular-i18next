import { inject } from "@angular/core";
import { I18NEXT_SERVICE } from "./tokens";
import { ITranslationService } from "./services/translation.service";
import { NamespaceResolver } from "./models";

export function resolver(
  activatedRouteSnapshot: any,
  routerStateSnapshot?: any
): Promise<void> {
  const i18next: ITranslationService = inject(I18NEXT_SERVICE);
  const namespaces: string[] = activatedRouteSnapshot.data?.i18nextNamespaces ?? [];
  return i18next.loadNamespaces(namespaces.filter((n) => n));
}

export function i18nextNamespaceResolverFactory() {
  return resolver;
}
