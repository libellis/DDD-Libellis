import { IDomainEvent } from "../../../../../SharedKernel/Interfaces/IDomainEvent";
import { Ballot } from "../Aggregates/Ballot/Entities/Ballot.model";

// Should this be injected instead?
import uuid = require("uuid/v4");

export class BallotCreatedEvent implements IDomainEvent {
	public readonly eventOccurred: Date;
	public readonly id: string;

	constructor(
		public readonly ballot: Ballot
	) {
		this.eventOccurred = new Date();
		this.id = uuid();
	}
}
