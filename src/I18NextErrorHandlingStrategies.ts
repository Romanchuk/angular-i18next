export interface I18NextErrorHandlingStrategy {
    handle(resolve: Function, reject: Function): Function;
}

export class NativeErrorHandlingStrategy implements I18NextErrorHandlingStrategy {
    handle(resolve: Function, reject: Function) {
        return (err: any, t?: any) => {
            resolve(err || t);
        };
    }
}

export class StrictErrorHandlingStrategy implements I18NextErrorHandlingStrategy {
    handle(resolve: Function, reject: Function) {
        return (err: any, t?: any) => {
            if (!err) {
                resolve(t);
                return;
            }
            reject(err);
        };
    }
}
