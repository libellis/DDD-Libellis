import { Entity } from "../../../../../shared-kernel/entities/Entity.model";
import { IBallotData } from "./abstractions/IBallotData";
import { Vote } from "./Vote.model";
import { Question } from "./value-objects/QuestionVO.model";
import { Score } from "../common/value-objects/ScoreVO.model";
import { BallotCastEvent } from "../events/BallotCastEvent.model";
import { EventBus } from "../../../../../shared-kernel/event-streams/EventBus";

export class Ballot extends Entity {

	constructor(
		id: string,
		public voterId: string,
		public _questions: Question[],
		private ballotCastEventBus: EventBus
	) {
		super(id);
	}

	// Factory method Must enforce following logic:
	// 1. Rank logic is correct, and not manipulated - This gets enforced by Question VO
	static cast(
		idGenerator: () => string,
		ballotCastEventBus: EventBus,
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
			ballotCastEventBus
		);

		// We push the ballot cast event to any interested parties
		const ballotCastEvent = new BallotCastEvent(ballot);
		ballotCastEventBus.ballotCastEventStream.next(ballotCastEvent);

		return ballot;
	}
}
