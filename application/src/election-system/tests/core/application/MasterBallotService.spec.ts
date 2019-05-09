import { expect, assert } from 'chai';
import 'mocha';
import {TestMasterBallotFactory} from "../domain/model/factories/TestMasterBallotFactory.model";
import {MockMasterBallotRepository} from "../../mocks/repositories/MockMasterBallotRepository.model";
import {MasterBallotService} from "../../../core/application/MasterBallot.service";
import {MasterBallotResponse} from "../../../core/application/models/output/MasterBallotResponse";
import {TestNewMasterBallotDataFactory} from "./factories/TestNewMasterBallotDataFactory.model";
import {MockVoterRepository} from "../../mocks/repositories/MockVoterRepository.model";
import {TestVoterFactory} from "../domain/model/factories/TestVoterFactory.model";
import {TestUpdateMasterBallotDataFactory} from "./factories/TestUpdateMasterBallotDataFactory.model";

describe('test all service methods success paths', () => {
	it('should successfully retrieve a ballot by id', async () => {
		const masterBallot = TestMasterBallotFactory.createFullMasterBallot();
		const mockMasterBallotRepo = new MockMasterBallotRepository();
		await mockMasterBallotRepo.add(masterBallot);

		const masterBallotService = new MasterBallotService(mockMasterBallotRepo);

		const masterBallotResponse = await masterBallotService.getMasterBallot(masterBallot.id);

		expect(masterBallotResponse).instanceOf(MasterBallotResponse);
		expect(masterBallotResponse.title).to.equal(masterBallot.title);
		expect(masterBallotResponse.description).to.equal(masterBallot.description);
	});

	it('should successfully retrieve a paged result of ballots', async () => {
		const masterBallots = TestMasterBallotFactory.createMultipleMasterBallots();
		const mockMasterBallotRepo = new MockMasterBallotRepository();
		await mockMasterBallotRepo.addRange(masterBallots);

		const masterBallotService = new MasterBallotService(mockMasterBallotRepo);

		const masterBallotsResponse = await masterBallotService.getMasterBallotsPagedResults(masterBallots.length, 1);

		expect(masterBallotsResponse.length).to.equal(masterBallots.length);
		expect(masterBallotsResponse[0]).instanceOf(MasterBallotResponse);
	});

	it('should successfully create a new ballot', async () => {
		const newMasterBallotData = TestNewMasterBallotDataFactory.createTestNewMasterBallotData();
		const mockMasterBallotRepo = new MockMasterBallotRepository();
		const voter = TestVoterFactory.createTestVoter();

		const masterBallotService = new MasterBallotService(mockMasterBallotRepo);

		const masterBallotResponse = await masterBallotService.createMasterBallot(newMasterBallotData, voter.id);

		expect(masterBallotResponse).instanceOf(MasterBallotResponse);
		expect(masterBallotResponse.title).to.equal(newMasterBallotData.title);
		assert(masterBallotResponse.id !== undefined, "Master Ballot should have been assigned an id during creation.")
	});

	it('should successfully update an existing ballot.', async () => {
		const masterBallot = TestMasterBallotFactory.createFullMasterBallot();
		const mockMasterBallotRepo = new MockMasterBallotRepository();
		await mockMasterBallotRepo.add(masterBallot);

		const masterBallotService = new MasterBallotService(mockMasterBallotRepo);

		const masterBallotUpdateData = TestUpdateMasterBallotDataFactory.createTestUpdateMasterBallotData(masterBallot);

		const masterBallotResponse = await masterBallotService.updateMasterBallot(masterBallot.id, masterBallotUpdateData);

		expect(masterBallotResponse).instanceOf(MasterBallotResponse);
		expect(masterBallotResponse.title).to.equal(masterBallotUpdateData.title);
		expect(masterBallotResponse.title).to.not.equal(masterBallot.title);
	});

	// it('should successfully delete an existing ballot.', async () => {
	// 	const author = TestVoterFactory.createTestVoter();
	// 	const masterBallot = TestMasterBallotFactory.createFullMasterBallot({ masterBallotParams: { author: author.id }});
	// 	const mockMasterBallotRepo = new MockMasterBallotRepository();
	// 	await mockMasterBallotRepo.add(masterBallot);
	//
	// 	const masterBallotService = new MasterBallotService(mockMasterBallotRepo);
	//
	// 	assert.isTrue((await masterBallotService.deleteMasterBallot(masterBallot.id, author.id)));
	//
	// 	await expect(async () => masterBallotService.getMasterBallot(masterBallot.id)).to.throw();
	// });
});


