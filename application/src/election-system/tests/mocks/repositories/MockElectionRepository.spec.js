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
var TestElectionFactory_model_1 = require("../../core/domain/model/factories/TestElectionFactory.model");
var MockElectionRepository_model_1 = require("./MockElectionRepository.model");
var TestMasterBallotFactory_model_1 = require("../../core/domain/model/factories/TestMasterBallotFactory.model");
describe('test all mock methods', function () {
    it('should store and retrieve a election', function () { return __awaiter(_this, void 0, void 0, function () {
        var masterBallot, election, electionRepository, retrievedBallot;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    masterBallot = TestMasterBallotFactory_model_1.TestMasterBallotFactory.createFullMasterBallot();
                    election = TestElectionFactory_model_1.TestElectionFactory.createElectionWithFactoryMethod(masterBallot);
                    electionRepository = new MockElectionRepository_model_1.MockElectionRepository();
                    return [4 /*yield*/, electionRepository.add(election)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, electionRepository.get(election.id)];
                case 2:
                    retrievedBallot = _a.sent();
                    chai_1.expect(retrievedBallot).to.eql(election);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should not allow mutations to change data in repository', function () { return __awaiter(_this, void 0, void 0, function () {
        var masterBallot, election, electionRepository, ballotToMutate, retrievedBallot;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    masterBallot = TestMasterBallotFactory_model_1.TestMasterBallotFactory.createFullMasterBallot();
                    election = TestElectionFactory_model_1.TestElectionFactory.createElectionWithFactoryMethod(masterBallot);
                    electionRepository = new MockElectionRepository_model_1.MockElectionRepository();
                    return [4 /*yield*/, electionRepository.add(election)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, electionRepository.get(election.id)];
                case 2:
                    ballotToMutate = _a.sent();
                    ballotToMutate.incrementVersion();
                    return [4 /*yield*/, electionRepository.get(election.id)];
                case 3:
                    retrievedBallot = _a.sent();
                    chai_1.expect(retrievedBallot).to.eql(election);
                    chai_1.expect(ballotToMutate).to.not.eql(retrievedBallot);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should store a range of elections', function () { return __awaiter(_this, void 0, void 0, function () {
        var masterBallots, elections, electionRepository, retrievedBallots;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    masterBallots = TestMasterBallotFactory_model_1.TestMasterBallotFactory.createMultipleMasterBallots();
                    elections = TestElectionFactory_model_1.TestElectionFactory.createElectionsFromMasterBallots(masterBallots);
                    electionRepository = new MockElectionRepository_model_1.MockElectionRepository();
                    return [4 /*yield*/, electionRepository.addRange(elections)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, electionRepository.getPagedResults(elections.length, 1)];
                case 2:
                    retrievedBallots = _a.sent();
                    chai_1.expect(retrievedBallots).to.eql(elections);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should remove an election successfully', function () { return __awaiter(_this, void 0, void 0, function () {
        var masterBallot, election, electionRepository, retrievedBallot, attemptedRetrievedBallot;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    masterBallot = TestMasterBallotFactory_model_1.TestMasterBallotFactory.createFullMasterBallot();
                    election = TestElectionFactory_model_1.TestElectionFactory.createElectionWithFactoryMethod(masterBallot);
                    electionRepository = new MockElectionRepository_model_1.MockElectionRepository();
                    return [4 /*yield*/, electionRepository.add(election)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, electionRepository.get(election.id)];
                case 2:
                    retrievedBallot = _a.sent();
                    chai_1.expect(retrievedBallot).to.eql(election);
                    return [4 /*yield*/, electionRepository.remove(election.id)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, electionRepository.get(election.id)];
                case 4:
                    attemptedRetrievedBallot = _a.sent();
                    chai_1.expect(attemptedRetrievedBallot).to.equal(undefined);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=MockElectionRepository.spec.js.map