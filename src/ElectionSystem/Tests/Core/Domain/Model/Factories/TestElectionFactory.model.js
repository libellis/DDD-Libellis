"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Election_model_1 = require("../../../../../Core/Domain/Model/Aggregates/Election/Entities/Election.model");
var faker = require("faker");
var DateTimeRangeVO_model_1 = require("../../../../../../SharedKernel/DateTimeRangeVO.model");
var BallotCastEventBus_1 = require("../../../../../../SharedKernel/EventStreams/BallotCastEventBus");
var TestElectionFactory = /** @class */ (function () {
    function TestElectionFactory() {
    }
    // Creates a fake election.  This is purely for unit testing - a real election would need to reference a valid
    // MasterBallot. See method createElectionFromMasterBallot which would likely take a MasterBallot in testing
    // generated from the TestMasterBallotFactory.
    TestElectionFactory.createFakeElection = function () {
        var start = faker.date.recent(1);
        // end is between 1 day plus a little and 1 week from randomized start date so the election is currently active.
        var end = new Date(start.getTime() + faker.random.number({ min: 86410000, max: 604800000 }));
        var fakeElectionPeriod = new DateTimeRangeVO_model_1.DateTimeRange(start, end);
        var randomArray = Array(faker.random.number({ min: 2, max: 12, precision: 1 })).fill(0);
        var fakeQuestionIds = new Set(randomArray.map(function (e) { return faker.random.uuid(); }));
        var fakeChoiceIds = new Set(randomArray.map(function (e) { return faker.random.uuid(); }));
        var fakeBallotIds = new Set(randomArray.map(function (e) { return faker.random.uuid(); }));
        var fakeVoterIds = new Set(randomArray.map(function (e) { return faker.random.uuid(); }));
        return new Election_model_1.Election(faker.random.uuid(), fakeElectionPeriod, faker.random.boolean(), faker.random.uuid(), fakeQuestionIds, fakeChoiceIds, fakeBallotIds, fakeVoterIds, new BallotCastEventBus_1.BallotCastEventBus());
    };
    // MasterBallot will likely come during testing from a generation via the TestMasterBallotFactory.
    TestElectionFactory.createElectionFromMasterBallot = function (masterBallot) {
        var start = faker.date.recent(1);
        // end is between 1 day plus a little and 1 week from randomized start date so the election is currently active.
        var end = new Date(start.getTime() + faker.random.number({ min: 86410000, max: 604800000 }));
        return Election_model_1.Election.create(faker.random.uuid, start, end, faker.random.boolean(), masterBallot, new BallotCastEventBus_1.BallotCastEventBus());
    };
    return TestElectionFactory;
}());
exports.TestElectionFactory = TestElectionFactory;
//# sourceMappingURL=TestElectionFactory.model.js.map