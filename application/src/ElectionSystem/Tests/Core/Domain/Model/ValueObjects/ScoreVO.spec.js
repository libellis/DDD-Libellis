"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
require("mocha");
var ScoreVO_model_1 = require("../../../../../Core/Domain/Model/Common/ValueObjects/ScoreVO.model");
describe('test value object construction', function () {
    it('should successfully construct Score value object with a valid tally', function () {
        var goodFunction = function () {
            new ScoreVO_model_1.ScoreVO(50);
        };
        chai_1.expect(goodFunction).to.not.throw();
    });
    it('should fail to construct Score value object with a negative tally', function () {
        var badFunction = function () {
            new ScoreVO_model_1.ScoreVO(-50);
        };
        chai_1.expect(badFunction).to.throw();
    });
    it('should fail to construct Score value object with a fractional number', function () {
        var badFunction = function () {
            new ScoreVO_model_1.ScoreVO(20.275);
        };
        chai_1.expect(badFunction).to.throw();
    });
});
//# sourceMappingURL=ScoreVO.spec.js.map