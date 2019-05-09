"use strict";
/**
 * For now we only support ascii a-z for real names.
 * Probably should build unicode support in the future for
 * non-english names.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Name = /** @class */ (function () {
    function Name(name) {
        if (Name.isValidName(name)) {
            this._name = name;
        }
    }
    Object.defineProperty(Name.prototype, "value", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Name.isValidName = function (name) {
        if (!Name.containsValidChars(name)) {
            throw new Error("Names must contain only alphabetic characters.");
        }
        if (!Name.isValidLength(name)) {
            throw new Error("Names cannot be longer than " + Name._maxLength + " characters.");
        }
        return true;
    };
    Name.containsValidChars = function (name) {
        return Name._nameRx.test(name);
    };
    Name.isValidLength = function (name) {
        return (name.length <= Name._maxLength);
    };
    Name._nameRx = new RegExp("^[A-Za-z']+$");
    Name._maxLength = 50;
    return Name;
}());
exports.Name = Name;
//# sourceMappingURL=NameVO.model.js.map