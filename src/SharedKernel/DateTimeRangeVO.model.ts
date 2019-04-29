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

	static createRangeFromMinutes(start: Date, minutes: number) : DateTimeRange {
		const end = new Date(start.getTime() + minutes * 60000);
		return new DateTimeRange(start, end);
	}

	static createRangeFromSeconds(start: Date, seconds: number) : DateTimeRange {
		const end = new Date(start.getTime() + seconds * 1000);
		return new DateTimeRange(start, end);
	}

	// INSTANCE METHODS
	overlaps(other: DateTimeRange) {
		return this._start.getTime() < other._end.getTime() &&
			this._end.getTime() > other._start.getTime();
	}

	equals(other: DateTimeRange) {
		return this._start.getTime() === other._start.getTime() &&
			this._end.getTime() === other._end.getTime();
	}

	// Checks if we are currently inside the DateTimeRange.  Better name for this method?
	currentlyIn() {
		const now = new Date();

		return now.getTime() >= this._start.getTime() &&
			now.getTime() < this._end.getTime();
	}
}
