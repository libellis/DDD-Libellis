import * as faker from 'faker';
import { Voter } from "../../../../../core/domain/model/voter-aggregate/Voter.model";

export class TestVoterFactory {
	static createTestVoter(): Voter {
		return Voter.create(faker.random.uuid);
	}

	static createRandomTestVoters(min: number, max: number) {
		let arr = Array(faker.random.number({min, max})).fill(0);
		return arr.map(e => {
			return this.createTestVoter();
		});
	}
}
