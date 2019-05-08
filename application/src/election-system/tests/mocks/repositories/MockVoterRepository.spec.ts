import { expect } from 'chai';
import 'mocha';
import {MockVoterRepository} from "./MockVoterRepository.model";
import {TestVoterFactory} from "../../core/domain/model/factories/TestVoterFactory.model";

describe('test all mock methods', () => {
	it('should store and retrieve a voter', async () => {
		const voter = TestVoterFactory.createTestVoter();

		const voterRepository = new MockVoterRepository();
		await voterRepository.add(voter);
		const retrievedVoter = await voterRepository.get(voter.id);

		expect(retrievedVoter).to.eql(voter);
	});

	it('get() should not return an entity that when directly mutated affects repository data', async () => {
		const voter = TestVoterFactory.createTestVoter();

		const voterRepository = new MockVoterRepository();
		await voterRepository.add(voter);
		const voterToMutate = await voterRepository.get(voter.id);

		voterToMutate.incrementVersion();

		const retrievedVoter = await voterRepository.get(voter.id);

		expect(retrievedVoter).to.eql(voter);
		expect(retrievedVoter).to.not.eql(voterToMutate);
	});

	it('getPaged() should not return entities that when directly mutated affects repository data', async () => {
		const voters = TestVoterFactory.createRandomTestVoters(2, 12);

		const voterRepository = new MockVoterRepository();
		await voterRepository.addRange(voters);
		const retrievedVotersToMutate = await voterRepository.getPagedResults(voters.length, 1);

		const voterToMutate = retrievedVotersToMutate[0];
		voterToMutate.incrementVersion();

		const retrievedVoters = await voterRepository.getPagedResults(voters.length, 1);

		expect(retrievedVoters).to.eql(voters);
		expect(retrievedVoters).to.not.eql(retrievedVotersToMutate);
	});

	it('should store a range of voters', async () => {
		const voters = TestVoterFactory.createRandomTestVoters(2, 12);

		const voterRepository = new MockVoterRepository();
		await voterRepository.addRange(voters);
		const retrievedVoters = await voterRepository.getPagedResults(voters.length, 1);

		expect(retrievedVoters).to.eql(voters);
	});

	it('can issue an update for a voter after mutation', async () => {
		const voter = TestVoterFactory.createTestVoter();

		const voterRepository = new MockVoterRepository();
		await voterRepository.add(voter);
		const retrievedVoterToMutate = await voterRepository.get(voter.id);

		retrievedVoterToMutate.incrementVersion();
		await voterRepository.update(retrievedVoterToMutate);

		const retrievedVoter = await voterRepository.get(voter.id);

		expect(retrievedVoter).to.not.eql(voter);
		expect(retrievedVoter).to.eql(retrievedVoterToMutate);
	});

	it('should remove a voter successfully', async () => {
		const voter = TestVoterFactory.createTestVoter();

		const voterRepository = new MockVoterRepository();
		await voterRepository.add(voter);
		const retrievedVoter = await voterRepository.get(voter.id);

		expect(retrievedVoter).to.eql(voter);

		await voterRepository.remove(voter.id);
		const attemptedRetrievedVoter = await voterRepository.get(voter.id);

		expect(attemptedRetrievedVoter).to.equal(undefined);
	});
});
