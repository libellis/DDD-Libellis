import { ScoreVO } from "./ScoreVO.model";

export class TallyVO {
	constructor(
		private readonly _tally: number,
	) {
		if (TallyVO.isValidTally(_tally)) {
			this._tally = _tally;
		}
	}

	get tally(): number {
		return this._tally;
	}

	incrementTally(score: ScoreVO): TallyVO {
		return new TallyVO(
			this._tally + score.tally
		);
	}

	static isValidTally(n: number): boolean {
		if (!TallyVO.isNonNegative(n)) throw new Error("Tally cannot be negative.");
		if (!TallyVO.isWholeNumber(n)) throw new Error("Tally must be a whole number.");
		return true;
	}

	static isWholeNumber(n: number): boolean {
		return n % 1 === 0;
	}

	static isNonNegative(n: number): boolean {
		return n >= 0;
	}
}
