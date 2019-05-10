import {NewElection} from "../../../../core/application/models/input/NewElection";
import * as faker from 'faker';

export class TestNewElectionDataFactory {
	static createNewElectionData(masterBallotId: string): NewElection {
		const start = faker.date.recent(1);
		const end = new Date(start.getTime() + faker.random.number({min: 86410000, max: 604800000}));
		const anonymous = faker.random.boolean();
		return { start, end, anonymous, masterBallotId };
	}

	static createNewElectionDataForRestricted(masterBallotId: string, permittedVoters: string[]): NewElection {
		const start = faker.date.recent(1);
		const end = new Date(start.getTime() + faker.random.number({min: 86410000, max: 604800000}));
		const anonymous = faker.random.boolean();
		return { start, end, anonymous, masterBallotId, permittedVoters };
	}
}
