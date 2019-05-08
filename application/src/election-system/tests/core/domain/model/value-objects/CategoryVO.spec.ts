import { expect } from 'chai';
import 'mocha';
import { CategoryVO } from "../../../../../core/Domain/Model/Common/ValueObjects/CategoryVO.model";

describe('test value object construction', () => {
	it('should successfully construct Category value object from valid string', () => {
		const goodFunction = () => {
			new CategoryVO("TestCategory")
		};
		expect(goodFunction).to.not.throw();
	});

	it('should fail to construct Category value object from empty string', () => {
		const badFunction = () => {
			new CategoryVO('');
		};
		expect(badFunction).to.throw();
	});

	it('should fail to construct Category value object from long string', () => {
		const badFunction = () => {
			new CategoryVO(`This is definitely a very long string that
						is way longer than a category should be.`);
		};
		expect(badFunction).to.throw();
	});
});
