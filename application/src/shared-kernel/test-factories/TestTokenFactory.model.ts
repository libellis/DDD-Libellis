import * as faker from 'faker';
import {MemberStatus, Payload} from "../models/Payload";
import jwt from "jsonwebtoken";
import {SECRET} from "../../config";

export class TestTokenFactory {
    private static generateRandomUserPayload(): Payload {
        const userId = faker.random.uuid();
        const username = faker.internet.userName();
        const status = MemberStatus.User;
        return {
            userId,
            username,
            status,
        }
    }

    private static generatePayloadForUserId(userId: string): Payload {
        const username = faker.internet.userName();
        const status = MemberStatus.User;
        return {
            userId,
            username,
            status,
        }
    }

    private static generatePayloadForUsername(username: string): Payload {
        const userId = faker.random.uuid();
        const status = MemberStatus.User;
        return {
            userId,
            username,
            status,
        }
    }

    private static generateRandomAdminPayload(): Payload {
        const userId = faker.random.uuid();
        const username = faker.internet.userName();
        const status = MemberStatus.Admin;
        return {
            userId,
            username,
            status,
        }
    }

    private static generateToken(payload: Payload): string {
        return jwt.sign((payload as object), SECRET);
    }

    static generateRandomUserToken(): string {
        const userPayload = TestTokenFactory.generateRandomUserPayload();
        return TestTokenFactory.generateToken(userPayload);
    }

    static generateRandomAdminToken(): string {
        const adminPayload = TestTokenFactory.generateRandomAdminPayload();
        return TestTokenFactory.generateToken(adminPayload);
    }

    static generateTokenForUserId(userId: string): string {
        const userPayload = TestTokenFactory.generatePayloadForUserId(userId);
        return TestTokenFactory.generateToken(userPayload);
    }

    static generateTokenForUsername(username: string): string {
        const userPayload = TestTokenFactory.generatePayloadForUsername(username);
        return TestTokenFactory.generateToken(userPayload);
    }
}
