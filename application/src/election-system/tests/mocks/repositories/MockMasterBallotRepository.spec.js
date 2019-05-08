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
var TestMasterBallotFactory_model_1 = require("../../core/domain/model/factories/TestMasterBallotFactory.model");
var MockMasterBallotRepository_model_1 = require("./MockMasterBallotRepository.model");
describe('test all mock methods', function () {
    it('should store and retrieve a master ballot', function () { return __awaiter(_this, void 0, void 0, function () {
        var masterBallot, masterBallotRepository, retrievedBallot;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    masterBallot = TestMasterBallotFactory_model_1.TestMasterBallotFactory.createFullMasterBallot();
                    masterBallotRepository = new MockMasterBallotRepository_model_1.MockMasterBallotRepository();
                    return [4 /*yield*/, masterBallotRepository.add(masterBallot)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, masterBallotRepository.get(masterBallot.id)];
                case 2:
                    retrievedBallot = _a.sent();
                    chai_1.expect(retrievedBallot).to.eql(masterBallot);
                    return [2 /*return*/];
            }
        });
    }); });
    it('get() should not allow entity mutation to affect repository data', function () { return __awaiter(_this, void 0, void 0, function () {
        var masterBallot, masterBallotRepository, masterBallotToMutate, retrievedMasterBallot;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    masterBallot = TestMasterBallotFactory_model_1.TestMasterBallotFactory.createFullMasterBallot();
                    masterBallotRepository = new MockMasterBallotRepository_model_1.MockMasterBallotRepository();
                    return [4 /*yield*/, masterBallotRepository.add(masterBallot)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, masterBallotRepository.get(masterBallot.id)];
                case 2:
                    masterBallotToMutate = _a.sent();
                    masterBallotToMutate.incrementVersion();
                    return [4 /*yield*/, masterBallotRepository.get(masterBallot.id)];
                case 3:
                    retrievedMasterBallot = _a.sent();
                    chai_1.expect(retrievedMasterBallot).to.eql(masterBallot);
                    chai_1.expect(retrievedMasterBallot).to.not.eql(masterBallotToMutate);
                    return [2 /*return*/];
            }
        });
    }); });
    it('getPaged() should not return entities, that when mutated directly affect repository data', function () { return __awaiter(_this, void 0, void 0, function () {
        var masterBallots, masterBallotRepository, retrievedMasterBallotsToMutate, masterBallotToMutate, retrievedBallots;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    masterBallots = TestMasterBallotFactory_model_1.TestMasterBallotFactory.createMultipleMasterBallots();
                    masterBallotRepository = new MockMasterBallotRepository_model_1.MockMasterBallotRepository();
                    return [4 /*yield*/, masterBallotRepository.addRange(masterBallots)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, masterBallotRepository.getPagedResults(masterBallots.length, 1)];
                case 2:
                    retrievedMasterBallotsToMutate = _a.sent();
                    masterBallotToMutate = retrievedMasterBallotsToMutate[0];
                    masterBallotToMutate.incrementVersion();
                    return [4 /*yield*/, masterBallotRepository.getPagedResults(masterBallots.length, 1)];
                case 3:
                    retrievedBallots = _a.sent();
                    chai_1.expect(retrievedBallots).to.eql(masterBallots);
                    chai_1.expect(retrievedBallots).to.not.eql(masterBallotToMutate);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should store a range of master ballots', function () { return __awaiter(_this, void 0, void 0, function () {
        var masterBallots, masterBallotRepository, retrievedBallots;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    masterBallots = TestMasterBallotFactory_model_1.TestMasterBallotFactory.createMultipleMasterBallots();
                    masterBallotRepository = new MockMasterBallotRepository_model_1.MockMasterBallotRepository();
                    return [4 /*yield*/, masterBallotRepository.addRange(masterBallots)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, masterBallotRepository.getPagedResults(masterBallots.length, 1)];
                case 2:
                    retrievedBallots = _a.sent();
                    chai_1.expect(retrievedBallots).to.eql(masterBallots);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should remove a master ballot successfully', function () { return __awaiter(_this, void 0, void 0, function () {
        var masterBallot, masterBallotRepository, retrievedBallot, attemptedRetrievedBallot;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    masterBallot = TestMasterBallotFactory_model_1.TestMasterBallotFactory.createFullMasterBallot();
                    masterBallotRepository = new MockMasterBallotRepository_model_1.MockMasterBallotRepository();
                    return [4 /*yield*/, masterBallotRepository.add(masterBallot)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, masterBallotRepository.get(masterBallot.id)];
                case 2:
                    retrievedBallot = _a.sent();
                    chai_1.expect(retrievedBallot).to.eql(masterBallot);
                    return [4 /*yield*/, masterBallotRepository.remove(masterBallot.id)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, masterBallotRepository.get(masterBallot.id)];
                case 4:
                    attemptedRetrievedBallot = _a.sent();
                    chai_1.expect(attemptedRetrievedBallot).to.equal(undefined);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=MockMasterBallotRepository.spec.js.map