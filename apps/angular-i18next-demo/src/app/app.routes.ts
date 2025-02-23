import { Routes } from "@angular/router";
import { I18NEXT_NAMESPACE_RESOLVER } from "angular-i18next";
import { AccessDeniedComponent } from "./content/access-denied/access-denied.component";
import { SimpleDemoComponent } from "./content/simple-demo.component";
import { RichFormComponent } from "./features/rich_form_feature/rich-form.component";

export const appRoutes: Routes = [
  { path: '', component: SimpleDemoComponent },
  {
    path: 'rich_form',
    loadComponent: () => RichFormComponent,
    data: {
      i18nextNamespaces: ['feature.rich_form'],
      title: 'feature.rich_form:title'
    },
    resolve: {
      i18next: I18NEXT_NAMESPACE_RESOLVER
    }
 },
  { path: 'denied', component: AccessDeniedComponent, data: { title: 'error:access_denied' }}
];
