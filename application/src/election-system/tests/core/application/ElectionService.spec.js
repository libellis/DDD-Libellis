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
require("mocha");
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var expect = chai.expect;
var assert = chai.assert;
var TestElectionFactory_model_1 = require("../domain/model/factories/TestElectionFactory.model");
var MockElectionRepository_model_1 = require("../../mocks/repositories/MockElectionRepository.model");
var Election_service_1 = require("../../../core/application/Election.service");
var ElectionResponse_1 = require("../../../core/application/models/output/ElectionResponse");
var TestMasterBallotFactory_model_1 = require("../domain/model/factories/TestMasterBallotFactory.model");
var MockMasterBallotRepository_model_1 = require("../../mocks/repositories/MockMasterBallotRepository.model");
var EventBus_1 = require("../../../../shared-kernel/event-streams/EventBus");
var TestNewElectionDataFactory_model_1 = require("./factories/TestNewElectionDataFactory.model");
var TestUpdateElectionDataFactory_model_1 = require("./factories/TestUpdateElectionDataFactory.model");
describe('test all service methods success paths', function () {
    it('should successfully retrieve a election by id', function () { return __awaiter(_this, void 0, void 0, function () {
        var masterBallot, election, mockElectionRepo, electionService, electionResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    masterBallot = TestMasterBallotFactory_model_1.TestMasterBallotFactory.createFullMasterBallot();
                    election = TestElectionFactory_model_1.TestElectionFactory.createElectionWithFactoryMethod(masterBallot);
                    mockElectionRepo = new MockElectionRepository_model_1.MockElectionRepository();
                    return [4 /*yield*/, mockElectionRepo.add(election)];
                case 1:
                    _a.sent();
                    electionService = new Election_service_1.ElectionService(mockElectionRepo, new MockMasterBallotRepository_model_1.MockMasterBallotRepository(), new EventBus_1.EventBus());
                    return [4 /*yield*/, electionService.getElection(election.id)];
                case 2:
                    electionResponse = _a.sent();
                    expect(electionResponse.masterBallotId).to.equal(election.masterBallotId);
                    expect(electionResponse.startDate).to.equal(election.startDate);
                    expect(electionResponse).instanceOf(ElectionResponse_1.ElectionResponse);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should successfully retrieve a paged result of elections', function () { return __awaiter(_this, void 0, void 0, function () {
        var masterBallots, elections, mockElectionRepo, electionService, electionsResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    masterBallots = TestMasterBallotFactory_model_1.TestMasterBallotFactory.createMultipleMasterBallots();
                    elections = TestElectionFactory_model_1.TestElectionFactory.createElectionsFromMasterBallots(masterBallots);
                    mockElectionRepo = new MockElectionRepository_model_1.MockElectionRepository();
                    return [4 /*yield*/, mockElectionRepo.addRange(elections)];
                case 1:
                    _a.sent();
                    electionService = new Election_service_1.ElectionService(mockElectionRepo, new MockMasterBallotRepository_model_1.MockMasterBallotRepository(), new EventBus_1.EventBus());
                    return [4 /*yield*/, electionService.getElectionsPagedResults(elections.length, 1)];
                case 2:
                    electionsResponse = _a.sent();
                    expect(electionsResponse.length).to.equal(elections.length);
                    expect(electionsResponse[0]).instanceOf(ElectionResponse_1.ElectionResponse);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should successfully create a new election', function () { return __awaiter(_this, void 0, void 0, function () {
        var masterBallot, newElectionData, mockElectionRepo, mockMasterBallotRepo, electionService, electionResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    masterBallot = TestMasterBallotFactory_model_1.TestMasterBallotFactory.createFullMasterBallot();
                    newElectionData = TestNewElectionDataFactory_model_1.TestNewElectionDataFactory.createNewElectionData(masterBallot.id);
                    mockElectionRepo = new MockElectionRepository_model_1.MockElectionRepository();
                    mockMasterBallotRepo = new MockMasterBallotRepository_model_1.MockMasterBallotRepository();
                    return [4 /*yield*/, mockMasterBallotRepo.add(masterBallot)];
                case 1:
                    _a.sent();
                    electionService = new Election_service_1.ElectionService(mockElectionRepo, mockMasterBallotRepo, new EventBus_1.EventBus());
                    return [4 /*yield*/, electionService.createElection(newElectionData)];
                case 2:
                    electionResponse = _a.sent();
                    expect(electionResponse).instanceOf(ElectionResponse_1.ElectionResponse);
                    expect(electionResponse.masterBallotId).to.equal(newElectionData.masterBallotId);
                    expect(electionResponse.startDate).to.equal(newElectionData.start);
                    assert(electionResponse.id !== undefined, "Election should have been assigned an id during creation.");
                    assert(electionResponse.tellerId !== undefined, "Election should have created a teller upon creation.");
                    return [2 /*return*/];
            }
        });
    }); });
    it('should successfully update an existing election.', function () { return __awaiter(_this, void 0, void 0, function () {
        var masterBallot, start, end, election, mockElectionRepo, mockMasterBallotRepo, electionService, electionUpdateData, electionResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    masterBallot = TestMasterBallotFactory_model_1.TestMasterBallotFactory.createFullMasterBallot();
                    start = new Date(new Date().getTime() + 10000000);
                    end = new Date(start.getTime() + 10000000);
                    election = TestElectionFactory_model_1.TestElectionFactory.createElectionWithFactoryMethod(masterBallot, { start: start, end: end });
                    mockElectionRepo = new MockElectionRepository_model_1.MockElectionRepository();
                    mockMasterBallotRepo = new MockMasterBallotRepository_model_1.MockMasterBallotRepository();
                    return [4 /*yield*/, mockMasterBallotRepo.add(masterBallot)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, mockElectionRepo.add(election)];
                case 2:
                    _a.sent();
                    electionService = new Election_service_1.ElectionService(mockElectionRepo, mockMasterBallotRepo, new EventBus_1.EventBus());
                    electionUpdateData = TestUpdateElectionDataFactory_model_1.TestUpdateElectionDataFactory.createUpdateElectionData(masterBallot.id);
                    return [4 /*yield*/, electionService.updateElection(election.id, electionUpdateData)];
                case 3:
                    electionResponse = _a.sent();
                    expect(electionResponse).instanceOf(ElectionResponse_1.ElectionResponse);
                    expect(electionResponse.startDate).to.equal(electionUpdateData.start);
                    expect(electionResponse.endDate).to.not.equal(election.endDate);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should successfully delete an existing election.', function () { return __awaiter(_this, void 0, void 0, function () {
        var masterBallot, election, mockElectionRepo, electionService, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    masterBallot = TestMasterBallotFactory_model_1.TestMasterBallotFactory.createFullMasterBallot();
                    election = TestElectionFactory_model_1.TestElectionFactory.createElectionWithFactoryMethod(masterBallot);
                    mockElectionRepo = new MockElectionRepository_model_1.MockElectionRepository();
                    return [4 /*yield*/, mockElectionRepo.add(election)];
                case 1:
                    _a.sent();
                    electionService = new Election_service_1.ElectionService(mockElectionRepo, new MockMasterBallotRepository_model_1.MockMasterBallotRepository(), new EventBus_1.EventBus());
                    return [4 /*yield*/, electionService.removeElection(election.id)];
                case 2:
                    response = _a.sent();
                    assert.isTrue(response);
                    return [4 /*yield*/, expect(electionService.getElection(election.id)).to.be.rejectedWith(Error)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=ElectionService.spec.js.map