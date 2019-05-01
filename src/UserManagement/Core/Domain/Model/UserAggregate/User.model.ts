import { Entity } from "../Common/Entities/Entity.model";

export class User extends Entity {
	constructor(
		id: string,
		public username: string,
		public firstName: string,
		public lastName: string,
		public email: string,
		public photoUrl: string,
		public isAdmin: boolean,
	) {
		super(id);
	}
}
