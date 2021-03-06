"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
require("mocha");
var CategoryVO_model_1 = require("../../../../../core/domain/model/common/value-objects/CategoryVO.model");
describe('test value object construction', function () {
    it('should successfully construct Category value object from valid string', function () {
        var goodFunction = function () {
            new CategoryVO_model_1.Category("TestCategory");
        };
        chai_1.expect(goodFunction).to.not.throw();
    });
    it('should fail to construct Category value object from empty string', function () {
        var badFunction = function () {
            new CategoryVO_model_1.Category('');
        };
        chai_1.expect(badFunction).to.throw();
    });
    it('should fail to construct Category value object from long string', function () {
        var badFunction = function () {
            new CategoryVO_model_1.Category("This is definitely a very long string that\n\t\t\t\t\t\tis way longer than a category should be.");
        };
        chai_1.expect(badFunction).to.throw();
    });
});
//# sourceMappingURL=CategoryVO.spec.js.map