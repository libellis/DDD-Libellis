import {User} from "../domain/model/user-aggregate/User.model";
import {NewUser} from "./models/input/NewUser";
import {IUserRepository} from "./abstractions/IUserRepository";
import {DuplicateResourceError} from "../../../shared-kernel/exceptions/DuplicateResourceError.model";
import {SECRET} from "../../../config";
import {EventBus} from "../../../shared-kernel/event-streams/EventBus";
import {UserResponse} from "./models/output/UserResponse";
import {UpdateUser} from "./models/input/UpdateUser";
import {ResourceNotFoundError} from "../../../shared-kernel/exceptions/ResourceNotFoundError.model";
import uuid = require("uuid/v4");

export class AccountManagementService {
    private _userRepo: IUserRepository;
    private _eventBus: EventBus;

    constructor(
        userRepo: IUserRepository,
        eventBus: EventBus,
    ) {
        this._userRepo = userRepo;
        this._eventBus = eventBus;
    }

    private async usernameExists(username: string): Promise<boolean> {
        const user = await this._userRepo.getByUsername(username);
        return (user !== undefined);
    }

    private async userExists(userId: string): Promise<boolean> {
        const user = await this._userRepo.get(userId);
        return (user !== undefined);
    }

    private async nonExistentUserGuard(userId: string) {
        if (!(await this.userExists(userId))) {
            throw new ResourceNotFoundError(`User by id ${userId} cannot be found.`);
        }
    }

    private async duplicateUsernameGuard(username: string) {
        if (await this.usernameExists(username)) {
            throw new DuplicateResourceError(`Username "${username}" already exists`);
        }
    }

    async createUser(userData: NewUser): Promise<UserResponse> {
        await this.duplicateUsernameGuard(userData.username);

        const newUser = User.create(uuid, userData, this._eventBus);
        await this._userRepo.add(newUser);

        return this.translateUserToResponse(newUser);
    }

    async updateUser(userChangeset: UpdateUser): Promise<UserResponse> {
        const user = await this._userRepo.get(userChangeset.id);
        const updatedUser = await user.changeAccountDetails(userChangeset);
        return this.translateUserToResponse(updatedUser);
    }

    async changePassword(userId: string, oldPassword: string, newPassword: string) {
        const user = await this._userRepo.get(userId);
        user.changePassword(oldPassword, newPassword);
        await this._userRepo.update(user);
    }

    async deleteUser(userId: string): Promise<string> {
        await this.nonExistentUserGuard(userId);
        if (!(await this._userRepo.remove(userId))) {
            return "Failure to delete user.";
        }
        return "User has been successfully deleted";
    }


    translateUserToResponse(user: User): UserResponse {
        return {
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            isAdmin: user.isAdmin,
        }
    }
}

