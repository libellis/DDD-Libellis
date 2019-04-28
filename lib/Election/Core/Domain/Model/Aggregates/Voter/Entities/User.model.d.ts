import { Entity } from "../../../Common/Entities/Entity.model";
export declare class User extends Entity {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    photoUrl: string;
    isAdmin: boolean;
    constructor(id: string, username: string, firstName: string, lastName: string, email: string, photoUrl: string, isAdmin: boolean);
}
