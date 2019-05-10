import 'mocha';
import * as chai from 'chai';
import chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;
const assert = chai.assert;

import {TestElectionFactory} from "../domain/model/factories/TestElectionFactory.model";
import {MockElectionRepository} from "../../mocks/repositories/MockElectionRepository.model";
import {ElectionService} from "../../../core/application/Election.service";
import {ElectionResponse} from "../../../core/application/models/output/ElectionResponse";
import {TestMasterBallotFactory} from "../domain/model/factories/TestMasterBallotFactory.model";
import {MockMasterBallotRepository} from "../../mocks/repositories/MockMasterBallotRepository.model";
import {EventBus} from "../../../../shared-kernel/event-streams/EventBus";
import {TestNewElectionDataFactory} from "./factories/TestNewElectionDataFactory.model";
import {TestUpdateElectionDataFactory} from "./factories/TestUpdateElectionDataFactory.model";


describe('test all service methods success paths', () => {
	it('should successfully retrieve a election by id', async () => {
	    const masterBallot = TestMasterBallotFactory.createFullMasterBallot();
		const election = TestElectionFactory.createElectionWithFactoryMethod(masterBallot);
		const mockElectionRepo = new MockElectionRepository();
		await mockElectionRepo.add(election);

		const electionService = new ElectionService(mockElectionRepo, new MockMasterBallotRepository(), new EventBus());
		const electionResponse = await electionService.getElection(election.id);

		expect(electionResponse.masterBallotId).to.equal(election.masterBallotId);
		expect(electionResponse.startDate).to.equal(election.startDate);
		expect(electionResponse).instanceOf(ElectionResponse);
	});

	it('should successfully retrieve a paged result of elections', async () => {
		const masterBallots = TestMasterBallotFactory.createMultipleMasterBallots();
		const elections = TestElectionFactory.createElectionsFromMasterBallots(masterBallots);
		const mockElectionRepo = new MockElectionRepository();
		await mockElectionRepo.addRange(elections);

		const electionService = new ElectionService(mockElectionRepo, new MockMasterBallotRepository(), new EventBus());

		const electionsResponse = await electionService.getElectionsPagedResults(elections.length, 1);

		expect(electionsResponse.length).to.equal(elections.length);
		expect(electionsResponse[0]).instanceOf(ElectionResponse);
	});

	it('should successfully create a new election', async () => {
		const masterBallot = TestMasterBallotFactory.createFullMasterBallot();
		const newElectionData = TestNewElectionDataFactory.createNewElectionData(masterBallot.id);
		const mockElectionRepo = new MockElectionRepository();

		const mockMasterBallotRepo = new MockMasterBallotRepository();
		await mockMasterBallotRepo.add(masterBallot);

		const electionService = new ElectionService(mockElectionRepo, mockMasterBallotRepo, new EventBus());

		const electionResponse = await electionService.createElection(newElectionData);

		expect(electionResponse).instanceOf(ElectionResponse);
		expect(electionResponse.masterBallotId).to.equal(newElectionData.masterBallotId);
		expect(electionResponse.startDate).to.equal(newElectionData.start);
		assert(electionResponse.id !== undefined, "Election should have been assigned an id during creation.")
		assert(electionResponse.tellerId !== undefined, "Election should have created a teller upon creation.")
	});

	it('should successfully update an existing election.', async () => {
		const masterBallot = TestMasterBallotFactory.createFullMasterBallot();
		const start = new Date(new Date().getTime() + 10000000);
		const end = new Date(start.getTime() + 10000000);
		const election = TestElectionFactory.createElectionWithFactoryMethod(masterBallot, {start, end});
		const mockElectionRepo = new MockElectionRepository();

		const mockMasterBallotRepo = new MockMasterBallotRepository();
		await mockMasterBallotRepo.add(masterBallot);

		await mockElectionRepo.add(election);

		const electionService = new ElectionService(mockElectionRepo, mockMasterBallotRepo, new EventBus());

		const electionUpdateData = TestUpdateElectionDataFactory.createUpdateElectionData(masterBallot.id);

		const electionResponse = await electionService.updateElection(election.id, electionUpdateData);

		expect(electionResponse).instanceOf(ElectionResponse);
		expect(electionResponse.startDate).to.equal(electionUpdateData.start);
		expect(electionResponse.endDate).to.not.equal(election.endDate);
	});

	it('should successfully delete an existing election.', async () => {
		const masterBallot = TestMasterBallotFactory.createFullMasterBallot();
		const election = TestElectionFactory.createElectionWithFactoryMethod(masterBallot);
		const mockElectionRepo = new MockElectionRepository();
		await mockElectionRepo.add(election);

		const electionService = new ElectionService(mockElectionRepo, new MockMasterBallotRepository(), new EventBus());

		const response = await electionService.removeElection(election.id);

		assert.isTrue(response);
		await expect(electionService.getElection(election.id)).to.be.rejectedWith(Error);
	});

	it('should successfully retrieve election results after an election has concluded.', async () => {
		const masterBallot = TestMasterBallotFactory.createFullMasterBallot();
		const start = new Date(new Date().getTime() - 10000000);
		const end = new Date();
		const election = TestElectionFactory.createElectionWithFactoryMethod(masterBallot, { start, end });
		const mockElectionRepo = new MockElectionRepository();
		await mockElectionRepo.add(election);

		const electionService = new ElectionService(mockElectionRepo, new MockMasterBallotRepository(), new EventBus());

		await expect(electionService.retrieveElectionResults(election.id)).to.not.be.rejectedWith(Error);
	});
});


