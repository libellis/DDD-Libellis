"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var faker = require("faker");
var TestNewElectionDataFactory = /** @class */ (function () {
    function TestNewElectionDataFactory() {
    }
    TestNewElectionDataFactory.createNewElectionData = function (masterBallotId) {
        var start = faker.date.recent(1);
        var end = new Date(start.getTime() + faker.random.number({ min: 86410000, max: 604800000 }));
        var anonymous = faker.random.boolean();
        return { start: start, end: end, anonymous: anonymous, masterBallotId: masterBallotId };
    };
    TestNewElectionDataFactory.createNewElectionDataForRestricted = function (masterBallotId, permittedVoters) {
        var start = faker.date.recent(1);
        var end = new Date(start.getTime() + faker.random.number({ min: 86410000, max: 604800000 }));
        var anonymous = faker.random.boolean();
        return { start: start, end: end, anonymous: anonymous, masterBallotId: masterBallotId, permittedVoters: permittedVoters };
    };
    return TestNewElectionDataFactory;
}());
exports.TestNewElectionDataFactory = TestNewElectionDataFactory;
//# sourceMappingURL=TestNewElectionDataFactory.model.js.map