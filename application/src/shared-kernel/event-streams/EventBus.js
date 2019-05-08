"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
// This should be instantiated as a Singleton and shared around.
var EventBus = /** @class */ (function () {
    function EventBus() {
        this.ballotCastEventStream = new rxjs_1.Subject();
        this.userCreatedEventStream = new rxjs_1.Subject();
        this.userUpdatedEventStream = new rxjs_1.Subject();
    }
    return EventBus;
}());
exports.EventBus = EventBus;
//# sourceMappingURL=EventBus.js.map