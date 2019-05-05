import { expect, assert } from 'chai';
import 'mocha';
import { TestUserFactory } from "../Factories/TestUserFactory.model";

describe('test invariance enforcement by root', () => {

	// URL is a typescript type, so rather than unit test it like our other value objects, testing it
	// during user creation.
	it('Should not allow someone to create a username with an invalid photo url.', () => {
		const badFunction = () => {
			TestUserFactory.createUserWithFactoryMethod({photoUrl: "notUrl"});
		};

		expect(badFunction).to.throw();
	});
});
