"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
require("mocha");
var faker = require("faker");
var TestElectionFactory_model_1 = require("../factories/TestElectionFactory.model");
var TestMasterBallotFactory_model_1 = require("../factories/TestMasterBallotFactory.model");
var TestVoterFactory_model_1 = require("../factories/TestVoterFactory.model");
var TestBallotDataFactory_model_1 = require("../factories/TestBallotDataFactory.model");
describe('test invariance enforcement by root', function () {
    it('should not allow a voter to cast a ballot twice', function () {
        var masterBallot = TestMasterBallotFactory_model_1.TestMasterBallotFactory.createFullMasterBallot();
        var start = new Date();
        var end = new Date((new Date()).getTime() + 30);
        var election = TestElectionFactory_model_1.TestElectionFactory.createElectionWithFactoryMethod(masterBallot, { start: start, end: end });
        var fakeVoter = TestVoterFactory_model_1.TestVoterFactory.createTestVoter();
        var ballotData = TestBallotDataFactory_model_1.TestBallotDataFactory.createTestBallot(fakeVoter.id, masterBallot);
        election.castBallot(faker.random.uuid, ballotData);
        // simulating the same voter creating a different ballot, but with the same voterId
        var secondBallotData = TestBallotDataFactory_model_1.TestBallotDataFactory.createTestBallot(fakeVoter.id, masterBallot);
        chai_1.expect(function () { election.castBallot(faker.random.uuid, secondBallotData); }).to.throw();
    });
    it('should not allow a voter to cast a ballot with duplicate questions', function () {
        var masterBallot = TestMasterBallotFactory_model_1.TestMasterBallotFactory.createFullMasterBallot();
        var start = new Date();
        var end = new Date((new Date()).getTime() + 30);
        var election = TestElectionFactory_model_1.TestElectionFactory.createElectionWithFactoryMethod(masterBallot, { start: start, end: end });
        var fakeVoter = TestVoterFactory_model_1.TestVoterFactory.createTestVoter();
        var ballotData = TestBallotDataFactory_model_1.TestBallotDataFactory.createTestBallot(fakeVoter.id, masterBallot);
        var questionCopy = __assign({}, ballotData.voteData.questionsData[0]);
        ballotData.voteData.questionsData.push(questionCopy);
        chai_1.expect(function () { election.castBallot(faker.random.uuid, ballotData); }).to.throw();
    });
    it('should not allow a voter to cast a ballot with duplicate choices', function () {
        var masterBallot = TestMasterBallotFactory_model_1.TestMasterBallotFactory.createFullMasterBallot();
        var start = new Date();
        var end = new Date((new Date()).getTime() + 30);
        var election = TestElectionFactory_model_1.TestElectionFactory.createElectionWithFactoryMethod(masterBallot, { start: start, end: end });
        var fakeVoter = TestVoterFactory_model_1.TestVoterFactory.createTestVoter();
        var ballotData = TestBallotDataFactory_model_1.TestBallotDataFactory.createTestBallot(fakeVoter.id, masterBallot);
        var choiceCopy = __assign({}, ballotData.voteData.questionsData[0].choicesData[0]);
        // mutate question to hold duplicates of the choice
        ballotData.voteData.questionsData[0].choicesData.push(choiceCopy);
        chai_1.expect(function () { election.castBallot(faker.random.uuid, ballotData); }).to.throw();
    });
    it('should not allow a voter to cast a ballot with missing questions', function () {
        var masterBallot = TestMasterBallotFactory_model_1.TestMasterBallotFactory.createFullMasterBallot();
        var start = new Date();
        var end = new Date((new Date()).getTime() + 30);
        var election = TestElectionFactory_model_1.TestElectionFactory.createElectionWithFactoryMethod(masterBallot, { start: start, end: end });
        var fakeVoter = TestVoterFactory_model_1.TestVoterFactory.createTestVoter();
        var ballotData = TestBallotDataFactory_model_1.TestBallotDataFactory.createTestBallot(fakeVoter.id, masterBallot);
        ballotData.voteData.questionsData.pop();
        chai_1.expect(function () { election.castBallot(faker.random.uuid, ballotData); }).to.throw();
    });
    it('should not allow a voter to cast a ballot with missing choices', function () {
        var masterBallot = TestMasterBallotFactory_model_1.TestMasterBallotFactory.createFullMasterBallot();
        var start = new Date();
        var end = new Date((new Date()).getTime() + 30);
        var election = TestElectionFactory_model_1.TestElectionFactory.createElectionWithFactoryMethod(masterBallot, { start: start, end: end });
        var fakeVoter = TestVoterFactory_model_1.TestVoterFactory.createTestVoter();
        var ballotData = TestBallotDataFactory_model_1.TestBallotDataFactory.createTestBallot(fakeVoter.id, masterBallot);
        ballotData.voteData.questionsData[0].choicesData.pop();
        chai_1.expect(function () { election.castBallot(faker.random.uuid, ballotData); }).to.throw();
    });
    it('should not allow a voter to cast a ballot with choices from unrelated master ballots', function () {
        var masterBallot = TestMasterBallotFactory_model_1.TestMasterBallotFactory.createFullMasterBallot();
        var start = new Date();
        var end = new Date((new Date()).getTime() + 30);
        var election = TestElectionFactory_model_1.TestElectionFactory.createElectionWithFactoryMethod(masterBallot, { start: start, end: end });
        var fakeVoter = TestVoterFactory_model_1.TestVoterFactory.createTestVoter();
        var ballotData = TestBallotDataFactory_model_1.TestBallotDataFactory.createTestBallot(fakeVoter.id, masterBallot);
        var differentMasterBallot = TestMasterBallotFactory_model_1.TestMasterBallotFactory.createFullMasterBallot();
        var differentBallotData = TestBallotDataFactory_model_1.TestBallotDataFactory.createTestBallot(fakeVoter.id, differentMasterBallot);
        var foreignChoice = __assign({}, differentBallotData.voteData.questionsData[0].choicesData[0]);
        ballotData.voteData.questionsData[0].choicesData.push(foreignChoice);
        chai_1.expect(function () { election.castBallot(faker.random.uuid, ballotData); }).to.throw();
    });
    it('should not allow a voter to cast a ballot in a restricted election if they are not permitted.', function () {
        var masterBallot = TestMasterBallotFactory_model_1.TestMasterBallotFactory.createFullMasterBallot();
        var start = new Date();
        var end = new Date((new Date()).getTime() + 30);
        var permittedVoterIds = new Set(TestVoterFactory_model_1.TestVoterFactory.createRandomTestVoters(1, 12).map(function (v) { return v.id; }));
        var election = TestElectionFactory_model_1.TestElectionFactory.createRestrictedElectionWithFactoryMethod(masterBallot, permittedVoterIds, { start: start, end: end });
        var notPermittedVoter = TestVoterFactory_model_1.TestVoterFactory.createTestVoter();
        var ballotData = TestBallotDataFactory_model_1.TestBallotDataFactory.createTestBallot(notPermittedVoter.id, masterBallot);
        chai_1.expect(function () { election.castBallot(faker.random.uuid, ballotData); }).to.throw();
    });
    it('should allow a voter to cast a ballot in a restricted election if they are permitted.', function () {
        var masterBallot = TestMasterBallotFactory_model_1.TestMasterBallotFactory.createFullMasterBallot();
        var start = new Date();
        var end = new Date((new Date()).getTime() + 30);
        var permittedVoters = TestVoterFactory_model_1.TestVoterFactory.createRandomTestVoters(1, 12);
        var permittedVoterIds = new Set(permittedVoters.map(function (v) { return v.id; }));
        var election = TestElectionFactory_model_1.TestElectionFactory.createRestrictedElectionWithFactoryMethod(masterBallot, permittedVoterIds, { start: start, end: end });
        var ballotData = TestBallotDataFactory_model_1.TestBallotDataFactory.createTestBallot(permittedVoters[0].id, masterBallot);
        chai_1.expect(function () { election.castBallot(faker.random.uuid, ballotData); }).to.not.throw();
    });
});
//# sourceMappingURL=Election.spec.js.map