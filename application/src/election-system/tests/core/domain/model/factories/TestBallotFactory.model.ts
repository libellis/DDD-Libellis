import { Ballot } from "../../../../../core/domain/model/ballot-aggregate/Ballot.model";
import * as faker from 'faker';
import { Election } from "../../../../../core/domain/model/election-aggregate/Election.model";
import { IBallotData } from "../../../../../core/domain/model/ballot-aggregate/abstractions/IBallotData";

export class TestBallotFactoryModel {

	// Should this be here or in the election test factory model?
	castBallot(election: Election, ballotData: IBallotData): Ballot {
		return election.castBallot(
			faker.random.uuid,
			ballotData
		);
	}
}
