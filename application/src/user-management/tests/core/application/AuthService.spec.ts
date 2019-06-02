import 'mocha';
import * as chai from 'chai';
import * as faker from 'faker';
import chaiAsPromised = require('chai-as-promised');
import {MockUserRepository} from "../../mocks/repositories/MockUserRepository.model";
import {TestUserFactory} from "../domain/model/factories/TestUserFactory.model";
import {EventBus} from "../../../../shared-kernel/event-streams/EventBus";
import {AuthService} from "../../../core/application/Auth.service";
import {PayloadService} from "../../../../shared-kernel/services/Payload.service";
chai.use(chaiAsPromised);
const expect = chai.expect;
const assert = chai.assert;

describe('test all service methods success paths', () => {
    it('should successfully login an existing user', async () => {
        const eventBus = new EventBus();
        const username = faker.internet.userName();
        const password = faker.internet.password();
        const user = TestUserFactory.createUserWithFactoryMethod(eventBus, { username, password });
        const mockUserRepo = new MockUserRepository();
        await mockUserRepo.add(user);

        const authService = new AuthService(mockUserRepo, eventBus);
        const token = await authService.login({username, password });

        expect(PayloadService.retrieveUsername(token)).to.equal(username);
    });
});

describe('test all service methods failure paths', () => {
    it('should fail to login when supplied with incorrect password.', async () => {
        const eventBus = new EventBus();
        const username = faker.internet.userName();
        const password = faker.internet.password();
        const user = TestUserFactory.createUserWithFactoryMethod(eventBus, { username, password });
        const mockUserRepo = new MockUserRepository();
        await mockUserRepo.add(user);

        const badPassword = faker.internet.password();
        const authService = new AuthService(mockUserRepo, eventBus);
        await expect(authService.login({username, password: badPassword})).to.be.rejectedWith(Error);
    });
});
