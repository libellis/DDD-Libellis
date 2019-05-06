import { expect, assert } from 'chai';
import 'mocha';
import * as faker from 'faker';
import { TestUserFactory } from "../Factories/TestUserFactory.model";
import { EventBus } from "../../../../../../SharedKernel/EventStreams/EventBus";

describe('test invariance enforcement by root', () => {

	// URL is a typescript type, so rather than unit test it like our other value objects, testing it
	// during user creation.
	it('Should not allow someone to create a username with an invalid photo url.', () => {
		const badFunction = () => {
			const eventBus = new EventBus();
			TestUserFactory.createUserWithFactoryMethod(eventBus, {photoUrl: "notUrl"});
		};

		expect(badFunction).to.throw();
	});

	it('Should store password as a hashed password', () => {
		const password = faker.lorem.slug(3);
		const eventBus = new EventBus();
		const user = TestUserFactory.createUserWithFactoryMethod(eventBus, { password });
		expect(user.hashedPassword).to.not.equal(password);
	});

	it('Should allow a user to change their password.', () => {
		const password = faker.lorem.slug(3);
		const eventBus = new EventBus();
		const user = TestUserFactory.createUserWithFactoryMethod(eventBus, { password });
		const oldHashedPw = user.hashedPassword;

		const newPassword = "NewPassword";
		const goodFunction = () => {
			user.changePassword(password, newPassword);
		};

		expect(goodFunction).to.not.throw();
		expect(user.hashedPassword).not.equal(oldHashedPw);
	});
});

describe('test mutation methods', () => {

	it('Should allow a user to change their password.', () => {
		const password = faker.lorem.slug(3);
		const eventBus = new EventBus();
		const user = TestUserFactory.createUserWithFactoryMethod(eventBus, { password });
		const oldHashedPw = user.hashedPassword;

		const newPassword = "NewPassword";
		const goodFunction = () => {
			user.changePassword(password, newPassword);
		};

		expect(goodFunction).to.not.throw();
		expect(user.hashedPassword).not.equal(oldHashedPw);
	});
});
