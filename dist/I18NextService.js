"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var I18NextEvents_1 = require("./I18NextEvents");
var i18next = require("i18next/index");
var I18NextService = (function () {
    function I18NextService() {
        this.events = new I18NextEvents_1.I18NextEvents();
        this.language = '';
        this.languages = [];
    }
    Object.defineProperty(I18NextService.prototype, "options", {
        get: function () {
            return i18next.options;
        },
        enumerable: true,
        configurable: true
    });
    ;
    I18NextService.prototype.use = function (plugin) {
        i18next.use(plugin);
        return this;
    };
    I18NextService.prototype.init = function (options) {
        options = options || {};
        this.subscribeEvents();
        return this.i18nextPromise =
            new Promise(function (resolve, reject) {
                i18next.init(Object.assign({}, options), function (err) {
                    if (err) {
                        console.error(err);
                        reject(err);
                    }
                    else {
                        console.log('[$I18NextService] The translations has been loaded for the current language', i18next.language);
                        resolve(null);
                    }
                });
            });
    };
    I18NextService.prototype.t = function (key, options) {
        options = options || {};
        return i18next.t(key, options);
    };
    I18NextService.prototype.changeLanguage = function (lng) {
        return new Promise(function (resolve, reject) {
            i18next.changeLanguage(lng, function (err, t) {
                if (!err)
                    resolve(t);
                else
                    reject(err);
            });
            resolve(null);
        });
    };
    I18NextService.prototype.subscribeEvents = function () {
        var _this = this;
        i18next.on('initialized', function (e) {
            _this.language = i18next.language;
            _this.languages = i18next.languages;
            _this.events.initialized.next(!!e);
        });
        i18next.on('loaded', function (e) { return _this.events.loaded.next(!!e); });
        i18next.on('failedLoading', function (e) { return _this.events.failedLoading.next(e); });
        i18next.on('languageChanged', function (e) {
            _this.language = i18next.language;
            _this.languages = i18next.languages;
            _this.events.languageChanged.next(e);
        });
    };
    return I18NextService;
}());
I18NextService = __decorate([
    core_1.Injectable()
], I18NextService);
exports.I18NextService = I18NextService;
//# sourceMappingURL=I18NextService.js.map