import { User } from "../../../../../Core/Domain/Model/UserAggregate/User.model";
import * as faker from 'faker';
import { TestUserDataFactory } from "./TestUserDataFactory.model";

export class TestUserFactory {
	static createUserWithFactoryMethod(options?: OptionalParams): User {
		const userData = TestUserDataFactory.createUserData(options);
		return User.create(faker.random.uuid, userData);
	}
}

interface OptionalParams {
	username?: string
	firstName?: string,
	lastName?: string,
	email?: string,
	photoUrl?: string,
}
