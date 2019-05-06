import { Subject } from "rxjs";
import { BallotCastEvent } from "../../ElectionSystem/Core/Domain/Model/Events/BallotCastEvent.model";
import { UserCreatedEvent } from "../../UserManagement/Core/Domain/Model/Events/UserCreatedEvent.model";
import { UserUpdatedEvent } from "../../UserManagement/Core/Domain/Model/Events/UserUpdatedEvent.model";

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
