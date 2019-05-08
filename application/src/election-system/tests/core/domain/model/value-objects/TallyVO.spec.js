"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
require("mocha");
var TallyVO_model_1 = require("../../../../../core/domain/model/common/value-objects/TallyVO.model");
var ScoreVO_model_1 = require("../../../../../core/domain/model/common/value-objects/ScoreVO.model");
describe('test value object construction', function () {
    it('should successfully construct Tally value object with a valid tally', function () {
        var goodFunction = function () {
            new TallyVO_model_1.TallyVO(50);
        };
        chai_1.expect(goodFunction).to.not.throw();
    });
    it('should fail to construct Tally value object with a negative tally', function () {
        var badFunction = function () {
            new TallyVO_model_1.TallyVO(-50);
        };
        chai_1.expect(badFunction).to.throw();
    });
    it('should fail to construct Tally value object with a fractional number', function () {
        var badFunction = function () {
            new TallyVO_model_1.TallyVO(20.275);
        };
        chai_1.expect(badFunction).to.throw();
    });
    it('should correctly increment tally by taking a new Score value object and returning a new tally.', function () {
        var tally = new TallyVO_model_1.TallyVO(50);
        var score = new ScoreVO_model_1.ScoreVO(20);
        var updatedTally = tally.incrementTally(score);
        chai_1.expect(updatedTally.tally).equals(70);
    });
});
//# sourceMappingURL=TallyVO.spec.js.map