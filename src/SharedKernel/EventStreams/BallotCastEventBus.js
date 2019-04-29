"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
// This should be instantiated as a Singleton and shared around.
var BallotCastEventBus = /** @class */ (function () {
    function BallotCastEventBus() {
        this.stream = new rxjs_1.Subject();
    }
    return BallotCastEventBus;
}());
exports.BallotCastEventBus = BallotCastEventBus;
//# sourceMappingURL=BallotCastEventBus.js.map