import { expect } from 'chai';
import 'mocha';
import { TestSurveyFactory } from "../Factories/TestSurveyFactory.model";

describe('test value object construction', () => {
	it('should successfully construct Category value object from valid string', () => {
		const goodFunction = TestSurveyFactory.createFullSurvey.bind(TestSurveyFactory,
			{surveyParams: {
					category: 'TestCategory',
				}});
		expect(goodFunction).to.not.throw();
	});

	it('should fail to construct Category value object from empty string', () => {
		const badFunction = TestSurveyFactory.createFullSurvey.bind(TestSurveyFactory,
			{surveyParams: {
					category: '',
				}});
		expect(badFunction).to.throw();
	});

	it('should fail to construct Category value object from long string', () => {
		const badFunction = TestSurveyFactory.createFullSurvey.bind(TestSurveyFactory,
			{surveyParams: {
					category: `This is definitely a very long string that
						is way longer than a category should be.`
				}});
		expect(badFunction).to.throw();
	});
});
