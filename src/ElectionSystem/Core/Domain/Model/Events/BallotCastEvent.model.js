"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Should this be injected instead?
var uuid = require("uuid/v4");
var BallotCastEvent = /** @class */ (function () {
    function BallotCastEvent(ballot) {
        this.ballot = ballot;
        this.eventOccurred = new Date();
        this.id = uuid();
    }
    return BallotCastEvent;
}());
exports.BallotCastEvent = BallotCastEvent;
//# sourceMappingURL=BallotCastEvent.model.js.map