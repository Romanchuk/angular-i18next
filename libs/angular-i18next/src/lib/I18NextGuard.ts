import { inject } from '@angular/core';
import { from, map } from 'rxjs';
import { I18NEXT_SERVICE } from './I18NEXT_TOKENS';

/**
 * This function can trigger the loading of I18Next namespaces and block route activation to ensure namespaces are loaded before navigation continues.
 *
 * @param i18nextNamespaces I18Next namespaces to load
 * @returns A functional guard that will load the I18Next Namespaces, and continue navigation when loaded.
 */
export const i18NextGuard =
  (...i18nextNamespaces: string[]) =>
  () =>
    inject(I18NEXT_SERVICE)
      .loadNamespaces(i18nextNamespaces.filter(Boolean))
      .then(() => true);
