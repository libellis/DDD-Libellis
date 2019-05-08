"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var VoteTallyVO = /** @class */ (function () {
    function VoteTallyVO(_tally) {
        this._tally = _tally;
        if (VoteTallyVO.isValidTallyNumber(_tally)) {
            this._tally = _tally;
        }
    }
    Object.defineProperty(VoteTallyVO.prototype, "tally", {
        get: function () {
            return this._tally;
        },
        enumerable: true,
        configurable: true
    });
    VoteTallyVO.isValidTallyNumber = function (n) {
        if (!VoteTallyVO.isNonNegative(n))
            throw new Error("Tally cannot be negative.");
        if (!VoteTallyVO.isWholeNumber(n))
            throw new Error("Tally must be a whole number.");
        return true;
    };
    VoteTallyVO.isWholeNumber = function (n) {
        return n % 1 === 0;
    };
    VoteTallyVO.isNonNegative = function (n) {
        return n >= 0;
    };
    return VoteTallyVO;
}());
exports.VoteTallyVO = VoteTallyVO;
//# sourceMappingURL=VoteTallyVO.model.js.map