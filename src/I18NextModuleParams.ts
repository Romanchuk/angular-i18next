import { Type } from '@angular/core';
import { I18NextErrorHandlingStrategy } from './I18NextErrorHandlingStrategies';

export interface I18NextModuleParams {
    localizeTitle?: boolean;
    errorHandlingStrategy?: Type<I18NextErrorHandlingStrategy>;
}

