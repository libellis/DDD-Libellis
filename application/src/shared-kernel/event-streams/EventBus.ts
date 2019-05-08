import { Subject } from "rxjs";
import { BallotCastEvent } from "../../election-system/core/domain/model/events/BallotCastEvent.model";
import { UserCreatedEvent } from "../../user-management/core/domain/model/events/UserCreatedEvent.model";
import { UserUpdatedEvent } from "../../user-management/core/domain/model/events/UserUpdatedEvent.model";

// This should be instantiated as a Singleton and shared around.
export class EventBus {
	public ballotCastEventStream: Subject<BallotCastEvent>;
	public userCreatedEventStream: Subject<UserCreatedEvent>;
	public userUpdatedEventStream: Subject<UserUpdatedEvent>;

	constructor() {
		this.ballotCastEventStream = new Subject();
		this.userCreatedEventStream = new Subject();
		this.userUpdatedEventStream = new Subject();
	}
}
