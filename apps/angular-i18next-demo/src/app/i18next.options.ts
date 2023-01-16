import { defaultInterpolationFormat, I18NextModule } from "angular-i18next";

import * as i18n from 'i18next';
import { BackendOptions } from "i18next-http-backend";

export const i18nextOptions: i18n.InitOptions & { backend: BackendOptions} = {
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
    format: I18NextModule.interpolationFormat(defaultInterpolationFormat)
  },
  //backend plugin options
  backend: {
    loadPath: 'locales/{{lng}}.{{ns}}.json',
  },
  // lang detection plugin options
  detection: {
    // order and from where user language should be detected
    order: ['cookie'],

    // keys or params to lookup language from
    lookupCookie: 'lang',

    // cache user language on
    caches: ['cookie'],

    // optional expire and domain for set cookie
    cookieMinutes: 10080, // 7 days
    // cookieDomain: I18NEXT_LANG_COOKIE_DOMAIN
  }
};

export default i18nextOptions;
