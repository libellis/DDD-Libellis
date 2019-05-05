export class Username {
	private readonly _username: string;
	private static _usernameRx = new RegExp("^[A-Za-z0-9\_\.]+$");
	private static _maxLength = 25;

	constructor(
		username: string
	) {
		if (Username.isValidUsername(username)) {
			this._username = username;
		}
	}

	get value() {
		return this._username;
	}

	static isValidUsername(username: string): boolean {
		if (!Username.containsValidChars(username)) {
			throw new Error("Username must contain only alphanumeric characters, underscores or periods.")
		}

		if (!Username.isValidLength(username)) {
			throw new Error(`Username cannot be longer than ${Username._maxLength} characters.`)
		}

		return true;
	}

	static containsValidChars(username: string) : boolean {
		return Username._usernameRx.test(username);
	}

	static isValidLength(username: string): boolean {
		return (username.length <= Username._maxLength);
	}
}
