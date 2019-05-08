"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Election_model_1 = require("../../../../../core/domain/model/election-aggregate/Election.model");
var faker = require("faker");
var EventBus_1 = require("../../../../../../shared-kernel/event-streams/EventBus");
var TestBallotDataFactory_model_1 = require("./TestBallotDataFactory.model");
var TestVoterFactory_model_1 = require("./TestVoterFactory.model");
var TestMasterBallotFactory_model_1 = require("./TestMasterBallotFactory.model");
var TestElectionFactory = /** @class */ (function () {
    function TestElectionFactory() {
    }
    // MasterBallot will likely come during testing from a generation via the TestMasterBallotFactory.
    TestElectionFactory.createElectionWithFactoryMethod = function (masterBallot, optionalParams) {
        var start = faker.date.recent(1);
        var end = new Date(start.getTime() + faker.random.number({ min: 86410000, max: 604800000 }));
        var eData = {
            id: faker.random.uuid,
            start: start,
            end: end,
            anonymous: faker.random.boolean(),
            masterBallot: masterBallot,
            ballotCastEventBus: new EventBus_1.EventBus()
        };
        if (optionalParams !== undefined) {
            TestElectionFactory.patchObject(eData, optionalParams);
        }
        return Election_model_1.Election.create(eData.id, eData.start, eData.end, eData.anonymous, eData.masterBallot, eData.ballotCastEventBus);
    };
    TestElectionFactory.createRestrictedElectionWithFactoryMethod = function (masterBallot, permittedVoters, optionalParams) {
        var start = faker.date.recent(1);
        var end = new Date(start.getTime() + faker.random.number({ min: 86410000, max: 604800000 }));
        var eData = {
            id: faker.random.uuid,
            start: start,
            end: end,
            anonymous: faker.random.boolean(),
            permittedVoters: permittedVoters,
            masterBallot: masterBallot,
            ballotCastEventBus: new EventBus_1.EventBus()
        };
        if (optionalParams !== undefined) {
            TestElectionFactory.patchObject(eData, optionalParams);
        }
        return Election_model_1.Election.create(eData.id, eData.start, eData.end, eData.anonymous, eData.masterBallot, eData.ballotCastEventBus, eData.permittedVoters);
    };
    // This allows us to patch our generated masterBallots/questions/choices with optional passed
    // in static values.
    TestElectionFactory.patchObject = function (inputObj, patchObj) {
        for (var _i = 0, _a = Object.entries(patchObj); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            if (inputObj.hasOwnProperty(key))
                inputObj[key] = value;
        }
    };
    // Should this be here or in the election test factory model?
    TestElectionFactory.castBallot = function (election, ballotData) {
        return election.castBallot(faker.random.uuid, ballotData);
    };
    TestElectionFactory.castBallots = function (election, ballotDatas) {
        return ballotDatas.map(function (b) {
            return TestElectionFactory.castBallot(election, b);
        });
    };
    // This is a very meta method that handles all the steps leading up to and including
    // casting a ballot.  It returns all relevant class instances stored in an object.
    // Intention is to destructure what you need from the final output object
    TestElectionFactory.createElectionAndCastBallot = function () {
        var eventBus = new EventBus_1.EventBus();
        var masterBallot = TestMasterBallotFactory_model_1.TestMasterBallotFactory.createFullMasterBallot();
        var election = TestElectionFactory.createElectionWithFactoryMethod(masterBallot, { ballotCastEventBus: eventBus });
        var voter = TestVoterFactory_model_1.TestVoterFactory.createTestVoter();
        var ballotData = TestBallotDataFactory_model_1.TestBallotDataFactory.createTestBallot(voter.id, masterBallot);
        var ballot = TestElectionFactory.castBallot(election, ballotData);
        return {
            election: election,
            masterBallot: masterBallot,
            ballot: ballot,
            voter: voter,
            eventBus: eventBus
        };
    };
    TestElectionFactory.createElectionAndCastBallots = function () {
        var eventBus = new EventBus_1.EventBus();
        var masterBallot = TestMasterBallotFactory_model_1.TestMasterBallotFactory.createFullMasterBallot();
        var election = TestElectionFactory.createElectionWithFactoryMethod(masterBallot, { ballotCastEventBus: eventBus });
        var voters = TestVoterFactory_model_1.TestVoterFactory.createRandomTestVoters(6, 12);
        var ballotDatas = TestBallotDataFactory_model_1.TestBallotDataFactory.createTestBallotsFromVotersList(voters, masterBallot);
        var ballots = TestElectionFactory.castBallots(election, ballotDatas);
        return {
            election: election,
            masterBallot: masterBallot,
            ballots: ballots,
            voters: voters,
            eventBus: eventBus
        };
    };
    return TestElectionFactory;
}());
exports.TestElectionFactory = TestElectionFactory;
//# sourceMappingURL=TestElectionFactory.model.js.map