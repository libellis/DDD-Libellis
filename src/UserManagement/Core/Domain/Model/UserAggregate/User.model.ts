import { IUserData } from "./Abstractions/IUserData";
import { Email } from "../Common/ValueObjects/EmailVO.model";
import { Username } from "../Common/ValueObjects/UsernameVO.model";
import { Name } from "../Common/ValueObjects/NameVO.model";
import { Entity } from "../../../../../SharedKernel/Entities/Entity.model";
import { EventBus } from "../../../../../SharedKernel/EventStreams/EventBus";
import { UserCreatedEvent } from "../Events/UserCreatedEvent.model";

// TODO: Should this be injected so our domain layer doesn't have a hard dependency on bcrypt?
const bcrypt = require('bcryptjs');

export class User extends Entity {
	private _username: Username;
	private _hashedPassword: string;
	private _firstName: Name;
	private _lastName: Name;
	private _email: Email;
	private _photoUrl: URL;
	private _isAdmin: boolean;

	constructor(
		id: string,
		username: string,
		password: string,
		firstName: string,
		lastName: string,
		email: string,
		photoUrl: string,
		isAdmin: boolean,
	) {
		super(id);
		this._username = new Username(username);
		this._firstName = new Name(firstName);
		this._hashedPassword = password;
		this._lastName = new Name(lastName);
		this._email = new Email(email);
		this._photoUrl = new URL(photoUrl);
		this._isAdmin = isAdmin;
	}

	get username() {
		return this._username.value;
	}

	get hashedPassword() {
		return this._hashedPassword;
	}

	get firstName() {
		return this._firstName.value;
	}

	get lastName() {
		return this._lastName.value;
	}

	get email() {
		return this._email.value;
	}

	get photoUrl() {
		return this._photoUrl;
	}

	get isAdmin() {
		return this._isAdmin;
	}

	static create(
		idGenerator: () => string,
		userData: IUserData,
		eventBus: EventBus,
	): User {

		// hash incoming password so the user instance never has the plain text pw stored.
		// Q: Should this be done in a service instead and passed in already hashed?
		const hashedPw = User.hashPassword(userData.password);

		const user = new User(
			idGenerator(),
			userData.username,
			hashedPw,
			userData.firstName,
			userData.lastName,
			userData.email,
			userData.photoUrl,
			false,
		);

		const userCreatedEvent = new UserCreatedEvent(user);
		eventBus.userCreatedEventStream.next(userCreatedEvent);

		return user;
	}

	private static hashPassword(password: string): string {
		const salt = bcrypt.genSaltSync(10);
		return bcrypt.hashSync(password, salt);
	}

	private validatePassword(password: string): boolean {
		return bcrypt.compareSync(password, this._hashedPassword);
	}

	changePassword(oldPassword: string, newPassword: string): boolean {
		if (!this.validatePassword(oldPassword)) {
			throw new Error(`You did not enter the correct current password for account under username: ${this._username}`);
		}

		this._hashedPassword = User.hashPassword(newPassword);
		return true;
	}
}
