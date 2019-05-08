"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Should this be injected instead?
var uuid = require("uuid/v4");
var UserUpdatedEvent = /** @class */ (function () {
    function UserUpdatedEvent(user) {
        this.user = user;
        this.eventOccurred = new Date();
        this.id = uuid();
    }
    return UserUpdatedEvent;
}());
exports.UserUpdatedEvent = UserUpdatedEvent;
//# sourceMappingURL=UserUpdatedEvent.model.js.map