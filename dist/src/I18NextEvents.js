"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var I18NextEvents = (function () {
    function I18NextEvents() {
        this.initialized = new BehaviorSubject_1.BehaviorSubject(false);
        this.loaded = new BehaviorSubject_1.BehaviorSubject(false);
        this.failedLoading = new BehaviorSubject_1.BehaviorSubject(null);
        this.languageChanged = new BehaviorSubject_1.BehaviorSubject(null);
    }
    return I18NextEvents;
}());
exports.I18NextEvents = I18NextEvents;
//# sourceMappingURL=I18NextEvents.js.map