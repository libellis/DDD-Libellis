import { expect } from 'chai';
import * as faker from 'faker';
import 'mocha';
import { Name } from "../../../../../core/domain/model/common/value-objects/NameVO.model";

describe('test name value object validity testing', () => {
	it('should successfully store a valid name.', () => {
		const nameString = faker.name.firstName();
		const goodFunction = () => {
			return new Name(nameString);
		};
		expect(goodFunction).to.not.throw();
		expect(goodFunction().value).equals(nameString);
	});

	it('should fail to store a name with invalid characters.', () => {
		const name = faker.name.firstName();
		const badName = name + "_";
		const badFunction = () => {
			new Name(badName);
		};
		expect(badFunction).to.throw();
	});

	it('should fail to store a name that is too long.', () => {
		const name = faker.name.firstName();
		const badName = name + Array(50).fill('a').join('');
		const badFunction = () => {
			new Name(badName);
		};
		expect(badFunction).to.throw();
	});
});
