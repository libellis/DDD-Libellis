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
Object.defineProperty(exports, "__esModule", { value: true });
var ElectionResponse_1 = require("./models/output/ElectionResponse");
var Election_model_1 = require("../domain/model/election-aggregate/Election.model");
var uuid_1 = require("uuid");
var ElectionService = /** @class */ (function () {
    function ElectionService(electionRepo, masterBallotRepo, eventBus) {
        this.electionRepo = electionRepo;
        this.masterBallotRepo = masterBallotRepo;
        this.eventBus = eventBus;
    }
    ElectionService.prototype.getElectionsPagedResults = function (pageSize, pageNum) {
        return __awaiter(this, void 0, void 0, function () {
            var elections;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.electionRepo.getPagedResults(pageSize, pageNum)];
                    case 1:
                        elections = _a.sent();
                        return [2 /*return*/, ElectionService.translateElectionsToResponse(elections)];
                }
            });
        });
    };
    ElectionService.prototype.getElection = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var election;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.electionRepo.get(id)];
                    case 1:
                        election = _a.sent();
                        if (election === undefined) {
                            throw new Error("Election by that id was not found");
                        }
                        return [2 /*return*/, ElectionService.translateElectionToResponse(election)];
                }
            });
        });
    };
    ElectionService.prototype.createElection = function (newElectionData) {
        return __awaiter(this, void 0, void 0, function () {
            var masterBallot, election;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.masterBallotRepo.get(newElectionData.masterBallotId)];
                    case 1:
                        masterBallot = _a.sent();
                        if (masterBallot === undefined) {
                            throw new Error("Did not find a master ballot by that id");
                        }
                        election = this.createElectionEntity(newElectionData, masterBallot);
                        return [4 /*yield*/, this.electionRepo.add(election)];
                    case 2:
                        if (!(_a.sent())) {
                            throw new Error("Failed to persist election.");
                        }
                        return [2 /*return*/, ElectionService.translateElectionToResponse(election)];
                }
            });
        });
    };
    ElectionService.prototype.updateElection = function (id, electionUpdateData) {
        return __awaiter(this, void 0, void 0, function () {
            var election;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.electionRepo.get(id)];
                    case 1:
                        election = _a.sent();
                        if (election === undefined) {
                            throw new Error("Could not find an election by id: " + id);
                        }
                        if (election.electionIsActive()) {
                            throw new Error("You cannot change election details once an election has started.");
                        }
                        election.updateElectionData(electionUpdateData);
                        return [4 /*yield*/, this.electionRepo.update(election)];
                    case 2:
                        if (!(_a.sent())) {
                            throw new Error("Failed to update election by id: " + id);
                        }
                        return [2 /*return*/, ElectionService.translateElectionToResponse(election)];
                }
            });
        });
    };
    ElectionService.prototype.removeElection = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var election;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.electionRepo.get(id)];
                    case 1:
                        election = _a.sent();
                        if (election === undefined) {
                            throw new Error("Could not find an election by id: " + id);
                        }
                        return [4 /*yield*/, this.electionRepo.remove(id)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ElectionService.prototype.retrieveElectionResults = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var election;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.electionRepo.get(id)];
                    case 1:
                        election = _a.sent();
                        return [2 /*return*/, election.getElectionResults()];
                }
            });
        });
    };
    // TODO: Replace with automapper once we figure out how to bring in configuration from a single loc
    // Purpose: These serve the purpose of separating our domain layer from our web api layer.  Our web api
    // can know about our application layer, but not about our domain layer.  This also gives us a way to cleanly
    // translate our internal private dunder types (like _id) and get rid of extraneous data from the domain layer.
    ElectionService.translateElectionToResponse = function (election) {
        var electionResponse = new ElectionResponse_1.ElectionResponse(election.id, election.startDate, election.endDate, election.anonymous, election.masterBallotId, election.tellerId);
        if (election.restricted) {
            electionResponse.restricted = true;
            electionResponse.permittedVoters = election.permittedVoters;
        }
        return electionResponse;
    };
    ElectionService.translateElectionsToResponse = function (elections) {
        return elections.map(function (e) {
            return ElectionService.translateElectionToResponse(e);
        });
    };
    ElectionService.prototype.createElectionEntity = function (electionData, masterBallot) {
        var permittedVoters = electionData.permittedVoters !== undefined ? new Set(electionData.permittedVoters) : undefined;
        return Election_model_1.Election.create(uuid_1.v4, electionData.start, electionData.end, electionData.anonymous, masterBallot, this.eventBus, permittedVoters);
    };
    return ElectionService;
}());
exports.ElectionService = ElectionService;
//# sourceMappingURL=Election.service.js.map