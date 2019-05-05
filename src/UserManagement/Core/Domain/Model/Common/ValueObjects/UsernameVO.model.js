"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Username = /** @class */ (function () {
    function Username(username) {
        if (Username.isValidUsername(username)) {
            this._username = username;
        }
    }
    Object.defineProperty(Username.prototype, "value", {
        get: function () {
            return this._username;
        },
        enumerable: true,
        configurable: true
    });
    Username.isValidUsername = function (username) {
        if (!Username.containsValidChars(username)) {
            throw new Error("Username must contain only alphanumeric characters, underscores or periods.");
        }
        if (!Username.isValidLength(username)) {
            throw new Error("Username cannot be longer than " + Username._maxLength + " characters.");
        }
        return true;
    };
    Username.containsValidChars = function (username) {
        return Username._usernameRx.test(username);
    };
    Username.isValidLength = function (username) {
        return (username.length <= Username._maxLength);
    };
    Username._usernameRx = new RegExp("^[A-Za-z0-9\_\.]+$");
    Username._maxLength = 25;
    return Username;
}());
exports.Username = Username;
//# sourceMappingURL=UsernameVO.model.js.map