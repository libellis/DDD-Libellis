import { expect } from 'chai';
import 'mocha';
import {MockBallotRepository} from "./MockBallotRepository.model";
import {TestElectionFactory} from "../../core/domain/model/factories/TestElectionFactory.model";
import {TestMasterBallotFactory} from "../../core/domain/model/factories/TestMasterBallotFactory.model";
import {TestVoterFactory} from "../../core/domain/model/factories/TestVoterFactory.model";
import {TestBallotDataFactory} from "../../core/domain/model/factories/TestBallotDataFactory.model";
import {EventBus} from "../../../../shared-kernel/event-streams/EventBus";

describe('test all mock methods', () => {
	it('should store and retrieve a ballot', async () => {
		const { eventBus, ballot } = TestElectionFactory.createElectionAndCastBallot();

		const ballotRepository = new MockBallotRepository();
		await ballotRepository.add(ballot);
		const retrievedBallot = await ballotRepository.get(ballot.id);

		expect(retrievedBallot).to.eql(ballot);
	});

	it('should store a range of ballots', async () => {
		const { eventBus, ballots } = TestElectionFactory.createElectionAndCastBallots();

		const ballotRepository = new MockBallotRepository();
		await ballotRepository.addRange(ballots);
		const retrievedBallots = await ballotRepository.getPagedResults(ballots.length, 1);

		expect(retrievedBallots).to.eql(ballots);
	});

	it('should remove a master ballot successfully', async () => {
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
