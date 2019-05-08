import { expect } from 'chai';
import 'mocha';
import { TestElectionFactory } from "../../core/domain/model/factories/TestElectionFactory.model";
import {MockElectionRepository} from "./MockElectionRepository.model";
import {TestMasterBallotFactory} from "../../core/domain/model/factories/TestMasterBallotFactory.model";

describe('test all mock methods', () => {
	it('should store and retrieve a election', async () => {
		const masterBallot = TestMasterBallotFactory.createFullMasterBallot();
		const election = TestElectionFactory.createElectionWithFactoryMethod(masterBallot);

		const electionRepository = new MockElectionRepository();
		await electionRepository.add(election);
		const retrievedBallot = await electionRepository.get(election.id);

		expect(retrievedBallot).to.eql(election);
	});

	it('should not allow mutations to change data in repository', async () => {
		const masterBallot = TestMasterBallotFactory.createFullMasterBallot();
		const election = TestElectionFactory.createElectionWithFactoryMethod(masterBallot);

		const electionRepository = new MockElectionRepository();
		await electionRepository.add(election);
		const ballotToMutate = await electionRepository.get(election.id);

		ballotToMutate.incrementVersion();
		const retrievedBallot = await electionRepository.get(election.id);

		expect(retrievedBallot).to.eql(election);
		expect(ballotToMutate).to.not.eql(retrievedBallot);
	});

	it('should store a range of elections', async () => {
		const masterBallots = TestMasterBallotFactory.createMultipleMasterBallots();
		const elections = TestElectionFactory.createElectionsFromMasterBallots(masterBallots);

		const electionRepository = new MockElectionRepository();
		await electionRepository.addRange(elections);
		const retrievedBallots = await electionRepository.getPagedResults(elections.length, 1);

		expect(retrievedBallots).to.eql(elections);
	});

	it('should remove an election successfully', async () => {
		const masterBallot = TestMasterBallotFactory.createFullMasterBallot();
		const election = TestElectionFactory.createElectionWithFactoryMethod(masterBallot);

		const electionRepository = new MockElectionRepository();
		await electionRepository.add(election);
		const retrievedBallot = await electionRepository.get(election.id);

		expect(retrievedBallot).to.eql(election);

		await electionRepository.remove(election.id);
		const attemptedRetrievedBallot = await electionRepository.get(election.id);

		expect(attemptedRetrievedBallot).to.equal(undefined);
	});
});
