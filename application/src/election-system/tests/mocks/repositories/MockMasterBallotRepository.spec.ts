import { expect, assert } from 'chai';
import 'mocha';
import * as faker from 'faker';
import {TestMasterBallotFactory} from "../../core/domain/model/factories/TestMasterBallotFactory.model";
import {MockMasterBallotRepository} from "./MockMasterBallotRepository.model";

describe('test all mock methods', () => {
	it('should store and retrieve a master ballot', async () => {
		const masterBallot = TestMasterBallotFactory.createFullMasterBallot();
		const masterBallotRepository = new MockMasterBallotRepository();
		await masterBallotRepository.add(masterBallot);
		const retrievedBallot = await masterBallotRepository.get(masterBallot.id);

		expect(retrievedBallot).to.eql(masterBallot);
	});

	it('should store a range of master ballots', async () => {
		const masterBallots = TestMasterBallotFactory.createMultipleMasterBallots();
		const masterBallotRepository = new MockMasterBallotRepository();
		await masterBallotRepository.addRange(masterBallots);
		const retrievedBallots = await masterBallotRepository.getPagedResults(masterBallots.length, 1);

		expect(retrievedBallots).to.eql(masterBallots);
	});

	it('should remove a master ballot successfully', async () => {
		const masterBallot = TestMasterBallotFactory.createFullMasterBallot();
		const masterBallotRepository = new MockMasterBallotRepository();
		await masterBallotRepository.add(masterBallot);
		const retrievedBallot = await masterBallotRepository.get(masterBallot.id);

		expect(retrievedBallot).to.eql(masterBallot);

		await masterBallotRepository.remove(masterBallot.id);
		const attemptedRetrievedBallot = await masterBallotRepository.get(masterBallot.id);

		expect(attemptedRetrievedBallot).to.equal(undefined);
	});
});
