import { Ballot } from "../../../../../Core/Domain/Model/Aggregates/Ballot/Entities/Ballot.model";
import * as faker from 'faker';
import { Election } from "../../../../../Core/Domain/Model/Aggregates/Election/Entities/Election.model";
import { IBallotData } from "../../../../../Core/Domain/Model/Aggregates/Ballot/Abstractions/IBallotData";

export class TestBallotFactoryModel {

	// Should this be here or in the election test factory model?
	castBallot(election: Election, ballotData: IBallotData): Ballot {
		return election.castBallot(
			faker.random.uuid,
			ballotData
		);
	}
}
