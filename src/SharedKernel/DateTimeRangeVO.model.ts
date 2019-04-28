export class DateTimeRange {
	constructor(public readonly _start: Date,
	            public readonly _end: Date)
	{
		if (DateTimeRange.dateTimeRangeIsValid(_start, _end)) {
			this._start = _start;
			this._end = _end
		}
	}

	// GUARDS
	static dateTimeRangeIsValid(start: Date, end: Date) {
		if (!DateTimeRange.startPrecedesEnd(start, end)) {
			throw new Error(`Start date comes after end date.  Date time range is invalid`);
		}
		return true;
	}

	static startPrecedesEnd(start: Date, end: Date) {
		return start.getTime() < end.getTime();
	}

	// FACTORY METHODS
	static createOneDayRange(start: Date): DateTimeRange {
		const end = new Date(start);
		end.setDate(end.getDate() + 1);
		return new DateTimeRange(start, end);
	}

	static createOneWeekRange(start: Date): DateTimeRange {
		const end = new Date(start);
		end.setDate(end.getDate() + 7);
		return new DateTimeRange(start, end);
	}

	// INSTANCE METHODS

	overlaps(other: DateTimeRange) {
		return this._start < other._end &&
			this._end > other._start;
	}
}
