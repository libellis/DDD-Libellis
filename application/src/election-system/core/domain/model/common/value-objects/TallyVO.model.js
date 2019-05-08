"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Tally = /** @class */ (function () {
    function Tally(_tally) {
        this._tally = _tally;
        if (Tally.isValidTally(_tally)) {
            this._tally = _tally;
        }
    }
    Object.defineProperty(Tally.prototype, "tally", {
        get: function () {
            return this._tally;
        },
        enumerable: true,
        configurable: true
    });
    Tally.prototype.incrementTally = function (score) {
        return new Tally(this._tally + score.tally);
    };
    Tally.isValidTally = function (n) {
        if (!Tally.isNonNegative(n))
            throw new Error("Tally cannot be negative.");
        if (!Tally.isWholeNumber(n))
            throw new Error("Tally must be a whole number.");
        return true;
    };
    Tally.isWholeNumber = function (n) {
        return n % 1 === 0;
    };
    Tally.isNonNegative = function (n) {
        return n >= 0;
    };
    return Tally;
}());
exports.Tally = Tally;
//# sourceMappingURL=TallyVO.model.js.map