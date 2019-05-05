"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var faker = require("faker");
require("mocha");
var UsernameVO_model_1 = require("../../../../../Core/Domain/Model/Common/ValueObjects/UsernameVO.model");
describe('test username value object validity testing', function () {
    it('should successfully store a valid username.', function () {
        var usernameString = faker.internet.userName();
        console.log(usernameString);
        var goodFunction = function () {
            return new UsernameVO_model_1.Username(usernameString);
        };
        chai_1.expect(goodFunction).to.not.throw();
        chai_1.expect(goodFunction().value).equals(usernameString);
    });
    it('should fail to store a username with invalid characters.', function () {
        var username = faker.internet.userName();
        var badUsername = username + "-";
        var badFunction = function () {
            new UsernameVO_model_1.Username(badUsername);
        };
        chai_1.expect(badFunction).to.throw();
    });
    it('should fail to store a username that is too long.', function () {
        var username = faker.internet.userName();
        var badUsername = username + Array(25).fill('a').join('');
        var badFunction = function () {
            new UsernameVO_model_1.Username(badUsername);
        };
        chai_1.expect(badFunction).to.throw();
    });
});
//# sourceMappingURL=UsernameVO.spec.js.map