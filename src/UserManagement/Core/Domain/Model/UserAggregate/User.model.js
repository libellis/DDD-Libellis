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
var EmailVO_model_1 = require("../Common/ValueObjects/EmailVO.model");
var UsernameVO_model_1 = require("../Common/ValueObjects/UsernameVO.model");
var NameVO_model_1 = require("../Common/ValueObjects/NameVO.model");
var Entity_model_1 = require("../../../../../SharedKernel/Entities/Entity.model");
var bcryptjs_1 = require("bcryptjs");
var UserCreatedEvent_model_1 = require("../Events/UserCreatedEvent.model");
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User(id, username, password, firstName, lastName, email, photoUrl, isAdmin) {
        var _this = _super.call(this, id) || this;
        _this._username = new UsernameVO_model_1.Username(username);
        _this._firstName = new NameVO_model_1.Name(firstName);
        _this._lastName = new NameVO_model_1.Name(lastName);
        _this._email = new EmailVO_model_1.Email(email);
        _this._photoUrl = new URL(photoUrl);
        _this._isAdmin = isAdmin;
        return _this;
    }
    Object.defineProperty(User.prototype, "username", {
        get: function () {
            return this._username.value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "firstName", {
        get: function () {
            return this._firstName.value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "lastName", {
        get: function () {
            return this._lastName.value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "email", {
        get: function () {
            return this._email.value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "photoUrl", {
        get: function () {
            return this._photoUrl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "isAdmin", {
        get: function () {
            return this._isAdmin;
        },
        enumerable: true,
        configurable: true
    });
    User.create = function (idGenerator, userData, eventBus) {
        // hash incoming password so the user instance never has the plain text pw stored.
        // Q: Should this be done in a service instead and passed in already hashed?
        var hashedPw = User.hashPassword(userData.password);
        var user = new User(idGenerator(), userData.username, hashedPw, userData.firstName, userData.lastName, userData.email, userData.photoUrl, false);
        var userCreatedEvent = new UserCreatedEvent_model_1.UserCreatedEvent(user);
        eventBus.userCreatedEventStream.next(userCreatedEvent);
        return user;
    };
    User.hashPassword = function (password) {
        var salt = bcryptjs_1.bcrypt.genSaltSync(10);
        return bcryptjs_1.bcrypt.hashSync(password, salt);
    };
    User.prototype.validatePassword = function (password) {
        return bcryptjs_1.bcrypt.compareSync(password, this._password);
    };
    User.prototype.changePassword = function (oldPassword, newPassword) {
        if (!this.validatePassword(oldPassword)) {
            throw new Error("You did not enter the correct current password for account under username: " + this._username);
        }
        var hashedPw = User.hashPassword(newPassword);
        this._password = hashedPw;
        return true;
    };
    return User;
}(Entity_model_1.Entity));
exports.User = User;
//# sourceMappingURL=User.model.js.map