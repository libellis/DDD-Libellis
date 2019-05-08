import { expect } from 'chai';
import 'mocha';
import {MockBallotRepository} from "./MockBallotRepository.model";
import {TestElectionFactory} from "../../core/domain/model/factories/TestElectionFactory.model";

describe('test all mock methods', () => {
	it('should store and retrieve a ballot', async () => {
		const { eventBus, ballot } = TestElectionFactory.createElectionAndCastBallot();

		const ballotRepository = new MockBallotRepository();
		await ballotRepository.add(ballot);
		const retrievedBallot = await ballotRepository.get(ballot.id);

		expect(retrievedBallot).to.eql(ballot);
	});

	it('get() should not return an entity that when directly mutated affects repository data', async () => {
		const { eventBus, ballot } = TestElectionFactory.createElectionAndCastBallot();

		const ballotRepository = new MockBallotRepository();
		await ballotRepository.add(ballot);
		const ballotToMutate = await ballotRepository.get(ballot.id);

		ballotToMutate.incrementVersion();

		const retrievedBallot = await ballotRepository.get(ballot.id);

		expect(retrievedBallot).to.eql(ballot);
		expect(retrievedBallot).to.not.eql(ballotToMutate);
	});

	it('getPaged() should not return entities that when directly mutated affects repository data', async () => {
		const { eventBus, ballots } = TestElectionFactory.createElectionAndCastBallots();

		const ballotRepository = new MockBallotRepository();
		await ballotRepository.addRange(ballots);
		const retrievedBallotsToMutate = await ballotRepository.getPagedResults(ballots.length, 1);

		const ballotToMutate = retrievedBallotsToMutate[0];
		ballotToMutate.incrementVersion();

		const retrievedBallots = await ballotRepository.getPagedResults(ballots.length, 1);

		expect(retrievedBallots).to.eql(ballots);
		expect(retrievedBallots).to.not.eql(retrievedBallotsToMutate);
	});

	it('should store a range of ballots', async () => {
		const { eventBus, ballots } = TestElectionFactory.createElectionAndCastBallots();

		const ballotRepository = new MockBallotRepository();
		await ballotRepository.addRange(ballots);
		const retrievedBallots = await ballotRepository.getPagedResults(ballots.length, 1);

		expect(retrievedBallots).to.eql(ballots);
	});

	it('can issue an update for a ballot after mutation', async () => {
		const { ballot } = TestElectionFactory.createElectionAndCastBallot();

		const ballotRepository = new MockBallotRepository();
		await ballotRepository.add(ballot);
		const retrievedBallotToMutate = await ballotRepository.get(ballot.id);

		retrievedBallotToMutate.incrementVersion();
		await ballotRepository.update(retrievedBallotToMutate);

		const retrievedBallot = await ballotRepository.get(ballot.id);

		expect(retrievedBallot).to.not.eql(ballot);
		expect(retrievedBallot).to.eql(retrievedBallotToMutate);
	});

	it('should remove a ballot successfully', async () => {
		const { eventBus, ballot } = TestElectionFactory.createElectionAndCastBallot();

		const ballotRepository = new MockBallotRepository();
		await ballotRepository.add(ballot);
		const retrievedBallot = await ballotRepository.get(ballot.id);

		expect(retrievedBallot).to.eql(ballot);

		await ballotRepository.remove(ballot.id);
		const attemptedRetrievedBallot = await ballotRepository.get(ballot.id);

		expect(attemptedRetrievedBallot).to.equal(undefined);
	});
});
