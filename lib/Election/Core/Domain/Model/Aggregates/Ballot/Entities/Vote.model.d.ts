import { Entity } from "../../../Common/Entities/Entity.model";
export declare class Vote extends Entity {
    title: string;
    content: string;
    contentType: string;
    constructor(id: string, title: string, content: string, contentType: string);
}
