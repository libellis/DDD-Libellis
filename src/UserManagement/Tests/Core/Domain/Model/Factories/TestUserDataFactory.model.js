"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var faker = require("faker");
var TestUserDataFactory = /** @class */ (function () {
    function TestUserDataFactory() {
    }
    TestUserDataFactory.createUserData = function (options) {
        var userData = {
            username: faker.internet.userName(),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            photoUrl: faker.image.imageUrl(),
        };
        if (options !== undefined) {
            TestUserDataFactory.patchObject(userData, options);
        }
        return userData;
    };
    TestUserDataFactory.createUserDatas = function (min, max) {
        var randomUserCount = faker.random.number({ min: min, max: max, precision: 1 });
        var userDatas = [];
        for (var i = 0; i < randomUserCount; i++) {
            userDatas.push(TestUserDataFactory.createUserData());
        }
        return userDatas;
    };
    TestUserDataFactory.patchObject = function (inputObj, patchObj) {
        for (var _i = 0, _a = Object.entries(patchObj); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            if (inputObj.hasOwnProperty(key))
                inputObj[key] = value;
        }
    };
    return TestUserDataFactory;
}());
exports.TestUserDataFactory = TestUserDataFactory;
//# sourceMappingURL=TestUserDataFactory.model.js.map