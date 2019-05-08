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
var MasterBallot_model_1 = require("../../../Core/Domain/Model/BallotAggregate/Entities/MasterBallot.model");
var MockSurveyRepository = /** @class */ (function () {
    function MockSurveyRepository(mockData) {
        this.mockData = mockData;
    }
    MockSurveyRepository.prototype.add = function (entity) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.mockData.push(entity);
                return [2 /*return*/, true];
            });
        });
    };
    MockSurveyRepository.prototype.addRange = function (entities) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.mockData.concat(entities);
                return [2 /*return*/, true];
            });
        });
    };
    MockSurveyRepository.prototype.get = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var s;
            return __generator(this, function (_a) {
                s = this.mockData.find(function (s) {
                    return s.id === id;
                });
                // deep clone so we don't mutate survey in mockData as such mutation
                // would not affect a real repository
                return [2 /*return*/, new MasterBallot_model_1.Survey(s.id, s.author, s.title, s.description, s.category, s.datePosted, s.anonymous, s.published, 
                    // internal getter deep clones questions and their choices.
                    s.questions)];
            });
        });
    };
    MockSurveyRepository.prototype.getPagedResults = function (pageSize, pageNumber) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.mockData
                        .slice(pageSize * (pageNumber - 1), pageSize * pageNumber)];
            });
        });
    };
    MockSurveyRepository.prototype.remove = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var index, removed;
            return __generator(this, function (_a) {
                index = this.mockData.findIndex(function (s) {
                    return s.id === id;
                });
                removed = this.mockData.splice(index, 1);
                return [2 /*return*/, removed.length !== 0];
            });
        });
    };
    return MockSurveyRepository;
}());
exports.MockSurveyRepository = MockSurveyRepository;
//# sourceMappingURL=MockSurveyRepository.model.js.map