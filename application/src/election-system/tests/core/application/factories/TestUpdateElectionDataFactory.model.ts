import {UpdateElection} from "../../../../core/application/models/input/UpdateElection";
import * as faker from 'faker';

export class TestUpdateElectionDataFactory {
	static createUpdateElectionData(masterBallotId: string, token: string): UpdateElection {
		const start = faker.date.recent(1);
		const end = new Date(start.getTime() + faker.random.number({min: 86410000, max: 604800000}));
		const anonymous = faker.random.boolean();
		return { start, end, anonymous, masterBallotId, token };
	}

	static createUpdateElectionDataForRestricted(masterBallotId: string, permittedVoters: string[], token: string): UpdateElection {
		const start = faker.date.recent(1);
		const end = new Date(start.getTime() + faker.random.number({min: 86410000, max: 604800000}));
		const anonymous = faker.random.boolean();
		return { start, end, anonymous, masterBallotId, permittedVoters, token };
	}
}
