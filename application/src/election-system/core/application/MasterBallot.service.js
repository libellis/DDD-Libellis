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
var MasterBallot_model_1 = require("../domain/model/master-ballot-aggregate/MasterBallot.model");
require("automapper-ts");
var MasterBallotResponse_1 = require("./models/output/MasterBallotResponse");
var uuid_1 = require("uuid");
var MasterBallotService = /** @class */ (function () {
    function MasterBallotService(masterBallotRepo) {
        this.masterBallotRepo = masterBallotRepo;
    }
    MasterBallotService.prototype.getMasterBallotsPagedResults = function (pageSize, pageNum) {
        return __awaiter(this, void 0, void 0, function () {
            var masterBallots;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.masterBallotRepo.getPagedResults(pageSize, pageNum)];
                    case 1:
                        masterBallots = _a.sent();
                        return [2 /*return*/, this.translateMasterBallotsToResponse(masterBallots)];
                }
            });
        });
    };
    MasterBallotService.prototype.getMasterBallot = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var masterBallot;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.masterBallotRepo.get(id)];
                    case 1:
                        masterBallot = _a.sent();
                        if (masterBallot === undefined) {
                            throw new Error("Master ballot by that id was not found");
                        }
                        return [2 /*return*/, this.translateMasterBallotToResponse(masterBallot)];
                }
            });
        });
    };
    MasterBallotService.prototype.createMasterBallot = function (masterBallotData, author) {
        return __awaiter(this, void 0, void 0, function () {
            var masterBallot;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        masterBallot = this.translateInputToNewMasterBallot(masterBallotData, author);
                        return [4 /*yield*/, this.masterBallotRepo.add(masterBallot)];
                    case 1:
                        if (!(_a.sent())) {
                            throw new Error("Your new master ballot could not be created.");
                        }
                        return [2 /*return*/, this.translateMasterBallotToResponse(masterBallot)];
                }
            });
        });
    };
    MasterBallotService.prototype.updateMasterBallot = function (id, masterBallotData) {
        return __awaiter(this, void 0, void 0, function () {
            var masterBallot;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.masterBallotRepo.get(id)];
                    case 1:
                        masterBallot = _a.sent();
                        if (masterBallot === undefined) {
                            throw new Error("Master ballot by that id was not found");
                        }
                        masterBallot.updateBallotData(masterBallotData);
                        return [4 /*yield*/, this.masterBallotRepo.update(masterBallot)];
                    case 2:
                        if (!(_a.sent())) {
                            throw new Error("Could not update master ballot by id: " + id);
                        }
                        return [2 /*return*/, this.translateMasterBallotToResponse(masterBallot)];
                }
            });
        });
    };
    MasterBallotService.prototype.deleteMasterBallot = function (id, user) {
        return __awaiter(this, void 0, void 0, function () {
            var masterBallot;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.masterBallotRepo.get(id)];
                    case 1:
                        masterBallot = _a.sent();
                        if (masterBallot === undefined) {
                            throw new Error("Master ballot by that id was not found");
                        }
                        if (masterBallot.author !== user) {
                            throw new Error("You are not authorized to delete that master ballot.");
                        }
                        return [4 /*yield*/, this.masterBallotRepo.remove(id)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // TODO: Replace with automapper once we figure out how to bring in configuration from a single loc
    // Purpose: These serve the purpose of separating our domain layer from our web api layer.  Our web api
    // can know about our application layer, but not about our domain layer.  This also gives us a way to cleanly
    // translate our internal private dunder types (like _id) and get rid of extraneous data from the domain layer.
    MasterBallotService.prototype.translateMasterBallotToResponse = function (masterBallot) {
        return new MasterBallotResponse_1.MasterBallotResponse(masterBallot.title, masterBallot.description, masterBallot.category.name, masterBallot.questions.map(function (q) {
            return {
                title: q.title,
                questionType: q.type,
                choices: q.choices.map(function (c) {
                    return {
                        title: c.title,
                        content: c.content,
                        contentType: c.contentType,
                    };
                })
            };
        }));
    };
    // TODO: Replace with automapper once we figure out how to bring in configuration from a single loc
    MasterBallotService.prototype.translateMasterBallotsToResponse = function (masterballots) {
        var _this = this;
        return masterballots.map(function (m) {
            return _this.translateMasterBallotToResponse(m);
        });
    };
    // TODO: Replace with automapper once we figure out how to bring in configuration from a single loc
    MasterBallotService.prototype.translateInputToNewMasterBallot = function (masterBallotInput, author) {
        return MasterBallot_model_1.MasterBallot.create(uuid_1.v4, {
            author: author,
            title: masterBallotInput.title,
            description: masterBallotInput.description,
            category: masterBallotInput.category,
            questionsData: masterBallotInput.questionsData
        });
    };
    return MasterBallotService;
}());
exports.MasterBallotService = MasterBallotService;
//# sourceMappingURL=MasterBallot.service.js.map