import type { FormatFunction, InterpolationOptions } from "i18next";

export function defaultInterpolationFormat(
    value: any,
    format?: string,
    lng?: string
  ): string {
    if (!value) return value;
    switch (format) {
      case 'upper':
      case 'uppercase':
        return value.toUpperCase();
      case 'lower':
      case 'lowercase':
        return value.toLowerCase();
      case 'cap':
      case 'capitalize':
        return value.charAt(0).toUpperCase() + value.slice(1);
      case null:
      case undefined:
      case 'none':
      default:
        return value;
    }
  }

  export function interpolationFormat(customFormat: Function | null = null): FormatFunction {
    function formatDelegate(value: any,
                            format?: string,
                            lng?: string,
                            options?: InterpolationOptions & { [key: string]: any }
    ): string {
      let formatedValue: string = defaultInterpolationFormat(
        value,
        format,
        lng
      );
      if (customFormat === null) return formatedValue;
      return customFormat(formatedValue, format, lng);
    }
    return formatDelegate;
  }