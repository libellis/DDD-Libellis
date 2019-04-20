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
var Survey_model_1 = require("../../../../Core/Domain/Model/Entities/Survey.model");
var CategoryVO_model_1 = require("../../../../Core/Domain/Model/ValueObjects/CategoryVO.model");
var SQLSurveyRepository = /** @class */ (function (_super) {
    __extends(SQLSurveyRepository, _super);
    function SQLSurveyRepository(_db) {
        return _super.call(this, _db) || this;
    }
    // TODO: Implement
    SQLSurveyRepository.prototype.add = function (entity) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, false];
            });
        });
    };
    // TODO: Implement
    SQLSurveyRepository.prototype.addRange = function (entities) {
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
    SQLSurveyRepository.prototype.get = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var surveyResult, sData, surveyData, survey, questionsResult, questionsData, _i, questionsData_1, qData, choicesResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._db.query("SELECT id,\n\t\t\t\tauthor,\n\t\t\t\ttitle,\n\t\t\t    description,\n\t\t\t\tcategory,\n\t\t\t\tdate_posted,\n\t\t\t\tanonymous,\n\t\t\t\tpublished\n\t\tFROM surveys\n\t\tWHERE id = $1", [id])];
                    case 1:
                        surveyResult = _a.sent();
                        if (surveyResult.rows.length < 1) {
                            throw new Error('Not Found');
                        }
                        sData = surveyResult.rows[0];
                        surveyData = {
                            id: sData["id"],
                            author: sData["author"],
                            title: sData["title"],
                            description: sData["description"],
                            category: sData["category"],
                            datePosted: sData["date_posted"],
                            anonymous: sData["anonymous"],
                            published: sData["published"],
                        };
                        survey = new Survey_model_1.Survey(surveyData.id, surveyData.author, surveyData.title, surveyData.description, new CategoryVO_model_1.CategoryVO(surveyData.category), surveyData.datePosted, surveyData.anonymous, surveyData.published, []);
                        return [4 /*yield*/, this._db.query("\n            SELECT id, survey_id, title, question_type\n            FROM questions\n            WHERE survey_id=$1\n            ", [id])];
                    case 2:
                        questionsResult = _a.sent();
                        questionsData = [];
                        if (questionsResult.rows.length > 0) {
                            questionsData = questionsResult.rows.map(function (qData) {
                                return {
                                    id: qData["id"],
                                    title: qData["title"],
                                    questionType: qData["question_type"],
                                };
                            });
                        }
                        _i = 0, questionsData_1 = questionsData;
                        _a.label = 3;
                    case 3:
                        if (!(_i < questionsData_1.length)) return [3 /*break*/, 6];
                        qData = questionsData_1[_i];
                        return [4 /*yield*/, this._db.query("\n                SELECT SUM(score) AS vote_tally,\n                    choices.id as id, \n                    choices.question_id as question_id, \n                    choices.title as title, \n                    choices.content as content, \n                    choices.content_type as content_type\n                FROM votes \n                JOIN choices ON votes.choice_id = choices.id\n                WHERE question_id=$1\n                GROUP BY choices.id\n                ", [id])];
                    case 4:
                        choicesResult = _a.sent();
                        qData.choicesData = choicesResult.rows.map(function (cData) {
                            return {
                                id: cData["id"],
                                title: cData["title"],
                                content: cData["content"],
                                contentType: cData["content_type"],
                                voteTally: cData["voteTally"],
                            };
                        });
                        survey.addQuestionWithChoices(qData);
                        _a.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6: return [2 /*return*/, survey];
                }
            });
        });
    };
    // TODO: Implement
    SQLSurveyRepository.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, []];
            });
        });
    };
    // TODO: Implement
    SQLSurveyRepository.prototype.remove = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, false];
            });
        });
    };
    return SQLSurveyRepository;
}(SQLRepositoryBase_model_1.SQLRepositoryBase));
exports.SQLSurveyRepository = SQLSurveyRepository;
//# sourceMappingURL=SQLSurveyRepository.model.js.map