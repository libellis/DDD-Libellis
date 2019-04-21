import { expect } from 'chai';
import 'mocha';
import { TestSurveyFactory } from "../Factories/TestSurveyFactory.model";

describe('test value object construction', () => {
	it('should successfully construct VoteTally value object with a valid tally', () => {
		const goodFunction = TestSurveyFactory.createFullSurvey.bind(TestSurveyFactory,
			{choiceParams: {
				voteTally: 50,
				}});
		expect(goodFunction).to.not.throw();
	});

	it('should fail to construct VoteTally value object with a negative tally', () => {
		const badFunction = TestSurveyFactory.createFullSurvey.bind(TestSurveyFactory,
			{
				choiceParams: {
					voteTally: -30,
				}
			});
		expect(badFunction).to.throw();
	});

	it('should fail to construct VoteTally value object with a fractional number', () => {
		const badFunction = TestSurveyFactory.createFullSurvey.bind(TestSurveyFactory,
			{
				choiceParams: {
					voteTally: 20.275,
				}
			});
		expect(badFunction).to.throw();
	});
});
