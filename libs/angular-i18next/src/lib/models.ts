import type * as i18n from 'i18next';
import type { $Dictionary as I18Next$Dictionary } from 'i18next/typescript/helpers';

export type FormatPipeOptions = { format?: string; lng?: string; case?: string; [key: string]: any };
export type PrependPipeOptions = {
  prependScope?: boolean;
  prependNamespace?: boolean;
};
export type PipeOptions = i18n.TOptions<I18Next$Dictionary> & { defaultValue?: string; } &
  FormatPipeOptions &
  PrependPipeOptions;

export type NamespaceResolver = (
  activatedRouteSnapshot: any,
  routerStateSnapshot?: any
) => Promise<void>
