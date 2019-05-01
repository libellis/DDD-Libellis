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
var Entity_model_1 = require("../Common/Entities/Entity.model");
var Choice = /** @class */ (function (_super) {
    __extends(Choice, _super);
    function Choice(id, title, content, contentType) {
        var _this = _super.call(this, id) || this;
        _this.title = title;
        _this.content = content;
        _this.contentType = contentType;
        return _this;
    }
    return Choice;
}(Entity_model_1.Entity));
exports.Choice = Choice;
//# sourceMappingURL=Choice.model.js.map