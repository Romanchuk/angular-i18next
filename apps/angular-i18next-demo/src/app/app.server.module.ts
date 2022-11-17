import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { I18NEXT_INSTANCE } from 'angular-i18next';
import type { Request } from 'express';
import { I18NextRequest } from 'i18next-http-middleware';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';


@NgModule({
  imports: [
    AppModule,
    ServerModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: I18NEXT_INSTANCE,
      useFactory: (req: Request & I18NextRequest) => {
          return req.i18n;
      },
      deps: [
        REQUEST
      ]
    }
  ]
})
export class AppServerModule {}
