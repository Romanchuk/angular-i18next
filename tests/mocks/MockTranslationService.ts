import { ITranslationService } from '../../src/ITranslationService';
import {
  Injectable,
  Inject
} from '@angular/core';


@Injectable()
export class MockI18NextService implements ITranslationService {

  language: string = '';
  languages: string[] = [];

  get options(): any {
    return {
        keySeparator: '.',
        nsSeparator: ':'
    };
  }

  private i18nextPromise: Promise<void>;

  public use(plugin: Function) {
    return this;
  }

  public init(options?: any): Promise<void> {
    options = options || {};
    return new Promise<any>(
      (resolve: (thenableOrResult?: any) => void,
        reject: (error: any) => void) => {
            resolve(null);
      });
  }

  public t(key: string | string[], options?: any): string {
    if (key instanceof Array)
        return key.length > 0 ? key[0] : '';
    return key;
  }

  public changeLanguage(lng: string): Promise<any> {
    return new Promise<any>(
      (resolve: (thenableOrResult?: any) => void,
        reject: (error: any) => void) => {
            this.language = lng;
            resolve(this.language);
      });
  }
}
