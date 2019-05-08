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
var Entity_model_1 = require("../../../../../shared-kernel/entities/Entity.model");
var Question = /** @class */ (function (_super) {
    __extends(Question, _super);
    function Question(id, title, type, choices) {
        var _this = _super.call(this, id) || this;
        _this.title = title;
        _this.type = type;
        _this.choices = choices;
        return _this;
    }
    Object.defineProperty(Question.prototype, "choiceCount", {
        get: function () {
            return this.choices.length;
        },
        enumerable: true,
        configurable: true
    });
    return Question;
}(Entity_model_1.Entity));
exports.Question = Question;
//# sourceMappingURL=Question.model.js.map