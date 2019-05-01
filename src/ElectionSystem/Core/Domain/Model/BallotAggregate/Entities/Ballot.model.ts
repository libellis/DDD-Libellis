import { Entity } from "../../Common/Entities/Entity.model";
import { IBallotData } from "../Abstractions/IBallotData";
import { Vote } from "./Vote.model";
import { QuestionVO } from "../ValueObjects/QuestionVO.model";
import { ScoreVO } from "../../Common/ValueObjects/ScoreVO.model";
import { BallotCastEvent } from "../../Events/BallotCastEvent.model";
import { BallotCastEventBus } from "../../../../../../SharedKernel/EventStreams/BallotCastEventBus";

export class Ballot extends Entity {

	constructor(
		id: string,
		public voterId: string,
		public _questions: QuestionVO[],
		private ballotCastEventBus: BallotCastEventBus
	) {
		super(id);
	}

	// Factory method Must enforce following logic:
	// 1. Rank logic is correct, and not manipulated - This gets enforced by QuestionVO
	static cast(
		idGenerator: () => string,
		ballotCastEventBus: BallotCastEventBus,
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
							new ScoreVO(cData.score)
						);
					});

				return new QuestionVO(
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
		ballotCastEventBus.stream.next(ballotCastEvent);

		return ballot;
	}
}
