import { Score } from "./Score.model";
import { ValueObject } from "../../../../../../shared-kernel/ValueObject.model";

export class Tally extends ValueObject {
	private readonly _tally: number;

	constructor(
		tally: number,
	) {
		Tally.validityCheck(tally);
		super();
		this._tally = tally;
	}

	get tally(): number {
		return this._tally;
	}

	protected get getEqualityComponents(): Set<string | number> {
	  return new Set([this._tally]);
	}

	incrementTally(score: Score): Tally {
		return new Tally(
			this._tally + score.tally
		);
	}

	static validityCheck(n: number) {
		if (!Tally.isNonNegative(n)) throw new Error("Tally cannot be negative.");
		if (!Tally.isWholeNumber(n)) throw new Error("Tally must be a whole number.");
	}

	static isWholeNumber(n: number): boolean {
		return n % 1 === 0;
	}

	static isNonNegative(n: number): boolean {
		return n >= 0;
	}
}
