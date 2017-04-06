"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var I18NextPipe_1 = require("./I18NextPipe");
var I18NextTitle = (function (_super) {
    __extends(I18NextTitle, _super);
    function I18NextTitle(i18nextPipe, doc) {
        var _this = _super.call(this, doc) || this;
        _this.i18nextPipe = i18nextPipe;
        return _this;
    }
    I18NextTitle.prototype.setTitle = function (value) {
        return _super.prototype.setTitle.call(this, this.translate(value));
    };
    I18NextTitle.prototype.translate = function (text) {
        return this.i18nextPipe.transform(text, { case: 'cap' });
    };
    return I18NextTitle;
}(platform_browser_1.Title));
I18NextTitle = __decorate([
    core_1.Injectable(),
    __param(1, core_1.Inject(platform_browser_1.DOCUMENT)),
    __metadata("design:paramtypes", [I18NextPipe_1.I18NextPipe, Object])
], I18NextTitle);
exports.I18NextTitle = I18NextTitle;
//# sourceMappingURL=I18NextTitle.js.map