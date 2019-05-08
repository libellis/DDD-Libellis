"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var faker = require("faker");
require("mocha");
var EmailVO_model_1 = require("../../../../../Core/Domain/Model/Common/ValueObjects/EmailVO.model");
describe('test email value object validity testing', function () {
    it('should successfully store a valid email address.', function () {
        var emailString = faker.internet.email();
        var goodFunction = function () {
            return new EmailVO_model_1.Email(emailString);
        };
        chai_1.expect(goodFunction).to.not.throw();
        chai_1.expect(goodFunction().value).equals(emailString);
    });
    it('should fail to store an in-valid email address.', function () {
        var email = faker.internet.email();
        var badEmail = email.replace('@', '#');
        var badFunction = function () {
            new EmailVO_model_1.Email(badEmail);
        };
        chai_1.expect(badFunction).to.throw();
    });
    it('should provide capabilities to extract the domain from the email.', function () {
        var emailString = "test@domain.com";
        var email = new EmailVO_model_1.Email(emailString);
        chai_1.expect(email.domain).equals("domain.com");
    });
    it('should provide capabilities to extract the local part of the email.', function () {
        var emailString = "test@domain.com";
        var email = new EmailVO_model_1.Email(emailString);
        chai_1.expect(email.local).equals("test");
    });
});
//# sourceMappingURL=EmailVO.spec.js.map