"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
require("mocha");
var TestMasterBallotFactory_model_1 = require("./TestMasterBallotFactory.model");
var MasterBallot_model_1 = require("../../../../../Core/Domain/Model/MasterBallotAggregate/MasterBallot.model");
describe('Test TestMasterBallotFactory constructor', function () {
    it('should construct an instance of MasterBallot entity', function () {
        var masterBallotResult = TestMasterBallotFactory_model_1.TestMasterBallotFactory.createFullMasterBallot();
        chai_1.expect(masterBallotResult).instanceOf(MasterBallot_model_1.MasterBallot);
    });
    it('should correctly pass in optional masterBallot parameters', function () {
        var testTitle = 'TestTitle';
        var masterBallotResult = TestMasterBallotFactory_model_1.TestMasterBallotFactory.createFullMasterBallot({ masterBallotParams: { title: testTitle } });
        chai_1.expect(masterBallotResult.title).equals(testTitle);
    });
    it('should correctly pass in optional question parameters', function () {
        var testType = 'TestQuestionType';
        var masterBallotResult = TestMasterBallotFactory_model_1.TestMasterBallotFactory.createFullMasterBallot({ questionParams: { questionType: testType } });
        chai_1.expect(masterBallotResult.questions[0].type).equals(testType);
    });
    it('should correctly pass in optional choice parameters', function () {
        var testId = 'TestUUID';
        var masterBallotResult = TestMasterBallotFactory_model_1.TestMasterBallotFactory.createFullMasterBallot({ choiceParams: { id: testId } });
        chai_1.expect(masterBallotResult.questions[0].choices[0].id).equals(testId);
    });
});
//# sourceMappingURL=TestMasterBallotFactory.spec.js.map