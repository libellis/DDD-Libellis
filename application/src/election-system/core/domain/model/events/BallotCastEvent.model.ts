import { IDomainEvent } from "../../../../../SharedKernel/Interfaces/IDomainEvent";
import { Ballot } from "../ballot-aggregate/Ballot.model";

// Should this be injected instead?
import uuid = require("uuid/v4");

export class BallotCastEvent implements IDomainEvent {
	public readonly eventOccurred: Date;
	public readonly id: string;

	constructor(
		public readonly ballot: Ballot
	) {
		this.eventOccurred = new Date();
		this.id = uuid();
	}
}
