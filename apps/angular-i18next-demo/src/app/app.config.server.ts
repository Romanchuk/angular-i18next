import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { provideI18Next, withTitle } from 'angular-i18next';
import { withSSR } from 'angular-i18next/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes)),
    provideI18Next(withTitle(), withSSR()),
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
