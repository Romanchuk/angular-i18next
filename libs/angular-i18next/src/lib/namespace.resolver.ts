import { ITranslationService } from "./ITranslationService";
import { NamespaceResolver } from "./models";

export function resolver(
  activatedRouteSnapshot: any,
  routerStateSnapshot: any
): NamespaceResolver {
  let namespaces: string[] = [];
  namespaces =
    (activatedRouteSnapshot.data &&
      activatedRouteSnapshot.data.i18nextNamespaces) ||
    namespaces;
  // @ts-ignore
  return this.loadNamespaces(namespaces.filter((n) => n));
}

export function i18nextNamespaceResolverFactory(i18next: ITranslationService) {
  return resolver.bind(i18next);
}
