import { Subject } from "rxjs";
import { BallotCastEvent } from "../../ElectionSystem/Core/Domain/Model/Events/BallotCastEvent.model";

// This should be instantiated as a Singleton and shared around.
export class EventBus {
	public ballotCastEventStream: Subject<BallotCastEvent>;
	constructor() {
		this.ballotCastEventStream = new Subject();
	}
}
