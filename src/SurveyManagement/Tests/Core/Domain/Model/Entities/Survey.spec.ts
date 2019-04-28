import { expect, assert } from 'chai';
import 'mocha';
import { TestSurveyFactory } from "../Factories/TestSurveyFactory.model";
import { Survey } from "../../../../../Core/Domain/Model/Aggregates/Survey/Entities/Survey.model";

describe('test non-root entity purity', () => {
	it('should not allow direct question mutation to affect aggregate consistency', () => {
		const surveyResult = TestSurveyFactory.createFullSurvey();
		const question = surveyResult.questions[0];
		const wrongQuestionTitle = 'TestWrongQuestionTitle';
		question.title = wrongQuestionTitle;
		assert.notEqual(surveyResult.questions[0].title, wrongQuestionTitle);
	});

	it('should not allow direct choice mutation to affect aggregate consistency', () => {
		const surveyResult = TestSurveyFactory.createFullSurvey();
		const choice = surveyResult.questions[0].choices[0];
		const wrongChoiceType = 'TestWrongChoiceType';
		choice.contentType = wrongChoiceType;
		console.log(surveyResult.questions[0].choices[0]);
		assert.notEqual(surveyResult.questions[0].choices[0].contentType, wrongChoiceType);
	});
});


