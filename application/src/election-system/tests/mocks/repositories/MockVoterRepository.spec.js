"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
require("mocha");
var MockVoterRepository_model_1 = require("./MockVoterRepository.model");
var TestVoterFactory_model_1 = require("../../core/domain/model/factories/TestVoterFactory.model");
describe('test all mock methods', function () {
    it('should store and retrieve a voter', function () { return __awaiter(_this, void 0, void 0, function () {
        var voter, voterRepository, retrievedVoter;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    voter = TestVoterFactory_model_1.TestVoterFactory.createTestVoter();
                    voterRepository = new MockVoterRepository_model_1.MockVoterRepository();
                    return [4 /*yield*/, voterRepository.add(voter)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, voterRepository.get(voter.id)];
                case 2:
                    retrievedVoter = _a.sent();
                    chai_1.expect(retrievedVoter).to.eql(voter);
                    return [2 /*return*/];
            }
        });
    }); });
    it('get() should not return an entity that when directly mutated affects repository data', function () { return __awaiter(_this, void 0, void 0, function () {
        var voter, voterRepository, voterToMutate, retrievedVoter;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    voter = TestVoterFactory_model_1.TestVoterFactory.createTestVoter();
                    voterRepository = new MockVoterRepository_model_1.MockVoterRepository();
                    return [4 /*yield*/, voterRepository.add(voter)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, voterRepository.get(voter.id)];
                case 2:
                    voterToMutate = _a.sent();
                    voterToMutate.incrementVersion();
                    return [4 /*yield*/, voterRepository.get(voter.id)];
                case 3:
                    retrievedVoter = _a.sent();
                    chai_1.expect(retrievedVoter).to.eql(voter);
                    chai_1.expect(retrievedVoter).to.not.eql(voterToMutate);
                    return [2 /*return*/];
            }
        });
    }); });
    it('getPaged() should not return entities that when directly mutated affects repository data', function () { return __awaiter(_this, void 0, void 0, function () {
        var voters, voterRepository, retrievedVotersToMutate, voterToMutate, retrievedVoters;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    voters = TestVoterFactory_model_1.TestVoterFactory.createRandomTestVoters(2, 12);
                    voterRepository = new MockVoterRepository_model_1.MockVoterRepository();
                    return [4 /*yield*/, voterRepository.addRange(voters)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, voterRepository.getPagedResults(voters.length, 1)];
                case 2:
                    retrievedVotersToMutate = _a.sent();
                    voterToMutate = retrievedVotersToMutate[0];
                    voterToMutate.incrementVersion();
                    return [4 /*yield*/, voterRepository.getPagedResults(voters.length, 1)];
                case 3:
                    retrievedVoters = _a.sent();
                    chai_1.expect(retrievedVoters).to.eql(voters);
                    chai_1.expect(retrievedVoters).to.not.eql(retrievedVotersToMutate);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should store a range of voters', function () { return __awaiter(_this, void 0, void 0, function () {
        var voters, voterRepository, retrievedVoters;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    voters = TestVoterFactory_model_1.TestVoterFactory.createRandomTestVoters(2, 12);
                    voterRepository = new MockVoterRepository_model_1.MockVoterRepository();
                    return [4 /*yield*/, voterRepository.addRange(voters)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, voterRepository.getPagedResults(voters.length, 1)];
                case 2:
                    retrievedVoters = _a.sent();
                    chai_1.expect(retrievedVoters).to.eql(voters);
                    return [2 /*return*/];
            }
        });
    }); });
    it('can issue an update for a voter after mutation', function () { return __awaiter(_this, void 0, void 0, function () {
        var voter, voterRepository, retrievedVoterToMutate, retrievedVoter;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    voter = TestVoterFactory_model_1.TestVoterFactory.createTestVoter();
                    voterRepository = new MockVoterRepository_model_1.MockVoterRepository();
                    return [4 /*yield*/, voterRepository.add(voter)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, voterRepository.get(voter.id)];
                case 2:
                    retrievedVoterToMutate = _a.sent();
                    retrievedVoterToMutate.incrementVersion();
                    return [4 /*yield*/, voterRepository.update(retrievedVoterToMutate)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, voterRepository.get(voter.id)];
                case 4:
                    retrievedVoter = _a.sent();
                    chai_1.expect(retrievedVoter).to.not.eql(voter);
                    chai_1.expect(retrievedVoter).to.eql(retrievedVoterToMutate);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should remove a voter successfully', function () { return __awaiter(_this, void 0, void 0, function () {
        var voter, voterRepository, retrievedVoter, attemptedRetrievedVoter;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    voter = TestVoterFactory_model_1.TestVoterFactory.createTestVoter();
                    voterRepository = new MockVoterRepository_model_1.MockVoterRepository();
                    return [4 /*yield*/, voterRepository.add(voter)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, voterRepository.get(voter.id)];
                case 2:
                    retrievedVoter = _a.sent();
                    chai_1.expect(retrievedVoter).to.eql(voter);
                    return [4 /*yield*/, voterRepository.remove(voter.id)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, voterRepository.get(voter.id)];
                case 4:
                    attemptedRetrievedVoter = _a.sent();
                    chai_1.expect(attemptedRetrievedVoter).to.equal(undefined);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=MockVoterRepository.spec.js.map