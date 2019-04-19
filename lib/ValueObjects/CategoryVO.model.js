"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CategoryVO = /** @class */ (function () {
    function CategoryVO(_name) {
        this._name = _name;
        if (_name.length < 0)
            throw new Error("Category cannot be empty.");
        if (_name.length > 50)
            throw new Error("Category cannot longer than 50 characters.");
    }
    Object.defineProperty(CategoryVO.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    return CategoryVO;
}());
exports.CategoryVO = CategoryVO;
//# sourceMappingURL=CategoryVO.model.js.map