"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
require("mocha");
var TestElectionFactory_model_1 = require("./TestElectionFactory.model");
var Election_model_1 = require("../../../../../Core/Domain/Model/Aggregates/Election/Entities/Election.model");
var TestMasterBallotFactory_model_1 = require("./TestMasterBallotFactory.model");
describe('Test TestElectionFactory constructor', function () {
    it('should construct an instance of an Election entity', function () {
        var masterBallot = TestMasterBallotFactory_model_1.TestMasterBallotFactory.createFullMasterBallot();
        var electionResult = TestElectionFactory_model_1.TestElectionFactory.createElectionFromMasterBallot(masterBallot);
        chai_1.expect(electionResult).instanceOf(Election_model_1.Election);
    });
    // it('should correctly pass in optional election parameters', () => {
    // 	const testTitle = 'TestTitle';
    // 	const electionResult = TestElectionFactory.createElectionFromMasterBallot({electionParams: { title: testTitle}});
    // 	expect(electionResult.title).equals(testTitle);
    // });
    // it('should correctly pass in optional question parameters', () => {
    // 	const testType = 'TestQuestionType';
    // 	const electionResult = TestElectionFactory.createElectionFromMasterBallot({questionParams: {questionType: testType}});
    // 	expect(electionResult.questions[0].type).equals(testType);
    // });
    //
    // it('should correctly pass in optional choice parameters', () => {
    // 	const testId = 'TestUUID';
    // 	const electionResult = TestElectionFactory.createElectionFromMasterBallot({choiceParams: { id: testId }});
    // 	expect(electionResult.questions[0].choices[0].id).equals(testId);
    // });
});
//# sourceMappingURL=TestElectionFactory.spec.js.map