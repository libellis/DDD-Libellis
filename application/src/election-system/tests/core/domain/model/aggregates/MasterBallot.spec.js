"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
require("mocha");
var TestMasterBallotFactory_model_1 = require("../factories/TestMasterBallotFactory.model");
describe('test non-root entity purity', function () {
    it('should not allow direct question mutation to affect aggregate consistency', function () {
        var masterBallotResult = TestMasterBallotFactory_model_1.TestMasterBallotFactory.createFullMasterBallot();
        var question = masterBallotResult.questions[0];
        var wrongQuestionTitle = 'TestWrongQuestionTitle';
        question.title = wrongQuestionTitle;
        chai_1.assert.notEqual(masterBallotResult.questions[0].title, wrongQuestionTitle);
    });
    it('should not allow direct choice mutation to affect aggregate consistency', function () {
        var masterBallotResult = TestMasterBallotFactory_model_1.TestMasterBallotFactory.createFullMasterBallot();
        var choice = masterBallotResult.questions[0].choices[0];
        var wrongChoiceType = 'TestWrongChoiceType';
        choice.contentType = wrongChoiceType;
        chai_1.assert.notEqual(masterBallotResult.questions[0].choices[0].contentType, wrongChoiceType);
    });
});
//# sourceMappingURL=MasterBallot.spec.js.map