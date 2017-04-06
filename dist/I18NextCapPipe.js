"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var I18NextService_1 = require("./I18NextService");
var I18NEXT_CONSTANTS_1 = require("./I18NEXT_CONSTANTS");
var I18NextPipe_1 = require("./I18NextPipe");
var I18NextCapPipe = (function (_super) {
    __extends(I18NextCapPipe, _super);
    function I18NextCapPipe(translateI18Next, ns, scope) {
        return _super.call(this, translateI18Next, ns, scope) || this;
    }
    I18NextCapPipe.prototype.transform = function (key, options) {
        options = options || {};
        options.case = 'cap';
        return _super.prototype.transform.call(this, key, options);
    };
    return I18NextCapPipe;
}(I18NextPipe_1.I18NextPipe));
I18NextCapPipe = __decorate([
    core_1.Injectable(),
    core_1.Pipe({
        name: 'i18nextCap'
    }),
    __param(1, core_1.Inject(I18NEXT_CONSTANTS_1.I18NEXT_NAMESPACE)), __param(2, core_1.Inject(I18NEXT_CONSTANTS_1.I18NEXT_SCOPE)),
    __metadata("design:paramtypes", [I18NextService_1.I18NextService, String, String])
], I18NextCapPipe);
exports.I18NextCapPipe = I18NextCapPipe;
//# sourceMappingURL=I18NextCapPipe.js.map