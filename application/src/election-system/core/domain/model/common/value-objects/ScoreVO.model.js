"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Score = /** @class */ (function () {
    function Score(_tally) {
        this._tally = _tally;
        if (Score.isValidScore(_tally)) {
            this._tally = _tally;
        }
    }
    Object.defineProperty(Score.prototype, "tally", {
        get: function () {
            return this._tally;
        },
        enumerable: true,
        configurable: true
    });
    Score.isValidScore = function (n) {
        if (!Score.isNonNegative(n))
            throw new Error("Score cannot be negative.");
        if (!Score.isWholeNumber(n))
            throw new Error("Score must be a whole number.");
        return true;
    };
    Score.isWholeNumber = function (n) {
        return n % 1 === 0;
    };
    Score.isNonNegative = function (n) {
        return n >= 0;
    };
    return Score;
}());
exports.Score = Score;
//# sourceMappingURL=ScoreVO.model.js.map