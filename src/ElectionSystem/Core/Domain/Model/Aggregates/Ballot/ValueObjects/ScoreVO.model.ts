export class ScoreVO {
	constructor(
		private readonly _tally: number,
	) {
		if (ScoreVO.isValidScore(_tally)) {
			this._tally = _tally;
		}
	}

	get tally(): number {
		return this._tally;
	}

	static isValidScore(n: number): boolean {
		if (!ScoreVO.isNonNegative(n)) throw new Error("Score cannot be negative.");
		if (!ScoreVO.isWholeNumber(n)) throw new Error("Score must be a whole number.");
		return true;
	}

	static isWholeNumber(n: number): boolean {
		return n % 1 === 0;
	}

	static isNonNegative(n: number): boolean {
		return n >= 0;
	}
}
