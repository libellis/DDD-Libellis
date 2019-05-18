import { expect } from 'chai';
import * as faker from 'faker';
import 'mocha';
import { Username } from "../../../../../core/domain/model/common/value-objects/Username.model";

describe('test username value object validity testing', () => {
	it('should successfully store a valid username.', () => {
		const usernameString = faker.internet.userName();
		console.log(usernameString);
		const goodFunction = () => {
			return new Username(usernameString);
		};
		expect(goodFunction).to.not.throw();
		expect(goodFunction().value).equals(usernameString);
	});

	it('should fail to store a username with invalid characters.', () => {
		const username = faker.internet.userName();
		const badUsername = username + "-";
		const badFunction = () => {
			new Username(badUsername);
		};
		expect(badFunction).to.throw();
	});

	it('should fail to store a username that is too long.', () => {
		const username = faker.internet.userName();
		const badUsername = username + Array(25).fill('a').join('');
		const badFunction = () => {
			new Username(badUsername);
		};
		expect(badFunction).to.throw();
	});
});
