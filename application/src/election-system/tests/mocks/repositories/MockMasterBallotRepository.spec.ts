import { expect } from 'chai';
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

	it('get() should not allow entity mutation to affect repository data', async () => {
		const masterBallot = TestMasterBallotFactory.createFullMasterBallot();
		const masterBallotRepository = new MockMasterBallotRepository();
		await masterBallotRepository.add(masterBallot);
		const masterBallotToMutate = await masterBallotRepository.get(masterBallot.id);

		masterBallotToMutate.incrementVersion();

		const retrievedMasterBallot = await masterBallotRepository.get(masterBallot.id);

		expect(retrievedMasterBallot).to.eql(masterBallot);
		expect(retrievedMasterBallot).to.not.eql(masterBallotToMutate);
	});

	it('getPaged() should not return entities, that when mutated directly affect repository data', async () => {
		const masterBallots = TestMasterBallotFactory.createMultipleMasterBallots();
		const masterBallotRepository = new MockMasterBallotRepository();
		await masterBallotRepository.addRange(masterBallots);
		const retrievedMasterBallotsToMutate = await masterBallotRepository.getPagedResults(masterBallots.length, 1);
		const masterBallotToMutate = retrievedMasterBallotsToMutate[0];

		masterBallotToMutate.incrementVersion();
		const retrievedBallots = await masterBallotRepository.getPagedResults(masterBallots.length, 1);

		expect(retrievedBallots).to.eql(masterBallots);
		expect(retrievedBallots).to.not.eql(masterBallotToMutate);
	});

	it('should store a range of master ballots', async () => {
		const masterBallots = TestMasterBallotFactory.createMultipleMasterBallots();
		const masterBallotRepository = new MockMasterBallotRepository();
		await masterBallotRepository.addRange(masterBallots);
		const retrievedBallots = await masterBallotRepository.getPagedResults(masterBallots.length, 1);

		expect(retrievedBallots).to.eql(masterBallots);
	});

	it('update should persist mutated ballot', async () => {
		const masterBallot = TestMasterBallotFactory.createFullMasterBallot();
		const masterBallotRepository = new MockMasterBallotRepository();
		await masterBallotRepository.add(masterBallot);
		const masterBallotToMutate = await masterBallotRepository.get(masterBallot.id);

		masterBallotToMutate.incrementVersion();
		await masterBallotRepository.update(masterBallotToMutate);

		const retrievedMasterBallot = await masterBallotRepository.get(masterBallot.id);

		expect(retrievedMasterBallot).to.not.eql(masterBallot);
		expect(retrievedMasterBallot).to.eql(masterBallotToMutate);
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
