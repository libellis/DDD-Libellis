import { expect, assert } from 'chai';
import 'mocha';
import * as faker from 'faker';
import { TestElectionFactory } from "../factories/TestElectionFactory.model";
import { TestMasterBallotFactory } from "../factories/TestMasterBallotFactory.model";
import { TestVoterFactory } from "../factories/TestVoterFactory.model";
import { TestBallotDataFactory } from "../factories/TestBallotDataFactory.model";

describe('test invariance enforcement by root', () => {
	it('should not allow a voter to cast a ballot twice', () => {
		const masterBallot = TestMasterBallotFactory.createFullMasterBallot();

		const start = new Date();
		const end = new Date((new Date()).getTime() + 30);
		const election = TestElectionFactory.createElectionWithFactoryMethod(masterBallot, { start, end });

		const fakeVoter = TestVoterFactory.createTestVoter();
		const ballotData = TestBallotDataFactory.createTestBallot(fakeVoter.id, masterBallot);

		election.castBallot(faker.random.uuid, ballotData);

		// simulating the same voter creating a different ballot, but with the same voterId
		const secondBallotData = TestBallotDataFactory.createTestBallot(fakeVoter.id, masterBallot);

		expect(() => { election.castBallot(faker.random.uuid, secondBallotData) }).to.throw();
	});

	it('should not allow a voter to cast a ballot with duplicate questions', () => {
		const masterBallot = TestMasterBallotFactory.createFullMasterBallot();

		const start = new Date();
		const end = new Date((new Date()).getTime() + 30);
		const election = TestElectionFactory.createElectionWithFactoryMethod(masterBallot, { start, end });

		const fakeVoter = TestVoterFactory.createTestVoter();
		const ballotData = TestBallotDataFactory.createTestBallot(fakeVoter.id, masterBallot);
		const questionCopy = { ...ballotData.voteData.questionsData[0] };

		ballotData.voteData.questionsData.push(questionCopy);

		expect(() => { election.castBallot(faker.random.uuid, ballotData) }).to.throw();
	});

	it('should not allow a voter to cast a ballot with duplicate choices', () => {
		const masterBallot = TestMasterBallotFactory.createFullMasterBallot();

		const start = new Date();
		const end = new Date((new Date()).getTime() + 30);
		const election = TestElectionFactory.createElectionWithFactoryMethod(masterBallot, { start, end });

		const fakeVoter = TestVoterFactory.createTestVoter();
		const ballotData = TestBallotDataFactory.createTestBallot(fakeVoter.id, masterBallot);
		const choiceCopy = { ...ballotData.voteData.questionsData[0].choicesData[0] };

		// mutate question to hold duplicates of the choice
		ballotData.voteData.questionsData[0].choicesData.push(choiceCopy);

		expect(() => { election.castBallot(faker.random.uuid, ballotData) }).to.throw();
	});

	it('should not allow a voter to cast a ballot with missing questions', () => {
		const masterBallot = TestMasterBallotFactory.createFullMasterBallot();

		const start = new Date();
		const end = new Date((new Date()).getTime() + 30);
		const election = TestElectionFactory.createElectionWithFactoryMethod(masterBallot, { start, end });

		const fakeVoter = TestVoterFactory.createTestVoter();
		const ballotData = TestBallotDataFactory.createTestBallot(fakeVoter.id, masterBallot);

		ballotData.voteData.questionsData.pop();

		expect(() => { election.castBallot(faker.random.uuid, ballotData) }).to.throw();
	});

	it('should not allow a voter to cast a ballot with missing choices', () => {
		const masterBallot = TestMasterBallotFactory.createFullMasterBallot();

		const start = new Date();
		const end = new Date((new Date()).getTime() + 30);
		const election = TestElectionFactory.createElectionWithFactoryMethod(masterBallot, { start, end });

		const fakeVoter = TestVoterFactory.createTestVoter();
		const ballotData = TestBallotDataFactory.createTestBallot(fakeVoter.id, masterBallot);

		ballotData.voteData.questionsData[0].choicesData.pop();

		expect(() => { election.castBallot(faker.random.uuid, ballotData) }).to.throw();
	});

	it('should not allow a voter to cast a ballot with choices from unrelated master ballots', () => {
		const masterBallot = TestMasterBallotFactory.createFullMasterBallot();

		const start = new Date();
		const end = new Date((new Date()).getTime() + 30);
		const election = TestElectionFactory.createElectionWithFactoryMethod(masterBallot, { start, end });

		const fakeVoter = TestVoterFactory.createTestVoter();
		const ballotData = TestBallotDataFactory.createTestBallot(fakeVoter.id, masterBallot);

		const differentMasterBallot = TestMasterBallotFactory.createFullMasterBallot();
		const differentBallotData = TestBallotDataFactory.createTestBallot(fakeVoter.id, differentMasterBallot);
		const foreignChoice = { ...differentBallotData.voteData.questionsData[0].choicesData[0] };

		ballotData.voteData.questionsData[0].choicesData.push(foreignChoice);

		expect(() => { election.castBallot(faker.random.uuid, ballotData) }).to.throw();
	});

	it('should not allow a voter to cast a ballot in a restricted election if they are not permitted.', () => {
		const masterBallot = TestMasterBallotFactory.createFullMasterBallot();

		const start = new Date();
		const end = new Date((new Date()).getTime() + 30);
		const permittedVoterIds = new Set(TestVoterFactory.createRandomTestVoters(1, 12).map(v => v.id));
		const election = TestElectionFactory.createRestrictedElectionWithFactoryMethod(masterBallot, permittedVoterIds, { start, end });

		const notPermittedVoter = TestVoterFactory.createTestVoter();
		const ballotData = TestBallotDataFactory.createTestBallot(notPermittedVoter.id, masterBallot);

		expect(() => { election.castBallot(faker.random.uuid, ballotData) }).to.throw();
	});

	it('should allow a voter to cast a ballot in a restricted election if they are permitted.', () => {
		const masterBallot = TestMasterBallotFactory.createFullMasterBallot();

		const start = new Date();
		const end = new Date((new Date()).getTime() + 30);
		const permittedVoters = TestVoterFactory.createRandomTestVoters(1, 12);
		const permittedVoterIds = new Set(permittedVoters.map(v => v.id));
		const election = TestElectionFactory.createRestrictedElectionWithFactoryMethod(masterBallot, permittedVoterIds, { start, end });

		const ballotData = TestBallotDataFactory.createTestBallot(permittedVoters[0].id, masterBallot);

		expect(() => { election.castBallot(faker.random.uuid, ballotData) }).to.not.throw();
	});
});

