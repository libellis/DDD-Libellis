"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User_model_1 = require("../../../../../core/domain/model/user-aggregate/User.model");
var faker = require("faker");
var TestUserDataFactory_model_1 = require("./TestUserDataFactory.model");
var TestUserFactory = /** @class */ (function () {
    function TestUserFactory() {
    }
    TestUserFactory.createUserWithFactoryMethod = function (eventBus, options) {
        var userData = TestUserDataFactory_model_1.TestUserDataFactory.createUserData(options);
        return User_model_1.User.create(faker.random.uuid, userData, eventBus);
    };
    TestUserFactory.createRandomUsers = function (eventBus) {
        var usersData = TestUserDataFactory_model_1.TestUserDataFactory.createUserDatas(2, 12);
        return usersData.map(function (u) {
            return User_model_1.User.create(faker.random.uuid, u, eventBus);
        });
    };
    return TestUserFactory;
}());
exports.TestUserFactory = TestUserFactory;
//# sourceMappingURL=TestUserFactory.model.js.map