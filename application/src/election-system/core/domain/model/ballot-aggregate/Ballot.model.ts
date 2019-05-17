import { Entity } from "../../../../../shared-kernel/Entity.model";
import { IBallotData } from "./abstractions/IBallotData";
import { Vote } from "./Vote.model";
import { Question } from "./value-objects/QuestionVO.model";
import { Score } from "../common/value-objects/Score.model";
import { BallotCastEvent } from "../events/BallotCastEvent.model";
import { EventBus } from "../../../../../shared-kernel/event-streams/EventBus";
import {IClonable} from "../../../../../shared-kernel/interfaces/IClonable";

export class Ballot extends Entity implements IClonable<Ballot> {

	constructor(
		id: string,
		public voterId: string,
		public _questions: Question[],
		private eventBus: EventBus
	) {
		super(id);
	}

	// Factory method Must enforce following logic:
	// 1. Rank logic is correct, and not manipulated - This gets enforced by Question VO
	static cast(
		idGenerator: () => string,
		eventBus: EventBus,
		sData: IBallotData
		): Ballot {

		// We push our questions voteData through score and
		// question value objects to automatically hit their validation
		// systems for invariance enforcement.
		const questions = sData
			.voteData
			.questionsData
			.map(qData => {
				const choices = qData
					.choicesData
					.map(cData => {
						return new Vote(
							idGenerator(),
							qData.qId,
							cData.cId,
							new Score(cData.score)
						);
					});

				return new Question(
					qData.qId,
					choices,
				);
			});

		let ballot = new Ballot(
			idGenerator(),
			sData.voterId,
			questions,
			eventBus
		);

		// We push the ballot cast event to any interested parties
		const ballotCastEvent = new BallotCastEvent(ballot);
		eventBus.ballotCastEventStream.next(ballotCastEvent);

		return ballot;
	}

	// Generates a new cloned instance of the entity
	// Note: _questions is simply an array of value objects, which
	// are immutable so we can pass them without deep cloning them.
	clone(): Ballot {
		const ballot = new Ballot(
			this.id,
			this.voterId,
			this._questions,
			this.eventBus,
		);

		while (ballot.version !== this.version) {
			ballot.incrementVersion();
		}

		return ballot;
	}
}
