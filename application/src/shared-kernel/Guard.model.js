"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Guard = /** @class */ (function () {
    function Guard() {
    }
    Guard.setsMatch = function (setA, setB) {
        if (setA.size !== setB.size)
            return false;
        setA.forEach(function (elem) {
            if (!setB.has(elem)) {
                return false;
            }
        });
        for (var _i = 0, setA_1 = setA; _i < setA_1.length; _i++) {
            var elem = setA_1[_i];
            if (!setB.has(elem)) {
                return false;
            }
        }
        return true;
    };
    return Guard;
}());
exports.Guard = Guard;
//# sourceMappingURL=Guard.model.js.map