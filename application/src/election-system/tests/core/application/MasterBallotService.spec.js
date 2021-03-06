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
var TestMasterBallotFactory_model_1 = require("../domain/model/factories/TestMasterBallotFactory.model");
var MockMasterBallotRepository_model_1 = require("../../mocks/repositories/MockMasterBallotRepository.model");
var MasterBallot_service_1 = require("../../../core/application/MasterBallot.service");
var MasterBallotResponse_1 = require("../../../core/application/models/output/MasterBallotResponse");
var TestNewMasterBallotDataFactory_model_1 = require("./factories/TestNewMasterBallotDataFactory.model");
var TestVoterFactory_model_1 = require("../domain/model/factories/TestVoterFactory.model");
var TestUpdateMasterBallotDataFactory_model_1 = require("./factories/TestUpdateMasterBallotDataFactory.model");
describe('test all service methods success paths', function () {
    it('should successfully retrieve a ballot by id', function () { return __awaiter(_this, void 0, void 0, function () {
        var masterBallot, mockMasterBallotRepo, masterBallotService, masterBallotResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    masterBallot = TestMasterBallotFactory_model_1.TestMasterBallotFactory.createFullMasterBallot();
                    mockMasterBallotRepo = new MockMasterBallotRepository_model_1.MockMasterBallotRepository();
                    return [4 /*yield*/, mockMasterBallotRepo.add(masterBallot)];
                case 1:
                    _a.sent();
                    masterBallotService = new MasterBallot_service_1.MasterBallotService(mockMasterBallotRepo);
                    return [4 /*yield*/, masterBallotService.getMasterBallot(masterBallot.id)];
                case 2:
                    masterBallotResponse = _a.sent();
                    expect(masterBallotResponse).instanceOf(MasterBallotResponse_1.MasterBallotResponse);
                    expect(masterBallotResponse.title).to.equal(masterBallot.title);
                    expect(masterBallotResponse.description).to.equal(masterBallot.description);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should successfully retrieve a paged result of ballots', function () { return __awaiter(_this, void 0, void 0, function () {
        var masterBallots, mockMasterBallotRepo, masterBallotService, masterBallotsResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    masterBallots = TestMasterBallotFactory_model_1.TestMasterBallotFactory.createMultipleMasterBallots();
                    mockMasterBallotRepo = new MockMasterBallotRepository_model_1.MockMasterBallotRepository();
                    return [4 /*yield*/, mockMasterBallotRepo.addRange(masterBallots)];
                case 1:
                    _a.sent();
                    masterBallotService = new MasterBallot_service_1.MasterBallotService(mockMasterBallotRepo);
                    return [4 /*yield*/, masterBallotService.getMasterBallotsPagedResults(masterBallots.length, 1)];
                case 2:
                    masterBallotsResponse = _a.sent();
                    expect(masterBallotsResponse.length).to.equal(masterBallots.length);
                    expect(masterBallotsResponse[0]).instanceOf(MasterBallotResponse_1.MasterBallotResponse);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should successfully create a new ballot', function () { return __awaiter(_this, void 0, void 0, function () {
        var newMasterBallotData, mockMasterBallotRepo, voter, masterBallotService, masterBallotResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    newMasterBallotData = TestNewMasterBallotDataFactory_model_1.TestNewMasterBallotDataFactory.createTestNewMasterBallotData();
                    mockMasterBallotRepo = new MockMasterBallotRepository_model_1.MockMasterBallotRepository();
                    voter = TestVoterFactory_model_1.TestVoterFactory.createTestVoter();
                    masterBallotService = new MasterBallot_service_1.MasterBallotService(mockMasterBallotRepo);
                    return [4 /*yield*/, masterBallotService.createMasterBallot(newMasterBallotData, voter.id)];
                case 1:
                    masterBallotResponse = _a.sent();
                    expect(masterBallotResponse).instanceOf(MasterBallotResponse_1.MasterBallotResponse);
                    expect(masterBallotResponse.title).to.equal(newMasterBallotData.title);
                    assert(masterBallotResponse.id !== undefined, "Master Ballot should have been assigned an id during creation.");
                    return [2 /*return*/];
            }
        });
    }); });
    it('should successfully update an existing ballot.', function () { return __awaiter(_this, void 0, void 0, function () {
        var masterBallot, mockMasterBallotRepo, masterBallotService, masterBallotUpdateData, masterBallotResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    masterBallot = TestMasterBallotFactory_model_1.TestMasterBallotFactory.createFullMasterBallot();
                    mockMasterBallotRepo = new MockMasterBallotRepository_model_1.MockMasterBallotRepository();
                    return [4 /*yield*/, mockMasterBallotRepo.add(masterBallot)];
                case 1:
                    _a.sent();
                    masterBallotService = new MasterBallot_service_1.MasterBallotService(mockMasterBallotRepo);
                    masterBallotUpdateData = TestUpdateMasterBallotDataFactory_model_1.TestUpdateMasterBallotDataFactory.createTestUpdateMasterBallotData(masterBallot);
                    return [4 /*yield*/, masterBallotService.updateMasterBallot(masterBallot.id, masterBallotUpdateData)];
                case 2:
                    masterBallotResponse = _a.sent();
                    expect(masterBallotResponse).instanceOf(MasterBallotResponse_1.MasterBallotResponse);
                    expect(masterBallotResponse.title).to.equal(masterBallotUpdateData.title);
                    expect(masterBallotResponse.title).to.not.equal(masterBallot.title);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should successfully delete an existing ballot.', function () { return __awaiter(_this, void 0, void 0, function () {
        var author, masterBallot, mockMasterBallotRepo, masterBallotService, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    author = TestVoterFactory_model_1.TestVoterFactory.createTestVoter();
                    masterBallot = TestMasterBallotFactory_model_1.TestMasterBallotFactory.createFullMasterBallot({ masterBallotParams: { author: author.id } });
                    mockMasterBallotRepo = new MockMasterBallotRepository_model_1.MockMasterBallotRepository();
                    return [4 /*yield*/, mockMasterBallotRepo.add(masterBallot)];
                case 1:
                    _a.sent();
                    masterBallotService = new MasterBallot_service_1.MasterBallotService(mockMasterBallotRepo);
                    return [4 /*yield*/, masterBallotService.deleteMasterBallot(masterBallot.id, author.id)];
                case 2:
                    response = _a.sent();
                    assert.isTrue(response);
                    return [4 /*yield*/, expect(masterBallotService.getMasterBallot(masterBallot.id)).to.be.rejectedWith(Error)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=MasterBallotService.spec.js.map