import { IUserData } from "./Abstractions/IUserData";
import { Email } from "../Common/ValueObjects/EmailVO.model";
import { Username } from "../Common/ValueObjects/UsernameVO.model";
import { Name } from "../Common/ValueObjects/NameVO.model";
import { Entity } from "../../../../../SharedKernel/Entities/Entity.model";

export class User extends Entity {
	constructor(
		id: string,
		public username: Username,
		public firstName: Name,
		public lastName: Name,
		public email: Email,
		public photoUrl: URL,
		public isAdmin: boolean,
	) {
		super(id);
	}

	// Admin user cannot be created.  An existing user can be turned into an admin user by another
	// admin user only.
	static create(
		idGenerator: () => string,
		userData: IUserData,
	): User {

		return new User(
			idGenerator(),
			new Username(userData.username),
			new Name(userData.firstName),
			new Name(userData.lastName),
			new Email(userData.email),
			new URL(userData.photoUrl),
			false
		);
	}
}
