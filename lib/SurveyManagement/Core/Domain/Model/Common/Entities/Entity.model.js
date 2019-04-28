"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Entity = /** @class */ (function () {
    function Entity(_id) {
        this._id = _id;
        this._version = 0;
        this._discarded = false;
    }
    Object.defineProperty(Entity.prototype, "version", {
        get: function () {
            return this._version;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "discarded", {
        get: function () {
            return this._discarded;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    // Can't override equality operator in js/ts so we make explicit method.
    Entity.prototype.equals = function (other) {
        return (this.id === other.id);
    };
    Entity.prototype.incrementVersion = function () {
        this._version++;
    };
    return Entity;
}());
exports.Entity = Entity;
//# sourceMappingURL=Entity.model.js.map