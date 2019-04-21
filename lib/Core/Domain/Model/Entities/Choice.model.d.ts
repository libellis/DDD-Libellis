import { Entity } from "./Entity.model";
import { VoteTallyVO } from "../ValueObjects/VoteTallyVO.model";
export declare class Choice extends Entity {
    private title;
    private content;
    private contentType;
    private voteTally;
    constructor(id: string, title: string, content: string, contentType: string, voteTally: VoteTallyVO);
}
