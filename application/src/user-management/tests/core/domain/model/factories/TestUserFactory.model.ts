import { User } from "../../../../../core/domain/model/user-aggregate/User.model";
import * as faker from 'faker';
import { TestUserDataFactory } from "./TestUserDataFactory.model";
import { EventBus } from "../../../../../../shared-kernel/event-streams/EventBus";

export class TestUserFactory {
	static createUserWithFactoryMethod(eventBus: EventBus, options?: OptionalParams): User {
		const userData = TestUserDataFactory.createUserData(options);
		return User.create(faker.random.uuid, userData, eventBus);
	}

	static createRandomUsers(eventBus: EventBus): User[] {
		const usersData = TestUserDataFactory.createUserDatas(2, 12);
		return usersData.map(u => {
			return User.create(faker.random.uuid, u, eventBus);
		});
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
