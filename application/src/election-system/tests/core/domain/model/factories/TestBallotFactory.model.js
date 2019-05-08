"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var faker = require("faker");
var TestBallotFactoryModel = /** @class */ (function () {
    function TestBallotFactoryModel() {
    }
    // Should this be here or in the election test factory model?
    TestBallotFactoryModel.prototype.castBallot = function (election, ballotData) {
        return election.castBallot(faker.random.uuid, ballotData);
    };
    return TestBallotFactoryModel;
}());
exports.TestBallotFactoryModel = TestBallotFactoryModel;
//# sourceMappingURL=TestBallotFactory.model.js.map