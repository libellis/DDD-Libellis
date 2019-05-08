import { User } from "../../../../../Core/Domain/Model/UserAggregate/User.model";
import * as faker from 'faker';
import { TestUserDataFactory } from "./TestUserDataFactory.model";
import { EventBus } from "../../../../../../SharedKernel/EventStreams/EventBus";

export class TestUserFactory {
	static createUserWithFactoryMethod(eventBus: EventBus, options?: OptionalParams): User {
		const userData = TestUserDataFactory.createUserData(options);
		return User.create(faker.random.uuid, userData, eventBus);
	}
}

export interface OptionalParams {
	username?: string
	password?: string;
	firstName?: string,
	lastName?: string,
	email?: string,
	photoUrl?: string,
}
