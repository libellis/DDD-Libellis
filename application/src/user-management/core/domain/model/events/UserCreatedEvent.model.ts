import { IDomainEvent } from "../../../../../shared-kernel/interfaces/IDomainEvent";
// Should this be injected instead?
import uuid = require("uuid/v4");
import { User } from "../user-aggregate/User.model";

export class UserCreatedEvent implements IDomainEvent {
	public readonly eventOccurred: Date;
	public readonly id: string;

	constructor(
		public readonly user: User
	) {
		this.eventOccurred = new Date();
		this.id = uuid();
	}
}
