import { expect } from 'chai';
import 'mocha';
import { TestElectionFactory } from "./TestElectionFactory.model";
import { Election } from "../../../../../Core/Domain/Model/Aggregates/Election/Entities/Election.model";
import { TestMasterBallotFactory } from "./TestMasterBallotFactory.model";


describe('Test TestElectionFactory constructor', () => {
	it('should construct an instance of an Election entity', () => {
		const masterBallot = TestMasterBallotFactory.createFullMasterBallot();
		const electionResult = TestElectionFactory.createElectionFromMasterBallot(masterBallot);
		expect(electionResult).instanceOf(Election);
	});

	// it('should correctly pass in optional election parameters', () => {
	// 	const testTitle = 'TestTitle';
	// 	const electionResult = TestElectionFactory.createElectionFromMasterBallot({electionParams: { title: testTitle}});
	// 	expect(electionResult.title).equals(testTitle);
	// });

	// it('should correctly pass in optional question parameters', () => {
	// 	const testType = 'TestQuestionType';
	// 	const electionResult = TestElectionFactory.createElectionFromMasterBallot({questionParams: {questionType: testType}});
	// 	expect(electionResult.questions[0].type).equals(testType);
	// });
	//
	// it('should correctly pass in optional choice parameters', () => {
	// 	const testId = 'TestUUID';
	// 	const electionResult = TestElectionFactory.createElectionFromMasterBallot({choiceParams: { id: testId }});
	// 	expect(electionResult.questions[0].choices[0].id).equals(testId);
	// });
});
