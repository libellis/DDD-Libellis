/**
 * Email Value Object:
 * Uses an industry standard regex to confirm validity of email string
 * before storing it.
 */

export class Email {
	private readonly _email: string;
	private static _emailRx = new RegExp(
		"^(([^<>()\\[\\]\\\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$"
	);

	constructor(
		email: string
	) {
		if (!Email.isValidEmail(email)) {
			throw new Error('The email address you have supplied is not a valid email address.');
		}
		this._email = email;
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
}
