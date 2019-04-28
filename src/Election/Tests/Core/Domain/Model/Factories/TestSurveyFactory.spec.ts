import { expect } from 'chai';
import 'mocha';
import { TestSurveyFactory } from "./TestSurveyFactory.model";
import { Survey } from "../../../../../Core/Domain/Model/Aggregates/Ballot/Entities/Survey.model";

describe('Test TestSurveyFactory constructor', () => {
	it('should construct an instance of Survey entity', () => {
		const surveyResult = TestSurveyFactory.createFullSurvey();
		expect(surveyResult).instanceOf(Survey);
	});

	it('should correctly pass in optional survey parameters', () => {
		const testTitle = 'TestTitle';
		const surveyResult = TestSurveyFactory.createFullSurvey({surveyParams: { title: testTitle}});
		expect(surveyResult.title).equals(testTitle);
	});

	it('should correctly pass in optional question parameters', () => {
		const testType = 'TestQuestionType';
		const surveyResult = TestSurveyFactory.createFullSurvey({questionParams: {questionType: testType}});
		expect(surveyResult.questions[0].type).equals(testType);
	});

	it('should correctly pass in optional choice parameters', () => {
		const testId = 'TestUUID';
		const surveyResult = TestSurveyFactory.createFullSurvey({choiceParams: { id: testId }});
		expect(surveyResult.questions[0].choices[0].id).equals(testId);
	});
});
