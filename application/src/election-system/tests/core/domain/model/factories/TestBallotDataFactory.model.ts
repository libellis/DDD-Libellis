import { IBallotData } from "../../../../../core/Domain/Model/BallotAggregate/Abstractions/IBallotData";
import { MasterBallot } from "../../../../../core/Domain/Model/MasterBallotAggregate/MasterBallot.model";
import { Voter } from "../../../../../core/Domain/Model/VoterAggregate/Voter.model";

export class TestBallotDataFactory {
	static createTestBallot(voterId: string, masterBallot: MasterBallot): IBallotData {
		let ballotData: IBallotData = {
			voterId: voterId,
			masterBallotId: masterBallot.id,
			voteData: {
				questionsData: masterBallot.questions
					.map(q => {
						return {
							qId: q.id,
							choicesData: q.choices
								.map((c, j) => {
									return {
										cId: c.id,
										score: j,
									}
								})
						}
					})
			}
		};

		return ballotData;
	}

	static createTestBallotsFromVotersList(voters: Voter[], masterBallot): IBallotData[] {
		return voters
			.map(
				voter => {
					return this.createTestBallot(voter.id, masterBallot)
				}
			);
	}
}
