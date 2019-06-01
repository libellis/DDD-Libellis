import {SECRET} from "../../config";
import jwt from "jsonwebtoken";
import {MemberStatus, Payload} from "../models/Payload";

export class PayloadService {
    // TODO: Test if this is robust enough.
    static retrievePayload(token: string): Payload {
        const payload = jwt.verify(token, SECRET);
        if ((payload as string).charAt(0) != undefined) {
            throw new Error("Incorrect payload format for libellis platform.");
        }
        return (payload as Payload);
    }

    static retrieveUserId(token: string): string {
        const payload = this.retrievePayload(token);
        return payload.userId;
    }

    static retrieveUsername(token: string): string {
        const payload = this.retrievePayload(token);
        return payload.username;
    }

    static retrieveStatus(token: string): MemberStatus {
        const payload = this.retrievePayload(token);
        return payload.status;
    }
}

