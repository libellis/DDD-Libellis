/**
 * For now we only support ascii a-z for real names.
 * Probably should build unicode support in the future for
 * non-english names.
 */

export class Name {
	private readonly _name: string;
	private static _nameRx = new RegExp("^[A-Za-z]+$");
	private static _maxLength = 50;

	constructor(
		name: string
	) {
		if (Name.isValidName(name)) {
			this._name = name;
		}
	}

	get value() {
		return this._name;
	}

	static isValidName(name: string): boolean {
		if (!Name.containsValidChars(name)) {
			throw new Error("Names must contain only alphabetic characters.")
		}

		if (!Name.isValidLength(name)) {
			throw new Error(`Names cannot be longer than ${Name._maxLength} characters.`)
		}

		return true;
	}

	static containsValidChars(name: string) : boolean {
		return Name._nameRx.test(name);
	}

	static isValidLength(name: string): boolean {
		return (name.length <= Name._maxLength);
	}
}
