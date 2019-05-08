import { expect } from 'chai';
import 'mocha';
import { TallyVO } from "../../../../../core/domain/model/common/value-objects/TallyVO.model";
import { ScoreVO } from "../../../../../core/domain/model/common/value-objects/ScoreVO.model";

describe('test value object construction', () => {
	it('should successfully construct Tally value object with a valid tally', () => {
		const goodFunction = () => {
			new TallyVO(50);
		};
		expect(goodFunction).to.not.throw();
	});

	it('should fail to construct Tally value object with a negative tally', () => {
		const badFunction = () => {
			new TallyVO(-50);
		};
		expect(badFunction).to.throw();
	});

	it('should fail to construct Tally value object with a fractional number', () => {
		const badFunction = () => {
			new TallyVO(20.275);
		};
		expect(badFunction).to.throw();
	});

	it('should correctly increment tally by taking a new Score value object and returning a new tally.', () => {
		let tally = new TallyVO(50);
		let score = new ScoreVO(20);
		let updatedTally = tally.incrementTally(score);
		expect(updatedTally.tally).equals(70);
	});
});
