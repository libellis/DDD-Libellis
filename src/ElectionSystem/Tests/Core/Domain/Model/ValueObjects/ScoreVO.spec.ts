import { expect } from 'chai';
import 'mocha';
import { ScoreVO } from "../../../../../Core/Domain/Model/Common/ValueObjects/ScoreVO.model";

describe('test value object construction', () => {
	it('should successfully construct Score value object with a valid tally', () => {
		const goodFunction = () => {
			new ScoreVO(50);
		};
		expect(goodFunction).to.not.throw();
	});

	it('should fail to construct Score value object with a negative tally', () => {
		const badFunction = () => {
			new ScoreVO(-50);
		};
		expect(badFunction).to.throw();
	});

	it('should fail to construct Score value object with a fractional number', () => {
		const badFunction = () => {
			new ScoreVO(20.275);
		};
		expect(badFunction).to.throw();
	});
});
