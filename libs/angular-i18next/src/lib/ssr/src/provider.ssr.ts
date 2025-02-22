import { InjectionToken } from '@angular/core';
import type { Request } from 'express';
import { I18NextRequest } from 'i18next-http-middleware';
import { I18NEXT_INSTANCE } from "../../tokens";
import { I18NextFeature, I18NextFeatureKind, makeI18NextFeature } from "../../provider.utils";

const REQUEST = new InjectionToken<Request>('REQUEST');

/**
 * Feature for use when configuring `provideI18Next` to enable SSR.
 *
 * @description
 * This feature expects the Express request object to be injected as
 * `REQUEST` and will extract the `i18n` object from it.
 *
 * @publicApi
 */
export function withSSR(): I18NextFeature<I18NextFeatureKind.SSR> {
  return makeI18NextFeature(I18NextFeatureKind.SSR, [
    {
      provide: I18NEXT_INSTANCE,
      useFactory: (req: Request & I18NextRequest) => {
        return req.i18n;
      },
      deps: [REQUEST],
    },
  ]);
}
