"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
require("mocha");
var faker = require("faker");
var TestElectionFactory_model_1 = require("../Factories/TestElectionFactory.model");
var TestMasterBallotFactory_model_1 = require("../Factories/TestMasterBallotFactory.model");
var TestVoterFactory_model_1 = require("../Factories/TestVoterFactory.model");
var TestBallotDataFactory_model_1 = require("../Factories/TestBallotDataFactory.model");
describe('test invariance enforcement by root', function () {
    it('should not allow a voter to cast a ballot twice', function () {
        var masterBallot = TestMasterBallotFactory_model_1.TestMasterBallotFactory.createFullMasterBallot();
        var start = new Date();
        var end = new Date((new Date()).getTime() + 30);
        var election = TestElectionFactory_model_1.TestElectionFactory.createElectionWithFactoryMethod(masterBallot, { start: start, end: end });
        var fakeVoter = TestVoterFactory_model_1.TestVoterFactory.createTestVoter();
        var ballotData = TestBallotDataFactory_model_1.TestBallotDataFactory.createTestBallot(fakeVoter.id, masterBallot);
        election.castBallot(faker.random.uuid, ballotData);
        chai_1.expect(function () { election.castBallot(faker.random.uuid, ballotData); }).to.throw();
    });
});
//# sourceMappingURL=Election.spec.js.map