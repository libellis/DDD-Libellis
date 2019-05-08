export class Score {
	constructor(
		private readonly _tally: number,
	) {
		if (Score.isValidScore(_tally)) {
			this._tally = _tally;
		}
	}

	get tally(): number {
		return this._tally;
	}

	static isValidScore(n: number): boolean {
		if (!Score.isNonNegative(n)) throw new Error("Score cannot be negative.");
		if (!Score.isWholeNumber(n)) throw new Error("Score must be a whole number.");
		return true;
	}

	static isWholeNumber(n: number): boolean {
		return n % 1 === 0;
	}

	static isNonNegative(n: number): boolean {
		return n >= 0;
	}
}
