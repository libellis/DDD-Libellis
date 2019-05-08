"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var faker = require("faker");
require("mocha");
var NameVO_model_1 = require("../../../../../Core/Domain/Model/Common/ValueObjects/NameVO.model");
describe('test name value object validity testing', function () {
    it('should successfully store a valid name.', function () {
        var nameString = faker.name.firstName();
        var goodFunction = function () {
            return new NameVO_model_1.Name(nameString);
        };
        chai_1.expect(goodFunction).to.not.throw();
        chai_1.expect(goodFunction().value).equals(nameString);
    });
    it('should fail to store a name with invalid characters.', function () {
        var name = faker.name.firstName();
        var badName = name + "_";
        var badFunction = function () {
            new NameVO_model_1.Name(badName);
        };
        chai_1.expect(badFunction).to.throw();
    });
    it('should fail to store a name that is too long.', function () {
        var name = faker.name.firstName();
        var badName = name + Array(50).fill('a').join('');
        var badFunction = function () {
            new NameVO_model_1.Name(badName);
        };
        chai_1.expect(badFunction).to.throw();
    });
});
//# sourceMappingURL=NameVO.spec.js.map