import { expect } from 'chai';
import 'mocha';
import { TestMasterBallotFactory } from "../Factories/TestMasterBallotFactory.model";

describe('test value object construction', () => {
	it('should successfully construct Category value object from valid string', () => {
		const goodFunction = TestMasterBallotFactory.createFullSurvey.bind(TestMasterBallotFactory,
			{surveyParams: {
					category: 'TestCategory',
				}});
		expect(goodFunction).to.not.throw();
	});

	it('should fail to construct Category value object from empty string', () => {
		const badFunction = TestMasterBallotFactory.createFullSurvey.bind(TestMasterBallotFactory,
			{surveyParams: {
					category: '',
				}});
		expect(badFunction).to.throw();
	});

	it('should fail to construct Category value object from long string', () => {
		const badFunction = TestMasterBallotFactory.createFullSurvey.bind(TestMasterBallotFactory,
			{surveyParams: {
					category: `This is definitely a very long string that
						is way longer than a category should be.`
				}});
		expect(badFunction).to.throw();
	});
});
