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
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User(id, username, firstName, lastName, email, photoUrl, isAdmin) {
        var _this = _super.call(this, id) || this;
        _this.username = username;
        _this.firstName = firstName;
        _this.lastName = lastName;
        _this.email = email;
        _this.photoUrl = photoUrl;
        _this.isAdmin = isAdmin;
        return _this;
    }
    // Admin user cannot be created.  An existing user can be turned into an admin user by another
    // admin user only.
    User.create = function (idGenerator, userData) {
        return new User(idGenerator(), new UsernameVO_model_1.Username(userData.username), new NameVO_model_1.Name(userData.firstName), new NameVO_model_1.Name(userData.lastName), new EmailVO_model_1.Email(userData.email), new URL(userData.photoUrl), false);
    };
    return User;
}(Entity_model_1.Entity));
exports.User = User;
//# sourceMappingURL=User.model.js.map