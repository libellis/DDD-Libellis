import { IUserData } from "../../../../../Core/Domain/Model/UserAggregate/Abstractions/IUserData";
import * as faker from 'faker';

export class TestUserDataFactory {
	static createUserData(options?: OptionalParams): IUserData {
		const userData: IUserData = {
			username: faker.internet.userName(),
			firstName: faker.name.firstName(),
			lastName: faker.name.lastName(),
			email: faker.internet.email(),
			photoUrl: faker.image.imageUrl(),
		};

		if (options !== undefined) {
			TestUserDataFactory.patchObject(userData, options);
		}

		return userData;
	}

	static createUserDatas(min: number, max: number): IUserData[] {
		const randomUserCount = faker.random.number({min, max, precision: 1});

		const userDatas = [];
		for (let i = 0; i < randomUserCount; i++) {
			userDatas.push(TestUserDataFactory.createUserData());
		}

		return userDatas;
	}

	static patchObject(inputObj: object, patchObj: object) {
		for (let [key, value] of Object.entries(patchObj)) {
			if (inputObj.hasOwnProperty(key)) inputObj[key] = value;
		}
	}
}

interface OptionalParams {
	username?: string
	firstName?: string,
	lastName?: string,
	email?: string,
	photoUrl?: string,
}
