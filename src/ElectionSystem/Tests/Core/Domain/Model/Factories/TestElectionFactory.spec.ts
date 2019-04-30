import { assert, expect } from 'chai';
import 'mocha';
import { TestElectionFactory } from "./TestElectionFactory.model";
import { Election } from "../../../../../Core/Domain/Model/Aggregates/Election/Entities/Election.model";
import { TestMasterBallotFactory } from "./TestMasterBallotFactory.model";


describe('Test TestElectionFactory constructor', () => {
	it('should construct an instance of an Election entity', () => {
		const masterBallot = TestMasterBallotFactory.createFullMasterBallot();
		const electionResult = TestElectionFactory.createElectionWithFactory(masterBallot);
		expect(electionResult).instanceOf(Election);
	});

	it('should generate an election that is currently active', () => {
		const masterBallot = TestMasterBallotFactory.createFullMasterBallot();
		const electionResult = TestElectionFactory.createElectionWithFactory(masterBallot);
		assert(electionResult.electionIsActive());
	});

	it('should correctly pass in optional election parameters', () => {
		const testStart = new Date((new Date()).getTime() + 90000);
		const masterBallot = TestMasterBallotFactory.createFullMasterBallot();
		const electionResult = TestElectionFactory.createElectionWithFactory(masterBallot, { start: testStart});
		assert.isFalse(electionResult.electionIsActive());
	});
});
