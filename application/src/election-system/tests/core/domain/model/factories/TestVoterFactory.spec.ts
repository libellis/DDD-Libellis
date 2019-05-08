import { expect } from 'chai';
import 'mocha';
import { TestVoterFactory } from "./TestVoterFactory.model";
import { Voter } from "../../../../../core/domain/model/voter-aggregate/Voter.model";


describe('Test TestVoterFactory create method', () => {
	it('should construct an instance of a Voter entity', () => {
		const voter = TestVoterFactory.createTestVoter();
		expect(voter).instanceOf(Voter);
	});
});
