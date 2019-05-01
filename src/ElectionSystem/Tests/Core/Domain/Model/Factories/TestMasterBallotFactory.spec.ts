import { expect } from 'chai';
import 'mocha';
import { TestMasterBallotFactory } from "./TestMasterBallotFactory.model";
import { MasterBallot } from "../../../../../Core/Domain/Model/MasterBallotAggregate/MasterBallot.model";


describe('Test TestMasterBallotFactory constructor', () => {
	it('should construct an instance of MasterBallot entity', () => {
		const masterBallotResult = TestMasterBallotFactory.createFullMasterBallot();
		expect(masterBallotResult).instanceOf(MasterBallot);
	});

	it('should correctly pass in optional masterBallot parameters', () => {
		const testTitle = 'TestTitle';
		const masterBallotResult = TestMasterBallotFactory.createFullMasterBallot({masterBallotParams: { title: testTitle}});
		expect(masterBallotResult.title).equals(testTitle);
	});

	it('should correctly pass in optional question parameters', () => {
		const testType = 'TestQuestionType';
		const masterBallotResult = TestMasterBallotFactory.createFullMasterBallot({questionParams: {questionType: testType}});
		expect(masterBallotResult.questions[0].type).equals(testType);
	});

	it('should correctly pass in optional choice parameters', () => {
		const testId = 'TestUUID';
		const masterBallotResult = TestMasterBallotFactory.createFullMasterBallot({choiceParams: { id: testId }});
		expect(masterBallotResult.questions[0].choices[0].id).equals(testId);
	});
});
