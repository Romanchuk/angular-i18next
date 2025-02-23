import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideServerRouting } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { provideI18Next, withTitle } from 'angular-i18next';
import { withSSR } from 'angular-i18next/ssr';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideServerRouting(serverRoutes),
    provideI18Next(withTitle(), withSSR()),
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
