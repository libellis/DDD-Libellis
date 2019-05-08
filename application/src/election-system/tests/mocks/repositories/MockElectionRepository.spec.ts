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
		const retrievedElection = await electionRepository.get(election.id);

		expect(retrievedElection).to.eql(election);
	});

	it('get() should not return an entity that when mutated changes data in repository', async () => {
		const masterBallot = TestMasterBallotFactory.createFullMasterBallot();
		const election = TestElectionFactory.createElectionWithFactoryMethod(masterBallot);

		const electionRepository = new MockElectionRepository();
		await electionRepository.add(election);
		const ballotToMutate = await electionRepository.get(election.id);

		ballotToMutate.incrementVersion();
		const retrievedElection = await electionRepository.get(election.id);

		expect(retrievedElection).to.eql(election);
		expect(ballotToMutate).to.not.eql(retrievedElection);
	});

	it('getPaged() should not return entities that when mutated changes data in repository', async () => {
		const masterBallots = TestMasterBallotFactory.createMultipleMasterBallots();
		const elections = TestElectionFactory.createElectionsFromMasterBallots(masterBallots);

		const electionRepository = new MockElectionRepository();
		await electionRepository.addRange(elections);
		const retrievedElectionsToMutate = await electionRepository.getPagedResults(elections.length, 1);

		const electionToMutate = retrievedElectionsToMutate[0];
		electionToMutate.incrementVersion();

		const retrievedElections = await electionRepository.getPagedResults(elections.length, 1);

		expect(retrievedElections).to.eql(elections);
		expect(retrievedElections).to.not.eql(retrievedElectionsToMutate);
	});

	it('should store a range of elections', async () => {
		const masterBallots = TestMasterBallotFactory.createMultipleMasterBallots();
		const elections = TestElectionFactory.createElectionsFromMasterBallots(masterBallots);

		const electionRepository = new MockElectionRepository();
		await electionRepository.addRange(elections);
		const retrievedElections = await electionRepository.getPagedResults(elections.length, 1);

		expect(retrievedElections).to.eql(elections);
	});

	it('should remove an election successfully', async () => {
		const masterBallot = TestMasterBallotFactory.createFullMasterBallot();
		const election = TestElectionFactory.createElectionWithFactoryMethod(masterBallot);

		const electionRepository = new MockElectionRepository();
		await electionRepository.add(election);
		const retrievedElection = await electionRepository.get(election.id);

		expect(retrievedElection).to.eql(election);

		await electionRepository.remove(election.id);
		const attemptedRetrievedBallot = await electionRepository.get(election.id);

		expect(attemptedRetrievedBallot).to.equal(undefined);
	});
});
