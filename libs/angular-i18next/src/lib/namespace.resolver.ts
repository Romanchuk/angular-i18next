import { inject } from "@angular/core";
import { I18NEXT_SERVICE } from "./tokens";
import { ITranslationService } from "./services/translation.service";
import { NamespaceResolver } from "./models";

export function resolver(
  activatedRouteSnapshot: any,
  routerStateSnapshot: any
): NamespaceResolver {
  const i18next: ITranslationService = inject(I18NEXT_SERVICE);
  let namespaces: string[] = activatedRouteSnapshot.data?.i18nextNamespaces ?? [];
  // @ts-ignore
  return i18next.loadNamespaces(namespaces.filter((n) => n));
}

export function i18nextNamespaceResolverFactory(i18next: ITranslationService) {
  return resolver;
}
