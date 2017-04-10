"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var I18NextService_1 = require("./I18NextService");
var I18NEXT_TOKENS_1 = require("./I18NEXT_TOKENS");
var I18NextPipe = (function () {
    function I18NextPipe(translateI18Next, ns, scope) {
        this.translateI18Next = translateI18Next;
        this.ns = ns;
        this.scope = scope;
    }
    I18NextPipe.prototype.transform = function (key, options) {
        options = this.prepareOptions(options);
        var i18nOpts = this.translateI18Next.options;
        if (options.prependScope === undefined || options.prependScope === true) {
            if (this.scope) {
                key = this.prependScope(key, this.scope, i18nOpts.keySeparator, i18nOpts.nsSeparator);
            }
        }
        if (options.prependNamespace === undefined || options.prependNamespace === true) {
            if (this.ns) {
                key = this.prependNamespace(key, this.ns, i18nOpts.nsSeparator);
            }
        }
        var result = this.translateI18Next.t(key, options);
        if (options.case) {
            if (result) {
                result = this.postProcessCase(result, options.case);
            }
        }
        return result;
    };
    I18NextPipe.prototype.postProcessCase = function (value, wordCase) {
        if (!value)
            return value;
        switch (wordCase) {
            case null:
            case 'none':
                return value;
            case 'upper':
            case 'uppercase':
                return value.toUpperCase();
            case 'lower':
            case 'lowercase':
                return value.toLowerCase();
            case 'cap':
            case 'capitalize':
                return value.charAt(0).toUpperCase() + value.slice(1);
            default:
                return value;
        }
    };
    I18NextPipe.prototype.prependScope = function (key, scope, keySeparator, nsSeparator) {
        if (key instanceof Array) {
            for (var i = 0; i < key.length; i++) {
                if (!this.keyContainsNsSeparator(key[i], nsSeparator))
                    key[i] = this.joinStrings(scope, key[i], keySeparator);
            }
        }
        else {
            if (!this.keyContainsNsSeparator(key, nsSeparator))
                key = this.joinStrings(scope, key, keySeparator);
        }
        return key;
    };
    I18NextPipe.prototype.prependNamespace = function (key, ns, nsSeparator) {
        if (key instanceof Array) {
            var keysWithNamespace = [];
            for (var i = 0; i < key.length; i++) {
                if (!this.keyContainsNsSeparator(key[i], nsSeparator)) {
                    keysWithNamespace.push(this.joinStrings(ns, key[i], nsSeparator));
                }
            }
            return keysWithNamespace.concat(key); // fallback to key
        }
        else {
            var keyWithNamespace = void 0;
            if (!this.keyContainsNsSeparator(key, nsSeparator)) {
                keyWithNamespace = this.joinStrings(ns, key, nsSeparator);
            }
            if (keyWithNamespace)
                return [keyWithNamespace, key]; // fallback to key
            return key;
        }
    };
    I18NextPipe.prototype.joinStrings = function (str1, str2, separator) {
        return [str1, str2].join(separator);
    };
    I18NextPipe.prototype.keyContainsNsSeparator = function (key, nsSeparator) {
        return key.indexOf(nsSeparator) !== -1;
    };
    I18NextPipe.prototype.prepareOptions = function (options) {
        options = options || {};
        if (options.context != null)
            options.context = options.context.toString();
        return options;
    };
    return I18NextPipe;
}());
I18NextPipe = __decorate([
    core_1.Injectable(),
    core_1.Pipe({
        name: 'i18next'
    }),
    __param(1, core_1.Inject(I18NEXT_TOKENS_1.I18NEXT_NAMESPACE)), __param(2, core_1.Inject(I18NEXT_TOKENS_1.I18NEXT_SCOPE)),
    __metadata("design:paramtypes", [I18NextService_1.I18NextService, String, String])
], I18NextPipe);
exports.I18NextPipe = I18NextPipe;
//# sourceMappingURL=I18NextPipe.js.map