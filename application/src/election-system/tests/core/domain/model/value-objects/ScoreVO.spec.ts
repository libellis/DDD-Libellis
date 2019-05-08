import { expect } from 'chai';
import 'mocha';
import { Score } from "../../../../../core/domain/model/common/value-objects/ScoreVO.model";

describe('test value object construction', () => {
	it('should successfully construct Score value object with a valid tally', () => {
		const goodFunction = () => {
			new Score(50);
		};
		expect(goodFunction).to.not.throw();
	});

	it('should fail to construct Score value object with a negative tally', () => {
		const badFunction = () => {
			new Score(-50);
		};
		expect(badFunction).to.throw();
	});

	it('should fail to construct Score value object with a fractional number', () => {
		const badFunction = () => {
			new Score(20.275);
		};
		expect(badFunction).to.throw();
	});
});
