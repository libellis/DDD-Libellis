"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
require("mocha");
var TestVoterFactory_model_1 = require("./TestVoterFactory.model");
var Voter_model_1 = require("../../../../../core/domain/model/voter-aggregate/Voter.model");
describe('Test TestVoterFactory create method', function () {
    it('should construct an instance of a Voter entity', function () {
        var voter = TestVoterFactory_model_1.TestVoterFactory.createTestVoter();
        chai_1.expect(voter).instanceOf(Voter_model_1.Voter);
    });
});
//# sourceMappingURL=TestVoterFactory.spec.js.map