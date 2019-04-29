"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Should this be injected instead?
var uuid = require("uuid/v4");
var BallotCreatedEvent = /** @class */ (function () {
    function BallotCreatedEvent(ballot) {
        this.ballot = ballot;
        this.eventOccurred = new Date();
        this.id = uuid();
    }
    return BallotCreatedEvent;
}());
exports.BallotCreatedEvent = BallotCreatedEvent;
//# sourceMappingURL=BallotCreatedEvent.model.js.map