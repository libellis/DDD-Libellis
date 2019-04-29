"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
require("mocha");
var TestMasterBallotFactory_model_1 = require("../Factories/TestMasterBallotFactory.model");
describe('test value object construction', function () {
    it('should successfully construct VoteTally value object with a valid tally', function () {
        var goodFunction = TestMasterBallotFactory_model_1.TestMasterBallotFactory.createFullSurvey.bind(TestMasterBallotFactory_model_1.TestMasterBallotFactory, { choiceParams: {
                voteTally: 50,
            } });
        chai_1.expect(goodFunction).to.not.throw();
    });
    it('should fail to construct VoteTally value object with a negative tally', function () {
        var badFunction = TestMasterBallotFactory_model_1.TestMasterBallotFactory.createFullSurvey.bind(TestMasterBallotFactory_model_1.TestMasterBallotFactory, {
            choiceParams: {
                voteTally: -30,
            }
        });
        chai_1.expect(badFunction).to.throw();
    });
    it('should fail to construct VoteTally value object with a fractional number', function () {
        var badFunction = TestMasterBallotFactory_model_1.TestMasterBallotFactory.createFullSurvey.bind(TestMasterBallotFactory_model_1.TestMasterBallotFactory, {
            choiceParams: {
                voteTally: 20.275,
            }
        });
        chai_1.expect(badFunction).to.throw();
    });
});
//# sourceMappingURL=VoteTallyVO.spec.js.map