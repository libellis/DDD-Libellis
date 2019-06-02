import 'mocha';
import * as chai from 'chai';
import chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

import {MockUserRepository} from "./MockUserRepository.model";
import {TestUserFactory} from "../../core/domain/model/factories/TestUserFactory.model";
import {EventBus} from "../../../../shared-kernel/event-streams/EventBus";

describe('test all mock methods', () => {
	it('should store and retrieve a user', async () => {
		const eventBus = new EventBus();
		const user = TestUserFactory.createUserWithFactoryMethod(eventBus);

		const userRepository = new MockUserRepository();
		await userRepository.add(user);
		const retrievedUser = await userRepository.get(user.id);

		expect(retrievedUser).to.eql(user);
	});

	it('get() should not return an entity that when directly mutated affects repository data', async () => {
		const eventBus = new EventBus();
		const user = TestUserFactory.createUserWithFactoryMethod(eventBus);

		const userRepository = new MockUserRepository();
		await userRepository.add(user);
		const userToMutate = await userRepository.get(user.id);

		userToMutate.incrementVersion();

		const retrievedUser = await userRepository.get(user.id);

		expect(retrievedUser).to.eql(user);
		expect(retrievedUser).to.not.eql(userToMutate);
	});

	it('getPaged() should not return entities that when directly mutated affects repository data', async () => {
		const eventBus = new EventBus();
		const users = TestUserFactory.createRandomUsers(eventBus);

		const userRepository = new MockUserRepository();
		await userRepository.addRange(users);
		const retrievedUsersToMutate = await userRepository.getPagedResults(users.length, 1);

		const userToMutate = retrievedUsersToMutate[0];
		userToMutate.incrementVersion();

		const retrievedUsers = await userRepository.getPagedResults(users.length, 1);

		expect(retrievedUsers).to.eql(users);
		expect(retrievedUsers).to.not.eql(retrievedUsersToMutate);
	});

	it('should store a range of users', async () => {
		const eventBus = new EventBus();
		const users = TestUserFactory.createRandomUsers(eventBus);

		const userRepository = new MockUserRepository();
		await userRepository.addRange(users);
		const retrievedUsers = await userRepository.getPagedResults(users.length, 1);

		expect(retrievedUsers).to.eql(users);
	});

	it('can issue an update for a user after mutation', async () => {
		const eventBus = new EventBus();
		const user = TestUserFactory.createUserWithFactoryMethod(eventBus);

		const userRepository = new MockUserRepository();
		await userRepository.add(user);
		const retrievedUserToMutate = await userRepository.get(user.id);

		retrievedUserToMutate.incrementVersion();
		await userRepository.update(retrievedUserToMutate);

		const retrievedUser = await userRepository.get(user.id);

		expect(retrievedUser).to.not.eql(user);
		expect(retrievedUser).to.eql(retrievedUserToMutate);
	});

	it('should remove a user successfully', async () => {
		const eventBus = new EventBus();
		const user = TestUserFactory.createUserWithFactoryMethod(eventBus);

		const userRepository = new MockUserRepository();
		await userRepository.add(user);
		const retrievedUser = await userRepository.get(user.id);

		expect(retrievedUser).to.eql(user);

		await userRepository.remove(user.id);
		await expect(userRepository.get(user.id)).to.be.rejectedWith(Error);
	});
});
