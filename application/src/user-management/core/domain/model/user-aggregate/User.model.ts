import { IUserData } from "./abstractions/IUserData";
import { Email } from "../common/value-objects/Email.model";
import { Username } from "../common/value-objects/Username.model";
import { Name } from "../common/value-objects/Name.model";
import { Entity } from "../../../../../shared-kernel/Entity.model";
import { EventBus } from "../../../../../shared-kernel/event-streams/EventBus";
import { UserCreatedEvent } from "../events/UserCreatedEvent.model";
import { UserUpdatedEvent } from "../events/UserUpdatedEvent.model";
import {IClonable} from "../../../../../shared-kernel/interfaces/IClonable";

// TODO: Should this be injected so our domain layer doesn't have a hard dependency on bcrypt?
const bcrypt = require('bcryptjs');

export class User extends Entity implements IClonable<User> {
	private _username: Username;
	private _hashedPassword: string;
	private _firstName: Name;
	private _lastName: Name;
	private _email: Email;
	private _photoUrl: URL;
	private _isAdmin: boolean;
	private _eventBus: EventBus;

	constructor(
		id: string,
		username: string,
		password: string,
		firstName: string,
		lastName: string,
		email: string,
		photoUrl: string,
		isAdmin: boolean,
		eventBus: EventBus,
	) {
		super(id);
		this._username = new Username(username);
		this._firstName = new Name(firstName);
		this._hashedPassword = password;
		this._lastName = new Name(lastName);
		this._email = new Email(email);
		this._photoUrl = new URL(photoUrl);
		this._isAdmin = isAdmin;
		this._eventBus = eventBus;
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
		return this._photoUrl.href;
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
			eventBus,
		);

		const userCreatedEvent = new UserCreatedEvent(user);
		eventBus.userCreatedEventStream.next(userCreatedEvent);

		return user;
	}

	private static hashPassword(password: string): string {
		const salt = bcrypt.genSaltSync(10);
		return bcrypt.hashSync(password, salt);
	}

	private validatePassword(password: string) {
		if (!bcrypt.compareSync(password, this._hashedPassword)) {
			throw new Error(`You did not enter the correct current password for account under username: ${this._username}`);
		}
	}

	changePassword(oldPassword: string, newPassword: string): boolean {
		this.validatePassword(oldPassword);
		this._hashedPassword = User.hashPassword(newPassword);

		const userUpdatedEvent = new UserUpdatedEvent(this);
		this._eventBus.userUpdatedEventStream.next(userUpdatedEvent);
		return true;
	}


	// TODO: Finish this - also see next todo.
	// TODO: Might be good to move this out to a service layer.
	changeAccountDetails(currentPassword: string, changeSet: UserChangeSet) {
		this.validatePassword(currentPassword);

		let userData: IUserData = {
			username: this.username,
			password: this.hashedPassword,
			email: this.email,
			firstName: this.firstName,
			lastName: this.lastName,
			photoUrl: this.photoUrl,
		}
	}

	clone(): User {
		const user = new User(
			this.id,
			this.username,
			this.hashedPassword,
			this.firstName,
			this.lastName,
			this.email,
			this.photoUrl,
			this.isAdmin,
			this._eventBus
		);

		while (user.version !== this.version) {
			user.incrementVersion();
		}

		return user;
	}
}

interface UserChangeSet {
	firstName?: string,
	lastName?: string,
	password?: string,
	email?: string,
	photoUrl?: string,
}
