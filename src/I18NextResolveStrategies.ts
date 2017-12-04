export interface I18NextResolveStrategy {
    handle(resolve: Function, reject: Function): Function;
}

export class NativeResolveStrategy implements I18NextResolveStrategy {
    handle(resolve: Function, reject: Function) {
        return (err: any, t?: any) => {
            resolve(err || t);
        };
    }
}

export class StrictResolveStrategy implements I18NextResolveStrategy {
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
