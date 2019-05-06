"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Should this be injected instead?
var uuid = require("uuid/v4");
var UserCreatedEvent = /** @class */ (function () {
    function UserCreatedEvent(user) {
        this.user = user;
        this.eventOccurred = new Date();
        this.id = uuid();
    }
    return UserCreatedEvent;
}());
exports.UserCreatedEvent = UserCreatedEvent;
//# sourceMappingURL=UserCreatedEvent.model.js.map