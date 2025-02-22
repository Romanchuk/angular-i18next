import { defaultInterpolationFormat, interpolationFormat } from "angular-i18next";
import type * as i18n from 'i18next';
import type { HttpBackendOptions } from "i18next-http-backend";

export const i18nextOptions: i18n.InitOptions & { backend: HttpBackendOptions} = {
  supportedLngs:['en', 'ru'],
  fallbackLng: 'en',
  debug: true, // set debug?
  returnEmptyString: false,
  ns: [
    'translation',
    'validation',
    'error'
  ],
  interpolation: {
    format: interpolationFormat(defaultInterpolationFormat)
  },
  //backend plugin options
  backend: {
    loadPath: 'locales/{{lng}}.{{ns}}.json',
  },
  // lang detection plugin options
  detection: {
    // order and from where user language should be detected
    order: ['cookie', 'header'],

    // keys or params to lookup language from
    lookupCookie: 'lang',
   // lookupHeader: 'accept-language',
    // cache user language on
    caches: ['cookie'],

    // optional expire and domain for set cookie
    cookieMinutes: 10080, // 7 days
  }
};

export default i18nextOptions;
