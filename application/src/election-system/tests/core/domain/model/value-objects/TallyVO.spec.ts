import { expect } from 'chai';
import 'mocha';
import { Tally } from "../../../../../core/domain/model/common/value-objects/Tally.model";
import { Score } from "../../../../../core/domain/model/common/value-objects/Score.model";

describe('test value object construction', () => {
	it('should successfully construct Tally value object with a valid tally', () => {
		const goodFunction = () => {
			new Tally(50);
		};
		expect(goodFunction).to.not.throw();
	});

	it('should fail to construct Tally value object with a negative tally', () => {
		const badFunction = () => {
			new Tally(-50);
		};
		expect(badFunction).to.throw();
	});

	it('should fail to construct Tally value object with a fractional number', () => {
		const badFunction = () => {
			new Tally(20.275);
		};
		expect(badFunction).to.throw();
	});

	it('should correctly increment tally by taking a new Score value object and returning a new tally.', () => {
		let tally = new Tally(50);
		let score = new Score(20);
		let updatedTally = tally.incrementTally(score);
		expect(updatedTally.tally).equals(70);
	});
});
