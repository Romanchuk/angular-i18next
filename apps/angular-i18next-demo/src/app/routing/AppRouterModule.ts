import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { I18NEXT_NAMESPACE_RESOLVER } from 'angular-i18next';
import { RichFormFeatureModule } from '../features/rich_form_feature/RichFormFeatureModule';

import { AccessDeniedComponent } from './../content/access-denied/access-denied.component';
import { SimpleDemoComponent } from './../content/simple-demo.component';

export const appRoutes: Routes = [
  { path: '', component: SimpleDemoComponent },
  {
    path: 'rich_form',
    loadChildren: () => RichFormFeatureModule,
    data: {
      i18nextNamespaces: ['feature.rich_form']
    },
    resolve: {
      i18next: I18NEXT_NAMESPACE_RESOLVER
    }
 },
  { path: 'denied', component: AccessDeniedComponent, data: { title: 'error:access_denied' }}
];
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
  ]
})
export class AppRouterModule {}
