"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Election_model_1 = require("../../../../../core/domain/model/election-aggregate/Election.model");
var faker = require("faker");
var EventBus_1 = require("../../../../../../shared-kernel/event-streams/EventBus");
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
    return TestElectionFactory;
}());
exports.TestElectionFactory = TestElectionFactory;
//# sourceMappingURL=TestElectionFactory.model.js.map