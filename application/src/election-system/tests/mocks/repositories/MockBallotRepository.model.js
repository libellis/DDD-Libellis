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
var MockBallotRepository = /** @class */ (function () {
    // TODO: Refactor event bus out so it gets injected into Ballot on creation by injection framework.
    function MockBallotRepository(mockData) {
        this._mockData = [];
        if (mockData !== undefined) {
            this._mockData = mockData;
        }
    }
    MockBallotRepository.prototype.add = function (entity) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this._mockData.push(entity);
                return [2 /*return*/, true];
            });
        });
    };
    MockBallotRepository.prototype.addRange = function (entities) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this._mockData = this._mockData.concat(entities);
                return [2 /*return*/, true];
            });
        });
    };
    MockBallotRepository.prototype.get = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var b;
            return __generator(this, function (_a) {
                b = this._mockData.find(function (b) {
                    return b.id === id;
                });
                if (b === undefined) {
                    return [2 /*return*/, b];
                }
                return [2 /*return*/, b.clone()];
            });
        });
    };
    MockBallotRepository.prototype.getPagedResults = function (pageSize, pageNumber) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._mockData
                        .slice(pageSize * (pageNumber - 1), pageSize * pageNumber)
                        .map(function (b) {
                        return b.clone();
                    })];
            });
        });
    };
    MockBallotRepository.prototype.update = function (entity) {
        return __awaiter(this, void 0, void 0, function () {
            var bIdx;
            return __generator(this, function (_a) {
                bIdx = this._mockData.findIndex(function (b) {
                    return b.id === entity.id;
                });
                // Should we bother putting error return in mock repo?
                if (bIdx === -1) {
                    return [2 /*return*/, false];
                }
                this._mockData[bIdx] = entity;
                return [2 /*return*/, true];
            });
        });
    };
    MockBallotRepository.prototype.remove = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var index, removed;
            return __generator(this, function (_a) {
                index = this._mockData.findIndex(function (s) {
                    return s.id === id;
                });
                removed = this._mockData.splice(index, 1);
                return [2 /*return*/, removed.length !== 0];
            });
        });
    };
    return MockBallotRepository;
}());
exports.MockBallotRepository = MockBallotRepository;
//# sourceMappingURL=MockBallotRepository.model.js.map