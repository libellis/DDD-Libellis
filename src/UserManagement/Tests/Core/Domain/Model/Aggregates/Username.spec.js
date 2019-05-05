"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
require("mocha");
var TestUserFactory_model_1 = require("../Factories/TestUserFactory.model");
describe('test invariance enforcement by root', function () {
    // URL is a typescript type, so rather than unit test it like our other value objects, testing it
    // during user creation.
    it('Should not allow someone to create a username with an invalid photo url.', function () {
        var badFunction = function () {
            TestUserFactory_model_1.TestUserFactory.createUserWithFactoryMethod({ photoUrl: "notUrl" });
        };
        chai_1.expect(badFunction).to.throw();
    });
});
//# sourceMappingURL=Username.spec.js.map