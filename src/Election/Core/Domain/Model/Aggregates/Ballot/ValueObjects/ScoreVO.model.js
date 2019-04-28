"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ScoreVO = /** @class */ (function () {
    function ScoreVO(_tally) {
        this._tally = _tally;
        if (ScoreVO.isValidScore(_tally)) {
            this._tally = _tally;
        }
    }
    Object.defineProperty(ScoreVO.prototype, "tally", {
        get: function () {
            return this._tally;
        },
        enumerable: true,
        configurable: true
    });
    ScoreVO.isValidScore = function (n) {
        if (!ScoreVO.isNonNegative(n))
            throw new Error("Score cannot be negative.");
        if (!ScoreVO.isWholeNumber(n))
            throw new Error("Score must be a whole number.");
        return true;
    };
    ScoreVO.isWholeNumber = function (n) {
        return n % 1 === 0;
    };
    ScoreVO.isNonNegative = function (n) {
        return n >= 0;
    };
    return ScoreVO;
}());
exports.ScoreVO = ScoreVO;
//# sourceMappingURL=ScoreVO.model.js.map