"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DateTimeRange = /** @class */ (function () {
    function DateTimeRange(_start, _end) {
        this._start = _start;
        this._end = _end;
        if (DateTimeRange.dateTimeRangeIsValid(_start, _end)) {
            this._start = _start;
            this._end = _end;
        }
    }
    // GUARDS
    DateTimeRange.dateTimeRangeIsValid = function (start, end) {
        if (!DateTimeRange.startPrecedesEnd(start, end)) {
            throw new Error("Start date comes after end date.  Date time range is invalid");
        }
        return true;
    };
    DateTimeRange.startPrecedesEnd = function (start, end) {
        return start.getTime() < end.getTime();
    };
    // FACTORY METHODS
    DateTimeRange.createOneDayRange = function (start) {
        var end = new Date(start);
        end.setDate(end.getDate() + 1);
        return new DateTimeRange(start, end);
    };
    DateTimeRange.createOneWeekRange = function (start) {
        var end = new Date(start);
        end.setDate(end.getDate() + 7);
        return new DateTimeRange(start, end);
    };
    DateTimeRange.createRangeFromMinutes = function (start, minutes) {
        var end = new Date(start.getTime() + minutes * 60000);
        return new DateTimeRange(start, end);
    };
    DateTimeRange.createRangeFromSeconds = function (start, seconds) {
        var end = new Date(start.getTime() + seconds * 1000);
        return new DateTimeRange(start, end);
    };
    // INSTANCE METHODS
    DateTimeRange.prototype.overlaps = function (other) {
        return this._start.getTime() < other._end.getTime() &&
            this._end.getTime() > other._start.getTime();
    };
    DateTimeRange.prototype.equals = function (other) {
        return this._start.getTime() === other._start.getTime() &&
            this._end.getTime() === other._end.getTime();
    };
    // Checks if we are currently inside the DateTimeRange.  Better name for this method?
    DateTimeRange.prototype.currentlyIn = function () {
        var now = new Date();
        return now.getTime() >= this._start.getTime() &&
            now.getTime() < this._end.getTime();
    };
    DateTimeRange.prototype.currentlyAfterRange = function () {
        var now = new Date();
        return now.getTime() > this._end.getTime();
    };
    return DateTimeRange;
}());
exports.DateTimeRange = DateTimeRange;
//# sourceMappingURL=DateTimeRangeVO.model.js.map