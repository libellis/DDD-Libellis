import { Subject } from "rxjs";
import { BallotCastEvent } from "../../ElectionSystem/Core/Domain/Model/Events/BallotCastEvent.model";

// This should be instantiated as a Singleton and shared around.
export class BallotCastEventBus {
	public stream: Subject<BallotCastEvent>;
	constructor() {
		this.stream = new Subject();
	}
}
