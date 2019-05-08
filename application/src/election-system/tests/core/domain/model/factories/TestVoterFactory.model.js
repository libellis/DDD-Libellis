"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var faker = require("faker");
var Voter_model_1 = require("../../../../../core/Domain/Model/VoterAggregate/Voter.model");
var TestVoterFactory = /** @class */ (function () {
    function TestVoterFactory() {
    }
    TestVoterFactory.createTestVoter = function () {
        return Voter_model_1.Voter.create(faker.random.uuid);
    };
    TestVoterFactory.createRandomTestVoters = function (min, max) {
        var _this = this;
        var arr = Array(faker.random.number({ min: min, max: max })).fill(0);
        return arr.map(function (e) {
            return _this.createTestVoter();
        });
    };
    return TestVoterFactory;
}());
exports.TestVoterFactory = TestVoterFactory;
//# sourceMappingURL=TestVoterFactory.model.js.map