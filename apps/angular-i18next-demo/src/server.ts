import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import type { NextFunction, Request, Response } from 'express';
import express from 'express';
import i18next from 'i18next';
import ChainedBackend, { ChainedBackendOptions } from 'i18next-chained-backend';
import * as i18nextHttpMiddleware from 'i18next-http-middleware';
import resourcesToBackend from "i18next-resources-to-backend";
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import i18nextOptions from './app/i18next.options';


const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

await i18next
    .use(ChainedBackend)
    .use(i18nextHttpMiddleware.LanguageDetector)
    .init<ChainedBackendOptions>({
      ...i18nextOptions,
      backend: {
        backends: [
          resourcesToBackend((lng, ns, clb) => {
            import(`./locales/${lng}.${ns}.json`)
                  .then((resources) => clb(null, resources))
                  .catch((r)=> clb(r,null))
          })
        ],
        backendOptions: [{
          loadPath: '/locales/{{lng}}.{{ns}}.json'
        }]
      }
  });

const i18nextHandler = i18nextHttpMiddleware.handle(i18next) as any;
app.use(i18nextHandler);
/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/**', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use('/**', (req: Request & i18nextHttpMiddleware.I18NextRequest, res: Response, next: NextFunction) => {
  angularApp
    .handle(req, {
      i18n: req.i18n,
    })
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['PM2'] === 'true') {
  const port = process.env['PORT'] || 4000;
  const server = app.listen(port, () => {
    process.send?.('ready');
    console.log(`Node Express server listening on http://localhost:${port}`);
  });

  // Graceful shutdown
  process.on('SIGINT', () => {
      const cleanUp = () => {
        // Clean up other resources like DB connections
      }

      console.log('Closing server...')

      server.close(() => {
        console.log('Server closed !!! ')

        cleanUp()
        process.exit()
      })

      // Force close server after 5secs
      setTimeout((e: any) => {
        console.log('Forcing server close !!!', e)

        cleanUp()
        process.exit(1)
      }, 5000)
    })
  }

/**
 * The request handler used by the Angular CLI (dev-server and during build).
 */
export const reqHandler = createNodeRequestHandler(app);
