"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
require("mocha");
var faker = require("faker");
var TestUserFactory_model_1 = require("../Factories/TestUserFactory.model");
var EventBus_1 = require("../../../../../../SharedKernel/EventStreams/EventBus");
describe('test invariance enforcement by root', function () {
    // URL is a typescript type, so rather than unit test it like our other value objects, testing it
    // during user creation.
    it('Should not allow someone to create a username with an invalid photo url.', function () {
        var badFunction = function () {
            var eventBus = new EventBus_1.EventBus();
            TestUserFactory_model_1.TestUserFactory.createUserWithFactoryMethod(eventBus, { photoUrl: "notUrl" });
        };
        chai_1.expect(badFunction).to.throw();
    });
    it('Should store password as a hashed password', function () {
        var password = faker.lorem.slug(3);
        var eventBus = new EventBus_1.EventBus();
        var user = TestUserFactory_model_1.TestUserFactory.createUserWithFactoryMethod(eventBus, { password: password });
        chai_1.expect(user.hashedPassword).to.not.equal(password);
    });
    it('Should allow a user to change their password.', function () {
        var password = faker.lorem.slug(3);
        var eventBus = new EventBus_1.EventBus();
        var user = TestUserFactory_model_1.TestUserFactory.createUserWithFactoryMethod(eventBus, { password: password });
        var oldHashedPw = user.hashedPassword;
        var newPassword = "NewPassword";
        var goodFunction = function () {
            user.changePassword(password, newPassword);
        };
        chai_1.expect(goodFunction).to.not.throw();
        chai_1.expect(user.hashedPassword).not.equal(oldHashedPw);
    });
});
describe('test mutation methods', function () {
    it('Should allow a user to change their password.', function () {
        var password = faker.lorem.slug(3);
        var eventBus = new EventBus_1.EventBus();
        var user = TestUserFactory_model_1.TestUserFactory.createUserWithFactoryMethod(eventBus, { password: password });
        var oldHashedPw = user.hashedPassword;
        var newPassword = "NewPassword";
        var goodFunction = function () {
            user.changePassword(password, newPassword);
        };
        chai_1.expect(goodFunction).to.not.throw();
        chai_1.expect(user.hashedPassword).not.equal(oldHashedPw);
    });
});
//# sourceMappingURL=User.spec.js.map