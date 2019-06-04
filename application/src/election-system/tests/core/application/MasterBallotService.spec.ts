import 'mocha';
import * as chai from 'chai';
import * as faker from 'faker';
import chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;
const assert = chai.assert;

import {TestMasterBallotFactory} from "../domain/model/factories/TestMasterBallotFactory.model";
import {MockMasterBallotRepository} from "../../mocks/repositories/MockMasterBallotRepository.model";
import {MasterBallotService} from "../../../core/application/MasterBallot.service";
import {MasterBallotResponse} from "../../../core/application/models/output/MasterBallotResponse";
import {TestNewMasterBallotDataFactory} from "./factories/TestNewMasterBallotDataFactory.model";
import {TestVoterFactory} from "../domain/model/factories/TestVoterFactory.model";
import {TestUpdateMasterBallotDataFactory} from "./factories/TestUpdateMasterBallotDataFactory.model";
import {TestTokenFactory} from "../../../../shared-kernel/test-factories/TestTokenFactory.model";
import {ResourceNotFoundError} from "../../../../shared-kernel/exceptions/ResourceNotFoundError.model";

describe('test all service methods success paths', () => {
	it('should successfully retrieve a ballot by id', async () => {
	    const author = faker.internet.userName();
	    const token = TestTokenFactory.generateTokenForUsername(author);
		const masterBallot = TestMasterBallotFactory.createFullMasterBallot({ masterBallotParams: { author, }});
		const mockMasterBallotRepo = new MockMasterBallotRepository();
		await mockMasterBallotRepo.add(masterBallot);

		const masterBallotService = new MasterBallotService(mockMasterBallotRepo);

		const masterBallotResponse = await masterBallotService.getMasterBallot(masterBallot.id, token);

		expect(masterBallotResponse).instanceOf(MasterBallotResponse);
		expect(masterBallotResponse.title).to.equal(masterBallot.title);
		expect(masterBallotResponse.description).to.equal(masterBallot.description);
	});

	it('should successfully create a new ballot', async () => {
		const newMasterBallotData = TestNewMasterBallotDataFactory.createTestNewMasterBallotData();
		const mockMasterBallotRepo = new MockMasterBallotRepository();
		const voter = TestVoterFactory.createTestVoter();
		const token = TestTokenFactory.generateTokenForUserId(voter.id);

		const masterBallotService = new MasterBallotService(mockMasterBallotRepo);

		const masterBallotResponse = await masterBallotService.createMasterBallot(newMasterBallotData, token);

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

	it('should successfully delete an existing ballot.', async () => {
		const author = faker.internet.userName();
		const token = TestTokenFactory.generateTokenForUsername(author);
		const masterBallot = TestMasterBallotFactory.createFullMasterBallot({ masterBallotParams: { author, }});
		const mockMasterBallotRepo = new MockMasterBallotRepository();
		await mockMasterBallotRepo.add(masterBallot);

		const masterBallotService = new MasterBallotService(mockMasterBallotRepo);

		const response = await masterBallotService.deleteMasterBallot(masterBallot.id, token);

		await expect(masterBallotService.getMasterBallot(masterBallot.id, token)).to.be.rejectedWith(Error);
	});
});

describe('test all service methods failure paths', () => {
	it('should fail to retrieve master ballot if user is not author.', async () => {
		const masterBallot = TestMasterBallotFactory.createFullMasterBallot();
		const mockMasterBallotRepo = new MockMasterBallotRepository();
		await mockMasterBallotRepo.add(masterBallot);

		const masterBallotService = new MasterBallotService(mockMasterBallotRepo);

		const token = TestTokenFactory.generateRandomUserToken();

		await expect(masterBallotService.getMasterBallot(masterBallot.id, token)).to.be.rejectedWith(Error);
	});
});
