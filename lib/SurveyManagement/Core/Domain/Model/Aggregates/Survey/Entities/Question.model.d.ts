import { Entity } from "../../../Common/Entities/Entity.model";
import { Choice } from "./Choice.model";
export declare class Question extends Entity {
    title: string;
    type: string;
    choices: Choice[];
    constructor(id: string, title: string, type: string, choices: Choice[]);
}
