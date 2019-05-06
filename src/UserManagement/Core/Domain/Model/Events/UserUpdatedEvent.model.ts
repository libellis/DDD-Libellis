import { IDomainEvent } from "../../../../../SharedKernel/Interfaces/IDomainEvent";
// Should this be injected instead?
import uuid = require("uuid/v4");
import { User } from "../UserAggregate/User.model";

export class UserUpdatedEvent implements IDomainEvent {
	public readonly eventOccurred: Date;
	public readonly id: string;

	constructor(
		public readonly user: User
	) {
		this.eventOccurred = new Date();
		this.id = uuid();
	}
}
