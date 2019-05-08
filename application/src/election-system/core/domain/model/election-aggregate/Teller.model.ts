import { Entity } from "../../../../../shared-kernel/entities/Entity.model";
import { EventBus } from "../../../../../shared-kernel/event-streams/EventBus";
import { Tally } from "../common/value-objects/TallyVO.model";
import { Ballot } from "../ballot-aggregate/Ballot.model";
import {IClonable} from "../../../../../shared-kernel/interfaces/IClonable";

// This is part of the election aggregate because the Election is the only entity that knows about the timespan that an
// election is valid in (electionPeriod) and therefore must enforce when the final results can be retrieved.  Otherwise
// someone could access the teller directly before the election is over.
// Also, deleting an election facilitates deleting the teller associated with that election
export class Teller extends Entity implements IClonable<Teller> {
	private _voteTally: {[choiceId: string]: Tally};
	private _choiceIds: Set<string>;

	constructor(
		id: string,
		choiceIds: Set<string>,
		private _ballotCastEventBus: EventBus,
	) {
		super(id);
		this._voteTally = Teller.mapSetValuesToKeys(choiceIds);
		this._choiceIds = choiceIds;
	}

	private static mapSetValuesToKeys(choiceIds: Set<string>): {[key: string]: Tally} {
		const dict = {};
		choiceIds.forEach(c => {
			dict[c] = new Tally(0);
		});
		return dict;
	}

	// This should be started from aggregate root where electionPeriod is enforced.
	// Might need to do some concurrency testing with this.
	beginCounting() {
		this._ballotCastEventBus.ballotCastEventStream.subscribe(
			ballotCastEvent => {
				this.countBallots(ballotCastEvent.ballot);
			}
		);
	}

	countBallots(ballot: Ballot) {
		for (const question of ballot._questions) {
			for (const vote of question.votes) {
				this._voteTally[vote.choiceId] = this._voteTally[vote.choiceId]
						.incrementTally(vote.score);
			}
		}
	}

	get results() {
		return this._voteTally;
	}

	clone(): Teller {
		return new Teller(this.id, new Set(this._choiceIds), this._ballotCastEventBus);
	}
}
