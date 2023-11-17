import 'zone.js/node';

import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import * as express from 'express';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { REQUEST, RESPONSE } from './src/express.tokens';
import i18next from 'i18next';
import ChainedBackend from 'i18next-chained-backend';
import HttpApi from 'i18next-http-backend';
import * as middleware from 'i18next-http-middleware';
import resourcesToBackend from "i18next-resources-to-backend";
import { AppServerModule } from './src/main.server';

import { i18nextOptions } from './src/app/i18next.options';

// The Express app is exported so that it can be used by serverless Functions.
export async function app(): Promise<express.Express> {
  const server = express();
  await i18next
    .use(ChainedBackend)
    .use(middleware.LanguageDetector)
    .init({
      ...i18nextOptions,
      backend: {
        backends: [
          HttpApi,
          resourcesToBackend((lng, ns, clb) => {
            import(`./src/locales/${lng}.${ns}.json`)
                  .then((resources) => clb(null, resources))
                  .catch((r)=> clb(r,null))
          })
        ],
        backendOptions: [{
          loadPath: '/locales/{{lng}}.{{ns}}.json'
        }]
      }
  })
  server.use(
    middleware.handle(i18next, {
      // ignoreRoutes: ['/foo'] // or function(req, res, options, i18next) { /* return true to ignore */ }
    })
  )
  const distFolder = join(process.cwd(), 'dist/angular-i18next-demo/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html'))
    ? join(distFolder, 'index.original.html')
    : join(distFolder, 'index.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get(
    '*.*',
    express.static(distFolder, {
      maxAge: '1y',
    })
  );

  // All regular routes use the Angular engine
  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap: AppServerModule,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: distFolder,
        providers: [
          { provide: APP_BASE_HREF, useValue: baseUrl },
          { provide: RESPONSE, useValue: res },
          { provide: REQUEST, useValue: req },
        ],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

async function run(): Promise<void> {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = await app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = (mainModule && mainModule.filename) || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
