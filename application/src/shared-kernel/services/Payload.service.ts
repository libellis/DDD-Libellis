import {SECRET} from "../../config";

export class PayloadService {
    // TODO: Test if this is robust enough.
    static retrievePayload(token: string): string {
        const payload = jwt.verify(token, SECRET);
        return payload;
    }
}