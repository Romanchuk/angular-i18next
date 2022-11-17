import 'zone.js/dist/zone-node';

import { APP_BASE_HREF } from '@angular/common';
import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { existsSync } from 'fs';
import { join } from 'path';

import i18next from 'i18next';
import ChainedBackend from 'i18next-chained-backend';
import HttpApi from 'i18next-http-backend';
import middleware from 'i18next-http-middleware';
import resourcesToBackend from "i18next-resources-to-backend";

import { i18nextOptions } from './src/app/i18next.options';
import { AppServerModule } from './src/main.server';

const PORT = process.env['PORT'] || 4000;

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

  const indexHtml = existsSync(join(distFolder, 'index.html')) ? 'index.html' : 'index';

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/main/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, { req,
      providers: [
        { provide: APP_BASE_HREF, useValue: req.baseUrl }
      ]
    });
  });

  return server;
}

async function run(): Promise<void> {


  // Start up the Node server
  const server = await app();
  server.listen(PORT, () => {
    console.log(`Node Express server listening on http://localhost:${PORT}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';

