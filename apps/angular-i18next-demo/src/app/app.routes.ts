import { Routes } from "@angular/router";
import { I18NEXT_NAMESPACE, i18NextNamespacesGuard } from "angular-i18next";
import { AccessDeniedComponent } from "./content/access-denied/access-denied.component";
import { SimpleDemoComponent } from "./content/simple-demo.component";
import { RichFormComponent } from "./features/rich_form_feature/rich-form.component";

export const appRoutes: Routes = [
  { path: '', component: SimpleDemoComponent },
  {
    path: 'rich_form',
    loadComponent: () => RichFormComponent,
    data: {
      title: 'feature.rich_form:title'
    },
    providers: [
      {
          provide: I18NEXT_NAMESPACE,
          useValue: 'feature.rich_form',
      },
    ],
    canActivate: [i18NextNamespacesGuard('feature.rich_form')]
 },
  { path: 'denied', component: AccessDeniedComponent, data: { title: 'error:access_denied' }}
];
