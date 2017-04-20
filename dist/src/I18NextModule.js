"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var I18NEXT_TOKENS_1 = require("./I18NEXT_TOKENS");
var I18NextTitle_1 = require("./I18NextTitle");
var I18NextPipe_1 = require("./I18NextPipe");
var I18NextCapPipe_1 = require("./I18NextCapPipe");
var I18NextService_1 = require("./I18NextService");
var I18NextModule = I18NextModule_1 = (function () {
    function I18NextModule() {
    }
    I18NextModule.forRoot = function () {
        return {
            ngModule: I18NextModule_1,
            providers: [
                I18NextService_1.I18NextService,
                I18NextPipe_1.I18NextPipe,
                I18NextCapPipe_1.I18NextCapPipe
            ]
        };
    };
    return I18NextModule;
}());
I18NextModule = I18NextModule_1 = __decorate([
    core_1.NgModule({
        providers: [
            {
                provide: I18NEXT_TOKENS_1.I18NEXT_NAMESPACE,
                useValue: ''
            },
            {
                provide: I18NEXT_TOKENS_1.I18NEXT_SCOPE,
                useValue: ''
            },
            I18NextPipe_1.I18NextPipe,
            I18NextTitle_1.I18NextTitle,
            {
                provide: platform_browser_1.Title,
                useClass: I18NextTitle_1.I18NextTitle
            }
        ],
        declarations: [
            I18NextPipe_1.I18NextPipe,
            I18NextCapPipe_1.I18NextCapPipe
        ],
        exports: [
            I18NextPipe_1.I18NextPipe,
            I18NextCapPipe_1.I18NextCapPipe
        ]
    })
], I18NextModule);
exports.I18NextModule = I18NextModule;
var I18NextModule_1;
//# sourceMappingURL=I18NextModule.js.map