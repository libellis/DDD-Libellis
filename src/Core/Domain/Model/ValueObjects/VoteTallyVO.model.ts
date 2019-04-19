export class VoteTallyVO {
	constructor(
		private readonly _tally: number,
	) {
		if (VoteTallyVO.isValidTallyNumber(_tally)) {
			this._tally = _tally;
		}
	}

	get tally(): number {
		return this._tally;
	}

	static isValidTallyNumber(n: number): boolean {
		if (VoteTallyVO.isNonNegative(n)) throw new Error("Tally cannot be negative.");
		if (!VoteTallyVO.isWholeNumber(n)) throw new Error("Tally must be a whole number.");
		return true;
	}

	static isWholeNumber(n: number): boolean {
		return n % 1 === 0;
	}

	static isNonNegative(n: number): boolean {
		return n >= 0;
	}
}
