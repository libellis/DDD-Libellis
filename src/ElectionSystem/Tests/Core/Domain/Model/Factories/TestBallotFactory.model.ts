import { Ballot } from "../../../../../Core/Domain/Model/BallotAggregate/Ballot.model";
import * as faker from 'faker';
import { Election } from "../../../../../Core/Domain/Model/ElectionAggregate/Election.model";
import { IBallotData } from "../../../../../Core/Domain/Model/BallotAggregate/Abstractions/IBallotData";

export class TestBallotFactoryModel {

	// Should this be here or in the election test factory model?
	castBallot(election: Election, ballotData: IBallotData): Ballot {
		return election.castBallot(
			faker.random.uuid,
			ballotData
		);
	}
}
