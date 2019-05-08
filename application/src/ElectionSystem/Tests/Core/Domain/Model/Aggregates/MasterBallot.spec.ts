import { expect, assert } from 'chai';
import 'mocha';
import { TestMasterBallotFactory } from "../Factories/TestMasterBallotFactory.model";

describe('test non-root entity purity', () => {
	it('should not allow direct question mutation to affect aggregate consistency', () => {
		const masterBallotResult = TestMasterBallotFactory.createFullMasterBallot();
		const question = masterBallotResult.questions[0];
		const wrongQuestionTitle = 'TestWrongQuestionTitle';
		question.title = wrongQuestionTitle;
		assert.notEqual(masterBallotResult.questions[0].title, wrongQuestionTitle);
	});

	it('should not allow direct choice mutation to affect aggregate consistency', () => {
		const masterBallotResult = TestMasterBallotFactory.createFullMasterBallot();
		const choice = masterBallotResult.questions[0].choices[0];
		const wrongChoiceType = 'TestWrongChoiceType';
		choice.contentType = wrongChoiceType;
		assert.notEqual(masterBallotResult.questions[0].choices[0].contentType, wrongChoiceType);
	});
});


