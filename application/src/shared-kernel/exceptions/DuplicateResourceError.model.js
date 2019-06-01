"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var DuplicateResourceError = /** @class */ (function (_super) {
    __extends(DuplicateResourceError, _super);
    function DuplicateResourceError(message) {
        return _super.call(this, message) || this;
    }
    return DuplicateResourceError;
}(Error));
exports.DuplicateResourceError = DuplicateResourceError;
//# sourceMappingURL=DuplicateResourceError.model.js.map