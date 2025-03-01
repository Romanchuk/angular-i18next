import { Provider } from "@angular/core";

/**
 * A feature for use when configuring `provideI18Next`.
 *
 * @publicApi
 */
export interface I18NextFeature<KindT extends I18NextFeatureKind> {
  ɵkind: KindT;
  ɵproviders: Provider[];
}

export function makeI18NextFeature<KindT extends I18NextFeatureKind>(
  kind: KindT,
  providers: Provider[],
): I18NextFeature<KindT> {
  return {
    ɵkind: kind,
    ɵproviders: providers,
  };
}

/**
 * Identifies a particular kind of `HttpFeature`.
 *
 * @publicApi
 */
export enum I18NextFeatureKind {
  CustomErrorHandlingStrategy,
  Mock,
  Title,
  AppInitialize,
  SSR,
  Forms
}
