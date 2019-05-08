"use strict";
/**
 * Email Value Object:
 * Uses an industry standard regex to confirm validity of email string
 * before storing it.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Email = /** @class */ (function () {
    function Email(email) {
        if (!Email.isValidEmail(email)) {
            throw new Error('The email address you have supplied is not a valid email address.');
        }
        this._email = email;
    }
    Email.isValidEmail = function (email) {
        return Email._emailRx.test(email);
    };
    Object.defineProperty(Email.prototype, "value", {
        get: function () {
            return this._email;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Email.prototype, "local", {
        get: function () {
            return this._email.split('@')[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Email.prototype, "domain", {
        get: function () {
            return this._email.split('@')[1];
        },
        enumerable: true,
        configurable: true
    });
    Email._emailRx = new RegExp("^(([^<>()\\[\\]\\\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$");
    return Email;
}());
exports.Email = Email;
//# sourceMappingURL=EmailVO.model.js.map