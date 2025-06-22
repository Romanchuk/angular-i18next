import type * as i18n from 'i18next';

export type FormatPipeOptions = { format?: string; lng?: string; case?: string; [key: string]: any };
export type PrependPipeOptions = {
  prependScope?: boolean;
  prependNamespace?: boolean;
};


export type PipeOptions = i18n.TOptions &
  FormatPipeOptions &
  PrependPipeOptions;

export type NamespaceResolver = (
  activatedRouteSnapshot: any,
  routerStateSnapshot?: any
) => Promise<void>
