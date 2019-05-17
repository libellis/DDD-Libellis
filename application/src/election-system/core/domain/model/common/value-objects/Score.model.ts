import { ValueObject } from "../../../../../../shared-kernel/ValueObject.model";

export class Score extends ValueObject {
	private readonly _tally: number;

	constructor(
		tally: number,
	) {
	  Score.validityCheck(tally);
	  super();
	  this._tally = tally;
	}

	get tally(): number {
		return this._tally;
	}

	protected get getEqualityComponents(): Set<string | number> {
	  return new Set([this._tally]);
	}

	static validityCheck(n: number) {
		if (!Score.isNonNegative(n)) throw new Error("Score cannot be negative.");
		if (!Score.isWholeNumber(n)) throw new Error("Score must be a whole number.");
	}

	static isWholeNumber(n: number): boolean {
		return n % 1 === 0;
	}

	static isNonNegative(n: number): boolean {
		return n >= 0;
	}
}
