/**
 * Email Value Object:
 * Uses an industry standard regex to confirm validity of email string
 * before storing it.
 */
import { ValueObject } from "../../../../../../shared-kernel/ValueObject.model";

export class Email extends ValueObject {
	private readonly _email: string;
	private static _emailRx = new RegExp(
		"^(([^<>()\\[\\]\\\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$"
	);

	constructor(
		email: string
	) {
	  Email.validityCheck(email);
	  super();
		this._email = email;
	}

	static validityCheck(email: string) {
		if (!this.isValidEmail(email)) {
			throw new Error("The email address you have supplied is not a valid email address.");
		}
	}

	static isValidEmail(email: string): boolean {
		return Email._emailRx.test(email);
	}

	get value() {
		return this._email;
	}

	get local() {
		return this._email.split('@')[0];
	}

	get domain() {
		return this._email.split('@')[1];
	}

	protected get getEqualityComponents(): Set<string | number> {
	  return new Set([this._email]);
	}
}
