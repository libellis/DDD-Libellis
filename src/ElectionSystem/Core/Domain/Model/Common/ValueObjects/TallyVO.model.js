"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TallyVO = /** @class */ (function () {
    function TallyVO(_tally) {
        this._tally = _tally;
        if (TallyVO.isValidTally(_tally)) {
            this._tally = _tally;
        }
    }
    Object.defineProperty(TallyVO.prototype, "tally", {
        get: function () {
            return this._tally;
        },
        enumerable: true,
        configurable: true
    });
    TallyVO.prototype.incrementTally = function (score) {
        return new TallyVO(this._tally + score.tally);
    };
    TallyVO.isValidTally = function (n) {
        if (!TallyVO.isNonNegative(n))
            throw new Error("Tally cannot be negative.");
        if (!TallyVO.isWholeNumber(n))
            throw new Error("Tally must be a whole number.");
        return true;
    };
    TallyVO.isWholeNumber = function (n) {
        return n % 1 === 0;
    };
    TallyVO.isNonNegative = function (n) {
        return n >= 0;
    };
    return TallyVO;
}());
exports.TallyVO = TallyVO;
//# sourceMappingURL=TallyVO.model.js.map