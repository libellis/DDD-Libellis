import { expect, assert } from 'chai';
import * as faker from 'faker';
import 'mocha';
import { DateTimeRange } from "./DateTimeRange.model";

describe('test date time range inner equality checking', () => {
	it('should confirm inner equality of two date time ranges holding the same inner start and end dates', () => {
		const start = faker.date.recent(1);
		const end = new Date(start.getTime() + 10000);
		const dateTimeRange1 = new DateTimeRange(start, end);
		const dateTimeRange2 = new DateTimeRange(start, end);

		assert.isTrue(dateTimeRange1.equals(dateTimeRange2));
	});

	it('should deny inner equality of two date time ranges holding different inner end dates', () => {
		const start = faker.date.recent(1);
		const end1 = new Date(start.getTime() + 10000);
		const dateTimeRange1 = new DateTimeRange(start, end1);

		const end2 = new Date(start.getTime() + 50000);

		const dateTimeRange2 = new DateTimeRange(start, end2);

		assert.isFalse(dateTimeRange1.equals(dateTimeRange2));
	});
});
