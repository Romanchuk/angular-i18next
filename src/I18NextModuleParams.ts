import { Type } from '@angular/core';
import { I18NextErrorHandlingStrategy } from './I18NextErrorHandlingStrategies';

export interface I18NextModuleParams {
    errorHandlingStrategy?: Type<I18NextErrorHandlingStrategy>;
}

