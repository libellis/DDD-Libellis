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
        var electionResult = TestElectionFactory_model_1.TestElectionFactory.createElectionWithFactory(masterBallot);
        chai_1.expect(electionResult).instanceOf(Election_model_1.Election);
    });
    it('should generate an election that is currently active', function () {
        var masterBallot = TestMasterBallotFactory_model_1.TestMasterBallotFactory.createFullMasterBallot();
        var electionResult = TestElectionFactory_model_1.TestElectionFactory.createElectionWithFactory(masterBallot);
        chai_1.assert(electionResult.electionIsActive());
    });
    it('should correctly pass in optional election parameters', function () {
        var testStart = new Date((new Date()).getTime() + 90000);
        var masterBallot = TestMasterBallotFactory_model_1.TestMasterBallotFactory.createFullMasterBallot();
        var electionResult = TestElectionFactory_model_1.TestElectionFactory.createElectionWithFactory(masterBallot, { start: testStart });
        chai_1.assert.isFalse(electionResult.electionIsActive());
    });
});
//# sourceMappingURL=TestElectionFactory.spec.js.map