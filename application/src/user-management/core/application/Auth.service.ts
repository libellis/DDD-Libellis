import {IUserRepository} from "./abstractions/IUserRepository";
import {EventBus} from "../../../shared-kernel/event-streams/EventBus";
import {User} from "../domain/model/user-aggregate/User.model";
import {SECRET} from "../../../config";
import {LoginData} from "./models/input/LoginData";
import jwt from "jsonwebtoken";
import {MemberStatus, Payload} from "../../../shared-kernel/models/Payload";

export class AuthService {
    private _userRepo: IUserRepository;
    private _eventBus: EventBus;

    constructor(
        userRepo: IUserRepository,
        eventBus: EventBus,
    ) {
        this._userRepo = userRepo;
        this._eventBus = eventBus;
    }

    async login(loginData: LoginData) {
        const { username, password } = loginData;
        const user = await this._userRepo.getByUsername(username);
        user.validPasswordGuard(password);
        return this.generateToken(user);
    }

    private generateToken(user: User) {
        const tokenData = AuthService.generatePayload(user);
        return jwt.sign(tokenData, SECRET);
    }

    private static generatePayload(user: User): Payload {
        const status = user.isAdmin ?
            MemberStatus.Admin :
            MemberStatus.User;

        return {
            userId: user.id,
            username: user.username,
            status,
        }
    }
}
