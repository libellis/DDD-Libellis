/**
 * For now we only support ascii a-z for real names.
 * Probably should build unicode support in the future for
 * non-english names.
 */
import { ValueObject } from "../../../../../../shared-kernel/ValueObject.model";

export class Name extends ValueObject {
	private readonly _name: string;
	private static _nameRx = new RegExp("^[A-Za-z']+$");
	private static _maxLength = 50;

	constructor(
		name: string
	) {
	  Name.validityCheck(name);
	  super();
	  this._name = name;
	}

	get value() {
		return this._name;
	}

	protected get getEqualityComponents(): Set<string | number> {
	  return new Set([this._name]);
	}

	static validityCheck(name: string) {
		if (!Name.containsValidChars(name)) {
			throw new Error("Names must contain only alphabetic characters.")
		}

		if (!Name.isValidLength(name)) {
			throw new Error(`Names cannot be longer than ${Name._maxLength} characters.`)
		}
	}

	static containsValidChars(name: string) : boolean {
		return Name._nameRx.test(name);
	}

	static isValidLength(name: string): boolean {
		return (name.length <= Name._maxLength);
	}
}
