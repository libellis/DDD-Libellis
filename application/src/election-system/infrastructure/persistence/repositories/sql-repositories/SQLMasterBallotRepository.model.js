"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var SQLRepositoryBase_model_1 = require("./SQLRepositoryBase.model");
var CategoryVO_model_1 = require("../../../../core/domain/model/common/value-objects/CategoryVO.model");
var MasterBallot_model_1 = require("../../../../core/domain/model/master-ballot-aggregate/MasterBallot.model");
var SQLMasterBallotRepository = /** @class */ (function (_super) {
    __extends(SQLMasterBallotRepository, _super);
    function SQLMasterBallotRepository(_db) {
        return _super.call(this, _db) || this;
    }
    // TODO: Implement
    SQLMasterBallotRepository.prototype.add = function (entity) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, false];
            });
        });
    };
    // TODO: Implement
    SQLMasterBallotRepository.prototype.addRange = function (entities) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, false];
            });
        });
    };
    // This is a very rough sketch.  Ultimately we shouldn't be piping
    // database query results directly into entity constructors.  Look into
    // possibly using automapper to map to a consistent object format
    // that the constructors expect.
    SQLMasterBallotRepository.prototype.get = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var surveyResult, sData, survey, qData, _a, _i, qData_1, q;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this._db.query("SELECT id,\n\t\t\t\tauthor,\n\t\t\t\ttitle,\n\t\t\t\tdescription,\n\t\t\t\tcategory,\n\t\t\t\tdate_posted as datePosted,\n\t\t\t\tanonymous,\n\t\tFROM surveys\n\t\tWHERE id = $1", [id])];
                    case 1:
                        surveyResult = _b.sent();
                        if (surveyResult.rows.length < 1) {
                            throw new Error('Not Found');
                        }
                        sData = surveyResult.rows[0];
                        survey = new MasterBallot_model_1.MasterBallot(sData["id"], sData["author"], sData["title"], sData["description"], new CategoryVO_model_1.Category(sData["category"]), new Date(sData["datePosted"]), sData["anonymous"]);
                        _a = this.attachChoiceDataToAllQuestions;
                        return [4 /*yield*/, this.getQuestionsDataByMasterBallot(id)];
                    case 2: return [4 /*yield*/, _a.apply(this, [_b.sent()])];
                    case 3:
                        qData = _b.sent();
                        for (_i = 0, qData_1 = qData; _i < qData_1.length; _i++) {
                            q = qData_1[_i];
                            survey.addQuestionWithChoices({
                                id: q["id"],
                                title: q["title"],
                                questionType: q["questionType"],
                                choicesData: q["choicesData"],
                            });
                        }
                        return [2 /*return*/, survey];
                }
            });
        });
    };
    SQLMasterBallotRepository.prototype.getQuestionsDataByMasterBallot = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var questionsResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._db.query("\n\t\t\tSELECT id, survey_id as surveyId, title, question_type as questionType\n\t\t\tFROM questions\n\t\t\tWHERE surveyId=$1\n\t\t\t", [id])];
                    case 1:
                        questionsResult = _a.sent();
                        return [2 /*return*/, questionsResult.rows];
                }
            });
        });
    };
    SQLMasterBallotRepository.prototype.getChoicesDataByQuestion = function (questionId) {
        return __awaiter(this, void 0, void 0, function () {
            var choicesResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._db.query("\n\t\t\tSELECT SUM(score) AS vote_tally,\n\t\t\t\tchoices.id as id, \n\t\t\t\tchoices.question_id as questionId, \n\t\t\t\tchoices.title as title, \n\t\t\t\tchoices.content as content, \n\t\t\t\tchoices.content_type as contentType\n\t\t\tFROM votes \n\t\t\tJOIN choices ON votes.choice_id = choices.id\n\t\t\tWHERE questionId=$1\n\t\t\tGROUP BY choices.id\n\t\t\t", [questionId])];
                    case 1:
                        choicesResult = _a.sent();
                        return [2 /*return*/, choicesResult.rows];
                }
            });
        });
    };
    SQLMasterBallotRepository.prototype.attachChoiceDataToAllQuestions = function (qData) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(qData.map(function (q) { return __awaiter(_this, void 0, void 0, function () {
                            var _a, _b;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        _a = q;
                                        _b = "choicesData";
                                        return [4 /*yield*/, this.getChoicesDataByQuestion(q["id"])];
                                    case 1:
                                        _a[_b] = (_c.sent());
                                        return [2 /*return*/, q];
                                }
                            });
                        }); }))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // TODO: Implement
    SQLMasterBallotRepository.prototype.getPagedResults = function (pageSize, pageNumber) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, []];
            });
        });
    };
    // TODO: Implement
    SQLMasterBallotRepository.prototype.remove = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, false];
            });
        });
    };
    return SQLMasterBallotRepository;
}(SQLRepositoryBase_model_1.SQLRepositoryBase));
exports.SQLMasterBallotRepository = SQLMasterBallotRepository;
//# sourceMappingURL=SQLMasterBallotRepository.model.js.map