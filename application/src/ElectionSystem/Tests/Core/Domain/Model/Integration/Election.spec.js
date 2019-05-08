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
var faker = require("faker");
var TestMasterBallotFactory_model_1 = require("../Factories/TestMasterBallotFactory.model");
var TestElectionFactory_model_1 = require("../Factories/TestElectionFactory.model");
var TestVoterFactory_model_1 = require("../Factories/TestVoterFactory.model");
var TestBallotDataFactory_model_1 = require("../Factories/TestBallotDataFactory.model");
describe('test election process for accuracy', function () {
    var sleep = function (milliseconds) {
        return new Promise(function (resolve) { return setTimeout(resolve, milliseconds); });
    };
    it('should start an election, and count test votes accurately', function () { return __awaiter(_this, void 0, void 0, function () {
        var masterBallot, start, end, election, voters, ballotDatas, highestChoiceCountQuestionIdx, winningCount, i, question, scores, highestScore;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    masterBallot = TestMasterBallotFactory_model_1.TestMasterBallotFactory.createFullMasterBallot();
                    start = new Date();
                    end = new Date((new Date()).getTime() + 30);
                    election = TestElectionFactory_model_1.TestElectionFactory.createElectionWithFactoryMethod(masterBallot, { start: start, end: end });
                    voters = TestVoterFactory_model_1.TestVoterFactory.createRandomTestVoters(1, 12);
                    election.startElection();
                    ballotDatas = TestBallotDataFactory_model_1.TestBallotDataFactory.createTestBallotsFromVotersList(voters, masterBallot);
                    ballotDatas.map(function (b) { return election.castBallot(faker.random.uuid, b); });
                    highestChoiceCountQuestionIdx = 0;
                    winningCount = 0;
                    for (i = 0; i < masterBallot.questionCount; i++) {
                        question = masterBallot.questions[i];
                        if (question.choiceCount > winningCount) {
                            winningCount = question.choiceCount;
                            highestChoiceCountQuestionIdx = i;
                        }
                    }
                    // allot enough time for 30 millisecond long election to finish so we can retrieve winner.
                    return [4 /*yield*/, sleep(30)];
                case 1:
                    // allot enough time for 30 millisecond long election to finish so we can retrieve winner.
                    _a.sent();
                    chai_1.expect(election.getWinner()).equals(masterBallot.questions[highestChoiceCountQuestionIdx]
                        .choices[masterBallot.questions[highestChoiceCountQuestionIdx].choiceCount - 1]
                        .id);
                    scores = Object.values(election.getElectionResults()).map(function (result) {
                        return result.tally;
                    });
                    highestScore = Math.max.apply(Math, scores);
                    chai_1.expect(highestScore).equals((masterBallot
                        .questions[highestChoiceCountQuestionIdx]
                        .choiceCount - 1) * voters.length);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=Election.spec.js.map