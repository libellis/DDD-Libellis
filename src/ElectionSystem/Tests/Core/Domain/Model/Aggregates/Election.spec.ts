import { expect, assert } from 'chai';
import 'mocha';
import * as faker from 'faker';
import { TestElectionFactory } from "../Factories/TestElectionFactory.model";
import { TestMasterBallotFactory } from "../Factories/TestMasterBallotFactory.model";
import { ScoreVO } from "../../../../../Core/Domain/Model/Common/ValueObjects/ScoreVO.model";
import { TestVoterFactory } from "../Factories/TestVoterFactory.model";
import { TestBallotDataFactory } from "../Factories/TestBallotDataFactory.model";

describe('test invariance enforcement by root', () => {
	it('should not allow a voter to cast a ballot twice', () => {
		const masterBallot = TestMasterBallotFactory.createFullMasterBallot();

		const start = new Date();
		const end = new Date((new Date()).getTime() + 30);
		const election = TestElectionFactory.createElectionWithFactoryMethod(masterBallot, { start, end });

		const fakeVoter = TestVoterFactory.createTestVoter();
		const ballotData = TestBallotDataFactory.createTestBallot(fakeVoter.id, masterBallot);

		election.castBallot(faker.random.uuid, ballotData);
		expect(() => { election.castBallot(faker.random.uuid, ballotData) }).to.throw();
	});
});

