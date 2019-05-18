import { IBallotData } from "../../../../../core/domain/model/ballot-aggregate/abstractions/IBallotData";
import { MasterBallot } from "../../../../../core/domain/model/master-ballot-aggregate/MasterBallot.model";
import { Voter } from "../../../../../core/domain/model/voter-aggregate/Voter.model";

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

	static createTestBallotsFromVotersList(voters: Voter[], masterBallot: MasterBallot): IBallotData[] {
		return voters
			.map(
				voter => {
					return this.createTestBallot(voter.id, masterBallot)
				}
			);
	}
}
