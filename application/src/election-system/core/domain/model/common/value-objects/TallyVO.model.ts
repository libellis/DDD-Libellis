import { Score } from "./ScoreVO.model";

export class Tally {
	constructor(
		private readonly _tally: number,
	) {
		if (Tally.isValidTally(_tally)) {
			this._tally = _tally;
		}
	}

	get tally(): number {
		return this._tally;
	}

	incrementTally(score: Score): Tally {
		return new Tally(
			this._tally + score.tally
		);
	}

	static isValidTally(n: number): boolean {
		if (!Tally.isNonNegative(n)) throw new Error("Tally cannot be negative.");
		if (!Tally.isWholeNumber(n)) throw new Error("Tally must be a whole number.");
		return true;
	}

	static isWholeNumber(n: number): boolean {
		return n % 1 === 0;
	}

	static isNonNegative(n: number): boolean {
		return n >= 0;
	}
}
